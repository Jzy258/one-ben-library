* `setup`：==component `User01.vue`==
	* Vue3 组合式 API 的核心入口函数
	* Vue 会在**组件初始化**时自动调用 `setup` 函数
		* 只调用一次
	* **作用**：
		* 集中管理组件的状态、方法、生命周期等
	*  **返回值**：
		* 模板（`<template>`）可访问的数据
		* 渲染函数：
			* 本身的返回值会覆盖 `template` 中的全部内容
	* 语法糖：==component `User02.vue`==
	* 在 `script` 标签中直接配置 `name` 属性：
		* 安装 `vite-plugin-vue-setup-extend` npm 包
