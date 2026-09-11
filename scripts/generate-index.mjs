// 为每个「主题目录」与「章节目录」自动生成 index.md（目录索引页）。
// 依赖：VitePress 目录路由（/目录/ → /目录/index.html）需要 index.md 才能打开。
// 幂等：已存在 index.md 时跳过，不覆盖用户可能手写的内容。
import { existsSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { LIBRARY_ROOT, TOP_DIRS, containsMd } from './lib.mjs'

// 从文件名提取显示标题：去掉 .md，保留前导序号（如「01 TS简介.md」→「01 TS简介」）
function titleOf(file) {
  return file.replace(/\.md$/, '')
}

function generate(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  const mdFiles = entries
    .filter((e) => e.isFile() && !e.name.startsWith('.') && e.name.endsWith('.md') && e.name !== 'index.md')
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, 'zh-CN', { numeric: true }))
  const subDirs = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, 'zh-CN', { numeric: true }))
    .filter((s) => containsMd(join(dir, s)))

  const hasContent = mdFiles.length > 0 || subDirs.length > 0

  if (hasContent) {
    // 站点开启了 TeX 数学（config.mts 的 markdown.math）：markdown 文本里的 $ 必须转义，
    // 否则 `$…$` 会被当作行内公式——例如文件名 `02$1 数据索引.md` 生成的链接
    // `- [02$1 数据索引](./02$1%20….md)` 会在 `$1 … $` 处被劈开而破坏链接。
    const esc = (s) => s.replace(/([\\$])/g, '\\$1')
    // 目标路径：常规 URL 编码后再把 $ 转成 %24，避免参与公式配对（%24 与 $ 等价）
    const url = (s) => encodeURI(s).replace(/\$/g, '%24')
    const lines = [`# ${esc(basename(dir))}`, '']
    for (const f of mdFiles) lines.push(`- [${esc(titleOf(f))}](./${url(f)})`)
    for (const s of subDirs) lines.push(`- [${esc(s)}](./${url(s)}/)`)
    writeFileSync(join(dir, 'index.md'), lines.join('\n') + '\n', 'utf8')
    console.log(`  ✓ ${join(dir, 'index.md')}`)
  }

  for (const s of subDirs) generate(join(dir, s))
}

for (const topDir of TOP_DIRS) {
  generate(join(LIBRARY_ROOT, topDir))
}
// 「当前进行」板块：笔记由 recent 分支托管在 current/ 下（CI 组装 base 时才存在），
// 同样为其科目/章节目录生成 index.md，供侧边栏目录链接与分层导航使用。
for (const tag of ['课内', '课外']) {
  const dir = join(LIBRARY_ROOT, 'current', tag)
  if (existsSync(dir)) generate(dir)
}
console.log('index.md 生成完成')
