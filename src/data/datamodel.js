export const datamodel = {
  tag: 'Data Model',
  title: '公海商品数据模型（建议补充）',
  description: '原文档缺失的核心数据结构 — 开发前必须设计清楚，否则后期一定返工。',
  entities: [
    {
      name: 'SPU',
      desc: '标准产品单元 — 公海池的基本索引单位',
      fields: ['spu_id', 'category_id', 'name', 'brand', 'material', 'standard_no', 'industry_code'],
    },
    {
      name: 'SKU',
      desc: '库存规格单元 — 具体可比的规格粒度',
      fields: ['sku_id', 'spu_id', 'spec_json', 'base_unit', 'base_price_ref'],
    },
    {
      name: 'MerchantOffer',
      desc: '商家报价 — 挂在 SKU 下的具体供给',
      fields: ['offer_id', 'sku_id', 'merchant_id', 'price', 'stock', 'moq', 'lead_days', 'freight'],
    },
    {
      name: 'UnitConversion',
      desc: '单位换算规则 — 行业级换算公式',
      fields: ['from_unit', 'to_unit', 'factor', 'industry_id', 'formula'],
    },
    {
      name: 'MaterialAlias',
      desc: '材料别名库 — 解决 304=SUS304 问题',
      fields: ['canonical_name', 'alias', 'standard_code', 'industry_id'],
    },
  ],
  relations: [
    'SPU 1──N SKU',
    'SKU 1──N MerchantOffer',
    'SPU N──1 Category',
    'SKU N──N UnitConversion',
    'SPU N──N MaterialAlias',
  ],
};
