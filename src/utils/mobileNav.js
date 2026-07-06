/**
 * Mobile navigation drawer toggle.
 * @param {HTMLElement} nav
 */
export function initMobileNav(nav) {
  const toggle = nav.querySelector('.nav__toggle');
  const links = nav.querySelector('.nav__links');
  if (!toggle || !links) return;

  const close = () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  };

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '✕' : '☰';
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
