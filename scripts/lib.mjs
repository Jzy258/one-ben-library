// 公共扫描逻辑：中图分类目录树的主题/章节识别
// 被 .vitepress/buildSidebar.mjs 与 scripts/generate-index.mjs 共用
import { readdirSync } from 'node:fs'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// library 仓库根目录（本文件位于 <root>/scripts/ 下）
export const LIBRARY_ROOT = fileURLToPath(new URL('..', import.meta.url))
// 中图分类法顶层目录（后续新增其他大类时，可扩展为数组）
export const TOP_DIRS = ['T 工业技术']

// 目录是否直接包含 md 内容（不含 index.md 与隐藏文件）
export function hasDirectMd(dir) {
  return readdirSync(dir, { withFileTypes: true }).some(
    (e) => e.isFile() && !e.name.startsWith('.') && e.name.endsWith('.md') && e.name !== 'index.md'
  )
}

// 目录树内（递归）是否包含 md 内容
export function containsMd(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue
    const p = join(dir, e.name)
    if (e.isDirectory()) {
      if (containsMd(p)) return true
    } else if (e.name.endsWith('.md') && e.name !== 'index.md') {
      return true
    }
  }
  return false
}

// 中图分类号目录名模式：如 TP3、TN9、TP312.8JA Java语言程序设计
const CLASS_NUM_RE = /^[A-Z]{1,3}\d/

// 收集「主题目录」：
// - 直接包含 md（非 index）的目录，如 TypeScript、JavaWeb基础
// - 或直接包含 ch 章节目录的目录，如 MyBatis（含 ch01~）
// 分类目录（如 TP31、TP312.8JA Java语言程序设计）与 ch 章节目录不会被识别为主题。
export function collectTopics(baseDir) {
  const topics = []
  const scan = (dir, isBase = false) => {
    const entries = readdirSync(dir, { withFileTypes: true })
    const subDirs = entries.filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    const hasDirect = hasDirectMd(dir)
    const hasChSub = subDirs.some((s) => /^ch/i.test(s.name) && containsMd(join(dir, s.name)))
    const isTopic = !isBase && !CLASS_NUM_RE.test(basename(dir)) && (hasDirect || hasChSub)
    if (isTopic) {
      topics.push(dir)
      return
    }
    for (const sub of subDirs) scan(join(dir, sub.name))
  }
  scan(baseDir, true)
  return topics
}
