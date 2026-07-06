import { el } from '../utils/dom.js';

/**
 * @param {{ links: { id: string, label: string }[] }} props
 */
export function Nav({ links }) {
  const nav = el('nav', { className: 'nav', role: 'navigation', 'aria-label': '主导航' },
    el('div', { className: 'nav__inner' },
      el('a', { href: '#', className: 'nav__logo' },
        el('div', { className: 'nav__logo-icon' }, 'AI'),
        el('span', { className: 'nav__logo-text' }, 'AIEcome')
      ),
      el('button', {
        className: 'nav__toggle',
        type: 'button',
        'aria-label': '打开导航菜单',
        'aria-expanded': 'false',
      }, '☰'),
      el('div', { className: 'nav__links' },
        ...links.map(({ id, label }) =>
          el('a', { href: `#${id}`, className: 'nav__link' }, label)
        )
      )
    )
  );

  return nav;
}
