# 壹苯图书馆

> 个人知识笔记库，按**中国图书馆分类法（中图法）**整理，使用 [VitePress](https://vitepress.dev) 构建并部署到 GitHub Pages。

## 🚀 本地预览

```bash
npm install
npm run dev     # 本地开发预览 http://localhost:5173
npm run build   # 构建静态网站到 .vitepress/dist
```

## 📁 目录结构

```
.
├─ T 工业技术/          # 笔记内容（中图分类法归档）
│  ├─ TN 无线电电子学…  # 通信技术
│  └─ TP 自动化技术…    # 计算机技术
├─ .vitepress/          # 网站配置（含自动侧边栏脚本）
├─ index.md             # 网站首页
└─ package.json
```

## 📚 添加新笔记

把 Markdown 笔记放进 `T 工业技术/` 下对应分类目录即可，`npm run build` 后会自动出现在侧边栏与搜索中。

## 🌐 在线访问

GitHub Actions 在每次 `push` 到 `main` 后自动构建并发布到 GitHub Pages。
