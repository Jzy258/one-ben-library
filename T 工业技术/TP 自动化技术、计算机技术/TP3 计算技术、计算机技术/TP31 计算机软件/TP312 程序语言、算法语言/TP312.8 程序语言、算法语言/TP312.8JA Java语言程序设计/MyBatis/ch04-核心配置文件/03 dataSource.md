---
title: '03 dataSource'
---

# 03 dataSource

数据源：
* 为程序提供 `Connection` 对象
* 数据源都实现了标准数据源接口 `javax.sql.DataSource` 规范

常见数据库连接池：
* druid
* c3p0
* dbcp
* ...

`<dataSource>` 的 `type` 属性：
* 用于指定数据源的类型，即通过什么方式获取 `Connection` 对象
* 可选值：
	* `UNPOOLED`：
		* 不使用数据库连接池，每次请求创建新的 `Connection` 对象
	* `POOLED`：
		* 使用 MyBatis 实现的数据库连接池
		* `poolMaximumActiveConnections` 属性：
			* 连接池中最多有几个连接对象活动
		* `poolTimeToWait` 属性：
			* 活动连接数已满时等待多长时间打印一次日志并尝试获取空闲连接
		* `poolMaximumCheckoutTime` 属性：
			* 等待多长时间宣告连接已超时失效并回收
		* `poolMaximumIdleConnections` 属性：
			* 连接池中最多空闲连接数
			* 多余空闲连接将被真正关闭
	* `JNDI`：
		* 使用第三方数据库连接池
		* 大部分 Web 容器实现了 JNDI（Java 命名目录接口）
* 