# AIEcome

**B2B 采购平台 + AI 采购助手 + 智能比价引擎** — 产品需求文档与交互演示。

> 不是普通商城，而是 1688 + 京东企业购 + AI 采购助手 + 价格比较网站的综合体。

## 在线访问

**GitHub Pages**: [https://angsa2025.github.io/AIEcome/](https://angsa2025.github.io/AIEcome/)

## 三大核心竞争力

1. **公海商品池** — 所有商家商品归集到统一 SPU，多商家报价并行比价
2. **规格标准化** — SPU/SKU + 单位换算 + 行业规则库
3. **AI 采购** — 语音/OCR/长文本 → LLM 结构化解析 → 公海搜索

## 交互演示（可亲手操作）

| 演示 | 说明 |
|------|------|
| 公海商品池 | 多商家报价归集到同一 SPU |
| 规格换算 | kg/吨/包装规格统一转换 |
| AI 采购助手 | 自然语言 → 结构化 JSON |
| 多维比价引擎 | 8 维权重滑块实时排序 |

## 工程结构

```
src/
├── data/          # 需求数据 + 分析结论 + 演示数据
├── components/    # UI 组件 + demos/ 交互演示
├── sections/      # 页面区块
├── utils/         # 工具函数
└── app.js         # 组装入口
```

## 本地预览

```bash
npx serve .
```

## License

Internal use only.
