/**
 * SAX minimaliste, sans dépendance, tolérant aux namespaces.
 *
 * Pourquoi pas DOMParser : sur un TCX de 20 Mo il construit ~500 k nœuds et
 * fait exploser la mémoire de l'onglet. Ici on ne garde jamais plus qu'un
 * trackpoint en mémoire.
 *
 * Pour des fichiers > 50 Mo, remplacer par `saxes` en mode flux ; l'interface
 * SaxHandler est volontairement identique.
 */

export interface SaxHandler {
  open(name: string, attrs: Record<string, string>): void;
  close(name: string): void;
  text(value: string): void;
}

/** `ns3:TPX` -> `TPX`. Les extensions Garmin changent de préfixe selon l'export. */
function localName(qname: string): string {
  const c = qname.indexOf(":");
  return c < 0 ? qname : qname.slice(c + 1);
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

export function decodeEntities(s: string): string {
  if (s.indexOf("&") < 0) return s;
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, g) => {
    if (g[0] === "#") {
      const code = g[1] === "x" || g[1] === "X" ? parseInt(g.slice(2), 16) : parseInt(g.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[g] ?? m;
  });
}

/** Trouve le `>` fermant en ignorant ceux placés dans une valeur d'attribut. */
function findTagEnd(xml: string, from: number): number {
  let quote = "";
  for (let i = from; i < xml.length; i++) {
    const ch = xml[i];
    if (quote) {
      if (ch === quote) quote = "";
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === ">") {
      return i;
    }
  }
  return xml.length;
}

const ATTR_RE = /([\w:.-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;

function parseAttrs(s: string): Record<string, string> {
  const out: Record<string, string> = {};
  ATTR_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ATTR_RE.exec(s))) {
    out[localName(m[1])] = decodeEntities(m[3] ?? m[4] ?? "");
  }
  return out;
}

export function sax(xml: string, h: SaxHandler): void {
  let i = 0;
  const n = xml.length;

  while (i < n) {
    const lt = xml.indexOf("<", i);
    if (lt < 0) break;

    if (lt > i) {
      const raw = xml.slice(i, lt);
      // Le trim évite d'émettre l'indentation entre balises.
      if (raw.trim().length) h.text(decodeEntities(raw));
    }

    if (xml.startsWith("<!--", lt)) {
      const end = xml.indexOf("-->", lt);
      i = end < 0 ? n : end + 3;
      continue;
    }
    if (xml.startsWith("<![CDATA[", lt)) {
      const end = xml.indexOf("]]>", lt);
      h.text(xml.slice(lt + 9, end < 0 ? n : end));
      i = end < 0 ? n : end + 3;
      continue;
    }
    if (xml.startsWith("<?", lt) || xml.startsWith("<!", lt)) {
      i = findTagEnd(xml, lt) + 1;
      continue;
    }

    const gt = findTagEnd(xml, lt);
    let body = xml.slice(lt + 1, gt);
    i = gt + 1;

    if (body[0] === "/") {
      h.close(localName(body.slice(1).trim()));
      continue;
    }

    const selfClosing = body.endsWith("/");
    if (selfClosing) body = body.slice(0, -1);

    let sp = 0;
    while (sp < body.length && !/\s/.test(body[sp])) sp++;
    const name = localName(body.slice(0, sp));
    const attrs = sp < body.length ? parseAttrs(body.slice(sp)) : {};

    h.open(name, attrs);
    if (selfClosing) h.close(name);
  }
}

/** Petit utilitaire : parse un flottant en tolérant les champs vides ou "NaN". */
export function num(v: string | undefined): number | undefined {
  if (v == null) return undefined;
  const t = v.trim();
  if (!t) return undefined;
  const f = Number(t);
  return Number.isFinite(f) ? f : undefined;
}
