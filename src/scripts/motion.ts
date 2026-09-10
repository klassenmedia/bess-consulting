// Motion-System: Lenis für weiches Scrollen, GSAP für Scroll-Choreografie.
// Beide als npm-Paket gebündelt — die CSP bleibt bei script-src 'self'.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';
const magst = window.matchMedia('(prefers-reduced-motion: reduce)');

document.documentElement.classList.add('js');

/** Weiches Scrollen, von GSAPs Ticker angetrieben — eine Schleife, kein Ruckeln. */
function scrollAufsetzen(): void {
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((zeit) => lenis.raf(zeit * 1000));
  gsap.ticker.lagSmoothing(0);

  // Ankerlinks über Lenis führen, sonst springt die Seite hart
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const ziel = document.querySelector(link.getAttribute('href') ?? '');
      if (!ziel) return;
      e.preventDefault();
      lenis.scrollTo(ziel as HTMLElement, { offset: -80 });
    });
  });
}

/** Überschriften zeilenweise aus einer Maske schieben. */
function typografieEnthuellen(): void {
  document.querySelectorAll<HTMLElement>('[data-reveal-text]').forEach((el) => {
    const zeilen = el.querySelectorAll<HTMLElement>('.zeile-inner');
    if (!zeilen.length) return;
    gsap.from(zeilen, {
      yPercent: 115,
      duration: 1.1,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });
}

/** Blöcke gestaffelt einblenden, leicht von unten. */
function blockeEnthuellen(): void {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const kinder = el.hasAttribute('data-reveal-stagger')
      ? Array.from(el.children)
      : [el];
    gsap.from(kinder, {
      y: 34,
      autoAlpha: 0,
      duration: 0.9,
      ease: EASE,
      stagger: 0.07,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
}

/** Ebenen wandern unterschiedlich schnell — echte Tiefenstaffelung. */
function parallaxAufsetzen(): void {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const tempo = Number.parseFloat(el.dataset.parallax ?? '0.2');
    gsap.to(el, {
      yPercent: tempo * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('[data-parallax-bereich]') ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

/** Neigung folgt dem Cursor, mit Trägheit. */
function neigungAufsetzen(): void {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const staerke = Number.parseFloat(el.dataset.tilt ?? '7');
    const setX = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: 'power3' });
    const setY = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: 'power3' });

    el.addEventListener('pointermove', (e) => {
      const box = el.getBoundingClientRect();
      const relX = (e.clientX - box.left) / box.width - 0.5;
      const relY = (e.clientY - box.top) / box.height - 0.5;
      setX(relX * staerke * 2);
      setY(-relY * staerke * 2);
    });
    el.addEventListener('pointerleave', () => {
      setX(0);
      setY(0);
    });
  });
}

/** Buttons ziehen den Cursor an. */
function magnetAufsetzen(): void {
  document.querySelectorAll<HTMLElement>('[data-magnet]').forEach((el) => {
    const inner = el.querySelector<HTMLElement>('.magnet-inner') ?? el;
    const setX = gsap.quickTo(inner, 'x', { duration: 0.5, ease: 'power3' });
    const setY = gsap.quickTo(inner, 'y', { duration: 0.5, ease: 'power3' });

    el.addEventListener('pointermove', (e) => {
      const box = el.getBoundingClientRect();
      setX((e.clientX - box.left - box.width / 2) * 0.32);
      setY((e.clientY - box.top - box.height / 2) * 0.32);
    });
    el.addEventListener('pointerleave', () => {
      setX(0);
      setY(0);
    });
  });
}

/** Zahlen zählen hoch, sobald sie in Sicht kommen. */
function zahlenZaehlen(): void {
  document.querySelectorAll<HTMLElement>('[data-zaehler]').forEach((el) => {
    const ziel = Number.parseFloat(el.dataset.zaehler ?? '0');
    const objekt = { wert: 0 };
    gsap.to(objekt, {
      wert: ziel,
      duration: 1.6,
      ease: EASE,
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => {
        el.textContent = Math.round(objekt.wert).toLocaleString('de-DE');
      },
    });
  });
}

function starten(): void {
  if (magst.matches) {
    // Ohne Bewegung: alles sofort sichtbar, keine Scroll-Übernahme
    gsap.set('[data-reveal], [data-reveal-text] .zeile-inner', { clearProps: 'all' });
    return;
  }
  scrollAufsetzen();
  typografieEnthuellen();
  blockeEnthuellen();
  parallaxAufsetzen();
  neigungAufsetzen();
  magnetAufsetzen();
  zahlenZaehlen();
  ScrollTrigger.refresh();
}

// Erst nach Schriftladung, sonst brechen die Zeilen falsch um
if (document.fonts?.ready) {
  document.fonts.ready.then(starten);
} else {
  starten();
}
