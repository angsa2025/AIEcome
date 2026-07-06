# AIEcome

多商家公海智能比价电商平台 — 产品需求文档在线展示。

## 在线访问

**GitHub Pages**: [https://angsa2025.github.io/AIEcome/](https://angsa2025.github.io/AIEcome/)

## 项目定位

多商家入驻 B2B/B2C 通用电商平台，全商品进入公海统一池管理。买家 AI 语音输入采购需求，系统自动公海规格换算、多商家比价，按「质量最优 + 价格最低」综合排序展示商品。

## 工程结构

```
项目/电商平台/
├── index.html              # 页面入口
├── assets/css/             # 样式系统（tokens / base / components）
├── src/
│   ├── main.js             # 应用启动
│   ├── app.js              # 页面组装与交互初始化
│   ├── data/               # 需求数据层（内容与 UI 分离）
│   ├── components/         # 可复用 UI 组件
│   ├── sections/           # 页面区块组合
│   └── utils/              # DOM / 滚动 / 导航工具
└── 电商平台.docx           # 原始需求文档
```

## 设计原则

- **组件化**：每个 UI 模块独立文件，数据与视图分离
- **模块化**：`data` → `components` → `sections` → `app` 分层清晰
- **零构建**：原生 ES Modules，GitHub Pages 直接部署
- **体验优先**：滚动高亮、移动端菜单、回到顶部、入场动画

## 本地预览

```bash
# 任意静态服务器，例如：
npx serve .
# 或直接用浏览器打开 index.html（部分浏览器需本地服务器以支持 ES Module）
```

## License

Internal use only.
