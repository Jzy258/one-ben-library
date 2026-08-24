---
title: '14 其他API'
---

# 14 其他API

* `shallowRef` 和 `shallowReactive`：
	* 浅层响应式
* `readonly`：
	* 生成只读的响应式对象副本
* `shallowReadonly`：
	* 生成只读的响应式对象副本
* `toRaw`：
	* 将响应式数据变为普通数据
* `markRaw`：
	* 标记该数据不可转换为响应式对象
* `customRef`：
	* 自定义响应式行为
	* 需要编写 `get()` 和 `set(value)`
	* **参数**：
		* `track()`：
			* 在 `get` 中调用
			* 用于建立依赖联系，实现当数据改变时通知 Vue 改变页面等副作用
		* `trigger()`：
			* 在 `set` 中调用
			* 通知所有在 `track` 时建立依赖联系的副作用