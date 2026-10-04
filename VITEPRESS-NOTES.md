# e:\library VitePress 站点关键事实

（本文件 2026-09-11 重建）此前用 `str_replace` 写入含「美元符号 + 数字」的内容
被当作变量展开，导致内容错位 / 重复 —— 含此类内容请用 `create` / `insert`，勿用 `str_replace`。

## 上线状态
- 远程：`origin git@github.com:Jzy258/one-ben-library.git`；线上 https://jzy258.github.io/one-ben-library/
- GitHub Actions 部署（`.github/workflows/deploy.yml` · Windows runner）
  · 构建前 `scripts/rename-class-dirs.mjs` 压缩分类目录 + npm/Vite cache + actions/deploy-pages
- 仓库 Settings→Pages→Source = GitHub Actions

## ⚠️ ENAMETOOLONG 坑 + 最终方案
- 现象：VitePress 页面 chunk 名 = 完整目录路径
  · 深目录 + 中文（3 字节/字）超 255 字节（Linux ENAMETOOLONG / upload-pages-artifact 的 tar 报错）
  · dist 最长路径曾 321 字节
- ❌ 不可行
  · rollup `entryFileNames` / `sanitizeFileName` 覆盖会破坏构建
  · postbuild 改 dist 目录名会破坏 SPA 路由
- ✅ 方案：CI 构建前用 `scripts/rename-class-dirs.mjs` 把分类目录压成分类号（`T 工业技术`→`T`）
  · 全程按短路径构建 → dist 最长降到 ~148 字节
- 配套动态化
  · `scripts/lib.mjs` 的 `TOP_DIRS` 动态扫描根目录分类目录
  · `config.mts` 的 nav 用动态 `TOP_DIR`
  · `prepare.mjs` 串起 top-align-fences / fix-list-fences / add-title / generate-index / update-latest
- 测试经验
  · 多进程抢 4173 端口会让 preview 服务旧 dist（先 `Get-Process node | Stop-Process`）
  · `cmd /c "cd /d <dir> && npm run preview"` 保证 cwd
  · PowerShell 里 `node -e` 带正则引号易解析失败，改用脚本文件

## 架构
- VitePress 1.6.4 + bootstrap-icons；内容源 = 仓库根（`srcDir: '.'`，`cleanUrls: true`）
- base：`const base = process.env.VITEPRESS_BASE || '/'`，另有 `basePrefix`（保证尾斜杠）供手工拼静态资源路径
- 自定义主题 `.vitepress/theme/index.js`（extends DefaultTheme + 插槽 Breadcrumb / SidebarToggle）

## ⚠️ 核心坑：自定义 Layout 插槽组件在客户端不激活
- 插槽组件是纯 SSR 静态渲染，客户端不 hydration
  · `el._vei` / `__vueParentComponent` / `__vnode` 全空
    → Vue 的 `@click` / `onMounted` / `watch` 全不执行
- 解决：交互一律原生 DOM 绑定（`onMounted` + 路由钩子里 `bindXxx()`，`addEventListener` + `dataset.bound` 去重）

## Router 钩子（重要）
- 赋值式属性：`router.onAfterRouteChange = fn`；写成方法调用会报 `TypeError: … is not a function`

## 首页 / 404 隐藏收起按钮
- `.VPNavBar:not(.has-sidebar) .sidebar-toggle { display: none }`（首页/404/sidebar:false 页无 has-sidebar）
- 404 中文化：`themeConfig.notFound = { code, title, quote, linkLabel, linkText }`

## 侧边栏收起（SidebarToggle）
- 用 `nav-bar-title-before` 插槽（`.VPNavBarTitle .title` 是 `<a>`，必须 preventDefault + stopPropagation 防误导航）
- 切 `document.documentElement.classList.toggle('sidebar-collapsed')`
  · custom.css：`.sidebar-collapsed .VPSidebar{display:none}` +
    `.VPContent.has-sidebar{padding-left:0}`
- VPSidebar.vue 内 scoped padding 特异性更高，改 padding-right 用 `.Layout .VPSidebar`

## 面包屑折叠（原生 bindBreadcrumbFit）
- crumb 完整名在 `title` 属性；溢出（`ol.scrollWidth > ol.clientWidth`）时从左侧逐个折叠为分类编号
- 防抖用 `setTimeout(doFit, 0)` + busy 标志（不要用 requestAnimationFrame，部分环境不触发会卡死标志）

## 已验证指标 / 测试环境
- `.vp-breadcrumb` margin `10px 0 16px` · `.Layout .VPSidebar` padding-right 44px
- 收起后 content padding-left 0（展开 272px）
- headless 浏览器 `page.mouse.click` 整体失效（连链接都不导航）；程序化 `el.click()`/dispatchEvent 可触发原生监听

## /recent 与 /current 板块 + 二分支结构（2026-09-01 起）
- **两分支结构（2026-09-01 起）**
  · `master`：站点工程（`.vitepress/` `scripts/` `public/` `package*.json`）+ 正式笔记 `T 工业技术/`
    + `index.md` / `MAINTENANCE` / `README` + `deploy.yml`
  · `recent`：托管 `current/` + `recent.md` + `script/generate-portal.mjs` + `deploy-recent.ps1`
    + `deploy.yml` 副本 + 精简 `.gitignore`
- **两边 .gitignore**
  · master 忽略 `recent.md` / `recent/` / `current/`
  · recent 忽略 `node_modules` / `.vitepress` / `.obsidian` + `**/index.md`（放行 `!/current/index.md`）
- **部署（组装式）**：push master 或 recent 都触发 `deploy.yml`
  · checkout master → `base/`；checkout recent → `_recent/`
  · 把 `recent.md` + `current/` 覆盖进 base
  · 再 `npm ci` + rename-class-dirs + build + upload `base/.vitepress/dist`
  · **recent 变更 push 即上线**
- **/recent**：`recent.md` 按日期分块（近 7 天），链接指向 `/current/…`，位置显示 `课内 / 科目 / 章节`
- **/current（2026-09-11 改为分层）**
  · 笔记副本：`current/课内/<科目>/<章节>/<笔记>.md` · `current/课外/...`（不再是 `recent/`）
  · 落地页：`current/index.md`(`/current`) + `current/course.md`(课内科目) + `current/extension.md`(课外)
  · 数据源 `E:\Study\Learn\01-总览\current.json`
  - 侧边栏：`.vitepress/buildCurrentSidebar.mjs`（复用 `scripts/lib.mjs` 的 `containsMd`）
    · `config.mts`：`sidebar: { '/current/': buildCurrentSidebar(), '/': buildSidebar() }`
      （VitePress 按键路径段数择优匹配）
    · 树 = 当前进行 → 课内/课外 → 科目 → 章节 → 笔记；本地无 `current/` 时返回空数组
    · **默认只展开到第 2 层（科目）**：课内/课外 `collapsed:false` → 科目 `collapsed:true`
      → 章节 `collapsed:true`（当前页所在组由 VitePress 自动展开）
  - 目录索引页：`scripts/generate-index.mjs` 除 `TOP_DIRS` 外
    · `current/课内`、`current/课外` 存在时也 `generate()`（构建期生成科目/章节 index.md，不入库）
- **一键部署**：桌面 `E:\Desktop\update-library.bat`
  · cd `E:\library` → 切 `recent` → `powershell -NoProfile -ExecutionPolicy Bypass`
    `-File E:\library\deploy-recent.ps1 -Generate`
  · → 提交（`更新：yyyy-MM-dd-NN`，同天递增）→ push
  · **脚本已内置 Ensure-Node**（fnm 引导，见下）
- **首页「最近更新」按钮 → /recent**；`scripts/update-latest.mjs` 固定写该路由（幂等）
- **本地预览**：`git checkout recent -- current recent.md` → `npm run build/preview`
  → 清理 `git rm -r --cached current` + 删目录
- ⚠️ **本地 `npm run build` 会跑 `prepare.mjs`**（add-title / fix-list-fences / 换行）
  · → 改动分类树笔记产生无关 diff
  · 验证后 `git checkout -- "T 工业技术" MAINTENANCE.md index.md` 还原
- ⚠️ **markdown-it 默认拦截 `file:`** → `config.mts` 覆写 `md.validateLink` 放开 `file:///`
  · `ignoreDeadLinks` 加 `/^file:\/\//`
- ⚠️ **git 操作坑**
  · recent 分支不要移除 `.gitignore` 后 `git add -A`（会提交 node_modules/.vitepress 垃圾）
  · `git checkout -f master` 会清掉暂存过的 node_modules（需重新 `npm ci`）
  · 切分支会把目标分支不跟踪的目录从工作区删除（如 recent 无 `.vitepress`、master 无 `current/`）
- `scripts/add-title.mjs` 的 SKIP：`index.md`/`README.md`/`latest.md`/`recent.md`/`course.md`/`extension.md`

## /current 排序规则（2026-09-08，generate-portal.mjs）
- 课内/课外分页（course 先）
  · 科目按 `localeCompare(...,'zh-CN',{numeric:true})` 字典正序
  · 拼音：汇编语言 < 机器视觉 < 计算机网络；英文 Mermaid 排最后
- 侧边栏树内：章节 ch 正序、笔记编号 numeric 正序
- 旧版落地页规则（若回退参考）：无章节层次（唯一分组是「根目录」）时不显示「根目录」组标题，笔记平铺

## 列表标记归一化（2026-09-12，generate-portal.mjs）
- 复制笔记到 `current/` 时把前导 `-` / `+` 统一为 `*`（`normalizeListMarkers` / `normalizeListLine`）
  · 跳过：代码围栏（``` / `~~~`）、文件头 YAML front-matter、主题分隔线（--- / - - - / *** / ___）
  · **源笔记不改动**（仅托管副本）
- 落地页 `current/{index,course,extension}.md` 由脚本生成，仍用 `-`（非笔记，不归一）
- 验证（2026-09-12）：源 6 个项目 313 行 `-/+` 列表 → 副本 0 行；源笔记代码围栏内无此类行

## 部署脚本修复：fnm node 引导 + current.json 路径（2026-09-08）
- 症状：`deploy-recent.ps1 -Generate` 报「无法将 node 项识别」
  · `.bat` 用 `-NoProfile` 不加载 profile → profile 里的 `fnm env` 未执行 → node 不在 PATH
- 修复：脚本内置 `Ensure-Node`
  · node 已在 PATH 则跳过
  · 否则从 `Get-Command fnm` 所在目录或 `D:\fnm` 下取
    `node-versions\node-versions\<最高版本>\installation` 加入 PATH
- fnm 布局：`D:\fnm\fnm.exe`；node 在
  `D:\fnm\node-versions\node-versions\v24.20.0\installation\node.exe`
  · ⚠️ `aliases\default` 是空文件，不可依赖
- ⚠️ current.json 过期路径会让生成脚本跳过项目**并删除**已托管笔记
- **2026-09-13 Study 全面英文重命名**（旧路径全失效）
  · `01-编程语言` → `01-programming-languages` · `04-算法数据AI` → `04-algorithm-data-ai`
  · `06-计算机专业课` → `06-computer-courses` · `09-音乐` → `09-music`
  · 子目录：汇编语言 → `assembly-language` · 机器视觉算法与应用 → `machine-vision`
  · 　　　　计算机网络 → `computer-network` · 深度学习编译器 → `dl-compiler` · Mermaid → `mermaid`
  · 另 library 有 `current\课内\<科目>\<章节>\` 托管副本
  · 已完成阶段笔记（Git / Redis / Docker / Maven / PowerShell / JavaSE）已归档 library 中图法分类

## 换行警告消除（2026-09-08）
- 仓库设 `git config core.autocrlf false`
  · 本机全局为 true → 海量「LF will be replaced by CRLF」警告
  · 改的是 `E:\library\.git\config`，不入库、不影响 CI
- ⚠️ 换机器 clone 若全局仍 true 会复发 → 可在仓库根加 `.gitattributes`（`* -text`）持久化
- ⚠️ 副作用：编辑器若把文件存成 CRLF，会显示整文件 modified
  · `git diff --ignore-cr-at-eol` 可确认是纯换行差异 → 直接 `git checkout -- <file>` 还原

## favicon 子路径坑（2026-09-11 修复，master 3e7c8e3）
- `head` 里的链接 VitePress **原样输出、不加 base 前缀**
  · → 项目页部署在 `/one-ben-library/` 下必须手工拼接：`href: `${basePrefix}favicon.svg``
- 对比：`themeConfig.logo` 会被自动 `withBase()`（线上 `/one-ben-library/logo.svg` 正常），**只有 head 需手工处理**
- 验证手法：`Invoke-WebRequest` 抓线上 HTML + 正则提取 `<link[^>]*>` 看 href

## TeX 数学渲染（2026-09-11 启用，master 1ac3c25）
- 配置：`config.mts` 的 `markdown.math: true` + devDependency `markdown-it-mathjax3`
  · VitePress 1.6 内置支持：`options.math` 为真时动态 import 该插件
  · 构建期渲染成内联 SVG，无需 CSS / 客户端脚本
- 笔记用法：行内 `O(1)`、`2^n` 这类复杂度写法（Java SE/ch04-数组、ch07-集合）
  · 块级公式：操作系统/ch02-进程管理/12 调度的目标、13 调度算法、Study 高数等
  · 公式内中文以单字 `<text>` 兜底渲染（MathJax unknown char），正常
- ⚠️ **美元符号必须转义**：开启数学后，markdown 文本里成对的美元符号会被当公式
  · 已知触发点 = 文件名 `…/ch04-文件管理/02` 后接 `$1 数据索引.md`（疑似笔误）
  · 后果：自动索引生成的链接会在「`$1 … $`」处被劈开而失效（侧边栏不受影响，它是纯文本）
  - 已修：`scripts/generate-index.mjs`（转义文本中的 `\` 与 `$`，URL 里 `$` → `%24`）
    与 recent 分支 `script/generate-portal.mjs`（`mdText()`；链接目标本就 encodeURIComponent）
    · `$` → `%24` 安全
- 排查手法：构建后统计哪些 dist HTML 含 `mjx-container`（本次 9 页为真公式），再对照源码中的美元符号对逐个核对是否误判

## 托管副本的相对链接重写（2026-09-14，recent eabc7b3）
- 症状：`current/课外/电子音乐/**` 里源笔记带的相对链接
  · 指向尚未写的曲风卡片、`../../Learn/…`、源里本就写错的路径 → 站点上解析不到
  · → VitePress 死链检查直接 **构建失败**（18 处）
- 修复：`script/generate-portal.mjs` 的 `stageProject()` 写入副本时
  · 先 `rewriteRelativeLinks()` 再 `normalizeListMarkers()`
  - 目标在项目内、且会被一起复制（.md 或目录，且不在 EXCLUDE_DIRS）→ **保持原样**
    （副本目录结构与源一致，相对链接照常有效）
  - 其余（不存在 / 项目外 / 排除目录 / 非 .md）→ 改写为 `file:///<源绝对路径>`
    （`encodeURI` 编码空格与中文）
  - `config.mts` 的 `ignoreDeadLinks` 已忽略 `file:` 前缀 → 构建可过，本地点击可定位
  - **自愈**：等目标写好后，下一轮生成会自动回到「保持原样」→ 变成站点内链
- 每轮运行打印汇总：`⚠ N 处相对链接不在托管范围内（已改写为 file:/// 本地路径）：` + 去重目标列表
  · 便于回源笔记修正
  · 已知源笔误：`00-总纲/模板/曲风卡片模板.md` 里
    `[曲风索引](曲风索引.md)` 应为 `../曲风索引.md`
- 注意：只处理相对链接；`http(s):`/`file:`/`mailto:`、以 `/` 开头的站点绝对路径、纯 `#锚点` 一律不动
