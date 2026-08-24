<template>
  <button
    class="sidebar-toggle"
    type="button"
    title="收起侧边栏"
    aria-expanded="true"
  >
    <i class="bi bi-chevron-double-left"></i>
  </button>
</template>

<style scoped>
.sidebar-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 15px;
  line-height: 1;
}
.sidebar-toggle:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}
/* 移动端（无固定侧边栏）隐藏 */
@media (max-width: 959px) {
  .sidebar-toggle {
    display: none;
  }
}
</style>
