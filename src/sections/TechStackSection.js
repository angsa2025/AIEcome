import { el } from '../utils/dom.js';
import { Section } from '../components/Section.js';

/** @param {import('../data/techstack.js').techstack} data */
export function TechStackSection(data) {
  return Section({
    id: 'techstack',
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [
      el('table', { className: 'glossary-table' },
        el('thead',
          el('tr',
            el('th', { scope: 'col' }, '模块'),
            el('th', { scope: 'col' }, '推荐技术')
          )
        ),
        el('tbody',
          ...data.rows.map(([mod, tech]) =>
            el('tr', el('td', {}, mod), el('td', {}, tech))
          )
        )
      ),
      el('div', { className: 'json-schema-block', style: { marginTop: '32px' } },
        el('h4', { className: 'section__subtitle' }, data.aiOutput.description),
        el('pre', { className: 'demo-ai__output' },
          JSON.stringify(data.aiOutput.schema, null, 2)
        )
      ),
    ],
  });
}
