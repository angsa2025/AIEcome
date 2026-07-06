import { Section } from '../components/Section.js';
import { GlossaryTable } from '../components/GlossaryTable.js';

/** @param {import('../data/glossary.js').glossary} data */
export function GlossarySection(data) {
  return Section({
    id: 'glossary',
    alt: true,
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [GlossaryTable({ rows: data.rows })],
  });
}
