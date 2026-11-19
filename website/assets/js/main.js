// Praxis Grosse — main.js (vanilla, keine Abhängigkeiten)
(function(){
  "use strict";

  /* Mobile Navigation */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var scrim = document.querySelector('.nav-scrim');

  function closeNav(){
    if(!nav) return;
    nav.classList.remove('is-open');
    scrim && scrim.classList.remove('is-open');
    toggle && toggle.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
  function openNav(){
    nav.classList.add('is-open');
    scrim && scrim.classList.add('is-open');
    toggle.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      nav.classList.contains('is-open') ? closeNav() : openNav();
    });
  }
  scrim && scrim.addEventListener('click', closeNav);
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeNav(); });

  /* Mobile dropdown accordion (Unser Angebot) */
  document.querySelectorAll('.has-dropdown > .dropdown-toggle').forEach(function(btn){
    btn.addEventListener('click', function(e){
      if(window.innerWidth > 920) return; // desktop uses :hover
      e.preventDefault();
      var parent = btn.closest('.has-dropdown');
      parent.classList.toggle('is-open');
    });
  });

  /* Close mobile nav when a real link is clicked */
  document.querySelectorAll('.nav a').forEach(function(a){
    a.addEventListener('click', closeNav);
  });

  /* Header shadow on scroll */
  var header = document.querySelector('.site-header');
  if(header){
    var onScroll = function(){
      header.style.boxShadow = window.scrollY > 4 ? '0 1px 0 rgba(36,31,28,.06)' : 'none';
    };
    document.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  /* Google Maps: load only after explicit click (keine Drittanbieter vor Einwilligung) */
  document.querySelectorAll('[data-map-consent]').forEach(function(wrap){
    var btn = wrap.querySelector('button');
    btn && btn.addEventListener('click', function(){
      var src = wrap.getAttribute('data-map-src');
      var frame = document.createElement('div');
      frame.className = 'map-frame';
      frame.innerHTML = '<iframe src="'+src+'" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Anfahrtskarte Praxis Grosse, Bahnhofstraße 4, 75228 Ispringen"></iframe>';
      wrap.replaceWith(frame);
    });
  });

  /* Simple client-side form check (Kontaktformular) — echter Versand erfordert serverseitige Anbindung, siehe HANDOVER.md */
  var form = document.querySelector('[data-contact-form]');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var note = form.querySelector('.form-status');
      note.hidden = false;
      note.textContent = 'Dieses Formular ist eine Vorlage ohne aktive Versandanbindung. Bitte rufen Sie uns bis zur Einrichtung direkt an: 07231 / 807 99.';
      note.focus();
    });
  }
})();
