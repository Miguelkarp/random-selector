/**
 * ui.js
 * Toda lectura/escritura del DOM vive aquí. app.js decide "qué" pasó,
 * ui.js decide "cómo se ve".
 */

const TombolaUI = (() => {
  const el = {
    ticket: document.getElementById("ticket"),
    ticketValue: document.getElementById("ticket-value"),
    drawBtn: document.getElementById("draw-btn"),
    resetBtn: document.getElementById("reset-btn"),
    themeToggle: document.getElementById("theme-toggle"),
    usedCount: document.getElementById("used-count"),
    totalCount: document.getElementById("total-count"),
    remainingCount: document.getElementById("remaining-count"),
    progressFill: document.getElementById("progress-fill"),
    availableList: document.getElementById("available-list"),
    usedList: document.getElementById("used-list"),
    availableTotal: document.getElementById("available-total"),
    usedTotal: document.getElementById("used-total"),
    confirmBackdrop: document.getElementById("confirm-backdrop"),
    confirmYes: document.getElementById("confirm-yes"),
    confirmCancel: document.getElementById("confirm-cancel"),
    liveRegion: document.getElementById("live-region"),
  };

  /**
   * Pinta el ticket grande con el último elemento sorteado, o un
   * mensaje neutro si aún no se ha sacado ninguno.
   * @param {string|null} item
   * @param {boolean} isFresh  si se acaba de sacar (dispara animación)
   */
  function renderTicket(item, isFresh) {
    el.ticket.classList.remove("is-fresh");

    if (item === null) {
      el.ticket.classList.add("ticket--empty");
      el.ticketValue.textContent = "Presiona sacar boleto";
      return;
    }

    el.ticket.classList.remove("ticket--empty");
    el.ticketValue.textContent = item;

    if (isFresh) {
      // Reinicia la animación forzando un reflow.
      void el.ticket.offsetWidth;
      el.ticket.classList.add("is-fresh");
    }
  }

  /**
   * Pinta las listas de disponibles/usados y los contadores.
   * @param {string[]} available
   * @param {string[]} used
   */
  function renderLists(available, used) {
    const total = available.length + used.length;

    el.usedCount.textContent = String(used.length);
    el.totalCount.textContent = String(total);
    el.remainingCount.textContent = `${available.length} disponibles`;
    el.availableTotal.textContent = String(available.length);
    el.usedTotal.textContent = String(used.length);

    const percent = TombolaUtils.percentUsed(used.length, total);
    el.progressFill.style.width = `${percent}%`;
    el.progressFill.setAttribute("aria-valuenow", String(percent));

    el.availableList.innerHTML = renderItems(available, "Aún no hay elementos disponibles.");
    el.usedList.innerHTML = renderItems(used, "Todavía no se ha sacado ninguno.");
  }

  /**
   * @param {string[]} items
   * @param {string} emptyMessage
   * @returns {string} HTML
   */
  function renderItems(items, emptyMessage) {
    if (items.length === 0) {
      return `<li class="list__empty">${TombolaUtils.escapeHtml(emptyMessage)}</li>`;
    }

    return items
      .map((item) => `<li class="list__item">${TombolaUtils.escapeHtml(item)}</li>`)
      .join("");
  }

  /**
   * Habilita/deshabilita el botón de sacar boleto.
   * @param {boolean} enabled
   * @param {string} [reasonLabel]  texto del botón cuando está deshabilitado
   */
  function setDrawEnabled(enabled, reasonLabel) {
    el.drawBtn.disabled = !enabled;
    el.drawBtn.textContent = enabled ? "Sacar boleto" : (reasonLabel || "Sin elementos disponibles");
  }

  /** Anuncia un mensaje a lectores de pantalla sin alterar el layout. */
  function announce(message) {
    el.liveRegion.textContent = message;
  }

  function openConfirm() {
    el.confirmBackdrop.hidden = false;
    el.confirmYes.focus();
  }

  function closeConfirm() {
    el.confirmBackdrop.hidden = true;
    el.resetBtn.focus();
  }

  /**
   * Aplica el tema visual y sincroniza el texto/estado del botón.
   * @param {"dark"|"light"} theme
   */
  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    const isLight = theme === "light";
    el.themeToggle.textContent = isLight ? "Modo oscuro" : "Modo claro";
    el.themeToggle.setAttribute("aria-pressed", String(isLight));
  }

  return {
    el,
    renderTicket,
    renderLists,
    setDrawEnabled,
    announce,
    openConfirm,
    closeConfirm,
    applyTheme,
  };
})();
