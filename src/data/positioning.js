export const positioning = {
  tag: 'Product Positioning',
  title: '项目定位（深度理解版）',
  description:
    '这不是普通商城，而是 B2B 采购平台 + AI 采购助手 + 智能比价引擎。类似 1688 + 京东企业购 + AI 采购助手 + 价格比较网站的综合体。',
  quote:
    '系统最大的卖点不是商城，而是三个核心能力：AI 采购 · 商品标准化 · 智能比价',
  pillars: [
    {
      icon: '🌊',
      iconBg: 'var(--primary-light)',
      title: '公海商品池',
      text: '所有商家商品进入统一数据库，同一 SPU 下挂多个商家报价。与淘宝「一店一货」模式根本不同。',
      example: '钢板 → A ¥10 / B ¥9.8 / C ¥11',
    },
    {
      icon: '📐',
      iconBg: 'var(--ai-light)',
      title: '规格标准化',
      text: '1000kg、1吨、500kg×2 必须识别为同一规格，否则无法比价。需要 SPU/SKU 模型 + 单位换算中心 + 行业规则库。',
      example: '304不锈钢 = SUS304 = 06Cr19Ni10',
    },
    {
      icon: '🎙',
      iconBg: 'var(--accent-light)',
      title: 'AI 采购',
      text: '语音 / OCR / 图片 / 长文本 / 手工输入，AI 提取品类、数量、材料、型号、等级、交货期后触发公海搜索。',
      example: '调用大模型 + RAG，无需自训练 NLP',
    },
  ],
};
