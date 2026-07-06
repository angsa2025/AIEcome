import { el } from '../../utils/dom.js';

const EXAMPLES = [
  { input: '1000 kg', output: '1 吨', factor: '÷ 1000' },
  { input: '1 吨', output: '1 吨', factor: '=' },
  { input: '500 公斤', output: '0.5 吨', factor: '÷ 1000' },
  { input: '2 × 500kg', output: '1 吨', factor: '2 × 0.5' },
  { input: '50个/箱 × 20箱', output: '1000 个', factor: '50 × 20' },
];

/**
 * 规格换算交互演示
 */
export function SpecConverterDemo() {
  const resultEl = el('div', { className: 'demo-convert__result' },
    el('span', { className: 'demo-convert__label' }, '标准单位'),
    el('span', { className: 'demo-convert__value' }, '—')
  );

  const list = el('div', { className: 'demo-convert__list' },
    ...EXAMPLES.map((ex) =>
      el('button', {
        type: 'button',
        className: 'demo-convert__item',
        onClick: () => {
          list.querySelectorAll('.demo-convert__item').forEach((b) => b.classList.remove('is-active'));
          ex.el?.classList.add('is-active');
          resultEl.querySelector('.demo-convert__value').textContent = ex.output;
          resultEl.querySelector('.demo-convert__label').textContent = `换算：${ex.input} → ${ex.factor}`;
        },
      },
        el('span', {}, ex.input),
        el('span', { className: 'demo-convert__arrow' }, '→'),
        el('strong', {}, ex.output)
      )
    )
  );

  EXAMPLES.forEach((ex, i) => { ex.el = list.children[i]; });

  return el('div', { className: 'demo-panel' },
    el('h4', { className: 'demo-panel__title' }, '📐 规格标准化 — 单位换算'),
    el('p', { className: 'demo-panel__desc' }, '不同包装规格必须转换为统一标准单位，否则无法比价。'),
    list,
    resultEl
  );
}
