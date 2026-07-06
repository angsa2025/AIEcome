/**
 * Scroll-spy: highlights active nav link based on visible section.
 * @param {HTMLElement} nav
 * @param {string} linkSelector
 */
export function initScrollSpy(nav, linkSelector = '.nav__link') {
  const links = [...nav.querySelectorAll(linkSelector)];
  const sections = links
    .map((link) => {
      const id = link.getAttribute('href')?.slice(1);
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const id = visible.target.id;
      links.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    },
    { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.25, 0.5] }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Nav shadow on scroll.
 * @param {HTMLElement} nav
 */
export function initNavScroll(nav) {
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * Back-to-top FAB visibility.
 * @param {HTMLElement} button
 */
export function initBackToTop(button) {
  const onScroll = () => button.classList.toggle('is-visible', window.scrollY > 480);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Fade-in on scroll for `.reveal` elements.
 */
export function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((item) => observer.observe(item));
}
