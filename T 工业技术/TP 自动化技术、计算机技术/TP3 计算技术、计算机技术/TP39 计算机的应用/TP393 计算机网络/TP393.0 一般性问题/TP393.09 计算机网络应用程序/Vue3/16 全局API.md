---
title: '16 全局API'
---

# 16 全局API

* `app.mount(挂载位置)`：
	* 挂载应用到指定位置
* `app.unmount()`：
	* 卸载应用
* `app.use()`：
	* 使用某些功能
* `app.component(组件名, 组件)`：
	* 注册全局组件
	* 不需要手动 `import`
* `app.config`：
	* 全局配置
	* `errorHandler`：
		* 全局错误处理
		* 捕获整个应用中抛出的未处理异常并统一处理
		* **参数**：
			* `err`：
				* 捕获到的异常
			* `vm`：
				* 发生错误的 Vue 组件
			* `info`：
				* 错误来源
	* `globalProperties`：
		* 全局属性
		* 解决编译器报错问题：
          ```ts
          declare module 'vue' {
        	interface ComponentCustomProperties {
    		属性名: 属性类型
        	}
          }
          ```
* `app.directive()`：
	* 自定义指令
	* 指定自定义的 `v-xxx` 指令的行为
	* **参数**：
		* `element`：
			* 使用该指令的 DOM 元素
		* `value`：
			* 指令的参数值
