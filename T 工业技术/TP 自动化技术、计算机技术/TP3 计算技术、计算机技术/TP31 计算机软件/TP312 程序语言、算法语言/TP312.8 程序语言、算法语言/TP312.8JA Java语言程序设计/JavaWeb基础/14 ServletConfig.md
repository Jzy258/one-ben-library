---
title: '14 ServletConfig'
---

# 14 ServletConfig

重写的 `init` 方法应是无参数的 `init` 方法。有参数的 `init` 会调用无参数的 `init`，并初始化 `servletConfig` 成员变量的值

`ServletConfig`：
* 全限定名称：`jakarta.servlet.ServletConfig`
* Tomcat 使用 `org.apache.catalina.core.StandardWrapperFacade` 实现了 `ServletConfig`
* 封装了 `<servlet></servlet>` 标签中的配置信息：
  ```xml
	<init-param>  
	    <param-name>参数名</param-name>  
	    <param-value>参数值</param-value>  
	</init-param>
  ```
* 一个 `Servlet` 对应一个 `ServletConfig` 对象

`ServletConfig` 接口的实现类是 Tomcat 服务器（Web 服务器）实现的

`ServletConfig` 接口常用方法：
* `String getInitParameter(String name)`：通过初始化参数的 `name` 获取 `value`
* `Enumeration<String> getInitParameterNames()`：获取所有的初始化参数的 `name`
* `ServletContext getServletContext()`：获取 `ServletContext` 对象
* `String getServletName()`：获取 `Servlet` 的 `name`
以上方法在 `Servlet` 类中，可以使用 `this` 调用，因为 `GenericServlet` 实现了 `ServletConfig` 接口

