---
title: '02 获取 Class'
---

# 02 获取 Class

* 获取 `Class` 对象的方式：
* 调用 `Object` 类的 `getClass()` 方法
* 使用 `类.class` 语法
	* 基本数据类型也可以
* 使用 `Class` 类的 `forName()` 方法：
	* 参数写类的全限定名称（带有包名，不能省略 `java.lang`）
	* 若类不存在，则抛出 `ClassNotFoundException`
	* 会导致类的加载
* （已过时）通过 `Class` 的 `T newInstance()` 实例化对象
* 底层调用了该类的无参构造方法（必须保证无参方法存在）
