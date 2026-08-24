// 生成「壹苯图书馆」候选 Logo · 第三轮（基于方案 C 深化）
// 关键修正：凯库勒式双键画在六边形内部（化学式标准画法）
// 运行：node scripts/generate-logos.mjs → 输出 public/logo-c1~c4.svg
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const PUBLIC_DIR = fileURLToPath(new URL('../public/', import.meta.url))
mkdirSync(PUBLIC_DIR, { recursive: true })

const r2 = (n) => +n.toFixed(2)

function hexVerts(cx, cy, r) {
  const pts = []
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (-90 + i * 60)
    pts.push([r2(cx + r * Math.cos(a)), r2(cy + r * Math.sin(a))])
  }
  return pts
}

// 双键内侧短线：向环心偏移 off，且两端各缩短 shrink（不接触六边形顶点）
function bondInner(p1, p2, c, off, shrink = 3.5) {
  const mx = (p1[0] + p2[0]) / 2
  const my = (p1[1] + p2[1]) / 2
  const dx = c[0] - mx
  const dy = c[1] - my
  const len = Math.hypot(dx, dy) || 1
  const ox = (dx / len) * off
  const oy = (dy / len) * off
  // 沿边方向缩短两端
  const ex = p2[0] - p1[0]
  const ey = p2[1] - p1[1]
  const elen = Math.hypot(ex, ey) || 1
  const sx = (ex / elen) * shrink
  const sy = (ey / elen) * shrink
  return [
    [r2(p1[0] + ox + sx), r2(p1[1] + oy + sy)],
    [r2(p2[0] + ox - sx), r2(p2[1] + oy - sy)]
  ]
}
const L = (p1, p2, color, w) =>
  `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`

// 凯库勒式苯环（双键在内侧，0-1/2-3/4-5 为双键金，其余单键主色）
function benzene(cx, cy, r, { single = '#1D4ED8', dbl = '#F59E0B', w = 3, off = 4.2 } = {}) {
  const P = hexVerts(cx, cy, r)
  const out = []
  for (let i = 0; i < 6; i++) {
    const a = P[i]
    const b = P[(i + 1) % 6]
    if (i % 2 === 0) {
      const inner = bondInner(a, b, [cx, cy], off)
      out.push(L(a, b, dbl, w))
      out.push(L(inner[0], inner[1], dbl, w))
    } else {
      out.push(L(a, b, single, w))
    }
  }
  return out.join('\n  ')
}

// 打开的书剪影
function openBook(cx, topY, halfW, bottomY, leftC, rightC) {
  const pageTop = topY + 12
  const spineBot = bottomY - 6
  return `
  <path d="M${cx} ${topY} L${cx - halfW} ${pageTop} L${cx - halfW} ${bottomY} L${cx} ${spineBot} Z" fill="${leftC}"/>
  <path d="M${cx} ${topY} L${cx + halfW} ${pageTop} L${cx + halfW} ${bottomY} L${cx} ${spineBot} Z" fill="${rightC}"/>
  <line x1="${cx}" y1="${topY}" x2="${cx}" y2="${spineBot}" stroke="#fff" stroke-width="2.5" opacity="0.7"/>`
}

const wrap = (inner) =>
  `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">\n  ${inner}\n</svg>\n`

const SVGS = {}

// C1 · 书在环中（双键内侧修正版）
SVGS.c1 = wrap(
  `${benzene(60, 62, 37, { w: 3.4, off: 4.4 })}
  ${openBook(60, 46, 24, 78, '#93C5FD', '#3B82F6')}`
)

// C2 · 徽章微调（浅色圆形徽章底 + 苯环略小、书略大）
SVGS.c2 = wrap(
  `<circle cx="60" cy="62" r="45" fill="#EEF2FF"/>
  ${benzene(60, 62, 34, { w: 3.2, off: 4.2 })}
  ${openBook(60, 49, 22, 77, '#93C5FD', '#3B82F6')}`
)

// 创意1 · 苯环放大镜（苯环作镜片，透过它看书页）
SVGS.c3 = wrap(
  `${openBook(60, 46, 28, 74, '#93C5FD', '#3B82F6')}
  <polygon points="${hexVerts(68, 50, 17).map((p) => p.join(',')).join(' ')}" fill="rgba(255,255,255,0.5)"/>
  ${benzene(68, 50, 17, { w: 3.6, off: 4.4 })}
  <line x1="61" y1="51" x2="75" y2="47" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
  <line x1="61" y1="56" x2="75" y2="52" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
  <line x1="82" y1="64" x2="97" y2="81" stroke="#1D4ED8" stroke-width="5" stroke-linecap="round"/>`
)

// 创意2 · 苯环书脊（苯环为脊，两页向左右展开）
SVGS.c4 = wrap(
  `${benzene(60, 56, 22, { w: 3.4, off: 4.2 })}
  <path d="M38 56 L18 66 L18 96 L38 82 Z" fill="#93C5FD"/>
  <path d="M82 56 L102 66 L102 96 L82 82 Z" fill="#3B82F6"/>
  <line x1="18" y1="96" x2="102" y2="96" stroke="#1D4ED8" stroke-width="3.5" stroke-linecap="round"/>`
)

for (const [k, v] of Object.entries(SVGS)) {
  writeFileSync(join(PUBLIC_DIR, `logo-${k}.svg`), v, 'utf8')
  console.log(`✓ logo-${k}.svg`)
}

// —— 最终应用版本 ——
// 徽章版主 logo：浅色圆底 + 原深蓝配色（明暗模式通用，深色下靠浅底保证对比度）
const logoBadge = wrap(
  `<circle cx="60" cy="62" r="46" fill="#EEF2FF"/>
  ${benzene(60, 62, 37, { single: '#1D4ED8', dbl: '#F59E0B', w: 3.4, off: 4.4 })}
  ${openBook(60, 46, 24, 78, '#93C5FD', '#3B82F6')}`
)
writeFileSync(join(PUBLIC_DIR, 'logo.svg'), logoBadge, 'utf8')
writeFileSync(join(PUBLIC_DIR, 'logo-dark.svg'), logoBadge, 'utf8')
writeFileSync(join(PUBLIC_DIR, 'logo-badge.svg'), logoBadge, 'utf8')
// favicon 徽章版（浅色圆底 + 深蓝苯环，与主 logo 统一；16px 下圆底保证明暗可见）
const faviconSvg = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="29" fill="#EEF2FF"/>
  ${benzene(32, 32, 21, { single: '#1D4ED8', dbl: '#F59E0B', w: 5, off: 3.6 })}
</svg>\n`
writeFileSync(join(PUBLIC_DIR, 'favicon.svg'), faviconSvg, 'utf8')
console.log('✓ logo.svg / logo-dark.svg / logo-badge.svg / favicon.svg（明暗适配版）')
console.log('候选方案已输出到 public/')
