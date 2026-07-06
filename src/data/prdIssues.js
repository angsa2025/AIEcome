export const prdIssues = {
  tag: 'PRD Review',
  title: '原文档问题 & 改进建议',
  description: '按现有 PRD 直接开发，后期大概率不断返工。以下是需要补充的设计缺口。',
  issues: [
    {
      icon: '🤖',
      title: 'AI 描述过于笼统',
      problem: '未说明调用哪个大模型、Prompt 结构、输出 JSON Schema。',
      solution: '明确 ASR→LLM→结构化 JSON 链路；定义采购意图解析的标准输出格式。',
    },
    {
      icon: '🗄️',
      title: '公海商品模型缺失',
      problem: '无 SPU/SKU/品牌/型号/规格/材料/标准单位等数据库设计。',
      solution: '补充完整 ER 模型：SPU → SKU → 商家报价 → 公海索引。',
    },
    {
      icon: '⚖️',
      title: '比价算法过于简单',
      problem: '仅质量60% + 价格40%，推荐不够智能。',
      solution: '扩展为质量+价格+物流+库存+距离+信誉+历史成交+交货周期的多维评分。',
    },
    {
      icon: '🔄',
      title: 'AI 识别无闭环',
      problem: '识别错误后无反馈机制，无法持续优化。',
      solution: '人工修正 → 训练库 → Prompt 优化 → 知识库更新。',
    },
    {
      icon: '📚',
      title: '缺少行业知识库',
      problem: '钢材/化工/五金/电器等行业规格规则完全不同。',
      solution: '建立行业规则中心，按类目配置换算与匹配规则。',
    },
  ],
};
