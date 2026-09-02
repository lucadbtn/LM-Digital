// LM Digital — main.js
// Mobile-Nav, Cookie-Consent und Kontaktformular. Kein Tracking, keine
// Analytics-Skripte werden hier geladen — der Consent-Status wird nur
// gespeichert, damit spätere Tools (siehe README) sich daran halten können.

(function () {
  "use strict";

  /* ---------------- Mobile navigation ---------------- */
  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var links = document.querySelector("[data-nav-links]");
    if (!toggle || !links) return;

    function close() {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menü öffnen");
    }
    function open() {
      links.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Menü schließen");
    }

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.contains("is-open");
      isOpen ? close() : open();
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) close();
    });
  }

  /* ---------------- Cookie consent ---------------- */
  var CONSENT_KEY = "lmd_cookie_consent";

  function readConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(statistics) {
    var value = {
      necessary: true,
      statistics: !!statistics,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
    } catch (e) {
      /* localStorage nicht verfügbar (z.B. Privatmodus) — Banner bleibt sichtbar */
    }
    document.dispatchEvent(new CustomEvent("lmd:consent", { detail: value }));
    return value;
  }

  function initCookieBanner() {
    var banner = document.querySelector("[data-cookie-banner]");
    if (!banner) return;

    var prefs = banner.querySelector("[data-cookie-prefs]");
    var statsSwitch = banner.querySelector("[data-cookie-stats]");
    var acceptAllBtns = banner.querySelectorAll("[data-cookie-accept-all]");
    var rejectBtns = banner.querySelectorAll("[data-cookie-reject]");
    var settingsToggleBtns = banner.querySelectorAll("[data-cookie-settings]");
    var saveBtn = banner.querySelector("[data-cookie-save]");
    var reopenLinks = document.querySelectorAll("[data-cookie-reopen]");

    function show() {
      banner.hidden = false;
      requestAnimationFrame(function () {
        banner.classList.add("is-visible");
      });
    }
    function hide() {
      banner.classList.remove("is-visible");
      window.setTimeout(function () {
        banner.hidden = true;
      }, 350);
    }

    var existing = readConsent();
    if (existing) {
      document.dispatchEvent(new CustomEvent("lmd:consent", { detail: existing }));
    } else {
      show();
    }

    acceptAllBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        writeConsent(true);
        hide();
      });
    });

    rejectBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        writeConsent(false);
        hide();
      });
    });

    settingsToggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!prefs) return;
        var isHidden = prefs.hasAttribute("hidden");
        if (isHidden) {
          prefs.removeAttribute("hidden");
          btn.setAttribute("aria-expanded", "true");
        } else {
          prefs.setAttribute("hidden", "");
          btn.setAttribute("aria-expanded", "false");
        }
      });
    });

    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        writeConsent(statsSwitch ? statsSwitch.checked : false);
        hide();
      });
    }

    reopenLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var current = readConsent();
        if (statsSwitch) statsSwitch.checked = current ? current.statistics : false;
        if (prefs) prefs.removeAttribute("hidden");
        show();
      });
    });
  }

  /* ---------------- Kontaktformular ---------------- */
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var status = form.querySelector("[data-form-status]");
    var submitBtn = form.querySelector("[type=submit]");
    var endpoint = form.getAttribute("action") || "";
    var isConfigured = endpoint.indexOf("REPLACE_ME") === -1 && endpoint.length > 0;

    function setStatus(kind, message) {
      if (!status) return;
      status.textContent = message;
      status.className = "form-status is-visible form-status--" + kind;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value) {
        // Bot-Falle ausgelöst: so tun, als wäre alles gut, aber nichts senden.
        setStatus("ok", "Danke für deine Nachricht! Wir melden uns in Kürze bei dir.");
        form.reset();
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!isConfigured) {
        setStatus(
          "error",
          "Das Formular ist noch nicht mit einem Versand-Dienst verbunden (siehe README.md, Abschnitt „Kontaktformular“). " +
            "Bitte schreib uns bis dahin direkt an die E-Mail-Adresse oben."
        );
        return;
      }

      var data = new FormData(form);
      if (submitBtn) submitBtn.disabled = true;

      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            setStatus("ok", "Danke für deine Nachricht! Wir melden uns in Kürze bei dir.");
            form.reset();
          } else {
            setStatus(
              "error",
              "Da ist etwas schiefgelaufen. Bitte versuch es erneut oder schreib uns direkt per E-Mail."
            );
          }
        })
        .catch(function () {
          setStatus(
            "error",
            "Da ist etwas schiefgelaufen. Bitte versuch es erneut oder schreib uns direkt per E-Mail."
          );
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  /* ---------------- Footer year ---------------- */
  function initYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initCookieBanner();
    initContactForm();
    initYear();
  });
})();
