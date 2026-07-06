import { el } from '../utils/dom.js';

/**
 * @param {{ formula: object }} props
 */
export function FormulaBox({ formula }) {
  return el('div', { className: 'formula-box' },
    el('h4', { className: 'formula-box__title' }, formula.title),
    el('div', { className: 'formula-box__formula' }, formula.expression),
    el('p', { className: 'formula-box__note' },
      ...formula.notes.flatMap((note, i) =>
        i === 0 ? [note] : [el('br'), note]
      )
    ),
    el('h4', { className: 'formula-box__title', style: { marginTop: '24px' } }, '质量评分体系（满分 100 分）'),
    el('div', { className: 'score-grid' },
      ...formula.scores.map(({ value, label }) =>
        el('div', { className: 'score-item' },
          el('div', { className: 'score-item__pct' }, String(value)),
          el('div', { className: 'score-item__label', html: label.replace('\n', '<br/>') })
        )
      )
    )
  );
}
