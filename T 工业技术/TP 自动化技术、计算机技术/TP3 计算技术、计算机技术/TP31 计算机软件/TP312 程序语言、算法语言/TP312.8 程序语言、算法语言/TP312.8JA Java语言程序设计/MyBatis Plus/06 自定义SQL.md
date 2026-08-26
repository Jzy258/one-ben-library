---
title: '06 自定义SQL'
---

# 06 自定义SQL

* 注解方式：
	* 直接在 Mapper 接口中定义方法
	* 使用 `@Select`、`@Insert`、`@Update`、`@Delete` 等注解
	* 注解参数传入 SQL 片段（`String`）
* XML 方式：
	* 直接在 Mapper 接口中定义方法
	* 使用 `@Param` 指定变量名
	* 在对应的 Mapper.xml 中新增对应的 `<select>`、`<insert>`、`<update>`、`<delete>` 标签
	* `id` 指定为对应方法名
	* 内容文本编写 SQL 语句
	* 指定 `resultType` 属性
* 自定义 SQL 也支持 `Wrapper`：
	* 使用 `@Param("w")` 为 `Wrapper` 指定属性名
	* 在 `Mapper.xml` 中使用 `${w.customSqlSement}` 插入 `WHERE` 条件
