import { el } from '../utils/dom.js';
import { Section } from '../components/Section.js';
import { CardGrid } from '../components/Card.js';
import { RoleCards } from '../components/RoleCards.js';

/** @param {import('../data/overview.js').overview} data */
export function OverviewSection(data) {
  return Section({
    id: 'overview',
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [
      CardGrid({ cards: data.cards, columns: 3 }),
      el('div', { style: { marginTop: '48px' } },
        el('h3', { className: 'section__subtitle' }, '系统三大角色'),
        RoleCards(data.roles)
      ),
    ],
  });
}
