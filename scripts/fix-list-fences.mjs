// 修复「列表项内嵌代码块」：列表项后紧跟的代码围栏若缩进不足（顶格），
// 将其缩进到列表项内容列——围栏标记、内容、闭合一起缩进，保持列表连续、代码块在列表项内正常显示。
//
// 与 top-align-fences 配合：先统一顶格，再对列表项内的围栏重新缩进。
// 幂等：已正确缩进的围栏不会被重复修改。
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const LIBRARY_ROOT = fileURLToPath(new URL('..', import.meta.url))
// 列表项行：缩进（空格/tab）+ marker + 空格
const LIST_RE = /^([ \t]*)([-*+])( +)/
// 代码围栏标记行：任意缩进 + ```
const FENCE_RE = /^([ \t]*)(`{3,})/
// 围栏闭合行
const FENCE_END_RE = /^[ \t]*`{3,}\s*$/

// 缩进宽度（tab 按 4 空格停靠）
function indentWidth(s) {
  let w = 0
  for (const ch of s) w += ch === '\t' ? 4 - (w % 4) : 1
  return w
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === 'scripts' || e.name === 'public') continue
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith('.md')) out.push(p)
  }
  return out
}

let totalFiles = 0
let totalFences = 0

for (const file of walk(LIBRARY_ROOT)) {
  const lines = readFileSync(file, 'utf8').split('\n')
  let changed = 0
  let i = 0
  while (i < lines.length) {
    const lm = LIST_RE.exec(lines[i])
    if (lm) {
      // 列表项内容列（marker 后 + 2）
      const contentIndent = indentWidth(lm[1]) + 2
      const next = lines[i + 1] || ''
      const fm = FENCE_RE.exec(next)
      // 仅当围栏缩进不足列表项内容列时处理（顶格/不足 → 缩进进列表项）
      if (fm && indentWidth(fm[1]) < contentIndent) {
        // 从内容行（跳过开始行）找闭合，避免把无语言的开始行当作闭合
        let j = i + 2
        while (j < lines.length && !FENCE_END_RE.test(lines[j])) j++
        if (j < lines.length) {
          // 围栏开始行：缩进到内容列（保留语言标识）
          lines[i + 1] = ' '.repeat(contentIndent) + next.slice(fm[1].length)
          // 内容行：缩进不足内容列的补足（保留原有相对缩进）
          for (let k = i + 2; k < j; k++) {
            const line = lines[k]
            if (!line.trim()) continue
            const lead = (/^([ \t]*)/.exec(line) || ['', ''])[1]
            const w = indentWidth(lead)
            if (w < contentIndent) lines[k] = ' '.repeat(contentIndent - w) + line
          }
          // 围栏闭合行：缩进到内容列
          lines[j] = ' '.repeat(contentIndent) + lines[j].replace(/^[ \t]*/, '')
          changed++
          totalFences++
          i = j + 1
          continue
        }
      }
    }
    i++
  }
  if (changed > 0) {
    writeFileSync(file, lines.join('\n'), 'utf8')
    totalFiles++
    console.log(`  ✓ ${file.slice(LIBRARY_ROOT.length)}（${changed} 处）`)
  }
}

console.log(`\n完成：${totalFiles} 个文件，修复 ${totalFences} 处列表内代码块`)
