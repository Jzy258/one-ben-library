---
title: '21 HttpServletRequest接口'
---

# 21 HttpServletRequest接口

`HttpServletRequest` 是一个接口，全限定名称是：`jakarta.servlet.http.HttpServletRequest`

`HttpServletRequest` 接口是 `Servlet` 规范的一部分

`HttpServletRequest` 接口的父接口是 `ServletRequest`

`org.apache.catalina.connector.RequestFacade` 实现了 `HttpServletRequest` 接口

Tomcat 将用户的 HTTP 请求中的信息以及数据解析出来，并封装到 `HttpServletRequest` 对象中

获取用户提交数据常用方法：
* `String getParameter(String name)`：获取 `value` 中的第一个元素（最常用）
* `Map<String, String[]> getParameterMap()`：获取 `Map`
* `Enumeration<String> getParameterNames()`：获取 `Map` 集合中所有的 `key`
* `String[] getParameterValues(String name)`：根据 `key` 获取 `Map` 集合中的 `value`

服务器端获取到的一定是字符串

`request` 对象又称为“请求域”对象
* 见 [[15 ServletContext|应用域]]
* 操作域的方法：
	* 存：`void setAttribute(String name, Object value)`
	* 取：`Object getAttribute(String name)`
	* 删：`void removeAttribute(String name)`

使用 Servlet 的请求转发机制：
```java
req.getRequestDispatcher(路径).forward(req, resp);
```
* 获取请求转发器，将需要转发到的路径封装到转发器中
* 将原 Servlet 的 `req` 和 `resp` 转发给指定的 Servlet

其他常用方法：
* `String getRemoteAddr()`：获取远程（客户端）IP 地址
* `void setCharacterEncoding(String encoding)`：设置请求体的字符集（用于解决 POST 方式的乱码问题，Tomcat 10 之后默认为 `UTF-8`）
	* 需要配合 `setContentType("text/html;charset=UTF-8")` 使用
	* 对于 GET 请求的乱码问题，应在 `%CATALINA_HOME%/conf/server.xml` 中对 `Connector` 标签进行配置，修改（或添加）属性 `URLEncoding="UTF-8"`（Tomcat 8 之后默认为 `UTF-8`）
* `String getContextPath()`：获取应用根路径
* `String getMethod()`：获取请求方式
* `String getRequestURI()`：获取请求的 URI（包括项目名）
* `String getServletPath()`：获取 Servelet 的路径（不包括项目名）
