import { el } from '../utils/dom.js';

/**
 * @param {{ categories: object[] }} props
 */
export function NfrGrid({ categories }) {
  return el('div', { className: 'nfr-grid' },
    ...categories.map(({ icon, title, items }) =>
      el('article', { className: 'nfr-card' },
        el('h3', { className: 'nfr-card__title' }, icon, ' ', title),
        el('ul', { className: 'nfr-list' },
          ...items.map((item) => el('li', {}, item))
        )
      )
    )
  );
}

/**
 * @param {{ items: string[], variant?: 'check'|'warn' }} props
 */
export function Checklist({ items, variant = 'check' }) {
  const icon = variant === 'warn' ? '!' : '✓';
  const iconClass = variant === 'warn' ? 'check-item__icon check-item__icon--warn' : 'check-item__icon';

  return el('div', { className: 'checklist', role: 'list' },
    ...items.map((text) =>
      el('div', { className: 'check-item', role: 'listitem' },
        el('span', { className: iconClass, 'aria-hidden': 'true' }, icon),
        text
      )
    )
  );
}
