import { el } from '../utils/dom.js';
import { Section } from '../components/Section.js';

/** @param {import('../data/architecture.js').architecture} data */
export function ArchitectureSection(data) {
  return Section({
    id: 'architecture',
    alt: true,
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [
      el('div', { className: 'arch-grid' },
        ...data.services.map((s) =>
          el('article', {
            className: `arch-card${s.highlight ? ' arch-card--highlight' : ''}`,
          },
            el('span', { className: 'arch-card__icon' }, s.icon),
            el('h3', { className: 'arch-card__name' }, s.name),
            el('p', { className: 'arch-card__desc' }, s.desc)
          )
        )
      ),
      el('div', { className: 'pipeline-group' },
        el('h4', { className: 'pipeline-group__title' }, 'AI 中心管线'),
        el('div', { className: 'pipeline' },
          ...data.aiPipeline.flatMap((step, i) =>
            i === 0
              ? [el('span', { className: 'pipeline__step pipeline__step--ai' }, step)]
              : [el('span', { className: 'pipeline__arrow' }, '↓'), el('span', { className: 'pipeline__step pipeline__step--ai' }, step)]
          )
        )
      ),
      el('div', { className: 'pipeline-group' },
        el('h4', { className: 'pipeline-group__title' }, '商品中心管线'),
        el('div', { className: 'pipeline' },
          ...data.productPipeline.flatMap((step, i) =>
            i === 0
              ? [el('span', { className: 'pipeline__step' }, step)]
              : [el('span', { className: 'pipeline__arrow' }, '↓'), el('span', { className: 'pipeline__step' }, step)]
          )
        )
      ),
    ],
  });
}
