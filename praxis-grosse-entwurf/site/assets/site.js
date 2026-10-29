// Praxis Grosse – kleine Helfer ohne Abhängigkeiten
(function () {
  "use strict";

  // Telefonzeiten Mo–Fr 8–18 Uhr (deutsche Zeit). Feiertage sind nicht berücksichtigt.
  var TEL = { von: 8 * 60, bis: 18 * 60 };

  function jetztInBerlin() {
    var teile = new Intl.DateTimeFormat("de-DE", {
      timeZone: "Europe/Berlin", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date());
    var w = {}, i;
    for (i = 0; i < teile.length; i++) w[teile[i].type] = teile[i].value;
    return { tag: w.weekday.replace(".", ""), minuten: parseInt(w.hour, 10) * 60 + parseInt(w.minute, 10) };
  }

  function telefonStatus() {
    var j = jetztInBerlin();
    var werktag = ["Mo", "Di", "Mi", "Do", "Fr"].indexOf(j.tag) > -1;
    if (werktag && j.minuten >= TEL.von && j.minuten < TEL.bis) {
      return { offen: true, kurz: "Jetzt erreichbar", lang: "Jetzt telefonisch erreichbar – bis 18 Uhr." };
    }
    var morgen = werktag && j.minuten < TEL.von ? "ab 8 Uhr" : (j.tag === "Fr" || j.tag === "Sa" || j.tag === "So" ? "ab Montag, 8 Uhr" : "ab morgen, 8 Uhr");
    return { offen: false, kurz: "Wieder " + morgen, lang: "Telefonisch wieder erreichbar " + morgen + ". Oder Sie fragen online einen Rückruf an." };
  }

  var s = telefonStatus();
  document.querySelectorAll("[data-status]").forEach(function (el) {
    el.textContent = s.kurz;
    el.classList.toggle("offen", s.offen);
  });
  document.querySelectorAll("[data-status-text]").forEach(function (el) { el.textContent = s.lang; });

  // Menü auf kleinen Bildschirmen
  var knopf = document.querySelector(".menue");
  var nav = document.getElementById("hauptnav");
  if (knopf && nav) {
    knopf.addEventListener("click", function () {
      var offen = nav.classList.toggle("offen");
      knopf.setAttribute("aria-expanded", String(offen));
      knopf.textContent = offen ? "Schließen" : "Menü";
    });
  }

  // Größere Schrift, gemerkt pro Browser
  var html = document.documentElement;
  var schalter = document.querySelector("[data-schrift]");
  function merke(wert) { try { localStorage.setItem("pg-schrift", wert); } catch (e) {} }
  function gemerkt() { try { return localStorage.getItem("pg-schrift"); } catch (e) { return null; } }
  if (gemerkt() === "gross") html.classList.add("gross");
  if (schalter) {
    schalter.setAttribute("aria-pressed", String(html.classList.contains("gross")));
    schalter.addEventListener("click", function () {
      var an = html.classList.toggle("gross");
      schalter.setAttribute("aria-pressed", String(an));
      merke(an ? "gross" : "normal");
    });
  }

  // Google-Karte erst nach Klick laden
  document.querySelectorAll("[data-karte]").forEach(function (box) {
    var b = box.querySelector("button");
    if (!b) return;
    b.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = box.getAttribute("data-src");
      f.title = "Karte: Praxis Grosse, Bahnhofstraße 4, Ispringen";
      f.loading = "lazy";
      f.referrerPolicy = "no-referrer-when-downgrade";
      box.replaceChildren(f);
    });
  });

  // Rückruf-Formular (Entwurf: keine Übertragung)
  var form = document.querySelector("[data-formular]");
  if (form) {
    var param = new URLSearchParams(location.search).get("anliegen");
    var auswahl = form.querySelector("#f-leistung");
    if (param && auswahl && auswahl.querySelector('option[value="' + param + '"]')) auswahl.value = param;

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var meldung = form.querySelector("[data-meldung]");
      var fehlend = [];
      form.querySelectorAll("[required]").forEach(function (feld) {
        var leer = feld.type === "checkbox" ? !feld.checked : !feld.value.trim();
        feld.setAttribute("aria-invalid", String(leer));
        if (leer) fehlend.push(feld);
      });
      if (fehlend.length) {
        meldung.className = "formular__meldung fehler";
        meldung.textContent = "Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie die Einwilligung.";
        fehlend[0].focus();
        return;
      }
      meldung.className = "formular__meldung ok";
      meldung.textContent = "Danke! Wir rufen Sie zurück. (Im Entwurf wird nichts gesendet.)";
      form.reset();
    });
  }
})();
