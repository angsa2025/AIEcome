export const prototype = {
  tag: 'High-Fidelity Prototype',
  title: '三端高保真交互原型',
  description:
    '所有核心端都直接渲染在当前首页：买家端可体验 AI 采购、比价和结算；商家端可上架、履约、提现；平台后台可审核、标准化、调权重和看分账。',
  terminals: [
    {
      type: 'phone',
      title: '买家小程序采购端',
      subtitle: '参考小程序交互适配 · AI 语音/OCR/文本采购 · 公海比价 · 跨商家结算',
      src: './prototype/buyer.html',
      badges: ['小程序适配', '语音采购', '公海比价', '订单售后'],
    },
    {
      type: 'browser',
      title: '商家供货端',
      subtitle: '入驻资质 · 商品上架 · 公海入池 · 订单履约 · 结算提现',
      src: './prototype/merchant.html',
      badges: ['资质审核', '商品上架', '订单履约', '资金结算'],
    },
    {
      type: 'browser',
      title: '平台总后台',
      subtitle: '商家审核 · 公海标准化 · 比价权重 · 多方分账 · 风控预警',
      src: './prototype/admin.html',
      badges: ['商家审核', '标准化', '权重配置', '分账风控'],
    },
  ],
};
