/**
 * Web Worker. Non négociable : parser un TCX de 20 Mo sur le thread principal
 * gèle l'onglet pendant plusieurs secondes, et l'utilisateur ferme la page.
 */
import { digestFile } from "./digest.ts";
import type { DigestOptions } from "./types.ts";

export interface WorkerRequest {
  id: string;
  filename: string;
  data: string | ArrayBuffer;
  options: DigestOptions;
}

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  const { id, filename, data, options } = e.data;
  try {
    const result = await digestFile(filename, data, options);
    self.postMessage({ id, ok: true, result });
  } catch (err) {
    self.postMessage({ id, ok: false, error: (err as Error).message });
  }
};
