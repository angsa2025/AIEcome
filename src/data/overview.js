export const overview = {
  tag: 'Project Overview',
  title: '项目整体需求概述',
  description:
    '搭建三方分离式电商系统（买家端、商家入驻端、平台总管理后台），实现公海货源统一管理与 AI 驱动智能比价。',
  cards: [
    {
      icon: '🏪',
      iconBg: 'var(--primary-light)',
      title: '多商家入驻',
      text: '不限数量商家自主入驻、资质审核、商品上架，所有商品自动标准化录入公海公共货源池。',
    },
    {
      icon: '🎙',
      iconBg: 'var(--ai-light)',
      title: 'AI 语音采购',
      text: '买家可语音口述、手动输入、拍照/OCR/扫描/粘贴长文本，AI 自动解析品类、规格、数量、质量要求。',
    },
    {
      icon: '⚖️',
      iconBg: 'var(--accent-light)',
      title: '公海智能比价',
      text: '统一规格换算、全维度比价，按质量 60% + 价格 40% 综合排序，支持按质量/价格单独排序。',
    },
    {
      icon: '💰',
      iconBg: '#D1FAE5',
      title: '多方分账结算',
      text: '买家一次性付全款，系统根据明细自动拆解资金，分给 N 个供货商、平台或三方服务公司。',
    },
    {
      icon: '📦',
      iconBg: '#FEE2E2',
      title: '全流程电商',
      text: '完整配套下单、支付、订单、售后、商家结算、平台数据统计全流程电商能力。',
    },
    {
      icon: '🔒',
      iconBg: '#E0E7FF',
      title: '资金担保交易',
      text: '平台担保交易模式，资金分离不截留货款，支持微信/支付宝/对公转账。',
    },
  ],
  roles: [
    { emoji: '👨‍💼', title: '平台管理员', text: '审核商家、管理公海商品标准、配置比价权重、管控平台规则、资金对账' },
    { emoji: '🏭', title: '入驻商家', text: '店铺管理、商品上架/调价/库存、订单发货、售后处理、货款提现' },
    { emoji: '🛒', title: '采购买家', text: '语音搜索、公海比价选购、下单支付、收货评价、售后申请' },
  ],
};
