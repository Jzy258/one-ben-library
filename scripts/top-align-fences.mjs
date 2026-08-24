// 统一代码块顶格：所有代码围栏标记行（``` 开始/闭合）去掉前导空白（tab/空格），
// 作为独立的顶格代码块。代码内容保留原样，不影响代码结构与显示。
//
// 注意：只处理代码围栏标记行，绝不改动列表项的缩进层级。
// 幂等：已顶格的围栏不会被重复修改。
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const LIBRARY_ROOT = fileURLToPath(new URL('..', import.meta.url))
// 行首 1+ 空白，后跟 ```（代码围栏标记行）
const FENCE_MARK_RE = /^[\t ]+(?=`{3,})/

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
let totalLines = 0

for (const file of walk(LIBRARY_ROOT)) {
  const lines = readFileSync(file, 'utf8').split('\n')
  let changed = 0
  const out = lines.map((line) => {
    // 代码围栏标记行 → 顶格（列表项的缩进层级保持不变）
    if (FENCE_MARK_RE.test(line)) {
      changed++
      return line.replace(/^[\t ]+/, '')
    }
    return line
  })
  if (changed > 0) {
    writeFileSync(file, out.join('\n'), 'utf8')
    totalFiles++
    totalLines += changed
    console.log(`  ✓ ${file.slice(LIBRARY_ROOT.length)}（${changed} 处）`)
  }
}

console.log(`\n完成：${totalFiles} 个文件，共 ${totalLines} 处规范化`) 
