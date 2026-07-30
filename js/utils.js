/**
 * utils.js
 * Funciones auxiliares sin dependencias de estado ni del DOM.
 */

const TombolaUtils = (() => {
  /**
   * Convierte texto crudo (una entrada por línea) en un arreglo limpio:
   * quita espacios, líneas vacías y duplicados exactos.
   * @param {string} rawText
   * @returns {string[]}
   */
  function parseLines(rawText) {
    const seen = new Set();
    const result = [];

    rawText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .forEach((line) => {
        if (!seen.has(line)) {
          seen.add(line);
          result.push(line);
        }
      });

    return result;
  }

  /**
   * Escapa HTML para insertar texto de usuario de forma segura.
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Calcula el porcentaje usado, evitando división por cero.
   * @param {number} used
   * @param {number} total
   * @returns {number}
   */
  function percentUsed(used, total) {
    if (total <= 0) return 0;
    return Math.round((used / total) * 100);
  }

  return { parseLines, escapeHtml, percentUsed };
})();
