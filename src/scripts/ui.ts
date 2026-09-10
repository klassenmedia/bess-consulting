// Bedienelemente ohne Bewegungsanteil: Navigation und FAQ.
// Getrennt von motion.ts, damit sie auch bei prefers-reduced-motion laufen.

const menuButton = document.querySelector<HTMLButtonElement>('.menu-button');
const navlinks = document.getElementById('navlinks');

if (menuButton && navlinks) {
  menuButton.addEventListener('click', () => {
    const offen = navlinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(offen));
  });
  navlinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navlinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const faqToggle = document.getElementById('faq-toggle');
const faqRest = document.getElementById('faq-rest');

if (faqToggle && faqRest) {
  // Ausgangstext merken, damit die Anzahl im Markup gepflegt bleibt
  const beschriftungZu = faqToggle.textContent?.trim() ?? '';
  faqToggle.addEventListener('click', () => {
    const zeigen = faqRest.hasAttribute('hidden');
    if (zeigen) faqRest.removeAttribute('hidden');
    else faqRest.setAttribute('hidden', '');
    faqToggle.setAttribute('aria-expanded', String(zeigen));
    faqToggle.textContent = zeigen ? 'Weitere Fragen ausblenden' : beschriftungZu;
  });
}
