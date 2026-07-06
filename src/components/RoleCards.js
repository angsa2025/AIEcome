import { el } from '../utils/dom.js';

/**
 * @param {{ emoji: string, title: string, text: string }[]} roles
 */
export function RoleCards(roles) {
  return el('div', { className: 'roles' },
    ...roles.map(({ emoji, title, text }) =>
      el('article', { className: 'role-card' },
        el('div', { className: 'role-card__emoji' }, emoji),
        el('h3', { className: 'role-card__title' }, title),
        el('p', { className: 'role-card__text' }, text)
      )
    )
  );
}
