---
title: '01 MyBatis入门程序'
---

# 01 MyBatis入门程序

开发步骤：
* `<packaging>` 为 `jar`
* 引入 `mybatis` 和 mysql 驱动依赖
* 编写配置文件
	* `mybatis-config.xml`：
		* 核心配置文件
		* 放在根路径下
		* 用于配置连接数据库的信息等
	* `XxxMapper.xml`：
		* 用于编写 SQL 语句
		* 一般一张表对应一个 `xml` 文件
		* `;` 可以省略
	* 在 `mybatis-config.xml` 的 `<mappers>` 中配置 `XxxMapper.xml` 文件，对应 `<mapper>` 标签
		* `resource` 属性默认从类的根路径开始查找
		* 若使用 `url` 属性，则通过绝对路径查找
* 编写 MyBatis 程序
	* `SqlSessionFactoryBuilder`：
		* 通过 `build` 方法创建 `SqlSessionFactory` 对象
		* `build` 方法需要传入一个输入流，指向 `mybatis-config.xml` 配置文件
		* 可以通过 `Resources.getResourceAsStream` 获取某路径的输入流
			* 默认从类的根路径开始查找
	* `SqlSessionFactory`：
		* 通过 `openSession` 方法创建 `SqlSession` 对象
		* 一般一个环境对应一个 `SqlSessionFactory` 对象
	* `SqlSession` ：
		* 表示 JVM 和数据库的一次会话
		* 用于执行 SQL 语句
		* 调用 `insert`、`delete`、`update`、`select` 等方法实现 CRUD
			* `insert`、`delete`、`update` 等语句会返回影响数据库中的记录条数
			* `select` 会返回
		* 默认不自动提交
		* 一般一个数据库对应一个 `SqlSession` 对象

