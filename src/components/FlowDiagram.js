import { el } from '../utils/dom.js';

/**
 * @param {{ steps: { title: string, text: string }[] }} props
 */
export function FlowDiagram({ steps }) {
  return el('div', { className: 'flow' },
    ...steps.map((step, index) =>
      el('div', { className: 'flow-step' },
        el('div', { className: 'flow-step__num' }, String(index + 1)),
        el('div', { className: 'flow-step__content' },
          el('h4', { className: 'flow-step__title' }, step.title),
          el('p', { className: 'flow-step__text' }, step.text)
        )
      )
    )
  );
}
