// 计算「最近一次提交」的学习主题，生成 latest.md 重定向页。
// 首页「开始阅读」按钮指向 /latest，随学习进度自动跟随最近提交的主题。
// 优先取 git 最近一次提交改动的笔记所属主题；无 git 记录时回退为最近修改的主题。
import { execSync } from 'node:child_process'
import { readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { LIBRARY_ROOT, TOP_DIRS, collectTopics } from './lib.mjs'

// 主题目录 → 跳转 URL（meta refresh 需要 URL 编码路径）
function topicLink(dir, topDir) {
  const rel = relative(join(LIBRARY_ROOT, topDir), dir)
  return '/' + topDir + '/' + rel.split(sep).map((s) => encodeURIComponent(s)).join('/') + '/'
}

// 建立「笔记文件绝对路径 → 所属主题链接」索引
function buildIndex() {
  const map = new Map()
  for (const topDir of TOP_DIRS) {
    const root = join(LIBRARY_ROOT, topDir)
    for (const dir of collectTopics(root)) {
      const link = topicLink(dir, topDir)
      const walk = (d) => {
        for (const e of readdirSync(d, { withFileTypes: true })) {
          if (e.name.startsWith('.')) continue
          const p = join(d, e.name)
          if (e.isDirectory()) walk(p)
          else if (e.name.endsWith('.md') && e.name !== 'index.md') map.set(p, link)
        }
      }
      walk(dir)
    }
  }
  return map
}

function latestTopicLink() {
  const index = buildIndex()
  // 1) 优先：最近一次 git 提交改动的笔记
  try {
    const out = execSync('git log -1 --name-only --format=', { cwd: LIBRARY_ROOT, encoding: 'utf8' })
    const touched = out
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((f) => join(LIBRARY_ROOT, f))
      .filter((f) => index.has(f))
    if (touched.length) {
      // 同一主题多个文件，取修改时间最新者归属的主题
      touched.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)
      return index.get(touched[0])
    }
  } catch {
    /* 无 git 记录则回退 */
  }
  // 2) 回退：按修改时间取最新笔记的主题
  let best = null
  for (const [file, link] of index) {
    const m = statSync(file).mtimeMs
    if (!best || m > best.m) best = { m, link }
  }
  return best ? best.link : '/T 工业技术/'
}

const link = latestTopicLink()

// 直接更新 index.md 中「开始阅读」按钮的链接（不经中间页，避免闪现）
const indexPath = join(LIBRARY_ROOT, 'index.md')
const indexContent = readFileSync(indexPath, 'utf8')
const updated = indexContent.replace(
  /(text: 开始阅读\r?\n\s+link: )[^\r\n]*/,
  `$1${link}`
)
if (updated !== indexContent) {
  writeFileSync(indexPath, updated, 'utf8')
  console.log(`✓ index.md「开始阅读」→ ${link}`)
} else {
  console.log('⚠ index.md 未找到「开始阅读」的 link 行')
}

// 清理不再需要的 latest.md（此前方案遗留）
try {
  rmSync(join(LIBRARY_ROOT, 'latest.md'))
  console.log('✓ 已删除 latest.md')
} catch {
  /* 不存在则忽略 */
}
