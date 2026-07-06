import { Section } from '../components/Section.js';
import { Checklist } from '../components/Checklist.js';

/** @param {import('../data/acceptance.js').acceptance} data */
export function AcceptanceSection(data) {
  return Section({
    id: 'acceptance',
    alt: true,
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [Checklist({ items: data.items })],
  });
}
