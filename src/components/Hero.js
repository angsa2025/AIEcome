import { el } from '../utils/dom.js';

/**
 * @param {import('../data/hero.js').hero} data
 */
export function Hero(data) {
  const { badge, title, description, actions, stats } = data;

  return el('header', { className: 'hero reveal' },
    el('div', { className: 'hero__badge' },
      badge.prefix,
      el('strong', {}, badge.highlight),
      badge.suffix
    ),
    el('h1', { className: 'hero__title' },
      title[0],
      el('br'),
      el('em', {}, title[1])
    ),
    el('p', { className: 'hero__desc' }, description),
    el('div', { className: 'hero__actions' },
      ...actions.map(({ label, href, variant }) =>
        el('a', {
          href,
          className: `btn btn--${variant}`,
        }, label)
      )
    ),
    el('div', { className: 'stats' },
      ...stats.map(({ value, label }) =>
        el('div', { className: 'stat' },
          el('div', { className: 'stat__num' }, value),
          el('div', { className: 'stat__label' }, label)
        )
      )
    )
  );
}
