import { Section } from '../components/Section.js';
import { CardGrid } from '../components/Card.js';
import { FormulaBox } from '../components/FormulaBox.js';

/** @param {import('../data/engine.js').engine} data */
export function EngineSection(data) {
  return Section({
    id: 'engine',
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [
      FormulaBox({ formula: data.formula }),
      CardGrid({ cards: data.cards, columns: 2 }),
    ],
  });
}
