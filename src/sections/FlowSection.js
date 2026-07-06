import { Section } from '../components/Section.js';
import { FlowDiagram } from '../components/FlowDiagram.js';

/** @param {import('../data/flow.js').flow} data */
export function FlowSection(data) {
  return Section({
    id: 'flow',
    tag: data.tag,
    title: data.title,
    description: data.description,
    children: [FlowDiagram({ steps: data.steps })],
  });
}
