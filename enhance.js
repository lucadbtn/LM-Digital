(function () {
  "use strict";

  var BASE = "https://luma-digital.de";
  var path = window.location.pathname;

  var main = document.querySelector("main");
  var footer = document.querySelector("footer");
  if (!main) return;

  // Force explicit flex-order on the two existing landmarks so any content
  // we append (always as a body-level sibling, never as a child of main -
  // see 404.js for why) can be placed visually before/after main purely via
  // CSS order, without ever touching main's own children.
  main.style.order = "50";
  if (footer) footer.style.order = "100";

  var beforeOrder = 10;
  var afterOrder = 60;

  function el(html) {
    var d = document.createElement("div");
    d.innerHTML = html;
    return d.firstElementChild;
  }

  function addBefore(node) {
    node.style.order = String(beforeOrder++);
    document.body.appendChild(node);
    return node;
  }

  function addAfter(node) {
    node.style.order = String(afterOrder++);
    document.body.appendChild(node);
    return node;
  }

  function addJsonLd(data) {
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(data);
    document.body.appendChild(s);
  }

  // ---------------------------------------------------------------------
  // Breadcrumbs
  // ---------------------------------------------------------------------
  var PAGE_LABELS = {
    "/leistungen/": "Leistungen",
    "/beispiele/": "Beispiele",
    "/referenzen/": "Referenzen",
    "/ueber-uns/": "Über uns",
    "/kontakt/": "Kontakt",
    "/impressum/": "Impressum",
    "/datenschutz/": "Datenschutz",
  };

  function addBreadcrumbs() {
    var label = PAGE_LABELS[path];
    if (!label) return;
    var bar = addBefore(
      el(
        '<nav aria-label="Breadcrumb" class="mx-auto w-full max-w-6xl px-6 md:px-10 text-sm text-ink-soft" style="padding-top:24px">' +
          '<a href="/" class="hover:text-ink">Startseite</a>' +
          '<span style="margin:0 8px">/</span>' +
          '<span class="text-ink">' +
          label +
          "</span>" +
          "</nav>"
      )
    );
    addJsonLd({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: BASE + "/" },
        { "@type": "ListItem", position: 2, name: label, item: BASE + path },
      ],
    });
    return bar;
  }

  // ---------------------------------------------------------------------
  // "Above the fold" CTA banner for pages whose hero has no button of its
  // own (only Startseite already has one built into its hero).
  // ---------------------------------------------------------------------
  function addCtaBanner() {
    addBefore(
      el(
        '<div class="bg-vellum-raised">' +
          '<div class="mx-auto w-full max-w-6xl px-6 md:px-10 py-4 flex flex-wrap items-center justify-center gap-4 text-center">' +
          '<p class="text-sm font-medium text-ink">Bereit für Ihre neue Website?</p>' +
          '<a href="/kontakt/" class="inline-flex items-center rounded-full bg-ink px-5 py-2 text-sm font-medium text-vellum transition-colors hover:bg-steel-deep">Beratung anfragen</a>' +
          "</div></div>"
      )
    );
  }

  // ---------------------------------------------------------------------
  // Related-links row (internal linking between contextually close pages)
  // ---------------------------------------------------------------------
  function addRelatedLinks(items) {
    var links = items
      .map(function (i) {
        return (
          '<a href="' +
          i.href +
          '" class="text-sm font-medium text-steel-deep hover:text-ink underline underline-offset-4">' +
          i.label +
          "</a>"
        );
      })
      .join('<span class="text-ink-soft">·</span>');
    addAfter(
      el(
        '<div style="border-top:1px solid rgba(29,29,31,.1)">' +
          '<div class="mx-auto w-full max-w-6xl px-6 md:px-10 flex flex-wrap items-center justify-center gap-4 text-center" style="padding-top:40px;padding-bottom:40px">' +
          links +
          "</div></div>"
      )
    );
  }

  // ---------------------------------------------------------------------
  // Sticky mobile contact button
  // ---------------------------------------------------------------------
  function addStickyMobileCta() {
    var style = document.createElement("style");
    style.textContent =
      "#luma-sticky-cta{display:none}" +
      "@media (max-width:640px){#luma-sticky-cta{display:flex}}";
    document.head.appendChild(style);
    var bar = el(
      // bottom:76px (not 16px) keeps this clear of the small persistent
      // cookie-settings toggle consent.js shows in the same bottom-left
      // corner once a consent choice has been made.
      '<div id="luma-sticky-cta" style="position:fixed;left:16px;right:16px;bottom:76px;z-index:9997;' +
        'justify-content:center;">' +
        '<a href="/kontakt/" class="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-vellum shadow-lg transition-colors hover:bg-steel-deep">Kontakt aufnehmen</a>' +
        "</div>"
    );
    document.body.appendChild(bar);
  }

  // ---------------------------------------------------------------------
  // Placeholder sections (real content follows later)
  // ---------------------------------------------------------------------
  function placeholderCard(title, body) {
    return (
      '<div class="rounded-xl bg-vellum-raised p-6 text-center" style="border:1px dashed rgba(29,29,31,.25)">' +
      '<div class="mx-auto mb-4 flex h-14 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-wide text-ink-soft" style="width:56px;background:rgba(29,29,31,.05)">Bild</div>' +
      '<p class="font-display text-base font-bold text-ink">' +
      title +
      "</p>" +
      '<p class="mt-2 text-sm italic text-ink-soft">' +
      body +
      "</p>" +
      "</div>"
    );
  }

  function addTestimonialsPlaceholder() {
    addAfter(
      el(
        '<section class="bg-vellum-raised">' +
          '<div class="mx-auto w-full max-w-6xl px-6 md:px-10 py-20 text-center">' +
          '<span class="text-sm font-semibold uppercase tracking-wide text-steel-deep">Kundenstimmen</span>' +
          '<h2 class="mx-auto mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-ink">Was unsere Kunden sagen</h2>' +
          '<div class="mt-10 grid gap-6 sm:grid-cols-3">' +
          placeholderCard("★★★★★", "Platzhalter – hier erscheint bald eine echte Kundenbewertung.") +
          placeholderCard("★★★★★", "Platzhalter – hier erscheint bald eine echte Kundenbewertung.") +
          placeholderCard("★★★★★", "Platzhalter – hier erscheint bald eine echte Kundenbewertung.") +
          "</div></div></section>"
      )
    );
  }

  function addKundenprojektePlaceholder() {
    addAfter(
      el(
        '<section class="bg-vellum-raised">' +
          '<div class="mx-auto w-full max-w-6xl px-6 md:px-10 py-20 text-center">' +
          '<span class="text-sm font-semibold uppercase tracking-wide text-steel-deep">Kundenprojekte</span>' +
          '<h2 class="mx-auto mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-ink">Ausgewählte Projekte</h2>' +
          '<div class="mt-10 grid gap-6 sm:grid-cols-3">' +
          placeholderCard("Projekt folgt", "Platzhalter für ein echtes Kundenprojekt inkl. Screenshot und Kurzbeschreibung.") +
          placeholderCard("Projekt folgt", "Platzhalter für ein echtes Kundenprojekt inkl. Screenshot und Kurzbeschreibung.") +
          placeholderCard("Projekt folgt", "Platzhalter für ein echtes Kundenprojekt inkl. Screenshot und Kurzbeschreibung.") +
          "</div></div></section>"
      )
    );
  }

  function addTeamPhotoPlaceholder() {
    addAfter(
      el(
        '<section class="bg-vellum">' +
          '<div class="mx-auto w-full max-w-6xl px-6 md:px-10 text-center" style="padding-bottom:80px">' +
          '<span class="text-sm font-semibold uppercase tracking-wide text-steel-deep">Das Team</span>' +
          '<h2 class="mx-auto mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-ink">Die Menschen hinter LuMa Digital</h2>' +
          '<div class="mx-auto mt-10 flex max-w-xl items-center justify-center rounded-xl bg-vellum-raised" style="aspect-ratio:16/9;border:1px dashed rgba(29,29,31,.25)">' +
          '<p class="text-sm italic text-ink-soft">Platzhalter – echtes Team-Foto folgt</p>' +
          "</div></div></section>"
      )
    );
  }

  // ---------------------------------------------------------------------
  // FAQ (Leistungen)
  // ---------------------------------------------------------------------
  var FAQS = [
    {
      q: "Wie lange dauert die Erstellung meiner Website?",
      a: "In der Regel 2 bis 4 Wochen von der ersten Beratung bis zum Launch, abhängig vom Umfang des Projekts.",
    },
    {
      q: "Was kostet eine Website bei LuMa Digital?",
      a: "Wir kalkulieren fair und transparent nach Projektumfang. Im kostenlosen Erstgespräch erhalten Sie ein individuelles Angebot ohne versteckte Kosten.",
    },
    {
      q: "Übernehmt ihr auch Wartung und Support nach dem Launch?",
      a: "Ja, wir bieten laufende Wartung, Updates und Hosting-Betreuung, damit Ihre Website dauerhaft aktuell und sicher bleibt.",
    },
    {
      q: "Kann ich meine Website später selbst bearbeiten?",
      a: "Ja, je nach gewähltem System richten wir Ihnen einen einfachen Zugang ein, mit dem Sie Texte und Bilder selbst aktualisieren können.",
    },
    {
      q: "Wie läuft die Zusammenarbeit ab?",
      a: "Sie haben einen festen Ansprechpartner für das gesamte Projekt, von der Beratung über Design und Umsetzung bis zum Launch und darüber hinaus.",
    },
  ];

  function addFaq() {
    var items = FAQS.map(function (f, i) {
      return (
        '<div class="py-4" style="border-bottom:1px solid rgba(29,29,31,.1)">' +
        '<button type="button" data-faq="' +
        i +
        '" class="flex w-full items-center justify-between gap-4" style="text-align:left">' +
        '<span class="font-medium text-ink">' +
        f.q +
        "</span>" +
        '<span data-faq-icon="' +
        i +
        '" class="shrink-0 text-steel-deep">+</span>' +
        "</button>" +
        '<p data-faq-answer="' +
        i +
        '" hidden class="mt-3 text-sm leading-relaxed text-ink-soft">' +
        f.a +
        "</p></div>"
      );
    }).join("");

    var section = addAfter(
      el(
        '<section class="bg-vellum">' +
          '<div class="mx-auto w-full max-w-3xl px-6 md:px-10 py-20">' +
          '<div class="text-center"><span class="text-sm font-semibold uppercase tracking-wide text-steel-deep">FAQ</span>' +
          '<h2 class="mx-auto mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-ink">Häufig gestellte Fragen</h2></div>' +
          '<div class="mt-10">' +
          items +
          "</div></div></section>"
      )
    );

    section.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-faq]");
      if (!btn) return;
      var i = btn.getAttribute("data-faq");
      var answer = section.querySelector('[data-faq-answer="' + i + '"]');
      var icon = section.querySelector('[data-faq-icon="' + i + '"]');
      var isHidden = answer.hidden;
      answer.hidden = !isHidden;
      icon.textContent = isHidden ? "−" : "+";
    });

    addJsonLd({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map(function (f) {
        return {
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        };
      }),
    });
  }

  // ---------------------------------------------------------------------
  // Kontakt: response-time badge + map/directions + redirect to /danke/
  // ---------------------------------------------------------------------
  function addResponseTimeBadge() {
    addBefore(
      el(
        '<div class="mx-auto w-full max-w-6xl px-6 md:px-10" style="padding-top:24px">' +
          '<div class="mx-auto flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-steel-deep" style="background:rgba(75,122,158,.1)">' +
          "<span>⏱</span><span>Antwort in der Regel innerhalb von 24 Stunden</span>" +
          "</div></div>"
      )
    );
  }

  function addMapAndDirections() {
    var mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Steinweg 4, 38100 Braunschweig");
    addAfter(
      el(
        '<section class="bg-vellum-raised" style="border-top:1px solid rgba(29,29,31,.1)">' +
          '<div class="mx-auto w-full max-w-3xl px-6 md:px-10 py-16 text-center">' +
          '<span class="text-sm font-semibold uppercase tracking-wide text-steel-deep">Anfahrt</span>' +
          '<h2 class="mx-auto mt-4 font-display text-2xl font-bold tracking-tight text-ink">Steinweg 4, 38100 Braunschweig</h2>' +
          '<p class="mx-auto mt-4 max-w-lg text-sm italic text-ink-soft">Platzhalter – genaue Anfahrtshinweise (Parkmöglichkeiten, ÖPNV-Anbindung) bitte noch ergänzen.</p>' +
          '<a href="' +
          mapsUrl +
          '" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex items-center rounded-full bg-ink px-5 py-2 text-sm font-medium text-vellum transition-colors hover:bg-steel-deep">In Google Maps öffnen</a>' +
          "</div></section>"
      )
    );
  }

  function installContactRedirect() {
    var origFetch = window.fetch;
    if (!origFetch || window.__lumaFetchPatched) return;
    window.__lumaFetchPatched = true;
    window.fetch = function (input, init) {
      var url = typeof input === "string" ? input : (input && input.url) || "";
      var isContactSubmit =
        url.indexOf("contact.php") !== -1 && init && (init.method || "").toUpperCase() === "POST";
      var promise = origFetch.apply(this, arguments);
      if (isContactSubmit) {
        promise.then(function (res) {
          if (res && res.ok) {
            window.location.href = "/danke/";
          }
        });
      }
      return promise;
    };
  }

  // ---------------------------------------------------------------------
  // Datenschutz: add the Analytics/Cookie section the page doesn't have yet
  // ---------------------------------------------------------------------
  function addDatenschutzAnalyticsSection() {
    addAfter(
      el(
        '<section class="bg-vellum-raised">' +
          '<div class="mx-auto w-full max-w-3xl px-6 md:px-10 py-16 text-sm leading-relaxed text-ink">' +
          '<h2 class="font-display text-lg font-bold">Analyse- und Marketing-Cookies</h2>' +
          '<p class="mt-2">Mit Ihrer Einwilligung setzen wir Google Analytics (Google Ireland Ltd.) zur Reichweitenmessung und Meta Pixel (Meta Platforms Ireland Ltd.) zur Erfolgsmessung unserer Anzeigen ein. Beide werden erst aktiv, nachdem Sie im Cookie-Banner zugestimmt haben (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG). Sie können Ihre Auswahl jederzeit über den Button „Cookie-Einstellungen" am unteren Bildschirmrand ändern oder widerrufen.</p>' +
          "</div></section>"
      )
    );
  }

  // ---------------------------------------------------------------------
  // Per-page dispatch
  // ---------------------------------------------------------------------
  if (path !== "/kontakt/" && path !== "/danke/") {
    addStickyMobileCta();
  }

  switch (path) {
    case "/":
      addTestimonialsPlaceholder();
      break;
    case "/leistungen/":
      addBreadcrumbs();
      addCtaBanner();
      addFaq();
      addRelatedLinks([
        { href: "/referenzen/", label: "Referenzen ansehen" },
        { href: "/kontakt/", label: "Jetzt anfragen" },
      ]);
      break;
    case "/beispiele/":
      addBreadcrumbs();
      addCtaBanner();
      addRelatedLinks([
        { href: "/leistungen/", label: "Leistungen ansehen" },
        { href: "/referenzen/", label: "Referenzen ansehen" },
        { href: "/kontakt/", label: "Jetzt anfragen" },
      ]);
      break;
    case "/referenzen/":
      addBreadcrumbs();
      addCtaBanner();
      addKundenprojektePlaceholder();
      addRelatedLinks([
        { href: "/leistungen/", label: "Leistungen ansehen" },
        { href: "/kontakt/", label: "Jetzt anfragen" },
      ]);
      break;
    case "/ueber-uns/":
      addBreadcrumbs();
      addCtaBanner();
      addTeamPhotoPlaceholder();
      addRelatedLinks([
        { href: "/leistungen/", label: "Leistungen ansehen" },
        { href: "/kontakt/", label: "Jetzt anfragen" },
      ]);
      break;
    case "/kontakt/":
      addBreadcrumbs();
      addResponseTimeBadge();
      addMapAndDirections();
      installContactRedirect();
      break;
    case "/impressum/":
      addBreadcrumbs();
      break;
    case "/datenschutz/":
      addBreadcrumbs();
      addDatenschutzAnalyticsSection();
      break;
  }
})();
