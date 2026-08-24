---
title: '13 GenericServlet'
---

# 13 GenericServlet

对于一个 `Servlet` 类，我们只需要 `service` 方法，其他方法大部分情况下不需要使用

适配器设计模式 Adapter：
* 编写一个 `GenericServlet` 抽象类，其中有一个抽象方法 `service`
* `GenericServlet` 实现 `Servlet` 接口
* `GenericServlet` 是一个适配器
* 以后编写的所有 `Servlet` 类继承 `GenericServlet`，重写 `service` 方法即可

Tomcat 会执行 `GenericServlet` 的 `init` 方法
* Tomcat 服务器先创建 `ServletConfig` 对象，然后调用 `init` 方法，将 `ServletConfig` 对象传给了 `init` 方法
