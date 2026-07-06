import { el } from '../utils/dom.js';

const navGroups = [
  { label: '产品方案', ids: ['positioning', 'user-needs', 'overview', 'buyer'] },
  { label: '原型演示', ids: ['prototype', 'interactive'] },
  { label: '技术架构', ids: ['analysis', 'datamodel', 'architecture', 'engine', 'techstack'] },
  { label: '交付验收', ids: ['prd-issues', 'roadmap', 'acceptance'] },
];

function groupLinks(links) {
  const linkMap = new Map(links.map((link) => [link.id, link]));
  return navGroups.map((group) => ({
    ...group,
    links: group.ids.map((id) => linkMap.get(id)).filter(Boolean),
  }));
}

/**
 * @param {{ links: { id: string, label: string }[] }} props
 */
export function Nav({ links }) {
  const groups = groupLinks(links);
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
        ...groups.map((group) =>
          el('div', { className: 'nav__group' },
            el('button', {
              className: 'nav__group-trigger',
              type: 'button',
              'aria-haspopup': 'true',
            },
              el('span', {}, group.label),
              el('span', { className: 'nav__chevron', 'aria-hidden': 'true' }, '⌄')
            ),
            el('div', { className: 'nav__menu' },
              ...group.links.map(({ id, label }) =>
                el('a', { href: `#${id}`, className: 'nav__link' }, label)
              )
            )
          )
        )
      )
    )
  );

  return nav;
}
