import { el } from '../utils/dom.js';
import { Section } from '../components/Section.js';

/** @param {import('../data/userNeeds.js').userNeeds} data */
export function UserNeedsSection(data) {
  return Section({
    id: 'user-needs',
    alt: true,
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [
      el('div', { className: 'need-grid' },
        ...data.segments.map((segment) =>
          el('article', { className: 'need-card' },
            el('div', { className: 'need-card__head' },
              el('span', {
                className: 'need-card__icon',
                style: { background: segment.iconBg },
                'aria-hidden': 'true',
              }, segment.icon),
              el('h3', { className: 'need-card__role' }, segment.role)
            ),
            el('p', { className: 'need-card__label' }, '痛点'),
            el('p', { className: 'need-card__text' }, segment.pain),
            el('p', { className: 'need-card__label' }, '产品响应'),
            el('p', { className: 'need-card__text' }, segment.solution),
            el('ul', { className: 'need-card__proof' },
              ...segment.proof.map((item) => el('li', {}, item))
            )
          )
        )
      ),
      el('div', { className: 'must-grid' },
        ...data.mustHaves.map((item) =>
          el('article', { className: 'must-card' },
            el('h3', { className: 'must-card__title' }, item.title),
            el('p', { className: 'must-card__text' }, item.text)
          )
        )
      ),
    ],
  });
}
