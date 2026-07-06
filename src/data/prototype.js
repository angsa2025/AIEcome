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
      subtitle: '商品展示/选购/下单购买 · AI 采购比价 · 订单与售后流程',
      src: './prototype/buyer.html',
      href: './prototype/buyer.html',
      action: '打开移动端',
      badges: ['商品选购', '下单购买', '公海比价', '售后流程'],
    },
    {
      type: 'browser',
      channel: 'Web端',
      title: 'Web端 · 商家供货工作台',
      subtitle: '入驻资质 · 商品上架 · 订单履约 · 售后处理 · 结算提现',
      src: './prototype/merchant.html',
      href: './prototype/merchant.html',
      action: '打开Web端',
      badges: ['资质审核', '商品上架', '订单履约', '售后处理'],
    },
    {
      type: 'browser',
      channel: '后台端',
      title: '后台端 · 电商运营后台',
      subtitle: '自营商品上架 · 商品池品牌/类目/列表/详情 · 订单售后 · 营销设置',
      src: './prototype/admin.html',
      href: './prototype/admin.html',
      action: '打开后台端',
      badges: ['自营商品', '商品池管理', '订单售后', '营销设置'],
    },
  ],
};
