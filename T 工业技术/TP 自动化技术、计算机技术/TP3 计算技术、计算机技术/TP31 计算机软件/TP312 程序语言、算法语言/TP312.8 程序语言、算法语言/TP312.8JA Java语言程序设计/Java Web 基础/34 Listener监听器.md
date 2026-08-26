---
title: '34 Listener监听器'
---

# 34 Listener监听器

监听器：
* Servlet 规范之一
* 所有监听器接口以 `Listener` 结尾
* 用于编写在特殊时机的行为

Servlet 规范中的监听器：
* `jakarta.servlet.ServletContextListener`
* `jakarta.servlet.ServletContextAttributeListener`
* `jakarta.servlet.http.HttpSessionListener`
* `jakarta.servlet.http.HttpSessionAttributeListener`
* `jakarta.servlet.ServletRequestListener`
* `jakarta.servlet.ServletRequestAttributeListener`
* `jakarta.servlet.http.HttpSessionBindingListener`
* `jakarta.servlet.http.HttpSessionIdListiener`
* `jakarta.servlet.http.HttpSessionActivationListener`

使用步骤：
* 编写一个类实现监听器接口，实现其中的方法
* 在 `web.xml` 中进行配置
  ```xml
	<listener>
		<listener-class>your.listener.class</listener-class>
	</listener>
  ```
* 或者使用 `WebListener` 注解
	* 不需要参数
* 某个特殊时机发生时，服务器自动调用对应的方法

`XxxListener` 监听对象的创建和销毁
`XxxAttributeListener` 监听对应域中属性的添加、修改和删除

`HttpSessionBindingListener`：
* 不需要使用 `@WebListener` 标注
* 若某个 JavaBean 类实现了该接口，则该 JavaBean 对象被放入 session 时触发 bind 事件，对象从 session 中移除时触发 unbind 事件

