---
title: 'MAINTENANCE'
---

# 壹苯图书馆 · 维护文档

> 个人知识笔记网站（VitePress），按中国图书馆分类法组织，部署于 GitHub Pages。
> 线上地址：https://jzy258.github.io/one-ben-library/

## 一、架构总览

```
仓库：e:\library（git 远程 origin → Jzy258/one-ben-library）
内容：T 工业技术/...（Markdown 笔记，按中图分类目录组织）
站点：.vitepress/（VitePress 配置与主题）+ scripts/（构建脚本）+ public/（logo 等）
部署：.github/workflows/deploy.yml（GitHub Actions 自动构建发布）
```

**核心维护原则：只改笔记 → 推送 → 自动部署。** 站点代码（VitePress）在仓库内，推送即触发 GitHub Actions 重建。

## 二、日常更新笔记（最常见）

```bash
cd e:\library
git add -A
git commit -m "更新：xxx 主题笔记"
git push origin master
```

- 推送到 `master` 后 GitHub Actions 自动构建部署（约 2~4 分钟），无需手动操作。
- 首页「最近更新」按钮会自动指向**最近一次提交的笔记主题**（`scripts/update-latest.mjs` 依据 git log 计算）。
- 新增/重命名笔记后，`git add -A` 会把自动生成的目录索引（`index.md`）一并提交。

### 新增一个笔记目录的建议流程

1. 在 `T 工业技术/...` 下创建主题目录，放入 `.md` 笔记。
2. `npm run dev` 本地预览确认。
3. 提交推送，线上自动更新侧边栏、目录页、搜索。

## 三、本地开发 / 预览

```bash
npm run dev        # 开发模式，改笔记实时刷新（URL 为完整路径 /T 工业技术/...）
npm run build      # 构建到 .vitepress/dist
npm run preview    # 预览构建产物（本地预览用）
```

> ⚠️ **本地是完整路径（`/T 工业技术/...`），线上是短路径（`/T/...`）**——两者 URL 不同是正常的（见第五节），功能一致。

## 四、维护涉及的文件

| 文件 | 作用 | 需要手动改吗 |
|---|---|---|
| `T 工业技术/.../*.md` | 笔记内容 | ✅ 你的笔记 |
| `index.md` | 首页（hero、按钮、features） | 偶尔（文本/结构） |
| `.vitepress/config.mts` | 站点配置（标题、导航、搜索、404） | 偶尔 |
| `.vitepress/theme/` | 主题（面包屑、侧边栏收起按钮、自定义样式、404 中文） | 偶尔 |
| `.github/workflows/deploy.yml` | CI 部署流水线 | 极少 |
| `scripts/*.mjs` | 构建脚本（自动生成 index.md、标题、链接） | 一般不用 |
| `T 工业技术/.../index.md` | 各目录索引页 | ❌ 自动生成，勿手改 |

### 构建脚本（scripts/）各自职责

| 脚本 | 职责 |
|---|---|
| `prepare.mjs` | 构建前总入口，按序调用下列脚本 |
| `top-align-fences.mjs` | 代码块围栏顶格（避免 markdown 列表断裂） |
| `fix-list-fences.mjs` | 修复「列表项内代码块」的缩进（保持列表连续） |
| `add-title.mjs` | 给笔记加 frontmatter 标题 + H1 |
| `generate-index.mjs` | 为每个内容目录生成 `index.md` 目录索引 |
| `update-latest.mjs` | 更新首页「最近更新」「分类导航」按钮链接 |
| `rename-class-dirs.mjs` | **仅 CI**：构建前把分类目录压缩为分类号（`T 工业技术`→`T`） |
| `lib.mjs` | 公共扫描逻辑（动态检测顶层分类目录） |

## 五、重要机制：本地 vs 线上的路径差异

**为什么线上 URL 是短的？**

- 笔记目录深 + 中文名导致 VitePress 生成的页面 chunk 文件名超过部署工具（Linux 文件系统 / tar 打包 / GitHub Pages artifact）的 **255 字节限制**，曾导致 `ENAMETOOLONG` 与 `Upload artifact` 失败。
- 解决方案：**CI 构建前**用 `rename-class-dirs.mjs` 把分类目录压缩为分类号（`T 工业技术`→`T`、`TP 自动化技术、计算机技术`→`TP`…），VitePress 全程基于短路径构建，路由/哈希/侧边栏天然一致。
- 因此：
  - **本地**：完整路径（`/T 工业技术/...`）
  - **线上**：短路径（`/one-ben-library/T/...`）
- 相关脚本已做动态化，本地/线上通用，**你无需关心路径差异**，只需保证笔记目录名保持中图分类法格式（如 `T 工业技术`、`TP312.8JA Java语言程序设计`）。

## 六、不要做的事

- ❌ 不要手改各目录的 `index.md`（会被 `generate-index.mjs` 覆盖）
- ❌ 不要重命名分类目录结构（中图分类法是组织核心；压缩是 CI 自动做的）
- ❌ 不要提交 `.vitepress/dist`、`node_modules`、`.vitepress/cache`（已 gitignore）
- ❌ 笔记里避免手写超长的绝对路径链接（本地可用，CI 压缩目录后可能失效）
- ❌ 不要直接改 `node_modules`（依赖由 `npm ci` 管理）

## 七、常见问题排查

| 症状 | 原因 | 处理 |
|---|---|---|
| Actions 构建失败 | 见日志（多为路径/依赖问题） | 复制报错给 Copilot 分析 |
| 线上页面 404 | URL 应为短路径 `/one-ben-library/T/...` | 确认链接是 VitePress 自动生成的 |
| 首页「最近更新」指向不对 | 上次提交无笔记改动 | 提交笔记后会自动更新 |
| 侧边栏缺少新目录 | 目录下没有含内容的 `.md` | 至少放一篇笔记 |
| 本地构建报 ENAMETOOLONG | Windows 上也接近 255 字符 | 压缩个别超长目录名（分类号形式） |

## 八、更新站点配置类修改

改 `.vitepress/config.mts`、`.vitepress/theme/`、`index.md` 后直接推送即可自动重新部署，**无需本地构建**。

---

*文档维护：本文随项目更新；重大机制变化时同步修订。*
