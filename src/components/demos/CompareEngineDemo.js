import { el } from '../../utils/dom.js';
import { compareProducts, defaultWeights } from '../../data/compareProducts.js';

const WEIGHT_LABELS = {
  quality: '质量',
  price: '价格',
  logistics: '物流',
  stock: '库存',
  distance: '距离',
  reputation: '信誉',
  history: '历史成交',
  leadTime: '交货周期',
};

function norm(val, min, max, invert = false) {
  if (max === min) return 50;
  let score = ((val - min) / (max - min)) * 100;
  if (invert) score = 100 - score;
  return score;
}

function calcScore(product, weights, all) {
  const prices = all.map((p) => p.unitPrice + p.freight / 1000);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);

  const priceScore = norm(product.unitPrice + product.freight / 1000, minP, maxP, true);
  const logisticsScore = product.freight === 0 ? 100 : norm(product.freight, 0, 120, true);
  const stockScore = norm(product.stock, 500, 200000);
  const distScore = norm(product.distance, 80, 800, true);
  const leadScore = norm(product.leadDays, 3, 14, true);

  const total =
    (product.quality * weights.quality +
      priceScore * weights.price +
      logisticsScore * weights.logistics +
      stockScore * weights.stock +
      distScore * weights.distance +
      product.reputation * weights.reputation +
      norm(product.historyDeals, 45, 5600) * weights.history +
      leadScore * weights.leadTime) /
    100;

  return { total: Math.round(total * 10) / 10, priceScore: Math.round(priceScore) };
}

/**
 * 多维比价引擎交互演示 — 可调权重实时排序
 */
export function CompareEngineDemo() {
  const weights = { ...defaultWeights };
  const listEl = el('div', { className: 'demo-compare__list' });
  const slidersEl = el('div', { className: 'demo-compare__weights' });

  function render() {
    const scored = compareProducts
      .map((p) => ({ ...p, score: calcScore(p, weights, compareProducts) }))
      .sort((a, b) => b.score.total - a.score.total);

    listEl.replaceChildren(
      ...scored.map((p, i) =>
        el('div', { className: `demo-compare__row${i === 0 ? ' is-top' : ''}` },
          el('span', { className: 'demo-compare__rank' }, i === 0 ? '🏆' : String(i + 1)),
          el('div', { className: 'demo-compare__info' },
            el('div', { className: 'demo-compare__name' }, p.merchant),
            el('div', { className: 'demo-compare__spec' }, p.spec)
          ),
          el('span', { className: 'demo-compare__price' }, `¥${p.unitPrice}/个`),
          el('span', { className: 'demo-compare__score' }, `${p.score.total}分`)
        )
      )
    );
  }

  slidersEl.replaceChildren(
    ...Object.entries(WEIGHT_LABELS).map(([key, label]) => {
      const wrap = el('label', { className: 'demo-slider' },
        el('span', { className: 'demo-slider__label' }, label),
        el('input', {
          type: 'range',
          min: '0',
          max: '40',
          value: String(weights[key]),
          className: 'demo-slider__input',
        }),
        el('span', { className: 'demo-slider__val' }, `${weights[key]}%`)
      );
      const input = wrap.querySelector('input');
      const valEl = wrap.querySelector('.demo-slider__val');
      input.addEventListener('input', () => {
        weights[key] = Number(input.value);
        valEl.textContent = `${weights[key]}%`;
        render();
      });
      return wrap;
    })
  );

  render();

  return el('div', { className: 'demo-panel demo-panel--wide' },
    el('h4', { className: 'demo-panel__title' }, '⚖️ 智能比价引擎 — 多维权重排序'),
    el('p', { className: 'demo-panel__desc' },
      '拖动滑块调整权重，实时查看 4 家商家报价的综合排序变化。改进版算法：质量+价格+物流+库存+距离+信誉+成交+交期。'
    ),
    el('div', { className: 'demo-compare__layout' },
      slidersEl,
      listEl
    )
  );
}
