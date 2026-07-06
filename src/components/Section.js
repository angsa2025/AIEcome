import { el } from '../utils/dom.js';

/**
 * @param {{ tag?: string, title: string, description?: string, alt?: boolean, id?: string }} props
 */
export function SectionHeader({ tag, title, description, alt = false, id }) {
  return el(
    'div',
    { className: `section reveal${alt ? ' section--alt' : ''}`, id },
    el('div', { className: 'container' },
      tag ? el('span', { className: 'section__tag' }, tag) : null,
      el('h2', { className: 'section__title' }, title),
      description ? el('p', { className: 'section__desc' }, description) : null
    )
  );
}

/**
 * Wraps section content with standard layout.
 * @param {{ id: string, alt?: boolean, tag?: string, title: string, description?: string, children: HTMLElement[] }} props
 */
export function Section({ id, alt = false, tag, title, description, children }) {
  const section = el('section', {
    className: `section reveal${alt ? ' section--alt' : ''}`,
    id,
  });

  const inner = el('div', { className: 'container' },
    tag ? el('span', { className: 'section__tag' }, tag) : null,
    el('h2', { className: 'section__title' }, title),
    description ? el('p', { className: 'section__desc' }, description) : null,
    ...children
  );

  section.append(inner);
  return section;
}
