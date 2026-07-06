import { el } from '../utils/dom.js';
import { SeaPoolDemo } from './SeaPoolDemo.js';
import { SpecConverterDemo } from './SpecConverterDemo.js';
import { CompareEngineDemo } from './CompareEngineDemo.js';
import { AiProcurementDemo } from './AiProcurementDemo.js';

/** 交互演示区 — 聚合所有可操作的 Demo */
export function InteractiveDemoHub() {
  return el('div', { className: 'demo-hub' },
    el('div', { className: 'demo-hub__grid' },
      SeaPoolDemo(),
      SpecConverterDemo(),
    ),
    AiProcurementDemo(),
    CompareEngineDemo()
  );
}
