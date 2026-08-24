<template>
  <nav v-if="crumbs.length" class="vp-breadcrumb" aria-label="面包屑">
    <ol ref="olRef">
      <li v-for="(item, i) in crumbs" :key="i" class="crumb">
        <a v-if="item.link" :href="item.link" :title="item.full" class="crumb-link">{{ display[i] }}</a>
        <span v-else class="crumb-current" :title="item.full">{{ display[i] }}</span>
        <span v-if="i < crumbs.length - 1" class="crumb-sep">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useData, withBase } from 'vitepress'

const { page } = useData()
const olRef = ref(null)
const crumbs = ref([])
const display = ref([])

// 中图分类目录判定：以「分类号 + 空格」开头（如 T 工业技术、TP3 计算技术、TP312.8JA Java…）
const isClassDir = (text) => /^[A-Z]{1,3}(?:\d[\d.]*[A-Z]*)?\s/.test(text)
// 分类编号：第一个空格前（如 T、TP、TP3、TP312.8JA）
const classNum = (text) => (text.match(/^(\S+)/) || [text])[1]
const encodePath = (p) => p.split('/').map((s) => encodeURIComponent(s)).join('/')

function build() {
  const rel = page.value.relativePath || ''
  // 首页等特殊情况不显示面包屑
  if (!rel || rel === 'index.md') {
    crumbs.value = []
    return
  }
  let parts = rel.replace(/\.md$/, '').split('/')
  // 目录页（index.md）去掉末尾的 index，面包屑止于该目录本身
  if (parts[parts.length - 1] === 'index') parts = parts.slice(0, -1)
  if (parts.length === 0) {
    crumbs.value = []
    return
  }
  const items = []
  let acc = ''
  parts.forEach((part, idx) => {
    acc += (idx ? '/' : '') + part
    const isLast = idx === parts.length - 1
    const cls = isClassDir(part)
    items.push({
      full: part,
      short: cls ? classNum(part) : part,
      link: isLast ? '' : withBase('/' + encodePath(acc) + '/'),
      isClassDir: cls
    })
  })
  crumbs.value = items
  display.value = items.map((c) => c.full)
}

// 一行放不下时，从高级（左侧）往低级逐个把分类目录折叠为「分类编号」
function fit() {
  const ol = olRef.value
  if (!ol) return
  display.value = crumbs.value.map((c) => c.full) // 先重置为完整
  let guard = 0
  const step = () => {
    if (++guard > 80) return
    if (ol.scrollWidth <= ol.clientWidth) return
    const idx = display.value.findIndex(
      (d, i) => d === crumbs.value[i].full && crumbs.value[i].isClassDir
    )
    if (idx === -1) return
    display.value[idx] = crumbs.value[idx].short
    nextTick(step)
  }
  nextTick(step)
}

function onResize() {
  nextTick(fit)
}

onMounted(() => {
  build()
  nextTick(fit)
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
watch(
  () => page.value.relativePath,
  () => {
    build()
    nextTick(fit)
  }
)
</script>

<style scoped>
.vp-breadcrumb {
  margin: 10px 0 16px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.vp-breadcrumb ol {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
}
.vp-breadcrumb .crumb {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  max-width: 40ch;
}
.vp-breadcrumb .crumb-link {
  color: var(--vp-c-text-2);
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
}
.vp-breadcrumb .crumb-link:hover {
  color: var(--vp-c-brand-1);
}
.vp-breadcrumb .crumb-current {
  color: var(--vp-c-text-1);
  font-weight: 500;
}
.vp-breadcrumb .crumb-sep {
  margin: 0 6px;
  color: var(--vp-c-text-3);
}
</style>
