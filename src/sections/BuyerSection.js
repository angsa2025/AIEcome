import { el } from '../utils/dom.js';
import { Section } from '../components/Section.js';
import { CardGrid } from '../components/Card.js';
import { TerminalPreview } from '../components/TerminalPreview.js';

/** @param {import('../data/buyer.js').buyer} data */
export function BuyerSection(data) {
  return Section({
    id: 'buyer',
    alt: true,
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [
      TerminalPreview({ voiceExample: data.voiceExample }),
      el('div', { style: { marginTop: '40px' } },
        CardGrid({ cards: data.cards, columns: 3 })
      ),
    ],
  });
}
