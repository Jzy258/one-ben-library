---
title: '29 Cookie'
---

# 29 Cookie

每一个 session 对象对应一个 sessionid（Java 中为 `JSESSIONID`），以 cookie 对象的形式存放在浏览器的运行内存中

保存位置：
* 浏览器（客户端）的运行内存或硬盘文件中，以键值对的形式存在

作用：
* 保存会话状态
* 原因：HTTP 是无状态协议

每一个网站都有对应的 cookie

应用：
* 购物车保存信息（早期）
	* 购物车中的商品信息（如商品 ID）保存在 cookie 中，
* 十天内免登录

cookie 和 session 都是 HTTP 协议的一部分，非一门编程语言独有
* HTTP 规定，cookie 由 `name` 和 `value` 构成键值对，都是字符串类型

Java 的 servlet 对 cookie 的支持：
* `jakarta.servlet.http.Cookie` 类：用于表示 cookie 数据
* `response.addCookie` 方法：将 cookie 发送给浏览器

HTTP 规定：浏览器发送请求时，自动携带该路径下的 cookie 发送给服务器

创建 `Cookie` 对象：
```java
Cookie cookie = new Cookie(键, 值);
```

在响应中添加 cookie：
```java
response.addCookie(cookie);
```

cookie 的有效时间：
* `Cookie#setMaxAge` 方法：设置 cookie 的有效时间
	* 设置值 < 0 或默认：保存在浏览器的运行内存中，浏览器关闭则 cookie 消失
	* 设置值 > 0：保存在硬盘文件中，单位：s
	* 设置值 = 0：删除该 cookie

关联路径：
* 对 cookie 关联的路径发出请求，则浏览器自动携带该 cookie 发送至服务器
* 默认路径：请求路径的上级目录及其后代路径
* `Cookie#setPath` 方法：手动设置关联的路径
	* 一般可以设为 `request.getContextPath`（应用根路径）

`request.getCookies` 方法：接收 cookie，返回 `Cookie[]`
* 若没有获取到 cookie，则返回 `null` 而非空数组
* 一般实现：
  ```java
	Cookie[] cookies = request.getCookies();
	if (cookies != null) {
		for (Cookie cookie : cookies) {
			String name = cookie.getName();
			String value = cookie.getValue();
			// ...
		}
	}
  ```
* 遍历 `Cookie` 数组时不需要对元素判断是否为 `null`

实现十天内免登录：
* 修改前端页面：
	* 添加 “十天内免登录” 复选框
* 修改 `UserServlet` 中的 `login` 方法：
	* 如果用户登录成功并勾选了十天内免登录，则创建 `Cookie` 对象
	* 在 `cookie` 中存储用户名和密码（加密后的）
	* 设置 `cookie` 有效期
	* 将 `cookie` 响应给浏览器，浏览器将其保存为硬盘文件
* 编写 `WelcomeServlet`：
	* 访问网站时自动跳转到 `/welcome`
	* 从请求中获取 Cookie
	* 通过数据库尝试使用 Cookie 中的用户名和密码登录
	* 根据登录是否成功跳转到不同页面
* 使 cookie 失效：
	* 超过有效期
	* 修改密码
	* 在浏览器上清除 cookie

