/**
 * app.js
 * Punto de entrada: conecta data, selector, storage y ui.
 */

(() => {
  const THEME_KEY = "tombola:theme";

  /** @type {{available: string[], used: string[], lastDrawn: string|null, sourceSignature: string}} */
  let state = { available: [], used: [], lastDrawn: null, sourceSignature: "" };

  async function init() {
    initTheme();
    bindEvents();

    let sourceList;
    try {
      sourceList = await TombolaData.load();
    } catch (err) {
      console.error(err);
      TombolaUI.renderTicket(null, false);
      TombolaUI.setDrawEnabled(false, "No se pudo cargar la lista");
      TombolaUI.announce("No se pudo cargar data/datos.txt.");
      return;
    }

    const signature = TombolaStorage.signatureOf(sourceList);
    const saved = TombolaStorage.load();

    if (saved && saved.sourceSignature === signature) {
      state = saved;
    } else {
      state = { available: sourceList.slice(), used: [], lastDrawn: null, sourceSignature: signature };
      TombolaStorage.save(state);
    }

    render(false);
  }

  function bindEvents() {
    TombolaUI.el.drawBtn.addEventListener("click", handleDraw);
    TombolaUI.el.resetBtn.addEventListener("click", () => TombolaUI.openConfirm());
    TombolaUI.el.confirmCancel.addEventListener("click", () => TombolaUI.closeConfirm());
    TombolaUI.el.confirmBackdrop.addEventListener("click", (event) => {
      if (event.target === TombolaUI.el.confirmBackdrop) TombolaUI.closeConfirm();
    });
    TombolaUI.el.confirmYes.addEventListener("click", handleReset);
    TombolaUI.el.themeToggle.addEventListener("click", toggleTheme);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !TombolaUI.el.confirmBackdrop.hidden) {
        TombolaUI.closeConfirm();
      }
    });
  }

  function handleDraw() {
    const result = TombolaSelector.draw(state.available);
    if (!result) return;

    state.available = result.remaining;
    state.used = state.used.concat(result.item);
    state.lastDrawn = result.item;

    TombolaStorage.save(state);
    render(true);
    TombolaUI.announce(`Boleto sorteado: ${result.item}`);
  }

  function handleReset() {
    state = {
      available: state.available.concat(state.used),
      used: [],
      lastDrawn: null,
      sourceSignature: state.sourceSignature,
    };

    TombolaStorage.save(state);
    TombolaUI.closeConfirm();
    render(false);
    TombolaUI.announce("Tómbola reiniciada.");
  }

  function render(isFresh) {
    TombolaUI.renderTicket(state.lastDrawn, isFresh);
    TombolaUI.renderLists(state.available, state.used);

    if (state.available.length === 0) {
      TombolaUI.setDrawEnabled(false, "Sin elementos disponibles");
    } else {
      TombolaUI.setDrawEnabled(true);
    }
  }

  function initTheme() {
    let theme = "dark";
    try {
      theme = window.localStorage.getItem(THEME_KEY) || "dark";
    } catch (err) {
      // Local Storage no disponible: seguimos con el tema por defecto.
    }
    TombolaUI.applyTheme(theme);
  }

  function toggleTheme() {
    const next = document.body.dataset.theme === "light" ? "dark" : "light";
    TombolaUI.applyTheme(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch (err) {
      // Se ignora: el tema simplemente no persistirá.
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
