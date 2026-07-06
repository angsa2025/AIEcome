import { el } from '../utils/dom.js';
import { Section } from '../components/Section.js';

/** @param {import('../data/prdIssues.js').prdIssues} data */
export function PrdIssuesSection(data) {
  return Section({
    id: 'prd-issues',
    alt: true,
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [
      el('div', { className: 'issue-grid' },
        ...data.issues.map((item) =>
          el('article', { className: 'issue-card' },
            el('div', { className: 'issue-card__icon' }, item.icon),
            el('h3', { className: 'issue-card__title' }, item.title),
            el('div', { className: 'issue-card__block issue-card__block--problem' },
              el('span', { className: 'issue-card__label' }, '问题'),
              item.problem
            ),
            el('div', { className: 'issue-card__block issue-card__block--solution' },
              el('span', { className: 'issue-card__label' }, '建议'),
              item.solution
            )
          )
        )
      ),
    ],
  });
}
