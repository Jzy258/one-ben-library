---
title: '04 其他Vue指令'
---

# 04 其他Vue指令

* `v-if`：
	* 当 `v-if` 的条件为 `false` 时删除该 DOM 元素
* `v-show`：
	* 当条件为 `false` 时 `display: none`
* `v-else`：
	* 必须跟在 `v-if` 或 `v-if-else` 后，表示否则
* `v-if-else`：
	* 多条件判断
* `v-text`：
	* 将当前元素的 `innerText` 设为 `v-text` 的值
* `v-html`：
	* 将当前元素的 `innerHTML` 设为 `v-html` 的值
	* 不建议使用，存在 XSS 攻击风险
* `v-pre`：
	* 跳过 Vue 的编译，直接输出原始内容
	* 通常用于展示 Vue 模板代码
* `v-cloak`：
	* 防止 Vue 未编译完成时显示 `{{}}`
	* 需要配合 CSS 使用（==component `User05.vue`==）
* `v-once`：
	* 仅渲染一次，后续不再更新
	* 适用于静态内容优化
* `v-memo`（Vue3）：
	* 通常情况：
		* 组件内任何在模板中使用的响应式数据变化都会出发组件的重新渲染，导致模板内所有函数重新调用
	* 使用 `v-memo`：
		* 指定依赖项
		* 缓存模板片段，仅在依赖项变化时重新渲染
