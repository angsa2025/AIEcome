export const prototype = {
  tag: 'High-Fidelity Prototype',
  title: '三端高保真交互原型与独立链接',
  description:
    '移动端、Web 端、后台端已拆成三个独立访问链接：首页保留总览预览，每个端也可以单独打开演示完整交互。',
  terminals: [
    {
      type: 'phone',
      channel: '移动端',
      title: '移动端 · 买家小程序采购',
      subtitle: '参考小程序交互适配 · AI 语音/OCR/文本采购 · 公海比价 · 跨商家结算',
      src: './prototype/buyer.html',
      href: './prototype/buyer.html',
      action: '打开移动端',
      badges: ['小程序适配', '语音采购', '公海比价', '订单售后'],
    },
    {
      type: 'browser',
      channel: 'Web端',
      title: 'Web端 · 商家供货工作台',
      subtitle: '入驻资质 · 商品上架 · 公海入池 · 订单履约 · 结算提现',
      src: './prototype/merchant.html',
      href: './prototype/merchant.html',
      action: '打开Web端',
      badges: ['资质审核', '商品上架', '订单履约', '资金结算'],
    },
    {
      type: 'browser',
      channel: '后台端',
      title: '后台端 · 平台总后台',
      subtitle: '商家审核 · 公海标准化 · 比价权重 · 多方分账 · 风控预警',
      src: './prototype/admin.html',
      href: './prototype/admin.html',
      action: '打开后台端',
      badges: ['商家审核', '标准化', '权重配置', '分账风控'],
    },
  ],
};
