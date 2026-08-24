---
title: '09 AJAX乱码问题'
---

# 09 AJAX乱码问题

Tomcat 10 不会出现乱码问题

可能出现乱码：
* 服务器从前端获取的数据
* 服务器响应给前端的数据

对于老版本 Tomcat：
* GET 请求服务器响应数据乱码：
  ```java
	response.setContentType("text/html;charset=UTF-8");
  ```
* POST 请求服务器接收数据乱码：
  ```java
	request.setCharacterEncoding("UTF-8");
  ```