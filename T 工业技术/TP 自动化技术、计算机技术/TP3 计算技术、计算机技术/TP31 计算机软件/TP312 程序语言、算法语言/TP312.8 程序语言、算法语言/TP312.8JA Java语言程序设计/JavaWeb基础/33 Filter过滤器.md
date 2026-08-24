---
title: '33 Filter过滤器'
---

# 33 Filter过滤器

Filter（过滤器）：
* 将 Servlet 程序看作最终的执行目标
* 使用 Filter 添加过滤代码，可以添加到 Servlet 执行之前或之后
* Servlet 和 Filter 与用户的请求相对应
* 一般在过滤器中编写多个 Servlet 公共的代码

使用步骤：
* 编写一个 Java 类实现 `jakarta.servlet.Filter` 接口，实现其中的方法
	* `init`：创建 `Filter` 对象后执行，只被调用一次
		* `Filter` 对象在服务器启动时创建
	* `doFilter`：用户发送一次对应地址的请求就执行一次
	* `destroy`：`Filter` 对象被销毁前调用，只调用一次
* 在 `web.xml` 中配置过滤器
  ```xml
	<filter>
		<filter-name>过滤器名称</filter-name>
		<filter-class>your.filter.class</filter-class>
	</filter>
	<filter-mapping>
		<filter-name>过滤器名称</filter-name>
		<url-pattern>/xxx</url-pattern>
	</filter-mapping>
  ```
* 或者使用注解：`@WebFilter("/xxx")`
* 在 `doFilter` 中调用 `chain.doFilter`，则执行下一个过滤器
	* 若不存在下一个过滤器，则执行同路径名的 Servlet

过滤器的优先级一定比 Servlet 高
同路径过滤器的优先级：
* 若使用 `web.xml` 配置过滤器，则在 `filter-mapping` 中先定义的过滤器先执行
* 若使用注解配置，则按照过滤器类名字典序执行

过滤器的执行顺序相当于栈数据结构

过滤器的生命周期与 Servlet 基本一致，唯一不同是过滤器在服务器开启时就创建

责任链设计模式：
* 编译时无需确定调用顺序，调用顺序在运行时指定

