import { el } from '../utils/dom.js';
import { Section } from '../components/Section.js';

/** @param {import('../data/datamodel.js').datamodel} data */
export function DataModelSection(data) {
  return Section({
    id: 'datamodel',
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [
      el('div', { className: 'entity-grid' },
        ...data.entities.map((e) =>
          el('article', { className: 'entity-card' },
            el('h3', { className: 'entity-card__name' }, e.name),
            el('p', { className: 'entity-card__desc' }, e.desc),
            el('div', { className: 'entity-card__fields' },
              ...e.fields.map((f) => el('code', { className: 'entity-field' }, f))
            )
          )
        )
      ),
      el('div', { className: 'relation-chain' },
        ...data.relations.flatMap((r, i) =>
          i === 0 ? [el('span', { className: 'relation-item' }, r)] : [
            el('span', { className: 'relation-arrow' }, '→'),
            el('span', { className: 'relation-item' }, r),
          ]
        )
      ),
    ],
  });
}
