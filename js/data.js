/**
 * data.js
 * Carga la lista de elementos desde un archivo de texto externo.
 */

const TombolaData = (() => {
  const DEFAULT_PATH = "data/datos.txt";

  /**
   * Descarga y parsea el archivo de datos.
   * @param {string} [path]
   * @returns {Promise<string[]>}
   */
  async function load(path = DEFAULT_PATH) {
    const response = await fetch(path, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`No se pudo cargar ${path} (HTTP ${response.status})`);
    }

    const rawText = await response.text();
    return TombolaUtils.parseLines(rawText);
  }

  return { load, DEFAULT_PATH };
})();
