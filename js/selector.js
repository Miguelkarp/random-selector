/**
 * selector.js
 * Selección aleatoria pura: no conoce el DOM ni Local Storage.
 */

const TombolaSelector = (() => {
  /**
   * Elige un índice aleatorio de una lista no vacía.
   * @param {string[]} available
   * @returns {number}
   */
  function randomIndex(available) {
    return Math.floor(Math.random() * available.length);
  }

  /**
   * Saca un elemento al azar de "available" y lo devuelve junto con
   * el arreglo restante. No muta el arreglo original.
   * @param {string[]} available
   * @returns {{item: string, remaining: string[]}|null} null si está vacío
   */
  function draw(available) {
    if (available.length === 0) return null;

    const index = randomIndex(available);
    const item = available[index];
    const remaining = available.slice(0, index).concat(available.slice(index + 1));

    return { item, remaining };
  }

  return { draw };
})();
