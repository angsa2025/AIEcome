export const architecture = {
  tag: 'Architecture',
  title: '推荐微服务架构',
  description: 'AI + 微服务架构，而非传统单体商城。适合 AI 平台 / 智能体背景的团队。',
  services: [
    { id: 'user', name: '用户中心', icon: '👤', desc: '买家/商家/管理员账号、权限、认证' },
    { id: 'merchant', name: '商家中心', icon: '🏭', desc: '入驻审核、店铺管理、资质档案' },
    { id: 'product', name: '商品中心', icon: '📦', desc: 'SPU/SKU/规格库/单位库/材料库/行业标准' },
    { id: 'sea', name: '公海中心', icon: '🌊', desc: '公海池归集、标准化换算、索引维护' },
    { id: 'ai', name: 'AI 中心', icon: '🧠', desc: 'ASR/OCR/LLM/Prompt/RAG/Embedding/向量搜索', highlight: true },
    { id: 'search', name: '搜索中心', icon: '🔍', desc: '全文检索 + 向量检索 + 比价排序' },
    { id: 'order', name: '订单中心', icon: '📋', desc: '下单、拆单、物流、售后' },
    { id: 'payment', name: '支付结算中心', icon: '💰', desc: '担保交易、多方分账、提现对账' },
  ],
  aiPipeline: ['ASR 语音', 'OCR 识别', 'LLM 解析', 'Prompt 模板', 'RAG 知识库', 'Embedding', '向量搜索'],
  productPipeline: ['SPU', 'SKU', '规格库', '单位库', '材料库', '行业标准'],
};
