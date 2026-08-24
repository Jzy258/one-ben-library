// 自动扫描中图分类目录树，生成 VitePress 侧边栏（完整树：分类 → 主题 → 章节 → 笔记）。
// 侧边栏包含全部页面，保证文档底部「上一篇/下一篇」按同级顺序正确生成。
// 主题默认折叠，点击展开查看内部笔记；当前所在主题自动展开。
// 公共扫描逻辑见 scripts/lib.mjs
import { readdirSync } from 'node:fs'
import { basename, join, relative, sep } from 'node:path'
import { LIBRARY_ROOT, TOP_DIRS, collectTopics, containsMd } from '../scripts/lib.mjs'

// 相对路径各段 URL 编码后拼接
const relLink = (rel) => rel.split(sep).map((s) => encodeURIComponent(s)).join('/')
// 目录链接（cleanUrls 目录路由，指向该目录 index.md）
const dirLink = (topDir, dir) =>
  '/' + topDir + '/' + relLink(relative(join(LIBRARY_ROOT, topDir), dir)) + '/'
// 文件链接（cleanUrls 去掉 .md）
const fileLink = (topDir, dir, fname) =>
  '/' +
  topDir +
  '/' +
  relLink(relative(join(LIBRARY_ROOT, topDir), join(dir, fname))).replace(/\.md$/, '')

const nameSort = (a, b) => a.localeCompare(b, 'zh-CN', { numeric: true })

// 递归构建主题树：直接 md → 项；含内容的子目录 → 子组（含其下内容）
function buildTopic(dir, topDir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  const mdFiles = entries
    .filter((e) => e.isFile() && !e.name.startsWith('.') && e.name.endsWith('.md') && e.name !== 'index.md')
    .map((e) => e.name)
    .sort(nameSort)
  const subDirs = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith('.') && containsMd(join(dir, e.name)))
    .map((e) => e.name)
    .sort(nameSort)

  const items = []
  for (const f of mdFiles) {
    items.push({ text: f.replace(/\.md$/, ''), link: fileLink(topDir, dir, f) })
  }
  for (const s of subDirs) {
    const sub = join(dir, s)
    items.push({ text: s, link: dirLink(topDir, sub), items: buildTopic(sub, topDir) })
  }
  return items
}

// 生成侧边栏：顶层分类 → 二级分类 → 主题（可展开内部章节/笔记）
export function buildSidebar() {
  const groups = new Map()

  for (const topDir of TOP_DIRS) {
    const root = join(LIBRARY_ROOT, topDir)
    for (const dir of collectTopics(root)) {
      const rel = relative(root, dir)
      const parts = rel.split(sep)
      const groupName = parts[0] // 二级分类，例如「TP 自动化技术、计算机技术」
      const topicName = basename(dir)
      const topic = {
        text: topicName,
        link: dirLink(topDir, dir),
        collapsed: true,
        items: buildTopic(dir, topDir)
      }
      if (!groups.has(groupName)) groups.set(groupName, [])
      groups.get(groupName).push(topic)
    }
  }

  // 同组内按主题名排序
  for (const items of groups.values()) {
    items.sort((a, b) => a.text.localeCompare(b.text, 'zh-CN'))
  }

  return [
    {
      text: '<i class="bi bi-collection"></i> 分类导航',
      items: [...groups.entries()].map(([group, groupItems]) => ({
        text: group,
        collapsed: false,
        items: groupItems
      }))
    }
  ]
}
