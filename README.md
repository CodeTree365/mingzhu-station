# 明珠驿站

一个功能完整的个人成长应用，包含性格测试、电子日记、习惯打卡三大核心功能。

## 功能特性

### 🧠 性格测试
- MBTI 16型人格测试
- 大五人格测试
- DISC 行为测试
- 九型人格测试
- 色彩性格测试
- 测试结果可视化（雷达图）
- 历史测试记录
- 测试进度自动保存

### 📔 电子日记
- 富文本编辑
- 图片上传
- 心情标签（8种基础情绪）
- 日记搜索
- 日期分类

### 🎯 习惯打卡
- 自定义习惯创建
- 多频率选择（每日/每周/每月）
- 进度统计
- 连续打卡天数
- 习惯数据可视化

### 🔐 用户认证
- 用户注册
- 用户登录
- 密码找回
- 本地数据加密存储

## 技术栈

- **前端框架**: Next.js 13 + React 18
- **UI 组件库**: Chakra UI
- **状态管理**: Zustand
- **数据存储**: IndexedDB (idb)
- **图表库**: Recharts
- **日期处理**: day.js

## 项目结构

```
mingzhu-station/
├── pages/
│   ├── index.tsx              # 首页
│   ├── auth/
│   │   ├── login.tsx         # 登录
│   │   ├── register.tsx      # 注册
│   │   └── forgot-password.tsx # 找回密码
│   ├── test/
│   │   ├── index.tsx         # 测试选择
│   │   ├── [testType].tsx    # 测试答题
│   │   └── result/
│   │       ├── index.tsx     # 测试结果
│   │       └── history/
│   │           └── index.tsx # 测试历史
│   ├── diary/
│   │   ├── index.tsx         # 日记列表
│   │   ├── new.tsx           # 新建日记
│   │   └── [id].tsx          # 日记详情
│   └── habit/
│       ├── index.tsx         # 习惯列表
│       ├── new.tsx           # 新建习惯
│       └── stats.tsx         # 习惯统计
├── src/
│   ├── components/
│   │   ├── auth/             # 认证组件
│   │   └── common/           # 通用组件
│   ├── store/
│   │   ├── use-auth-store.ts # 认证状态管理
│   │   ├── use-test-store.ts # 测试状态管理
│   │   ├── use-diary-store.ts # 日记状态管理
│   │   └── use-habit-store.ts # 习惯状态管理
│   ├── lib/
│   │   └── db.ts             # IndexedDB 数据层
│   └── data/
│       └── personality-test.ts # 测试数据
├── package.json
└── next.config.js
```

## 本地开发

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
```

### 导出静态文件
```bash
npm run build
# 导出的文件在 out/ 目录
```

## 静态部署

由于使用 IndexedDB 本地存储，项目完全支持静态托管部署。

### 部署到 Vercel（推荐）

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 Vercel 导入项目
3. 等待部署完成

### 部署到 Netlify

1. 将代码推送到 GitHub
2. 在 Netlify 导入项目
3. 配置构建命令：`npm run build`
4. 配置发布目录：`out`

### 部署到 GitHub Pages

1. 构建静态文件：
```bash
npm run build
```

2. 将 `out` 目录部署到 GitHub Pages

### 其他静态托管服务

- Cloudflare Pages
- 阿里云 OSS + CDN
- 腾讯云 COS
- 七牛云

## 数据存储说明

所有数据均通过 IndexedDB 存储在用户浏览器本地：

- 用户信息
- 测试记录
- 日记内容
- 习惯记录

**注意：数据存储在浏览器本地，清除浏览器数据会丢失所有数据！**

## 测试账号

为方便测试，可以使用以下账号：

- 邮箱：`test@example.com`
- 密码：`123456`

## 开发计划

- [ ] 添加数据导出功能（Markdown/PDF）
- [ ] 添加数据备份和恢复
- [ ] 支持更多性格测试
- [ ] 添加习惯提醒功能
- [ ] 支持深色模式
- [ ] 添加数据可视化图表

## 许可证

MIT License
