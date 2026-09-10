// Externe Datei statt Inline-Script: hält script-src 'self' ohne Hash-Pflege gültig.
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  // Mobile Navigation
  var menuButton = document.querySelector('.menu-button');
  var navlinks = document.getElementById('navlinks');
  if (menuButton && navlinks) {
    menuButton.addEventListener('click', function () {
      var open = navlinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    Array.prototype.forEach.call(navlinks.querySelectorAll('a'), function (link) {
      link.addEventListener('click', function () {
        navlinks.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ: restliche Fragen einblenden
  var faqToggle = document.getElementById('faq-toggle');
  var faqRest = document.getElementById('faq-rest');
  if (faqToggle && faqRest) {
    // Ausgangstext merken, damit die Anzahl im Markup gepflegt bleibt
    var faqLabelZu = faqToggle.textContent.trim();
    faqToggle.addEventListener('click', function () {
      var willShow = faqRest.hasAttribute('hidden');
      if (willShow) faqRest.removeAttribute('hidden');
      else faqRest.setAttribute('hidden', '');
      faqToggle.setAttribute('aria-expanded', String(willShow));
      faqToggle.textContent = willShow ? 'Weitere Fragen ausblenden' : faqLabelZu;
    });
  }

  // Größenordnungs-Rechner.
  // Eingaben werden geklemmt und ausschliesslich über textContent ausgegeben.
  var MAX_KWH = 500000000;
  var MAX_CT = 200;
  var MAX_PCT = 100;

  var euro = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });

  // Deutsche Schreibweise: Punkt trennt Tausender, Komma trennt Dezimalen.
  // Alles, was danach kein reiner Zahlwert ist, gilt als 0 statt teilweise geparst.
  function clamp(raw, max) {
    var text = String(raw).trim().replace(/\s/g, '');
    if (text === '') return 0;

    var hatKomma = text.indexOf(',') !== -1;
    // Punkte sind Tausendertrenner, sobald ein Komma die Dezimalen markiert,
    // oder wenn hinter dem letzten Punkt genau drei Ziffern stehen.
    if (hatKomma) text = text.replace(/\./g, '').replace(',', '.');
    else if (/^\d{1,3}(\.\d{3})+$/.test(text)) text = text.replace(/\./g, '');

    if (!/^\d*\.?\d*$/.test(text) || text === '.') return 0;

    var value = Number.parseFloat(text);
    if (!Number.isFinite(value) || value < 0) return 0;
    return Math.min(value, max);
  }

  var kwhInput = document.getElementById('calc-kwh');
  var priceInput = document.getElementById('calc-price');
  var shareInput = document.getElementById('calc-share');
  var outTotal = document.getElementById('out-total');
  var outSaving = document.getElementById('out-saving');

  function recalc() {
    if (!kwhInput || !priceInput || !shareInput || !outTotal || !outSaving) return;
    var kwh = clamp(kwhInput.value, MAX_KWH);
    var centPerKwh = clamp(priceInput.value, MAX_CT);
    var sharePercent = clamp(shareInput.value, MAX_PCT);

    var total = (kwh * centPerKwh) / 100;
    outTotal.textContent = euro.format(total);
    outSaving.textContent = euro.format((total * sharePercent) / 100);
  }

  [kwhInput, priceInput, shareInput].forEach(function (el) {
    if (el) el.addEventListener('input', recalc);
  });
  recalc();

  // Scroll-Reveal und Parallax, nur wenn der Nutzer Bewegung zulässt
  var wantsMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Tiefenebenen: mehrere Schichten wandern unterschiedlich schnell.
  // Schreibt nur CSS-Variablen für transform — kein Layout, kein Repaint.
  if (wantsMotion) {
    var hero = document.querySelector('.hero');
    var dutyCard = document.querySelector('.duty-card');
    var anchorBand = document.querySelector('.anchor-band');
    var anchorPhoto = document.querySelector('.anchor-photo');
    var laeuft = false;

    var parallax = function () {
      laeuft = false;
      var y = window.scrollY;

      if (hero && y < window.innerHeight * 1.5) {
        hero.style.setProperty('--parallax-slow', (y * 0.16).toFixed(1) + 'px');
        hero.style.setProperty('--parallax-grid', (y * -0.1).toFixed(1) + 'px');
      }

      if (dutyCard) {
        // Karte richtet sich beim Scrollen auf: aus der Neigung in die Frontalansicht
        var fortschritt = Math.min(1, Math.max(0, y / (window.innerHeight * 0.75)));
        dutyCard.style.setProperty('--tilt-y', (-7 + fortschritt * 7).toFixed(2) + 'deg');
        dutyCard.style.setProperty('--tilt-x', (2.5 - fortschritt * 2.5).toFixed(2) + 'deg');
        dutyCard.style.setProperty('--parallax-card', (y * -0.05).toFixed(1) + 'px');
      }

      if (anchorPhoto && anchorBand) {
        var box = anchorBand.getBoundingClientRect();
        if (box.bottom > 0 && box.top < window.innerHeight) {
          var mitte = (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight;
          anchorPhoto.style.setProperty('--parallax-photo', (mitte * -46).toFixed(1) + 'px');
        }
      }
    };

    window.addEventListener(
      'scroll',
      function () {
        if (laeuft) return;
        laeuft = true;
        window.requestAnimationFrame(parallax);
      },
      { passive: true },
    );
    parallax();
  }

  var revealables = document.querySelectorAll('.reveal');
  if (wantsMotion && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );
    Array.prototype.forEach.call(revealables, function (el) {
      observer.observe(el);
    });
  } else {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('is-in');
    });
  }
})();
