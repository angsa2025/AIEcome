import { el } from '../../utils/dom.js';

const SAMPLES = [
  '我要螺栓，材质 42CrMo，国标一级，交货 7 天内，1000个',
  '304不锈钢板 2mm厚 500公斤 要检测报告',
  'M8×30 六角螺栓 SUS304 包邮 可开票',
];

const EXTRACT_RULES = [
  { re: /螺栓|螺丝|螺钉/, category: '螺栓' },
  { re: /42CrMo/i, material: '42CrMo' },
  { re: /304|SUS304|不锈钢/, material: '304/SUS304' },
  { re: /M(\d+)[×xX*](\d+)/, spec: (m) => `M${m[1]}×${m[2]}` },
  { re: /M(\d+)\s*(\d+)\s*mm/, spec: (m) => `M${m[1]}×${m[2]}mm` },
  { re: /(\d+)\s*个/, quantity: (m) => `${m[1]} 个` },
  { re: /(\d+)\s*公斤|(\d+)\s*kg/i, quantity: (m) => `${m[1] || m[2]} 公斤` },
  { re: /国标一级|一级品/, quality: '国标一级' },
  { re: /(\d+)\s*天/, lead: (m) => `${m[1]} 天` },
  { re: /包邮/, filter: '包邮' },
  { re: /开票|可开票/, filter: '可开票' },
  { re: /检测报告|质检/, filter: '需检测报告' },
];

function parseIntent(text) {
  const result = { category: null, material: null, spec: null, quantity: null, quality: null, lead_days: null, filters: [] };
  for (const rule of EXTRACT_RULES) {
    const m = text.match(rule.re);
    if (!m) continue;
    if (rule.category) result.category = rule.category;
    if (rule.material) result.material = rule.material;
    if (rule.spec) result.spec = typeof rule.spec === 'function' ? rule.spec(m) : rule.spec;
    if (rule.quantity) result.quantity = typeof rule.quantity === 'function' ? rule.quantity(m) : rule.quantity;
    if (rule.quality) result.quality = rule.quality;
    if (rule.lead) result.lead_days = typeof rule.lead === 'function' ? rule.lead(m) : rule.lead;
    if (rule.filter && !result.filters.includes(rule.filter)) result.filters.push(rule.filter);
  }
  result.confidence = Object.values(result).filter((v) => v && (Array.isArray(v) ? v.length : true)).length / 7;
  return result;
}

/**
 * AI 采购意图解析交互演示
 */
export function AiProcurementDemo() {
  const input = el('textarea', {
    className: 'demo-ai__input',
    rows: '3',
    placeholder: '输入或选择示例采购需求…',
  }, SAMPLES[0]);

  const output = el('pre', { className: 'demo-ai__output' }, '{}');
  const status = el('p', { className: 'demo-hint' }, '模拟 LLM 结构化输出 — 实际接入 Qwen/DeepSeek/GPT');

  function runParse() {
    output.classList.add('is-loading');
    status.textContent = 'AI 解析中…';
    setTimeout(() => {
      const parsed = parseIntent(input.value);
      output.textContent = JSON.stringify(parsed, null, 2);
      output.classList.remove('is-loading');
      status.textContent = `解析完成 · 置信度 ${Math.round(parsed.confidence * 100)}% · 可人工修正后回流知识库`;
    }, 600);
  }

  const chips = el('div', { className: 'demo-ai__chips' },
    ...SAMPLES.map((s) =>
      el('button', {
        type: 'button',
        className: 'demo-chip',
        onClick: () => { input.value = s; runParse(); },
      }, s.slice(0, 20) + '…')
    )
  );

  const micBtn = el('button', {
    type: 'button',
    className: 'demo-ai__mic',
    'aria-label': '模拟语音输入',
    onClick: runParse,
  }, '🎙');

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) runParse();
  });

  runParse();

  return el('div', { className: 'demo-panel' },
    el('h4', { className: 'demo-panel__title' }, '🎙 AI 采购助手 — 意图解析'),
    el('p', { className: 'demo-panel__desc' }, '语音/OCR/长文本 → LLM 提取结构化采购参数 → 触发公海搜索。'),
    chips,
    el('div', { className: 'demo-ai__row' }, input, micBtn),
    el('button', { type: 'button', className: 'btn btn--primary demo-ai__btn', onClick: runParse }, '解析采购意图'),
    output,
    status
  );
}
