import { Section } from '../components/Section.js';
import { CardGrid } from '../components/Card.js';

/** @param {import('../data/merchant.js').merchant} data */
export function MerchantSection(data) {
  return Section({
    id: 'merchant',
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [CardGrid({ cards: data.cards, columns: 2 })],
  });
}
