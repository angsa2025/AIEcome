import { el } from '../utils/dom.js';

export function Footer() {
  return el('footer', { className: 'footer' },
    'AIEcome · 多商家公海智能比价电商平台 · 产品需求文档 · 2026',
    el('br'),
    el('a', { href: 'https://github.com/angsa2025/AIEcome', target: '_blank', rel: 'noopener' },
      'github.com/angsa2025/AIEcome'
    ),
    ' · 编制日期 2026-07-02'
  );
}

export function BackToTop() {
  return el('button', {
    className: 'back-to-top',
    type: 'button',
    'aria-label': '回到顶部',
    title: '回到顶部',
  }, '↑');
}
