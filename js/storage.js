/**
 * storage.js
 * Persiste y recupera el estado de la tómbola en Local Storage.
 */

const TombolaStorage = (() => {
  const KEY = "tombola:v1";

  /**
   * @typedef {Object} TombolaState
   * @property {string[]} available
   * @property {string[]} used
   * @property {string|null} lastDrawn
   * @property {string} sourceSignature  huella de la lista de origen
   */

  /**
   * Guarda el estado. Falla en silencio (con aviso en consola) si
   * Local Storage no está disponible (modo privado, cuota llena, etc.).
   * @param {TombolaState} state
   */
  function save(state) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("Tómbola: no se pudo guardar el estado.", err);
    }
  }

  /**
   * Recupera el estado guardado, o null si no existe / está corrupto.
   * @returns {TombolaState|null}
   */
  function load() {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed.available) || !Array.isArray(parsed.used)) {
        return null;
      }

      return parsed;
    } catch (err) {
      console.warn("Tómbola: estado guardado inválido, se ignora.", err);
      return null;
    }
  }

  /** Borra el estado guardado. */
  function clear() {
    try {
      window.localStorage.removeItem(KEY);
    } catch (err) {
      console.warn("Tómbola: no se pudo limpiar el estado.", err);
    }
  }

  /**
   * Firma simple de una lista de origen, para detectar si data/datos.txt
   * cambió desde la última visita (y así no arrastrar un estado obsoleto).
   * @param {string[]} list
   * @returns {string}
   */
  function signatureOf(list) {
    return `${list.length}:${list[0] ?? ""}:${list[list.length - 1] ?? ""}`;
  }

  return { save, load, clear, signatureOf };
})();
