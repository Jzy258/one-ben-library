// 更新首页按钮链接：
//  - 「最近更新」→ /recent（最近笔记页，recent 分支临时托管）
//  - 「分类导航」→ 顶层分类目录
// 幂等：重复运行结果一致。
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { LIBRARY_ROOT, TOP_DIRS } from './lib.mjs'

// 直接更新 index.md 中「最近更新」与「分类导航」按钮的链接（不经中间页，避免闪现）
const indexPath = join(LIBRARY_ROOT, 'index.md')
const indexContent = readFileSync(indexPath, 'utf8')
const updated = indexContent
  .replace(/(text: 最近更新\r?\n\s+link: )[^\r\n]*/, `$1/recent`)
  .replace(/(text: 分类导航\r?\n\s+link: )[^\r\n]*/, `$1/${TOP_DIRS[0] || 'T 工业技术'}/`)
if (updated !== indexContent) {
  writeFileSync(indexPath, updated, 'utf8')
  console.log('✓ index.md「最近更新」→ /recent')
} else if (/text: 最近更新\r?\n\s+link: /.test(indexContent)) {
  console.log('✓ index.md「最近更新」已是 /recent')
} else {
  console.log('⚠ index.md 未找到「最近更新」的 link 行')
}

// 清理不再需要的 latest.md（此前方案遗留）
try {
  rmSync(join(LIBRARY_ROOT, 'latest.md'))
  console.log('✓ 已删除 latest.md')
} catch {
  /* 不存在则忽略 */
}
