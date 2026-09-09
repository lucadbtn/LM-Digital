(function () {
  "use strict";

  // TODO: echte IDs eintragen, sonst bleiben GA/Pixel inaktiv.
  var GA_ID = "G-XXXXXXXXXX";
  var PIXEL_ID = "0000000000000000";

  var STORAGE_KEY = "luma_consent";
  var CONSENT_TTL_DAYS = 180;

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      var ageDays = (Date.now() - data.ts) / 86400000;
      if (ageDays > CONSENT_TTL_DAYS) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(analytics, marketing) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ analytics: !!analytics, marketing: !!marketing, ts: Date.now() })
      );
    } catch (e) {}
  }

  function loadGA() {
    if (window.__gaLoaded || !GA_ID || GA_ID.indexOf("XXXX") !== -1) return;
    window.__gaLoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
  }

  function loadPixel() {
    if (window.__pixelLoaded || !PIXEL_ID || PIXEL_ID.indexOf("000000000") !== -1) return;
    window.__pixelLoaded = true;
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  }

  function applyConsent(consent) {
    if (!consent) return;
    if (consent.analytics) loadGA();
    if (consent.marketing) loadPixel();
  }

  var existingConsent = readConsent();
  applyConsent(existingConsent);

  // ---- Banner UI (no framework dependency, self-contained styling) ----
  var bannerEl = null;
  var panelOpen = false;

  function css(styles) {
    return Object.keys(styles)
      .map(function (k) {
        return k + ":" + styles[k];
      })
      .join(";");
  }

  function closeBanner() {
    if (bannerEl && bannerEl.parentNode) bannerEl.parentNode.removeChild(bannerEl);
    bannerEl = null;
    panelOpen = false;
  }

  function togglePanel() {
    panelOpen = !panelOpen;
    var panel = document.getElementById("luma-cc-settings");
    if (!panel) return;
    if (!panelOpen) {
      panel.style.display = "none";
      return;
    }
    panel.style.display = "block";
    var current = readConsent() || { analytics: false, marketing: false };
    panel.innerHTML =
      '<label style="display:flex;align-items:center;gap:8px;margin-bottom:8px;opacity:.7">' +
      '<input type="checkbox" checked disabled/> Notwendig (immer aktiv)</label>' +
      '<label style="display:flex;align-items:center;gap:8px;margin-bottom:8px">' +
      '<input type="checkbox" id="luma-cc-analytics"' +
      (current.analytics ? " checked" : "") +
      "/> Analyse (Google Analytics)</label>" +
      '<label style="display:flex;align-items:center;gap:8px;margin-bottom:12px">' +
      '<input type="checkbox" id="luma-cc-marketing"' +
      (current.marketing ? " checked" : "") +
      "/> Marketing (Meta Pixel)</label>" +
      '<button type="button" id="luma-cc-save" style="' +
      css({
        background: "#4b7a9e",
        color: "#fff",
        border: "none",
        padding: "8px 16px",
        "border-radius": "999px",
        "font-size": "13px",
        "font-weight": "600",
        cursor: "pointer",
      }) +
      '">Auswahl speichern</button>';

    document.getElementById("luma-cc-save").addEventListener("click", function () {
      var a = document.getElementById("luma-cc-analytics").checked;
      var m = document.getElementById("luma-cc-marketing").checked;
      writeConsent(a, m);
      applyConsent({ analytics: a, marketing: m });
      closeBanner();
      buildToggle();
    });
  }

  function buildBanner() {
    if (bannerEl) return;
    var wrap = document.createElement("div");
    wrap.id = "luma-cookie-banner";
    wrap.style.cssText = css({
      position: "fixed",
      left: "16px",
      right: "16px",
      bottom: "16px",
      "z-index": "9999",
      "max-width": "640px",
      margin: "0 auto",
      background: "#1d1d1f",
      color: "#fff",
      "border-radius": "16px",
      padding: "20px 24px",
      "box-shadow": "0 12px 32px rgba(0,0,0,.25)",
      "font-family": "inherit",
      "font-size": "14px",
      "line-height": "1.5",
    });

    wrap.innerHTML =
      '<div>Wir verwenden Cookies für Analyse (Google Analytics) und Marketing (Meta Pixel), ' +
      "um zu verstehen, wie unsere Website genutzt wird, und unsere Anzeigen zu verbessern. " +
      'Technisch notwendige Funktionen sind davon nicht betroffen. Mehr dazu in unserer ' +
      '<a href="/datenschutz/" style="color:#fff;text-decoration:underline">Datenschutzerklärung</a>.</div>' +
      '<div id="luma-cc-settings" style="display:none;margin-top:16px"></div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:16px">' +
      '<button type="button" id="luma-cc-accept" style="' +
      css({
        background: "#4b7a9e",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        "border-radius": "999px",
        "font-size": "14px",
        "font-weight": "600",
        cursor: "pointer",
      }) +
      '">Alle akzeptieren</button>' +
      '<button type="button" id="luma-cc-reject" style="' +
      css({
        background: "transparent",
        color: "#fff",
        border: "1px solid rgba(255,255,255,.4)",
        padding: "10px 18px",
        "border-radius": "999px",
        "font-size": "14px",
        "font-weight": "600",
        cursor: "pointer",
      }) +
      '">Alle ablehnen</button>' +
      '<button type="button" id="luma-cc-manage" style="' +
      css({
        background: "transparent",
        color: "#fff",
        border: "none",
        padding: "10px 6px",
        "font-size": "14px",
        "text-decoration": "underline",
        cursor: "pointer",
      }) +
      '">Einstellungen</button>' +
      "</div>";

    document.body.appendChild(wrap);
    bannerEl = wrap;

    document.getElementById("luma-cc-accept").addEventListener("click", function () {
      writeConsent(true, true);
      applyConsent({ analytics: true, marketing: true });
      closeBanner();
      buildToggle();
    });
    document.getElementById("luma-cc-reject").addEventListener("click", function () {
      writeConsent(false, false);
      closeBanner();
      buildToggle();
    });
    document.getElementById("luma-cc-manage").addEventListener("click", togglePanel);
  }

  function buildToggle() {
    if (document.getElementById("luma-cookie-toggle")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "luma-cookie-toggle";
    btn.textContent = "Cookie-Einstellungen";
    btn.style.cssText = css({
      position: "fixed",
      left: "16px",
      bottom: "16px",
      "z-index": "9998",
      background: "#1d1d1f",
      color: "#fff",
      border: "none",
      padding: "8px 14px",
      "border-radius": "999px",
      "font-family": "inherit",
      "font-size": "12px",
      "font-weight": "600",
      cursor: "pointer",
      "box-shadow": "0 4px 16px rgba(0,0,0,.2)",
    });
    btn.addEventListener("click", function () {
      window.lumaOpenCookieSettings();
    });
    document.body.appendChild(btn);
  }

  function hideToggle() {
    var el = document.getElementById("luma-cookie-toggle");
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  // The banner itself is appended to <body> imperatively (never present in the
  // server-rendered HTML), so unlike a footer link it can't desync from the
  // Next.js hydration payload and get wiped out on hydrate.
  window.lumaOpenCookieSettings = function () {
    hideToggle();
    buildBanner();
    if (!panelOpen) togglePanel();
  };

  if (existingConsent) {
    buildToggle();
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildBanner);
  } else {
    buildBanner();
  }
})();
