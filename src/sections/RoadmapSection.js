import { el } from '../utils/dom.js';
import { Section } from '../components/Section.js';

/** @param {import('../data/roadmap.js').roadmap} data */
export function RoadmapSection(data) {
  return Section({
    id: 'roadmap',
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [
      el('div', { className: 'roadmap' },
        ...data.phases.map((phase) =>
          el('article', { className: 'roadmap-card' },
            el('div', { className: 'roadmap-card__phase' }, phase.phase),
            el('h3', { className: 'roadmap-card__title' }, phase.title),
            el('p', { className: 'roadmap-card__goal' }, phase.goal),
            el('ul', { className: 'roadmap-card__list' },
              ...phase.items.map((item) => el('li', {}, item))
            )
          )
        )
      ),
    ],
  });
}
