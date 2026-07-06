import { el } from '../utils/dom.js';

const MERCHANTS = [
  { id: 'a', name: '华强钢铁', price: 10.0, badge: 'A' },
  { id: 'b', name: '鑫源金属', price: 9.8, badge: 'B' },
  { id: 'c', name: '国标实业', price: 11.0, badge: 'C' },
];

/**
 * 公海商品池交互演示 — 多商家报价归集到同一 SPU
 */
export function SeaPoolDemo() {
  const pool = el('div', { className: 'demo-sea__pool' },
    el('div', { className: 'demo-sea__spu' },
      el('span', { className: 'demo-sea__spu-icon' }, '🌊'),
      el('div', {},
        el('div', { className: 'demo-sea__spu-name' }, '公海 SPU：Q235 钢板'),
        el('div', { className: 'demo-sea__spu-meta' }, '标准单位：吨 · 3 家商家报价')
      )
    ),
    el('div', { className: 'demo-sea__offers' })
  );

  const offersEl = pool.querySelector('.demo-sea__offers');
  const statusEl = el('p', { className: 'demo-hint' }, '点击商家卡片，查看归集到公海的过程');

  function renderOffers(activeId = null) {
    offersEl.replaceChildren(
      ...MERCHANTS.map((m) => {
        const isBest = m.price === Math.min(...MERCHANTS.map((x) => x.price));
        return el('button', {
          type: 'button',
          className: `demo-sea__offer${activeId === m.id ? ' is-active' : ''}${isBest ? ' is-best' : ''}`,
          onClick: () => {
            renderOffers(m.id);
            statusEl.textContent = `「${m.name}」的钢板报价 ¥${m.price}/吨 已归集至公海 SPU，参与统一比价`;
          },
        },
          el('span', { className: 'demo-sea__badge' }, m.badge),
          el('span', { className: 'demo-sea__merchant' }, m.name),
          el('span', { className: 'demo-sea__price' }, `¥${m.price}/吨`),
          isBest ? el('span', { className: 'demo-sea__tag' }, '最低价') : null
        );
      })
    );
  }

  renderOffers();

  return el('div', { className: 'demo-panel' },
    el('h4', { className: 'demo-panel__title' }, '🌊 公海商品池 — 多商家报价归集'),
    el('p', { className: 'demo-panel__desc' }, '与淘宝不同：所有商家商品进入统一公海，同一 SPU 下挂多个报价。'),
    pool,
    statusEl
  );
}
