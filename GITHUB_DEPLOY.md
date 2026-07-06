# AIEcome · GitHub 部署与 GitHub Pages 指南

本文档记录如何将本项目部署到 GitHub，并通过 **GitHub Pages** 发布为可公开访问的静态网站。

---

## 目录

1. [部署概览](#部署概览)
2. [前置条件](#前置条件)
3. [GitHub Token 配置（angsa2025）](#github-token-配置angsa2025)
4. [创建 GitHub 仓库](#创建-github-仓库)
5. [本地 Git 初始化与推送](#本地-git-初始化与推送)
6. [仓库可见性：必须公开](#仓库可见性必须公开)
7. [启用 GitHub Pages](#启用-github-pages)
8. [项目侧配置说明](#项目侧配置说明)
9. [访问地址与 URL 规则](#访问地址与-url-规则)
10. [日常更新与重新部署](#日常更新与重新部署)
11. [本地预览](#本地预览)
12. [常见问题排查](#常见问题排查)
13. [安全注意事项](#安全注意事项)

---

## 部署概览

| 项目 | 说明 |
|------|------|
| 仓库地址 | https://github.com/angsa2025/AIEcome |
| 在线站点 | https://angsa2025.github.io/AIEcome/ |
| 部署方式 | GitHub Pages（Deploy from a branch） |
| 源分支 | `main` |
| 发布目录 | `/`（仓库根目录） |
| 站点类型 | 纯静态站点（HTML + ES Module，无需构建） |

**部署流程总览：**

```
本地代码 → git push 到 main → GitHub Pages 自动构建 → 公网可访问
```

GitHub Pages 会在每次推送到 `main` 分支后自动重新发布，一般 **1～3 分钟** 内生效。

---

## 前置条件

开始之前，请确认已具备：

- [ ] **GitHub 账号**（本项目使用 `angsa2025`）
- [ ] 本机已安装 **Git**
- [ ] 本机已配置 GitHub 认证（HTTPS Token 或 SSH Key）
- [ ] Node.js（可选，仅用于本地 `npx serve` 预览）

### 认证方式说明

推送代码时需要 GitHub 凭据。推荐使用 **Personal Access Token (PAT)**：

1. 打开 https://github.com/settings/tokens
2. 生成 Token，勾选 `repo` 权限
3. 推送时用户名填 GitHub 用户名，密码填 Token

> **注意：** 请使用**仓库所有者账号**（`angsa2025`）的凭据推送。若本机缓存了其他账号（如 `cryangle0`），会导致推送失败或在网页上看到错误内容。

检查当前 remote 是否指向正确账号：

```bash
git remote -v
# 期望输出：
# origin  https://angsa2025@github.com/angsa2025/AIEcome.git (fetch)
# origin  https://angsa2025@github.com/angsa2025/AIEcome.git (push)
```

若账号不对，可修正：

```bash
git remote set-url origin https://angsa2025@github.com/angsa2025/AIEcome.git
```

---

## GitHub Token 配置（angsa2025）

本项目推送与部署使用账号 **`angsa2025`**，认证方式为 **Personal Access Token (Classic)**。

### 账号信息

| 项目 | 值 |
|------|-----|
| GitHub 用户名 | `angsa2025` |
| 仓库 | `angsa2025/AIEcome` |
| Token 类型 | Personal Access Token (Classic) |
| 所需权限 | `repo`（完整仓库读写） |
| Token 管理页 | https://github.com/settings/tokens |

### Token 存放位置（请勿写入本文档或提交到 Git）

> **重要：** Token 属于敏感凭据，**绝对不能**写入 `GITHUB_DEPLOY.md`、`README.md` 或任何会推送到公开仓库的文件。  
> 本文档仅记录配置方法；Token 请保存在本机凭据管理器或私有 `.env` 文件中。

推荐存放方式（任选其一）：

**方式 A：Windows 凭据管理器（推荐）**

推送时 Git 会弹出登录框，或自动读取已保存凭据：

- 用户名：`angsa2025`
- 密码：粘贴你的 Token（不是 GitHub 登录密码）

手动添加凭据：

1. 控制面板 → **凭据管理器** → **Windows 凭据**
2. 添加普通凭据：
   - 互联网地址：`git:https://github.com`
   - 用户名：`angsa2025`
   - 密码：`<你的 Token>`

**方式 B：带 Token 的 Remote URL（仅本机使用，勿提交）**

```bash
# 将 <YOUR_TOKEN> 替换为实际 Token，仅在本地执行，不要写入文档或 commit
git remote set-url origin https://angsa2025:<YOUR_TOKEN>@github.com/angsa2025/AIEcome.git
```

**方式 C：环境变量（脚本/CI 使用）**

```bash
# PowerShell 临时设置（当前会话有效）
$env:GITHUB_TOKEN = "<YOUR_TOKEN>"

# 配合 curl 调用 GitHub API 示例
curl -H "Authorization: Bearer $env:GITHUB_TOKEN" https://api.github.com/user
```

### 推送时如何使用 Token

```bash
cd 项目/电商平台

# remote 已配置为 angsa2025@github.com 时，直接推送
git push origin main

# 若提示输入凭据：
#   Username: angsa2025
#   Password: <粘贴 Token，不是登录密码>
```

### 验证 Token 是否有效

```bash
# PowerShell：从凭据管理器读取并测试（勿将 Token 打印到日志）
$cred = "protocol=https`nhost=github.com`n`n" | git credential fill 2>$null
$token = ($cred | Where-Object { $_ -like 'password=*' }) -replace 'password=',''
$headers = @{ Authorization = "Bearer $token"; Accept = "application/vnd.github+json" }
Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers | Select-Object login
# 期望输出 login 为 angsa2025
```

### Token 泄露后的处理

若 Token 曾在聊天、截图、公开文档中暴露，请**立即**：

1. 打开 https://github.com/settings/tokens
2. 找到对应 Token → **Delete / Revoke**
3. 重新生成新 Token，更新本机凭据管理器
4. 确认旧 Token 已无法使用

---

## 创建 GitHub 仓库

### 方式一：在 GitHub 网页创建（推荐新手）

1. 登录 https://github.com
2. 点击右上角 **+** → **New repository**
3. 填写信息：
   - **Repository name**：`AIEcome`
   - **Visibility**：Public（公开，免费 Pages 必须）
   - **不要**勾选 "Add a README"（本地已有代码时）
4. 点击 **Create repository**

### 方式二：使用已有仓库

若仓库已存在，跳过此步，直接进入下一节关联远程仓库。

---

## 本地 Git 初始化与推送

在项目根目录（`项目/电商平台/`）执行：

### 首次推送

```bash
# 进入项目目录
cd 项目/电商平台

# 初始化（若尚未初始化）
git init

# 关联远程仓库
git remote add origin https://angsa2025@github.com/angsa2025/AIEcome.git

# 添加所有文件
git add .

# 提交
git commit -m "feat: initial AIEcome PRD site"

# 推送到 main 分支
git branch -M main
git push -u origin main
```

### 当前仓库已有提交记录

```bash
git log --oneline -5
```

参考提交历史：

```
549e1b9 fix: correct utils import paths in demo components
332fce3 chore: add GitHub Pages config
202d844 feat: integrate B2B analysis, interactive demos and architecture design
2ae5d12 feat: modular AIEcome PRD site with component architecture
```

### 推送失败：凭据错误

**现象：** `remote: Permission to angsa2025/AIEcome.git denied`

**原因：** Windows 凭据管理器缓存了其他 GitHub 账号。

**处理：**

1. 打开 **控制面板 → 凭据管理器 → Windows 凭据**
2. 删除 `git:https://github.com` 相关条目
3. 重新 `git push`，输入 `angsa2025` 账号的 Token

---

## 仓库可见性：必须公开

### 为什么必须公开？

GitHub **免费套餐**下，**私有仓库无法启用 GitHub Pages**。若 Pages 设置页出现：

> Upgrade or make this repository public to enable Pages

需要将仓库改为 **Public（公开）**。

### 操作步骤（网页端）

1. 打开 https://github.com/angsa2025/AIEcome/settings
2. 滚动到页面底部 **Danger Zone（危险区域）**
3. 点击 **Change visibility（更改可见性）**
4. 选择 **Change to public（改为公开）**
5. 按提示逐步确认：
   - 点击 **I want to make this repository public**
   - 点击 **I have read and understand these effects**
   - 点击 **Make this repository public**
6. 确认后，Danger Zone 显示：**This repository is currently public.**

> 公开后，任何人可查看仓库代码。请勿将密钥、Token、密码提交到仓库。

---

## 启用 GitHub Pages

仓库公开后，按以下步骤开启 Pages：

### 操作步骤

1. 打开 https://github.com/angsa2025/AIEcome/settings/pages
2. 在 **Build and deployment** 区域：
   - **Source**：选择 `Deploy from a branch`
   - **Branch**：
     - 第一个下拉框选 **`main`**
     - 第二个下拉框选 **`/ (root)`**
3. 点击 **Save**
4. 页面顶部出现绿色提示：**GitHub Pages source saved.**
5. 稍等 1～3 分钟，页面会显示站点地址：

   ```
   Your site is live at https://angsa2025.github.io/AIEcome/
   ```

### 配置截图对照

| 配置项 | 正确值 |
|--------|--------|
| Source | Deploy from a branch |
| Branch | `main` |
| Folder | `/ (root)` |
| Enforce HTTPS | 勾选（默认开启） |

### 部署状态查看

- **Settings → Pages**：查看当前发布源与站点 URL
- **Actions** 标签页：可查看 Pages 构建日志（若启用 Actions 部署）
- 直接访问站点 URL，确认页面是否正常加载

---

## 项目侧配置说明

本项目为**零构建静态站点**，以下文件与 GitHub Pages 直接相关：

### 目录结构（部署相关部分）

```
项目/电商平台/
├── index.html          # 入口页，GitHub Pages 默认首页
├── .nojekyll           # 禁用 Jekyll 处理（必须保留）
├── _config.yml         # Jekyll 配置（记录 site_url）
├── assets/css/         # 样式文件
├── src/                # ES Module 源码（浏览器直接加载）
│   ├── main.js
│   ├── app.js
│   ├── components/
│   ├── sections/
│   ├── data/
│   └── utils/
└── README.md
```

### `index.html`

站点入口，使用相对路径引用资源：

```html
<link rel="stylesheet" href="./assets/css/main.css" />
<script type="module" src="./src/main.js"></script>
```

相对路径可确保在 `https://angsa2025.github.io/AIEcome/` 子路径下正常加载。

### `.nojekyll`

空文件，放在仓库根目录，作用是：

- 告诉 GitHub Pages **不要使用 Jekyll** 编译
- 避免 `_config.yml`、以下划线开头的文件被 Jekyll 忽略
- 确保 `src/` 等目录原样发布

**不要删除此文件。**

### `_config.yml`

```yaml
site_url: https://angsa2025.github.io/AIEcome/
```

记录站点 URL，便于后续扩展（如自定义域名）。当前项目不依赖 Jekyll 构建，此文件仅作文档用途。

### `.gitignore`

```
.DS_Store
Thumbs.db
node_modules/
*.log
```

`node_modules/` 不提交；本地预览用的 `serve` 通过 `npx` 临时安装，无需入库。

### ES Module 路径规范（重要）

本项目使用原生 ES Module，`import` 路径必须与实际目录层级一致：

| 文件位置 | 引用 `src/utils/dom.js` 的正确写法 |
|----------|-----------------------------------|
| `src/components/Hero.js` | `import { el } from '../utils/dom.js'` |
| `src/sections/OverviewSection.js` | `import { el } from '../utils/dom.js'` |
| `src/components/demos/SeaPoolDemo.js` | `import { el } from '../../utils/dom.js'` |

> **常见错误：** `demos/` 子目录下写 `'../utils/dom.js'` 会解析到不存在的 `src/components/utils/dom.js`，导致线上白屏。

---

## 访问地址与 URL 规则

### 项目站（Project Site）

本仓库使用 **Project Site** 模式，URL 格式为：

```
https://<用户名>.github.io/<仓库名>/
```

本项目：

| 类型 | URL |
|------|-----|
| 仓库首页 | https://github.com/angsa2025/AIEcome |
| 在线站点 | https://angsa2025.github.io/AIEcome/ |
| 入口 HTML | https://angsa2025.github.io/AIEcome/index.html |
| JS 模块示例 | https://angsa2025.github.io/AIEcome/src/main.js |

### 与用户站（User Site）的区别

| 类型 | 仓库命名 | URL |
|------|----------|-----|
| User Site | `<用户名>.github.io` | `https://<用户名>.github.io/` |
| Project Site | 任意名称（如 `AIEcome`） | `https://<用户名>.github.io/<仓库名>/` |

本项目属于 **Project Site**，访问时必须带 `/AIEcome/` 路径。

---

## 日常更新与重新部署

修改代码后，推送即自动重新部署：

```bash
cd 项目/电商平台

# 查看改动
git status
git diff

# 提交并推送
git add .
git commit -m "docs: update PRD content"
git push origin main
```

推送成功后：

1. 等待 **1～3 分钟** GitHub Pages 完成构建
2. 浏览器访问 https://angsa2025.github.io/AIEcome/
3. 若看不到最新内容，使用 **强制刷新**：
   - Windows：`Ctrl + Shift + R`
   - macOS：`Cmd + Shift + R`

### 验证部署是否生效

```bash
# 检查 HTTP 状态
curl -I https://angsa2025.github.io/AIEcome/

# 检查某个 JS 文件是否已更新
curl -s https://angsa2025.github.io/AIEcome/src/components/demos/index.js | head -1
```

期望输出：

```
import { el } from '../../utils/dom.js';
```

---

## 本地预览

推送前建议本地预览，确认页面正常：

```bash
cd 项目/电商平台
npx serve .
```

终端会输出本地地址，例如：

```
http://localhost:3000
```

在浏览器打开即可。本地根路径为 `/`，与 GitHub Pages 的 `/AIEcome/` 子路径不同，但相对路径引用方式一致，功能表现相同。

### 本地与线上的差异

| 环境 | 根路径 | 说明 |
|------|--------|------|
| 本地 `npx serve .` | `/` | 直接访问 `http://localhost:3000/` |
| GitHub Pages | `/AIEcome/` | 必须访问完整子路径 |

---

## 常见问题排查

### 1. 页面空白，控制台报 MIME type 错误

**报错示例：**

```
Loading module from ".../src/components/utils/dom.js" was blocked
because of a disallowed MIME type ("text/html").
```

**原因：** 请求的 `.js` 文件不存在，服务器返回了 404 HTML 页面。

**处理：**

1. 检查 `import` 相对路径是否正确（参见上文 [ES Module 路径规范](#es-module-路径规范)）
2. 修复后 `git push`，等待 Pages 重新部署
3. 浏览器 **强制刷新**（`Ctrl + Shift + R`）

---

### 2. Pages 设置页提示需要升级或公开仓库

**报错：**

> Upgrade or make this repository public to enable Pages

**原因：** 仓库仍为私有，免费账号无法使用 Pages。

**处理：** 按 [仓库可见性](#仓库可见性必须公开) 一节改为 Public。

---

### 3. 推送成功但网页显示空仓库 / Quick setup

**原因：** 浏览器登录了**非仓库所有者**的 GitHub 账号（如 `cryangle0`），看到的是无权限视图。

**处理：**

1. 确认浏览器右上角登录的是 `angsa2025`
2. 或用无痕窗口访问仓库
3. 推送时确认 `git remote` 和凭据属于 `angsa2025`

---

### 4. 修改已推送但网页仍是旧版

**原因：** 浏览器缓存了旧的 ES Module 文件。

**处理：**

- 强制刷新：`Ctrl + Shift + R`
- 或无痕窗口访问
- 或在 URL 后加版本参数：`?v=20260706`

---

### 5. `git push` 提示 Permission denied

**处理步骤：**

```bash
# 1. 确认 remote 地址
git remote -v

# 2. 修正为正确账号
git remote set-url origin https://angsa2025@github.com/angsa2025/AIEcome.git

# 3. 清除 Windows 旧凭据后重新推送
git push origin main
```

---

### 6. Pages 部署成功但 404

| 检查项 | 期望 |
|--------|------|
| `index.html` 在仓库根目录 | 存在 |
| Pages 分支配置 | `main` / `/ (root)` |
| 访问 URL | 含 `/AIEcome/` 完整路径 |
| `.nojekyll` | 根目录存在 |

---

## 安全注意事项

1. **不要将 Token、密码写入代码或提交到 Git**
2. 若 Token 曾在聊天、截图中暴露，请立即到 https://github.com/settings/tokens **撤销并重新生成**
3. 仓库公开后，所有代码对互联网可见，注意脱敏
4. 使用 HTTPS 推送，避免在公共场合泄露凭据

---

## 快速检查清单

部署完成后，逐项确认：

- [ ] 仓库为 **Public**
- [ ] `main` 分支代码已推送
- [ ] Settings → Pages 配置为 `main` + `/ (root)`
- [ ] 站点显示：**Your site is live at https://angsa2025.github.io/AIEcome/**
- [ ] 访问站点可看到完整 PRD 页面（非白屏）
- [ ] 交互演示区块可正常操作
- [ ] 控制台无 404 / MIME type 报错

---

## 相关链接

- 仓库：https://github.com/angsa2025/AIEcome
- 在线站点：https://angsa2025.github.io/AIEcome/
- GitHub Pages 官方文档：https://docs.github.com/pages
- 配置 Pages 发布源：https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

---

*文档更新日期：2026-07-06*
