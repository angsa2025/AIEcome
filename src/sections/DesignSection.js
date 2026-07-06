import { Section } from '../components/Section.js';
import { ColorPalette } from '../components/ColorPalette.js';

/** @param {import('../data/design.js').design} data */
export function DesignSection(data) {
  return Section({
    id: 'design',
    alt: true,
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [ColorPalette({ colors: data.colors, principles: data.principles })],
  });
}
