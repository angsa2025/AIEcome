import { el } from '../utils/dom.js';

/**
 * @param {{ features: { icon: string, text: string }[] }} props
 */
export function FeatureGrid({ features }) {
  return el('div', { className: 'feature-grid' },
    ...features.map(({ icon, text }) =>
      el('div', { className: 'feature-item', role: 'listitem' },
        el('span', { className: 'feature-item__icon', 'aria-hidden': 'true' }, icon),
        text
      )
    )
  );
}
