import { el } from '../utils/dom.js';

/**
 * @param {{ icon?: string, iconBg?: string, title: string, text?: string, items?: string[] }} card
 */
export function Card({ icon, iconBg, title, text, items }) {
  return el('article', { className: 'card' },
    icon ? el('div', { className: 'card__icon', style: { background: iconBg || 'var(--primary-light)' } }, icon) : null,
    el('h3', { className: 'card__title' }, title),
    text ? el('p', { className: 'card__text' }, text) : null,
    items?.length
      ? el('ul', { className: 'card__list' }, ...items.map((item) => el('li', {}, item)))
      : null
  );
}

/**
 * @param {{ cards: object[], columns?: 2|3 }} props
 */
export function CardGrid({ cards, columns = 3 }) {
  return el(
    'div',
    { className: `card-grid card-grid--${columns}` },
    ...cards.map((card) => Card(card))
  );
}
