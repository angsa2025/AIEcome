import { el } from '../utils/dom.js';
import { Section } from '../components/Section.js';
import { CardGrid } from '../components/Card.js';

/** @param {import('../data/positioning.js').positioning} data */
export function PositioningSection(data) {
  return Section({
    id: 'positioning',
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [
      el('blockquote', { className: 'quote-block' }, data.quote),
      CardGrid({
        columns: 3,
        cards: data.pillars.map((p) => ({
          icon: p.icon,
          iconBg: p.iconBg,
          title: p.title,
          text: `${p.text} 示例：${p.example}`,
        })),
      }),
    ],
  });
}
