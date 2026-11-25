# 个人知识库 · 静态网站模板

一个用 [Astro](https://astro.build) 搭的个人知识库站点：纯 Markdown 写内容，零代码发布，免费托管。

- **不用写代码**：日常只做一件事 —— 新建一个 `.md` 文件，写内容。
- **四个栏目**：专业笔记 / 项目作品 / 读书笔记 / 资源收藏。
- **自带功能**：全站搜索、标签、RSS、站点地图、深色模式、响应式、SEO 基础标签。
- **零成本上线**：GitHub + Vercel，国内可访问，免费二级域名。

---

## 一、目录结构

```text
kb-site/
├── src/
│   ├── content/                 ← ★ 你写文章只动这里
│   │   ├── notes/               ← 专业笔记
│   │   ├── projects/            ← 项目作品
│   │   ├── books/               ← 读书笔记
│   │   └── resources/           ← 资源收藏
│   ├── site.config.ts           ← ★ 站点名、简介、联系方式、栏目
│   ├── content.config.ts        ← 内容字段的规则（一般不用改）
│   ├── layouts/                 ← 页面骨架
│   ├── components/              ← 组件
│   ├── pages/                   ← 路由（一般不用改）
│   └── styles/global.css        ← 配色、字体、排版
├── public/                      ← 图标、robots.txt
├── scripts/sitemap.mjs          ← 构建后自动生成站点地图
├── astro.config.mjs             ← 域名配置
└── package.json
```

**你日常只会碰两个位置**：`src/content/`（写内容）和 `src/site.config.ts`（改站名、简介、链接）。

---

## 二、本地预览（第一次做一次）

### 1. 装两个软件

- [Node.js](https://nodejs.org/zh-cn) —— 选 **LTS** 版本，一路下一步安装。
- [Git](https://git-scm.com/download/win) —— 一路下一步安装，保持默认选项。

> 装完**关掉并重新打开** PowerShell / 终端，否则命令找不到。

### 2. 最省事的方式：双击 `开始写.bat`

不用敲命令，双击就会自动装依赖并打开浏览器。第一次约 1–3 分钟。

如果提示「没找到 Node.js」，说明 PATH 还没生效：关掉窗口重开，或者重启一次电脑。

### 3. 命令行方式（想学命令的话）

在 `kb-site` 文件夹里，地址栏输入 `powershell` 回车，然后：

```powershell
pnpm install     # 没装 pnpm 的话先执行：npm install -g pnpm
pnpm dev
```

浏览器打开终端里显示的地址（通常是 `http://localhost:4321`）。

改任何 `.md` 文件，保存后浏览器**自动刷新**，不用重启。

### 4. ⚠️ 如果 PowerShell 报「禁止运行脚本」

Windows 默认策略会拦截 `npm` / `pnpm` 的 `.ps1` 脚本，报错类似：

```text
无法加载文件 ...\npm.ps1，因为在此系统上禁止运行脚本
```

**两个解决办法，任选一个：**

**方案 A（推荐，一次性解决）**：在 PowerShell 里执行一次：

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

输入 `Y` 回车。这是 Windows 官方推荐的安全级别，只影响当前用户，不需要管理员权限。

**方案 B（不动系统设置）**：直接用 `.bat` 文件（它们走 `cmd`，不受这个策略影响），
或者把所有命令里的 `npm` / `pnpm` 改成 `npm.cmd` / `pnpm.cmd`。

### 5. 构建检查

```powershell
pnpm build
```

产物在 `dist/`。这一步能过，就说明站点没问题。

---

## 三、写一篇新文章（日常动作）

1. 在对应目录新建一个文件，文件名就是网址。例如：
   `src/content/notes/my-first-note.md` → 网址 `/notes/my-first-note/`
2. 文件开头必须有这段"信息头"（`---` 之间的部分）：

```markdown
---
title: 文章标题
description: 一句话摘要，会显示在列表和搜索结果里
date: 2025-11-25
tags: [数据中心, 液冷]
---

正文从这里开始，用 Markdown 写。
```

3. 保存 → 推送 → 一分钟内网站更新。

### 可用的信息头字段

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | ✅ | 标题 |
| `description` | 建议 | 摘要 |
| `date` | ✅ | 日期，格式 `2025-11-25` |
| `tags` | 否 | 标签，数组，如 `[液冷, CDU]` |
| `updated` | 否 | 更新日期 |
| `draft` | 否 | `true` 表示草稿，不会出现在网站上 |
| `featured` | 否 | 预留字段 |
| `author` / `rating` | 否 | 仅"读书笔记"可用 |
| `role` / `period` / `stack` | 否 | 仅"项目作品"可用 |

### Markdown 常用写法

```markdown
## 二级标题
### 三级标题

**加粗**  *斜体*  `行内代码`

- 无序列表
1. 有序列表

> 引用

[链接文字](https://example.com)
![图片说明](/images/xxx.png)

| 表头 | 表头 |
|---|---|
| 单元格 | 单元格 |
```

图片放到 `public/images/` 目录，然后在文章里用 `/images/文件名.png` 引用。

---

## 四、部署到网上（免费）

### 1. 把代码传到 GitHub

1. 注册 [GitHub](https://github.com)，新建一个仓库（Repository），名字随意，**不要**勾选初始化 README。
2. 在 `kb-site` 文件夹打开 PowerShell，依次执行（把地址换成你自己的）：

```powershell
git init
git add .
git commit -m "init: 个人知识库"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

### 2. 用 Vercel 上线

1. 注册 [Vercel](https://vercel.com)，用 GitHub 账号登录。
2. 点 **Add New → Project**，选中刚才的仓库。
3. 框架会自动识别为 **Astro**，直接点 **Deploy**。
4. 约 1 分钟后拿到地址：`https://你的项目名.vercel.app`。

之后每次 `git push`，Vercel 自动重新部署。**不需要手动上传任何东西。**

### 3. 换成自己的域名（可选，以后再做）

1. 在 Vercel 项目的 **Settings → Domains** 添加域名。
2. 到域名服务商处按提示加一条 CNAME 记录。
3. 同时改两个文件里的 URL：
   - `astro.config.mjs` 的 `site`
   - `src/site.config.ts` 的 `url`
   - `public/robots.txt` 里的 Sitemap 地址

> 用 Vercel 托管（境外服务器）**不需要 ICP 备案**；如果用国内服务器就必须备案。

---

## 五、内容替换清单

模板自带 7 篇示例内容。换成你自己的之前，建议按这个顺序做：

1. 改 `src/site.config.ts`：站名、简介、名字、链接。
2. 改 `src/pages/about.astro`：自我介绍。
3. 删掉 `src/content/*/` 下的示例 `.md`（或原地改成你的内容）。
4. 把 `src/site.config.ts` 里的 `SHOW_DEMO_BANNER` 改为 `false`，隐藏顶部提示条。
5. 改 `public/favicon.svg`（可选，现在是占位图标）。
6. 改 `public/robots.txt` 里的网址。

---

## 六、常见问题

**Q：`pnpm` 不是内部或外部命令？**
先执行 `npm install -g pnpm`，然后重开终端。

**Q：构建报错说缺 `@astrojs/rss`？**
在项目目录执行 `pnpm add @astrojs/rss`。

**Q：标签页 404？**
检查 `src/pages/tags/[tag].astro` 里的 `params` 是否用了原始标签名（不要 `encodeURIComponent`）。

**Q：中文标签能用吗？**
可以，但网址里会显示成 `%E6%B6%B2%E5%86%B7` 这种。介意的话把 `tags` 改成英文，如 `[liquid-cooling, cdu]`。

**Q：想加第五个栏目？**
三处一起改：`src/content.config.ts` 加集合 → `src/lib/utils.ts` 的 `CATEGORY_META` 加一行 → `src/site.config.ts` 的 `categories` 加一项 → 再复制一份 `src/pages/notes/` 目录改名。

**Q：想加图片/附件？**
放进 `public/` 目录，用 `/文件名` 引用即可。

**Q：页面想加目录（TOC）或评论？**
先不用急，等有 10 篇以上内容再考虑。评论可接 giscus（基于 GitHub Discussions），不需要额外服务。
