import { el } from '../utils/dom.js';
import { Section } from '../components/Section.js';
import { NfrGrid, Checklist } from '../components/Checklist.js';

/** @param {import('../data/nfr.js').nfr} data */
export function NfrSection(data) {
  return Section({
    id: 'nfr',
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [
      NfrGrid({ categories: data.categories }),
      el('div', { style: { marginTop: '40px' } },
        el('h3', { className: 'section__subtitle' }, '核心业务约束（开发必须遵守）'),
        Checklist({ items: data.constraints, variant: 'warn' })
      ),
    ],
  });
}
