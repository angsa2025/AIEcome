import { el } from '../utils/dom.js';
import { CardGrid } from './Card.js';

/**
 * @param {{ colors: object[], principles: object[] }} props
 */
export function ColorPalette({ colors, principles }) {
  return el('div', {},
    el('div', { className: 'color-palette' },
      ...colors.map(({ name, hex, bg, border }) =>
        el('div', { className: 'color-swatch' },
          el('div', {
            className: 'color-swatch__block',
            style: {
              background: bg,
              borderBottom: border ? '1px solid var(--border)' : undefined,
            },
          }),
          el('div', { className: 'color-swatch__info' },
            el('div', { className: 'color-swatch__name' }, name),
            el('div', { className: 'color-swatch__hex' }, hex)
          )
        )
      )
    ),
    CardGrid({
      columns: 3,
      cards: principles.map(({ icon, title, text }) => ({
        icon,
        title,
        text,
      })),
    })
  );
}
