// VitePress 主题入口：引入 Bootstrap Icons 图标字体 + 自定义样式 + 面包屑
import { h, onMounted } from 'vue'
import { useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Breadcrumb from './components/Breadcrumb.vue'
import SidebarToggle from './components/SidebarToggle.vue'
import './custom.css'

/*
 * 说明：自定义 Layout 的插槽组件在客户端不会激活（纯 SSR 静态渲染），
 * 因此按钮事件用原生 DOM 绑定，而非 Vue @click。
 */
function bindSidebarToggle() {
  const btn = document.querySelector('.sidebar-toggle')
  if (!btn || btn.dataset.bound) return
  btn.dataset.bound = '1'

  const sync = () => {
    const collapsed = document.documentElement.classList.contains('sidebar-collapsed')
    const icon = btn.querySelector('i')
    if (icon) icon.className = collapsed ? 'bi bi-chevron-double-right' : 'bi bi-chevron-double-left'
    btn.title = collapsed ? '展开侧边栏' : '收起侧边栏'
    btn.setAttribute('aria-expanded', String(!collapsed))
  }

  sync()
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    document.documentElement.classList.toggle('sidebar-collapsed')
    sync()
  })
}

/*
 * 面包屑折叠（原生实现）：一行放不下时，从高级（左侧）往低级逐个把
 * 分类目录折叠为「分类编号」。与按钮同理，插槽组件未激活，故原生实现。
 * crumb 的完整名称存在 title 属性中，可据此恢复/折叠。
 */
function bindBreadcrumbFit() {
  const doFit = () => {
    window.__bcFitBusy = false
    const bc = document.querySelector('.vp-breadcrumb')
    const ol = bc && bc.querySelector('ol')
    if (!ol || !bc.isConnected) return
    const lis = [...ol.children]
    // 先恢复为完整名称
    lis.forEach((li) => {
      const el = li.querySelector('a, .crumb-current')
      if (el && el.title && el.textContent !== el.title) el.textContent = el.title
    })
    // 再逐个折叠分类目录
    let guard = 0
    while (++guard < 100 && ol.scrollWidth > ol.clientWidth) {
      const li = lis.find((item) => {
        const el = item.querySelector('a, .crumb-current')
        return (
          el &&
          el.title &&
          el.textContent === el.title &&
          /^[A-Z]{1,3}(?:\d[\d.]*[A-Z]*)?\s/.test(el.title)
        )
      })
      if (!li) break
      const el = li.querySelector('a, .crumb-current')
      el.textContent = el.title.match(/^(\S+)/)[1]
    }
  }
  const schedule = () => {
    if (window.__bcFitBusy) return
    window.__bcFitBusy = true
    // 用 setTimeout 而非 requestAnimationFrame（某些环境 rAF 不触发会卡死防抖标志）
    setTimeout(doFit, 0)
  }
  // 只全局绑定一次 resize 监听
  if (!window.__bcFitBound) {
    window.__bcFitBound = true
    window.addEventListener('resize', schedule)
  }
  schedule()
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Breadcrumb', Breadcrumb)
    app.component('SidebarToggle', SidebarToggle)
  },
  Layout: {
    setup(props, { slots }) {
      if (typeof window !== 'undefined') {
        const router = useRouter()
        onMounted(() => {
          bindSidebarToggle()
          bindBreadcrumbFit()
          // 注意：这是赋值式钩子（每次路由变化后调用），勿写成方法调用
          router.onAfterRouteChange = () => {
            bindSidebarToggle()
            bindBreadcrumbFit()
          }
        })
      }
      return () =>
        h(DefaultTheme.Layout, props, {
          'doc-before': () => h(Breadcrumb),
          'nav-bar-title-before': () => h(SidebarToggle),
          ...slots
        })
    }
  }
}
