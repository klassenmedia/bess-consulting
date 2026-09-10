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
    faqToggle.addEventListener('click', function () {
      var willShow = faqRest.hasAttribute('hidden');
      if (willShow) faqRest.removeAttribute('hidden');
      else faqRest.setAttribute('hidden', '');
      faqToggle.setAttribute('aria-expanded', String(willShow));
      faqToggle.textContent = willShow ? 'Weitere Fragen ausblenden' : 'Weitere neun Fragen anzeigen';
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

  function clamp(raw, max) {
    var value = Number.parseFloat(String(raw).replace(',', '.'));
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

  // Scroll-Reveal, nur wenn der Nutzer Bewegung zulässt
  var wantsMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
