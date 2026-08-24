/**
 * 构建前处理：把仓库中的「分类目录」重命名为分类号，缩短页面路径
 *
 * 用于 CI（GitHub Actions）：在 `vitepress build` 之前执行，把 checkout 副本里的
 * 分类目录（如 `T 工业技术`、`TP312.8JA Java语言程序设计`）重命名为分类号
 * （`T`、`TP312.8JA`）。这样 VitePress 生成的 URL / chunk 名 / 侧边栏全部基于
 * 短路径，彻底规避：
 *  - Linux 文件系统 / tar 打包的 255 字节文件名限制（ENAMETOOLONG）
 *  - GitHub Pages artifact 的路径长度限制
 *
 * 注意：只应在构建的 checkout 副本上运行（构建后即弃），不改动本地仓库结构。
 * 幂等：已压缩的目录不会重复处理。
 *
 * 用法：node scripts/rename-class-dirs.mjs [root]
 */
import { readdirSync, statSync, renameSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..', process.argv[2] || '.')

// 分类目录：以「分类号 + 空格」开头（如 T 工业技术、TP3 计算技术、TP312.8JA Java…）
const CLASS_DIR_RE = /^[A-Z]{1,3}(?:\d[\d.]*[A-Z]*)?\s/
const classNum = (name) => (name.match(/^(\S+)/) || [name])[1]

let count = 0
function renameDir(absDir) {
  const parent = path.dirname(absDir)
  const base = path.basename(absDir)
  // 跳过隐藏/系统目录
  if (base.startsWith('.') || base === 'node_modules') return
  let cur = absDir
  if (CLASS_DIR_RE.test(base)) {
    const newBase = classNum(base)
    if (newBase !== base) {
      const newAbs = path.join(parent, newBase)
      if (!statSync(newAbs, { throwIfNoEntry: false })) {
        renameSync(cur, newAbs)
        cur = newAbs
        count++
      }
    }
  }
  for (const e of readdirSync(cur)) {
    const p = path.join(cur, e)
    if (statSync(p).isDirectory()) renameDir(p)
  }
}
renameDir(root)
console.log(`[rename-class-dirs] 完成：重命名 ${count} 个分类目录（root=${root}）`)
