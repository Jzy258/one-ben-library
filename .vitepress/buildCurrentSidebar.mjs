// 生成「当前进行」(/current) 板块的侧边栏（完整树：课内/课外 → 科目 → 章节 → 笔记）。
// 数据源 = recent 分支托管在 current/ 下的笔记副本：CI 组装时才合并进 base，本地可能不存在（返回空）。
// 与主板块（buildSidebar.mjs）一致：目录节点链到该目录的 index.md（构建时由 scripts/generate-index.mjs 生成）。
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { LIBRARY_ROOT, containsMd } from '../scripts/lib.mjs'

const nameSort = (a, b) => a.localeCompare(b, 'zh-CN', { numeric: true })
const enc = (s) => encodeURIComponent(s)

// 递归构建：直接 md → 笔记项；含内容的子目录（章节）→ 可折叠子组（链接到该目录 index.md）
function buildTree(dir, urlBase) {
  const entries = readdirSync(dir, { withFileTypes: true })
  const mdFiles = entries
    .filter(
      (e) => e.isFile() && !e.name.startsWith('.') && e.name.endsWith('.md') && e.name !== 'index.md'
    )
    .map((e) => e.name)
    .sort(nameSort)
  const subDirs = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith('.') && containsMd(join(dir, e.name)))
    .map((e) => e.name)
    .sort(nameSort)

  const items = []
  for (const f of mdFiles) {
    const name = f.replace(/\.md$/, '')
    items.push({ text: name, link: `${urlBase}/${enc(name)}` })
  }
  // 章节（第 3 层）默认折叠；VitePress 会自动展开当前页所在的组
  for (const s of subDirs) {
    const childBase = `${urlBase}/${enc(s)}`
    items.push({
      text: s,
      link: `${childBase}/`,
      collapsed: true,
      items: buildTree(join(dir, s), childBase)
    })
  }
  return items
}

// 课内在前、课外在后；组标题仍链到落地页 /current/course、/current/extension
const TAGS = [
  { dir: '课内', text: '课内 · 课程笔记', link: '/current/course' },
  { dir: '课外', text: '课外 · 自主学习', link: '/current/extension' }
]

export function buildCurrentSidebar() {
  const groups = []

  for (const t of TAGS) {
    const dir = join(LIBRARY_ROOT, 'current', t.dir)
    if (!existsSync(dir)) continue
    const urlBase = `/current/${enc(t.dir)}`
    const subjects = readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith('.') && containsMd(join(dir, e.name)))
      .map((e) => e.name)
      .sort(nameSort)

    // 层级：课内/课外（第 1 层，默认展开）→ 科目（第 2 层，默认可见但折叠）→ 章节 → 笔记。
    // 即默认只展开到科目层：科目下的章节/笔记需点击展开（当前页所在的组会被自动展开）。
    groups.push({
      text: t.text,
      link: t.link,
      collapsed: false,
      items: subjects.map((s) => {
        const subBase = `${urlBase}/${enc(s)}`
        return {
          text: s,
          link: `${subBase}/`,
          collapsed: true,
          items: buildTree(join(dir, s), subBase)
        }
      })
    })
  }

  return groups.length ? [{ text: '当前进行', items: groups }] : []
}
