/**
 * Parseur GPX 1.1.
 *
 * Différence majeure avec le TCX : le GPX ne porte **aucune distance cumulée**
 * ni aucun tour. Tout est recalculé par intégration haversine. Les capteurs
 * vivent dans <extensions>, avec trois dialectes concurrents :
 *   - gpxtpx:TrackPointExtension  (Garmin, le plus répandu)
 *   - gpxdata:*                   (Cluetrust, ancien Strava)
 *   - power / gpxpx:PowerInWatts  (Wahoo, Stryd)
 * Le SAX supprimant les préfixes de namespace, on ne matche que le nom local.
 */

import { sax, num } from "./xml.ts";
import { fillDistance, sanitizeSamples } from "./geo.ts";
import type { Activity, Sample, Sport } from "./types.ts";

const TYPE_MAP: Record<string, Sport> = {
  running: "running",
  run: "running",
  "9": "running",
  cycling: "cycling",
  biking: "cycling",
  ride: "cycling",
  "1": "cycling",
  hiking: "hiking",
  hike: "hiking",
  walking: "hiking",
  swimming: "swimming",
};

export function parseGpx(xml: string): Activity {
  const samples: Sample[] = [];
  let sport: Sport = "other";
  let device: string | undefined;
  let t0: number | undefined;

  let pt: (Sample & { time?: number }) | null = null;
  let inMetadata = false;
  let buf = "";

  sax(xml, {
    open(name, attrs) {
      buf = "";
      if (name === "metadata") inMetadata = true;
      if (name === "gpx" && attrs.creator) device = attrs.creator;
      if (name === "trkpt" || name === "rtept") {
        pt = { t: 0, lat: num(attrs.lat), lon: num(attrs.lon) };
      }
    },

    text(v) {
      buf += v;
    },

    close(name) {
      const value = buf.trim();
      buf = "";

      switch (name) {
        case "metadata":
          inMetadata = false;
          break;
        case "type":
          if (!inMetadata && value) sport = TYPE_MAP[value.toLowerCase()] ?? sport;
          break;
        case "ele":
          if (pt) pt.ele = num(value);
          break;
        case "time":
          if (pt) {
            const ms = Date.parse(value);
            if (Number.isFinite(ms)) pt.time = ms / 1000;
          }
          break;
        case "hr":
        case "heartrate":
          if (pt) pt.hr = num(value);
          break;
        case "cad":
        case "cadence":
          if (pt) pt.cad = num(value);
          break;
        case "atemp":
        case "temp":
          if (pt) pt.temp = num(value);
          break;
        case "power":
        case "PowerInWatts":
          if (pt) pt.pw = num(value);
          break;
        case "trkpt":
        case "rtept": {
          if (pt && pt.time != null) {
            if (t0 == null) t0 = pt.time;
            const { time, ...rest } = pt;
            samples.push({ ...rest, t: Math.round((time - t0) * 10) / 10 });
          } else if (pt && pt.lat != null) {
            // GPX sans horodatage (trace planifiée) : on garde la géométrie.
            const { time, ...rest } = pt;
            samples.push({ ...rest, t: samples.length });
          }
          pt = null;
          break;
        }
      }
    },
  });

  samples.sort((a, b) => a.t - b.t);
  sanitizeSamples(samples);
  fillDistance(samples);

  // La cadence course en GPX Garmin est par jambe, comme en TCX.
  if (sport === "running") {
    for (const s of samples) if (s.cad != null && s.cad < 130) s.cad *= 2;
  }

  return {
    sport,
    startTime: t0 != null ? new Date(t0 * 1000).toISOString() : undefined,
    device,
    source: "gpx",
    samples,
    laps: [],
  };
}
