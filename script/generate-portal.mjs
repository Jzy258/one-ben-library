#!/usr/bin/env node
/**
 * 壹苯图书馆 · 生成「最近笔记」(/recent) 与「当前进行」(/current/course + /current/extension) 板块
 *
 * 数据源：e:\Study\Learn\current.json（仅处理其中指定的项目，Study 其余笔记不动）
 *
 * 行为：
 *   1. 把 current.json 指定项目的 .md 笔记【复制】到 library\recent\<项目>\...（临时托管，可在线阅读）
 *      - 复制时去掉「（+）」进行中前缀；这些副本是临时的，完成科目后归档进分类树并移除
 *   2. 生成 library\recent.md（/recent 落地页，列出各项目笔记）
 *   3. 生成 library\current\{index,course,extension}.md（/current 概览，课内/课外）
 *
 * 用法：node e:\tmp\generate-portal.mjs
 * ⚠️ library\recent\ 目录完全由本脚本管理，运行会清空重建；完成后 git add + commit + push 部署。
 */
import {
  readFileSync, readdirSync, statSync, writeFileSync, mkdirSync, existsSync, rmSync, copyFileSync
} from 'node:fs'
import { join, basename, dirname } from 'node:path'

const CONFIG = {
  studyRoot: 'E:/Study',                            // 学习笔记区（源）
  currentJson: 'E:/Study/Learn/current.json',       // 当前项目索引（唯一范围来源）
  libraryRoot: 'E:/library'                         // 图书馆仓库（目标）
}

// 复制/扫描时排除的目录（隐藏目录 / 旧版遗留等）
const EXCLUDE_DIRS = new Set([
  '.git', '.github', '.obsidian', 'node_modules', 'dist', '.vitepress',
  'scripts', 'public', '.out', 'legacy'
])

// ---------- 工具 ----------

function pad(n) { return String(n).padStart(2, '0') }
function fmtDate(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}` }
function fmtDateShort(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` }
// 日期标签：如 2026-09-01 → 9月1日 · 周二
function fmtDateLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()]
  return `${d.getMonth() + 1}月${d.getDate()}日 · ${week}`
}
function toPosix(p) { return p.replace(/\\/g, '/') }

// 展示名：去 .md；去掉「（+）」进行中标记
function displayName(fname) {
  let n = fname.replace(/\.md$/, '')
  const inProgress = n.startsWith('（+）')
  if (inProgress) n = n.replace(/^（\+）\s*/, '')
  return { name: n, inProgress }
}

// 递归收集 .md 笔记（排除隐藏/构建/legacy 目录）
function collectMd(root) {
  const out = []
  const walk = (dir) => {
    let entries
    try { entries = readdirSync(dir, { withFileTypes: true }) } catch { return }
    for (const e of entries) {
      if (e.name.startsWith('.') || EXCLUDE_DIRS.has(e.name)) continue
      const p = join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name.endsWith('.md')) out.push(p)
    }
  }
  walk(root)
  return out
}

// 绝对路径 → VitePress 内部链接（/recent/<项目>/<相对路径>，逐段 URL 编码）
function hostedLink(projectName, relNoExt) {
  const segs = relNoExt.split('/').map((s) => encodeURIComponent(s))
  return '/recent/' + encodeURIComponent(projectName) + '/' + segs.join('/')
}

// ---------- 复制笔记到 library/recent/<项目>/ ----------

// 返回该项目的笔记条目 [{ name, inProgress, link, time, rel }]
function stageProject(proj, destRoot) {
  const absPath = toPosix(proj.path)
  const out = { name: proj.name, path: absPath, notes: [], missing: false }

  if (!existsSync(absPath)) {
    out.missing = true
    return out
  }

  const files = collectMd(absPath)
    .map((abs) => ({ abs, rel: toPosix(abs).replace(absPath + '/', ''), mtime: statSync(abs).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime)

  for (const f of files) {
    // 复制到 recent/<项目>/<相对路径>，去「（+）」前缀
    const parts = f.rel.split('/')
    const { name: cleanBase, inProgress } = displayName(parts[parts.length - 1])
    const relDirs = parts.slice(0, -1)
    const relCopy = [...relDirs, cleanBase + '.md'].join('/')
    const targetAbs = join(destRoot, proj.name, ...relCopy.split('/'))
    mkdirSync(dirname(targetAbs), { recursive: true })
    copyFileSync(f.abs, targetAbs)

    const relNoExt = relCopy.replace(/\.md$/, '')
    out.notes.push({
      name: cleanBase,
      inProgress,
      link: hostedLink(proj.name, relNoExt),
      time: fmtDateShort(new Date(f.mtime)),
      mtimeMs: f.mtime,
      project: proj.name,
      rel: relNoExt
    })
  }
  return out
}

// ---------- 生成 /recent 落地页 ----------
// 按日期分块，仅保留近 7 天的笔记；页面不在侧边栏，底部禁用随机的 上一篇/下一篇

function genRecentLanding(course, extension, now) {
  const days = 7
  const cutoff = now.getTime() - days * 86400000

  // 收集 7 天内的笔记（含所属项目）
  const notes = []
  for (const p of [...course, ...extension]) {
    if (p.missing) continue
    for (const n of p.notes) {
      if (n.mtimeMs >= cutoff) notes.push(n)
    }
  }

  // 按日期分组（日期倒序：新 → 旧）
  const byDate = new Map()
  for (const n of notes) {
    if (!byDate.has(n.time)) byDate.set(n.time, [])
    byDate.get(n.time).push(n)
  }
  const dates = [...byDate.keys()].sort((a, b) => (a < b ? 1 : -1))

  const lines = []
  lines.push('---', 'title: 最近笔记', 'prev: false', 'next: false', '---', '')
  lines.push('# 最近进行的笔记', '')

  if (!notes.length) {
    lines.push('_近 7 天暂无笔记。_', '')
  }

  for (const date of dates) {
    lines.push(`## ${fmtDateLabel(date)}`, '')
    // 同一天内：先按科目、再按 章节→编号 升序
    const dayNotes = byDate
      .get(date)
      .slice()
      .sort(
        (a, b) =>
          a.project.localeCompare(b.project, 'zh-CN') ||
          a.rel.localeCompare(b.rel, 'zh-CN', { numeric: true })
      )
    for (const n of dayNotes) {
      const relParts = n.rel.split('/')
      const sub = relParts.length > 1 ? relParts[0] : ''
      const loc = sub ? `${n.project} / ${sub}` : n.project
      lines.push(`- [${n.name}](${n.link})${n.inProgress ? ' 🔄 进行中' : ''} · ${loc}`)
    }
    lines.push('')
  }
  return lines.join('\n') + '\n'
}

// ---------- 生成 /current 概览 ----------

function genCurrentSection(title, tag, projects) {
  const lines = []
  lines.push('---')
  lines.push(`title: ${title}`)
  // 修复底部「上一篇/下一篇」：这些页不在侧边栏，需显式给出合理链接
  if (tag === '课内') {
    lines.push('prev:', '  text: 当前进行', '  link: /current/')
    lines.push('next:', '  text: 课外 · 自主学习', '  link: /current/extension')
  } else {
    lines.push('prev:', '  text: 课内 · 课程笔记', '  link: /current/course')
    lines.push('next: false')
  }
  lines.push('---', '')
  lines.push(`# 当前进行 · ${tag}`, '')

  if (!projects.length) {
    lines.push('_暂无项目。_', '')
  }

  for (const p of projects) {
    lines.push(`## ${p.name}`, '')
    if (p.missing) {
      lines.push('- ⚠️ 目录尚未创建（待开始）', '')
      continue
    }
    if (!p.notes.length) {
      lines.push('- （该目录暂无笔记）', '')
      continue
    }
    // 按 chXX 二级目录分组显示（项目标题下直接列出章节）
    const groups = new Map()
    for (const n of p.notes) {
      const relParts = n.rel.split('/')
      const sub = relParts.length > 1 ? relParts[0] : '根目录'
      if (!groups.has(sub)) groups.set(sub, [])
      groups.get(sub).push(n)
    }
    for (const [sub, items] of groups) {
      lines.push(`  - **${sub}**`)
      for (const n of items) {
        lines.push(`    - [${n.name}](${n.link})${n.inProgress ? ' 🔄 进行中' : ''} · ${n.time}`)
      }
    }
    lines.push('')
  }

  return lines.join('\n') + '\n'
}

// ---------- 主流程 ----------

function main() {
  const now = new Date()

  let current
  try {
    current = JSON.parse(readFileSync(CONFIG.currentJson, 'utf8'))
  } catch (e) {
    console.error('✗ 读取 current.json 失败：' + e.message)
    process.exit(1)
  }
  const courseRaw = current['课内'] || []
  const extensionRaw = current['课外'] || []

  const lib = CONFIG.libraryRoot
  const recentRoot = join(lib, 'recent')
  const curDir = join(lib, 'current')

  // recent/ 完全由脚本管理：清空重建
  rmSync(recentRoot, { recursive: true, force: true })
  mkdirSync(recentRoot, { recursive: true })
  mkdirSync(curDir, { recursive: true })

  const course = courseRaw.map((p) => stageProject(p, recentRoot))
  const extension = extensionRaw.map((p) => stageProject(p, recentRoot))

  writeFileSync(join(lib, 'recent.md'), genRecentLanding(course, extension, now), 'utf8')

  const coursePage = genCurrentSection('当前进行 · 课内', '课内', course)
  const extensionPage = genCurrentSection('当前进行 · 课外', '课外', extension)
  const currentIndex = [
    '---', 'title: 当前进行',
    'prev: false',
    'next:', '  text: 课内 · 课程笔记', '  link: /current/course',
    '---', '',
    '# 当前进行', '',
    '- [课内 · 课程笔记](./course) — 大三课程的学习笔记', '',
    '- [课外 · 自主学习](./extension) — 自学主线与兴趣方向', ''
  ].join('\n')
  writeFileSync(join(curDir, 'index.md'), currentIndex, 'utf8')
  writeFileSync(join(curDir, 'course.md'), coursePage, 'utf8')
  writeFileSync(join(curDir, 'extension.md'), extensionPage, 'utf8')

  // 统计
  const all = [...course, ...extension]
  const copied = all.filter((p) => !p.missing).reduce((s, p) => s + p.notes.length, 0)
  const missing = all.filter((p) => p.missing).map((p) => p.name)
  console.log(`✓ recent/ 托管笔记：${copied} 篇（项目：${all.map((p) => p.name).join(' / ') || '无'}）`)
  if (missing.length) console.log(`⚠ 以下项目目录不存在（已跳过）：${missing.join(' / ')}`)
  console.log('✓ 已生成：library/recent.md · library/current/{index,course,extension}.md')
  console.log('提醒：记得 git add -A && commit && push 触发部署。')
}

main()
