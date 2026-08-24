---
title: '04 select'
---

# 04 select

查询一个：
* `SqlSession#selectOne`

需要在 `Mapper` 中指定 `resultType` 属性：
* 用于指定返回对象的类型
* 必须是类的全限定名称
* 返回的对象部分属性为 `null`：
	* 为各个字段设置与对象属性同名的别名（使用 `as`）

查询多个：
* `SqlSession#selectList`
* 返回值为 `List`

