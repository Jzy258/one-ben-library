---
title: '27 JSP改造oa项目'
---

# 27 JSP改造oa项目

使用 JSP + Servlet 模式开发，分离前后端

Servlet 和 JSP 的区别：
* Servlet 主要用于收集数据，进行逻辑处理
* JSP 主要用于展示数据

JSP 文件的扩展名可以配置：
* 在 `%CATALINA_HOME%/conf/web.xml` 中配置 `<servlet-name>`  为 `jsp` 的 `<servlet-mapping>` 中的 `<url-pattern>`

实现登录功能：
* 设计用户表：
	* 包括用户名、密码字段
	* 密码在数据库中一般以密文的形式存储
* 实现登录页面，设计表单
* 实现 Servlet 处理登录请求
	* 登录成功，跳转到部门管理系统
	* 登录失败，跳转到登录失败页面

