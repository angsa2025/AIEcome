import { el } from '../utils/dom.js';
import { Section } from '../components/Section.js';

function Frame({ terminal }) {
  const frameClass = terminal.type === 'phone' ? 'proto-phone' : 'proto-browser';
  const viewportClass = terminal.type === 'phone' ? 'proto-phone__screen' : 'proto-browser__screen';

  return el('article', { className: `prototype-terminal prototype-terminal--${terminal.type}` },
    el('div', { className: 'prototype-terminal__meta' },
      el('div', {},
        el('h3', {}, terminal.title),
        el('p', {}, terminal.subtitle)
      ),
      el('div', { className: 'prototype-terminal__badges' },
        ...terminal.badges.map((badge) => el('span', {}, badge))
      )
    ),
    el('div', { className: frameClass },
      terminal.type === 'browser'
        ? el('div', { className: 'proto-browser__bar' },
            el('i'), el('i'), el('i'),
            el('span', {}, terminal.title)
          )
        : null,
      el('iframe', {
        className: viewportClass,
        src: terminal.src,
        title: terminal.title,
        loading: 'lazy',
      })
    )
  );
}

/** @param {import('../data/prototype.js').prototype} data */
export function PrototypeSection(data) {
  return Section({
    id: 'prototype',
    alt: true,
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [
      el('div', { className: 'prototype-showcase' },
        Frame({ terminal: data.terminals[0] }),
        el('div', { className: 'prototype-showcase__stack' },
          ...data.terminals.slice(1).map((terminal) => Frame({ terminal }))
        )
      ),
    ],
  });
}
