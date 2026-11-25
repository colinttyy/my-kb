# 部署到 GitHub Pages（当前方案）

> 实测结果（你的网络）：GitHub Pages `200 / 558ms`，是测过的免费方案里最快的。
> 不需要买域名，不需要备案。

---

## 为什么用这个

- Vercel：`*.vercel.app` 被 DNS 污染，连不上
- EdgeOne 默认域名：国内返回 401（合规限制，必须绑自有域名）
- **GitHub Pages：直接可访问，免费，你已经有仓库了**

网址会是：`https://colinttyy.github.io`

---

## 一次性配置（大约 5 分钟）

### 第 1 步：建一个专门放网站的仓库

打开 https://github.com/new

1. **Repository name** 必须填：`colinttyy.github.io`
   （名字必须是这个，否则网址会变成 `colinttyy.github.io/仓库名`）
2. 选 **Public**（公开）。免费账号的 Pages 只支持公开仓库。
3. **不要**勾选 "Add a README file"
4. 点 **Create repository**

### 第 2 步：把代码推上去

在 `kb-site` 文件夹打开 PowerShell，执行：

```powershell
git remote add pages https://github.com/colinttyy/colinttyy.github.io.git
git push pages main
```

第一次会弹浏览器让你登录 GitHub，同意即可。

### 第 3 步：打开 Pages 功能

1. 打开 https://github.com/colinttyy/colinttyy.github.io/settings/pages
2. **Build and deployment** → **Source** 选 **GitHub Actions**
3. 不用改别的

### 第 4 步：等构建

1. 打开 https://github.com/colinttyy/colinttyy.github.io/actions
2. 会看到一个叫「部署到 GitHub Pages」的任务在跑
3. 等它变绿（约 1–2 分钟）

> 如果它在第 3 步之前就已经跑过并且失败了，点进去 → 右上角 **Re-run all jobs** 重新跑一次。

### 第 5 步：打开网站

```
https://colinttyy.github.io
```

---

## 以后每次更新

**双击「一键发布.bat」**，它会：

1. 提交你的改动
2. 推送到 `origin`（my-kb，备份用）
3. 推送到 `pages`（colinttyy.github.io，正式站点）
4. GitHub 自动构建部署，1–2 分钟后生效

---

## 常见问题

| 现象 | 原因 | 解决 |
|---|---|---|
| Actions 里红叉，报 `Get Pages site failed` | 还没在第 3 步打开 Pages | 去 Settings → Pages 选 GitHub Actions，然后 Re-run |
| 打开是 404 | 构建还没完成 | 等 2 分钟；看 Actions 是否变绿 |
| 打开后样式全丢 | 网址路径不对 | 确认仓库名是 `colinttyy.github.io`，不是 `my-kb` |
| `pages` remote 已存在 | 之前加过 | 用 `git remote set-url pages 新地址` |
| 页面 5 分钟还是旧的 | CDN 缓存 | Ctrl + F5 强制刷新；或用无痕窗口 |

---

## 关于另外两个平台

- **EdgeOne**：项目保留着，构建是成功的（28 秒）。等以后你买了域名，绑上去就能用作国内加速。默认域名 `*.edgeone.dev` 国内访问会 401，**不能当作正式地址**。
- **Vercel**：保留但国内不可用。海外访客或你自己用 VPN 时可以看。

三个平台指向同一份代码，互不影响。
