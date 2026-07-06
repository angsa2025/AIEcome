import { el } from '../utils/dom.js';

/**
 * @param {{ rows: [string, string][] }} props
 */
export function GlossaryTable({ rows }) {
  return el('table', { className: 'glossary-table' },
    el('thead',
      el('tr',
        el('th', { scope: 'col' }, '名词'),
        el('th', { scope: 'col' }, '定义')
      )
    ),
    el('tbody',
      ...rows.map(([term, definition]) =>
        el('tr',
          el('td', {}, term),
          el('td', {}, definition)
        )
      )
    )
  );
}
