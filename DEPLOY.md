# 部署指南

## 静态站点导出

由于项目使用 IndexedDB 本地存储，可以导出为纯静态文件部署。

### 导出步骤

```bash
# 1. 构建项目
npm run build

# 2. 导出静态文件（可选，next build 已经可以在 Vercel/Netlify 直接部署）
npm run export
```

导出完成后，`out` 目录包含所有需要部署的静态文件。

## 部署平台

### Vercel（推荐）

**最简单的方式，支持自动部署：**

1. 在 GitHub 创建仓库，提交代码
2. 登录 [Vercel](https://vercel.com)
3. 点击 "New Project"，导入你的仓库
4. Vercel 会自动检测 Next.js 项目并配置
5. 点击 "Deploy"，完成！

**优点：**
- 自动部署
- 自动 CDN
- 支持预览分支
- 完全免费

### Netlify

1. 在 GitHub 创建仓库，提交代码
2. 登录 [Netlify](https://netlify.com)
3. 点击 "Add new site" → "Import an existing project"
4. 选择 GitHub，授权并导入仓库
5. 配置部署设置：
   - Build command: `npm run build`
   - Publish directory: `.next`（或 `out`）
6. 点击 "Deploy site"

### GitHub Pages

1. 构建并导出：
```bash
npm run build && npm run export
```

2. 将 `out` 目录的内容推送到 `gh-pages` 分支

3. 在仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支

**或者使用 gh-pages 工具：**
```bash
npm install -D gh-pages
```

添加到 package.json:
```json
"scripts": {
  "deploy": "npm run build && npm run export && gh-pages -d out"
}
```

### 其他静态托管

- Cloudflare Pages
- 阿里云 OSS
- 腾讯云 COS
- 七牛云
- Gitee Pages

## 注意事项

⚠️ **重要：数据存储在浏览器本地**

- 所有数据通过 IndexedDB 存储在用户浏览器中
- 清除浏览器缓存/数据会导致数据丢失
- 数据不会同步到服务器（目前版本）

🔒 **隐私安全**

- 密码本地哈希存储
- 所有数据存储在用户本地
- 没有数据上传到服务器

## 后续优化建议

1. 添加数据导出功能（Markdown/PDF）
2. 实现数据备份到本地文件
3. 添加数据导入功能
4. 支持数据同步（可选，需要后端）
