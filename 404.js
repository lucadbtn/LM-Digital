(function () {
  "use strict";
  if (document.getElementById("luma-404")) return;

  // Best-effort only: Next's own metadata hydration can win the race and
  // reset this back to the layout default title on this generic export.
  document.title = "Seite nicht gefunden · LuMa Digital";
  var descTag = document.querySelector('meta[name="description"]');
  if (descTag) {
    descTag.setAttribute(
      "content",
      "Die gesuchte Seite wurde nicht gefunden. Zurück zur Startseite von LuMa Digital oder direkt Kontakt aufnehmen."
    );
  }

  var main = document.querySelector("main");
  var footer = document.querySelector("footer");
  if (!main) return;

  // Next's default not-found <main> content sits inside a Suspense boundary
  // that this static export's hydration payload tracks exactly. Adding or
  // replacing its children (even via innerHTML) desyncs that boundary and
  // throws a hydration error (React #418) that also breaks the rest of the
  // page's client-side JS. Hiding the whole node via a style mutation is
  // the one operation on it that's safe - so we hide <main> itself and
  // append our own content as a new sibling at the body level instead
  // (same safe pattern already used by consent.js's banner).
  main.style.display = "none";

  var wrap = document.createElement("div");
  wrap.id = "luma-404";
  wrap.style.order = "1";
  wrap.className = "mx-auto w-full max-w-6xl px-6 md:px-10 py-24 text-center";
  wrap.innerHTML =
    '<p class="font-display text-sm font-semibold uppercase tracking-[0.2em] text-steel">Fehler 404</p>' +
    '<h1 class="mt-4 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">Diese Seite gibt es nicht.</h1>' +
    '<p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">Die Seite, die Sie suchen, existiert nicht oder wurde verschoben. Gehen Sie zurück zur Startseite oder schreiben Sie uns direkt.</p>' +
    '<div class="mt-8 flex flex-wrap items-center justify-center gap-4">' +
    '<a href="/" class="inline-flex items-center rounded-full bg-ink px-5 py-2 text-sm font-medium text-vellum transition-colors hover:bg-steel-deep">Zur Startseite</a>' +
    '<a href="/kontakt/" class="text-sm font-medium text-ink-soft transition-colors hover:text-ink">Zum Kontakt</a>' +
    "</div>";

  // footer's order is bumped so our content (order 1) lands visually
  // between header (default order 0) and footer, where <main> used to be.
  if (footer) footer.style.order = "2";
  document.body.appendChild(wrap);
})();
