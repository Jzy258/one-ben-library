// 为笔记文档设置标题：frontmatter title + 正文 H1（标题 = 文件名，如「01 TS简介」）。
// 幂等：重复运行不会重复添加；index.md / README.md / latest.md 等特殊页不处理。
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const LIBRARY_ROOT = fileURLToPath(new URL('..', import.meta.url))
const SKIP = new Set(['index.md', 'README.md', 'latest.md', 'recent.md', 'course.md', 'extension.md'])

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === 'scripts' || e.name === 'public') continue
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith('.md')) out.push(p)
  }
  return out
}

// 去除开头的 frontmatter 块，返回剩余正文
function stripFrontmatter(content) {
  const lines = content.replace(/^\uFEFF/, '').split('\n')
  if (!/^---\s*$/.test(lines[0] || '')) return content
  for (let i = 1; i < lines.length; i++) {
    if (/^---\s*$/.test(lines[i])) return lines.slice(i + 1).join('\n')
  }
  return content
}

let total = 0
for (const file of walk(LIBRARY_ROOT)) {
  const name = file.split(/[\\/]/).pop()
  if (SKIP.has(name)) continue
  const content = readFileSync(file, 'utf8')
  const title = name.replace(/\.md$/, '')
  const safeTitle = title.replace(/'/g, "''")
  const rest = stripFrontmatter(content)
  const body = rest.replace(/^\s*\r?\n/, '') // 去前导空行
  const newBody = /^#\s/.test(body) ? body : `# ${title}\n\n${body}`
  const newContent = `---\ntitle: '${safeTitle}'\n---\n\n${newBody}`
  if (newContent !== content) {
    writeFileSync(file, newContent, 'utf8')
    total++
  }
}

console.log(`✓ 已更新 ${total} 个文档的标题`)
