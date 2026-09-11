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

  // Terminkalender: laedt erst nach ausdruecklicher Zustimmung (Zwei-Klick).
  // Vorher geht keine Anfrage an den Anbieter.
  var buchungsLaden = document.getElementById('booking-laden');
  var buchungsRahmen = document.getElementById('booking-frame');
  var buchungsHinweis = document.getElementById('booking-consent');

  if (buchungsLaden && buchungsRahmen && buchungsHinweis) {
    buchungsLaden.addEventListener('click', function () {
      var rahmen = document.createElement('iframe');
      rahmen.src =
        'https://calendly.com/w-brauer-bess-consulting/30min' +
        '?primary_color=1d7f95&text_color=12262c&hide_landing_page_details=1';
      rahmen.title = 'Terminkalender von Waldemar Brauer, BESS Consulting';
      rahmen.loading = 'lazy';
      rahmen.referrerPolicy = 'no-referrer-when-downgrade';
      buchungsHinweis.remove();
      buchungsRahmen.appendChild(rahmen);
    });
  }

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

    // Neigung entsteht aus zwei Quellen: Scrollposition und Mauszeiger.
    // Beide werden addiert, damit die Karte beim Aufrichten weiter reagiert.
    var scrollNeigungY = -7;
    var scrollNeigungX = 2.5;
    var mausNeigungY = 0;
    var mausNeigungX = 0;

    var neigungSetzen = function () {
      if (!dutyCard) return;
      dutyCard.style.setProperty('--tilt-y', (scrollNeigungY + mausNeigungY).toFixed(2) + 'deg');
      dutyCard.style.setProperty('--tilt-x', (scrollNeigungX + mausNeigungX).toFixed(2) + 'deg');
    };

    if (dutyCard && window.matchMedia('(hover: hover)').matches) {
      dutyCard.addEventListener('pointermove', function (e) {
        // Direkt rechnen statt über requestAnimationFrame: die Karte soll
        // auch dann reagieren, wenn der Frame-Takt aussetzt.
        var box = dutyCard.getBoundingClientRect();
        var relX = (e.clientX - box.left) / box.width - 0.5;
        var relY = (e.clientY - box.top) / box.height - 0.5;
        mausNeigungY = relX * 9;
        mausNeigungX = -relY * 6;
        neigungSetzen();
      });

      dutyCard.addEventListener('pointerleave', function () {
        mausNeigungY = 0;
        mausNeigungX = 0;
        neigungSetzen();
      });
    }

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
        scrollNeigungY = -7 + fortschritt * 7;
        scrollNeigungX = 2.5 - fortschritt * 2.5;
        neigungSetzen();
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
