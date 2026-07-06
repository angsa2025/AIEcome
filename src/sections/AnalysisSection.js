import { el } from '../utils/dom.js';
import { Section } from '../components/Section.js';

/** @param {import('../data/analysis.js').analysis} data */
export function AnalysisSection(data) {
  return Section({
    id: 'analysis',
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [
      el('div', { className: 'hard-grid' },
        ...data.hardest.map((item) =>
          el('article', { className: 'hard-card' },
            el('div', { className: 'hard-card__stars' },
              '★'.repeat(item.stars) + '☆'.repeat(5 - item.stars)
            ),
            el('h3', { className: 'hard-card__title' }, item.title),
            el('p', { className: 'hard-card__text' }, item.text),
            el('ul', { className: 'hard-card__needs' },
              ...item.needs.map((n) => el('li', {}, n))
            )
          )
        )
      ),
    ],
  });
}
