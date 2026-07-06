import { Section } from '../components/Section.js';
import { FeatureGrid } from '../components/FeatureGrid.js';

/** @param {import('../data/admin.js').admin} data */
export function AdminSection(data) {
  return Section({
    id: 'admin',
    alt: true,
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [FeatureGrid({ features: data.features })],
  });
}
