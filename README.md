# Vue3 现代化企业官网

[![Vue 3](https://img.shields.io/badge/Vue-3.5.18-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0.3-FFD859?style=flat&logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Vue Router](https://img.shields.io/badge/Vue%20Router-4.5.1-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://router.vuejs.org/)

基于 Vue 3 + TypeScript + Tailwind CSS 构建的现代化企业官网系统，提供完整的企业网站核心功能模块，适合快速开发和部署企业官方网站。采用组件化架构设计，支持响应式布局，具备优秀的开发体验和用户体验。

## 🖼️ 界面预览

### 首页
<img src="./首页.png" alt="首页" style="border: 1px solid #ccc; border-radius: 4px; max-width: 100%; height: auto;">

### 关于我们
<img src="./关于我们.png" alt="关于我们" style="border: 1px solid #ccc; border-radius: 4px; max-width: 100%; height: auto;">

### 核心业务
<img src="./核心业务.png" alt="核心业务" style="border: 1px solid #ccc; border-radius: 4px; max-width: 100%; height: auto;">

### 新闻动态
<img src="./新闻动态.png" alt="新闻动态" style="border: 1px solid #ccc; border-radius: 4px; max-width: 100%; height: auto;">

### 在线咨询
<img src="./在线咨询.png" alt="在线咨询" style="border: 1px solid #ccc; border-radius: 4px; max-width: 100%; height: auto;">

### 联系我们
<img src="./联系我们.png" alt="联系我们" style="border: 1px solid #ccc; border-radius: 4px; max-width: 100%; height: auto;">

## ✨ 特性

- 🚀 **现代化技术栈**：Vue 3 + TypeScript + Vite + Tailwind CSS
- 📱 **响应式设计**：完美适配桌面端和移动端
- 🎨 **优雅界面**：基于 Tailwind CSS 的现代化 UI 设计
- 🔥 **热更新开发**：Vite 提供极速的开发体验
- 📦 **组件化架构**：高度可复用的 Vue 组件
- 🛣️ **路由管理**：Vue Router 4 实现的单页应用
- 💾 **状态管理**：Pinia 轻量级状态管理
- 🌐 **国际化友好**：支持中文字体优化
- 🔍 **SEO 优化**：结构化的页面布局和元数据

## 📋 功能模块

- **首页（Home）**：企业形象展示和核心业务介绍
- **关于我们（About）**：公司简介、发展历程、企业文化
- **业务展示（Business）**：核心业务和服务介绍
- **新闻资讯（News）**：企业动态和行业资讯
- **联系我们（Contact）**：联系方式和在线留言
- **在线咨询（Consult）**：客户咨询和服务支持

## 🛠️ 技术栈

### 核心技术
- **前端框架**：Vue 3.5.18 (Composition API)
- **开发语言**：TypeScript 5.8.3
- **构建工具**：Vite 7.1.2
- **UI 框架**：Tailwind CSS 3.4.17
- **路由管理**：Vue Router 4.5.1
- **状态管理**：Pinia 3.0.3
- **HTTP 客户端**：Axios 1.11.0

### 开发工具
- **类型检查**：Vue TSC 3.0.5
- **CSS 处理**：PostCSS 8.5.6、Autoprefixer 10.4.21
- **开发环境**：Node.js >= 16.0.0
- **包管理器**：NPM

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 克隆项目

```bash
# 克隆项目到本地
git clone https://github.com/zuoyangs/vue3-enterprise-website.git

# 进入项目目录
cd vue3-enterprise-website
```

### 安装依赖

```bash
# 使用 npm 安装项目依赖
npm install
```

### 开发模式

```bash
# 启动开发服务器（支持热重载）
npm run dev
```

开发服务器启动后，在浏览器中访问 [http://localhost:8080](http://localhost:8080) 查看项目。

### 构建项目

```bash
# 构建生产版本
npm run build
```

构建完成后，生产文件将输出到 `dist/` 目录。

## 📁 项目结构

```
vue3-enterprise-website/
├── src/                          # 源代码目录
│   ├── assets/                   # 静态资源管理
│   │   ├── images/               # 图片资源（按页面分类存储）
│   │   │   └── index.ts          # 图片资源统一导出管理
│   │   └── styles/               # 全局样式文件
│   │       ├── fonts.css         # 字体样式（中文字体优化）
│   │       ├── reset.css         # CSS 重置样式
│   │       └── tailwind.css      # Tailwind CSS 扩展配置
│   ├── components/               # 可复用公共组件
│   │   ├── FaqItem.vue          # FAQ 折叠面板组件
│   │   ├── Footer.vue           # 全局页脚组件
│   │   ├── Navbar.vue           # 响应式导航栏组件
│   │   └── Swiper.vue           # 轮播图组件
│   ├── router/                   # 路由配置
│   │   └── index.ts             # Vue Router 配置（支持懒加载）
│   ├── stores/                   # Pinia 状态管理
│   │   └── consultStore.ts      # 咨询表单状态管理
│   ├── types/                    # TypeScript 类型定义
│   │   ├── business.ts          # 业务相关类型
│   │   ├── common.ts            # 通用类型定义
│   │   ├── consult.ts           # 咨询表单类型
│   │   ├── contact.ts           # 联系方式类型
│   │   ├── nav.ts               # 导航菜单类型
│   │   └── news.ts              # 新闻相关类型
│   ├── utils/                    # 工具函数库
│   │   ├── formatDate.ts        # 日期格式化工具
│   │   ├── request.ts           # HTTP 请求封装（基于 Axios）
│   │   └── validate.ts          # 表单验证工具
│   ├── views/                    # 页面组件（六大功能模块）
│   │   ├── About/               # 关于我们页面
│   │   │   └── About.vue        # 公司介绍、发展历程、团队展示
│   │   ├── Business/            # 核心业务页面
│   │   │   └── Business.vue     # 业务展示、客户案例、技术优势
│   │   ├── Consult/             # 在线咨询页面
│   │   │   ├── Consult.vue      # 咨询表单页面
│   │   │   └── Contact.vue      # 联系表单组件
│   │   ├── Contact/             # 联系我们页面
│   │   │   └── Contact.vue      # 联系信息、在线留言
│   │   ├── Home/                # 首页
│   │   │   └── Home.vue         # 轮播图、企业简介、核心业务预览
│   │   └── News/                # 新闻动态
│   │       ├── News.vue         # 新闻列表页（分类筛选、搜索、分页）
│   │       └── NewsDetail.vue   # 新闻详情页（动态路由、社交分享）
│   ├── App.vue                  # 根组件
│   ├── main.ts                  # 应用入口文件
│   ├── style.css                # 全局样式
│   └── vite-env.d.ts           # Vite 环境类型声明
├── DEVELOPMENT_GUIDE.md         # 开发指南文档
├── FEATURES_SUMMARY.md          # 功能特性总结
├── README.md                    # 项目说明文档
├── index.html                   # HTML 入口文件
├── package.json                 # NPM 依赖和脚本配置
├── package-lock.json           # NPM 依赖版本锁定
├── postcss.config.js           # PostCSS 配置
├── tailwind.config.js          # Tailwind CSS 配置
├── tsconfig.json               # TypeScript 根配置
├── tsconfig.app.json           # 应用 TypeScript 配置
├── tsconfig.node.json          # Node.js TypeScript 配置
├── vite.config.ts              # Vite 构建配置
├── 首页.png                     # 项目截图 - 首页
├── 关于我们.png                 # 项目截图 - 关于我们
├── 核心业务.png                 # 项目截图 - 核心业务
├── 新闻动态.png                 # 项目截图 - 新闻动态
├── 在线咨询.png                 # 项目截图 - 在线咨询
└── 联系我们.png                 # 项目截图 - 联系我们
```

## ⚙️ 配置说明

### Vite 配置

项目使用 Vite 作为构建工具，配置文件位于 `vite.config.ts`：
- 路径别名：`@` 指向 `src` 目录
- 开发服务器端口：8080
- 构建优化：代码分割、资源压缩

### Tailwind CSS 配置

样式框架配置位于 `tailwind.config.js`：
- 自定义颜色主题
- 中文字体优化
- 响应式断点设置
- 自定义动画效果

### TypeScript 配置

类型检查配置分为三个文件：
- `tsconfig.json`：根配置
- `tsconfig.app.json`：应用配置
- `tsconfig.node.json`：Node.js 配置

### 路由配置

路由管理位于 `src/router/index.ts`：
- 支持路由懒加载
- 动态路由参数
- 路由元信息配置

## 🚀 开发指南

### NPM 脚本说明

```bash
# 开发相关
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本  
npm run preview      # 预览构建结果
```

### 开发建议

1. **组件开发**：遵循 Vue 3 Composition API 最佳实践
2. **类型安全**：充分利用 TypeScript 类型检查
3. **样式规范**：使用 Tailwind CSS 原子化类名
4. **代码规范**：保持代码风格一致性

### 扩展功能

项目设计支持多种扩展可能：
- **🌐 多语言支持**：国际化 i18n 支持
- **📝 内容管理**：CMS 内容管理系统对接
- **👥 用户系统**：登录注册用户体系
- **🛍️ 电商功能**：产品展示和在线购买

## 🤝 贡献指南

1. Fork 本仓库到您的 GitHub 账户
2. 创建功能分支 (`git checkout -b feature/新功能名称`)
3. 提交代码更改 (`git commit -m '添加某某功能'`)
4. 推送到分支 (`git push origin feature/新功能名称`)
5. 创建 Pull Request 请求合并

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Tailwind CSS](https://tailwindcss.com/) - 功能优先的 CSS 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
---

⭐ 如果这个项目对您有帮助，请给它一个星标！
