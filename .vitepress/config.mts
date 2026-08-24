import { defineConfig } from 'vitepress'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildSidebar } from './buildSidebar.mjs'

// 壹苯图书馆 · VitePress 配置
// 内容源 = library 仓库根目录（srcDir: '.'），中图分类目录树原地作为网站内容

// GitHub Pages 项目页 URL 带仓库名前缀（如 /library/），由部署流水线注入；
// 本地预览时默认为 /
const base = process.env.VITEPRESS_BASE || '/'

// 动态检测顶层分类目录：兼容完整名 `T 工业技术`（本地）与 CI 压缩名 `T`
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CLASS_DIR_RE = /^[A-Z]{1,3}(?:\d[\d.]*[A-Z]*)?\s/
const SHORT_RE = /^[A-Z]{1,3}(?:\d[\d.]*[A-Z]*)?$/
const TOP_DIR =
  readdirSync(path.join(__dirname, '..'), { withFileTypes: true })
    .filter(
      (d) =>
        d.isDirectory() &&
        !d.name.startsWith('.') &&
        (CLASS_DIR_RE.test(d.name) || SHORT_RE.test(d.name))
    )
    .map((d) => d.name)[0] || 'T 工业技术'

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: '壹苯图书馆',
  description: '个人知识笔记库 · 按中国图书馆分类法整理',

  // 直接以仓库根目录作为内容源，笔记与网页共用同一份 Markdown
  srcDir: '.',
  cleanUrls: true,
  // 关闭 lastUpdated：其对每页执行 git 查询是构建主要瓶颈，关闭后构建提速约 48%（50s→26s）
  lastUpdated: false,

  // 笔记中的示例链接（localhost 等本地地址）不参与死链检查，其他内部链接仍严格检查
  ignoreDeadLinks: [
    /^https?:\/\/localhost/,
    /^https?:\/\/127\.0\.0\.1/,
    /^https?:\/\/example\.com/
  ],

  // 浏览器标签页图标（favicon）
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]],

  markdown: {
    lineNumbers: true
  },

  themeConfig: {
    // 导航栏 Logo（徽章版：浅色圆底 + 原深蓝，明暗通用）
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '<i class="bi bi-book-half"></i> T 工业技术', link: '/' + TOP_DIR + '/' }
    ],

    // 自动侧边栏：扫描中图分类目录树生成（见 buildSidebar.mjs）
    sidebar: buildSidebar(),

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索笔记', buttonAriaLabel: '搜索笔记' },
          modal: {
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换' }
          }
        }
      }
    },

    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一篇', next: '下一篇' },
    footer: {
      message: '壹苯图书馆 · 个人知识笔记',
      copyright: '仅用于个人学习交流'
    },

    // 404 页面中文化
    notFound: {
      code: '404',
      title: '页面未找到',
      quote: '你要找的笔记不在这里，可能已被移动或从未存在。回到首页继续探索吧。',
      linkLabel: '返回首页',
      linkText: '返回首页'
    }
  }
})
