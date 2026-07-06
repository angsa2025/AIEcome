import { el } from '../utils/dom.js';
import { Section } from '../components/Section.js';
import { InteractiveDemoHub } from '../components/demos/index.js';

export function InteractiveSection() {
  return Section({
    id: 'interactive',
    alt: true,
    tag: 'Interactive Demo',
    title: '核心能力交互演示',
    description: '亲手操作公海归集、规格换算、AI 解析、多维比价 — 理解系统真正难在哪里。',
    children: [InteractiveDemoHub()],
  });
}
