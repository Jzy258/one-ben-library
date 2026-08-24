---
title: '12 Servlet对象的生命周期'
---

# 12 Servlet对象的生命周期

`Servlet` 对象的生命周期由 Tomcat 服务器（Web 容器）负责，JavaWeb 程序员无法干预

我们自己创建的 `Servlet` 对象不受 Web 容器的管理
Web 容器创建的 `Servlet` 对象会被放到一个集合（`HashMap`）中，只有这些 `Servlet` 才能够被 Web 容器管理

默认情况下，服务器启动时 `Servlet` 对象不会被实例化
* 用户发送请求之前，如果提前创建出来所有的 `Servlet` 对象需要耗费内存
* 如何在服务器启动时创建 `Servlet` 对象：
	* 在 `<servlet>` 标签中添加 `<load-on-startup>` 子标签，在其中填写整数
	* 越小的整数优先级越高

`Servlet` 对象生命周期：
* 用户发送第一次请求时，Tomcat 服务器根据 `web.xml` 文件中配置，通过反射机制创建 `Servlet` 对象，调用了无参构造方法
* 对象创建后，Tomcat 服务器马上调用 `init` 方法
* Tomcat 服务器调用 `service` 方法
* 用户继续发送请求，仍使用之前创建的 `Servlet` 对象，直接调用该 `Servlet` 对象的 `service` 方法：
	* `Servlet` 对象是单例的（但是并不符合单例模式，真单例模式的构造方法是私有化的）
	* 无参构造方法、`init` 方法只在第一次用户发送请求的时候执行
	* 每次用户发送请求，`service` 方法必然会被 Tomcat 服务器调用一次
* `Servlet` 的 `destroy` 方法只在服务器被关闭时由 Tomcat 服务器调用一次
	* `destroy` 方法执行结束之后，`Servlet` 对象的内存才会被 Tomcat 释放
    
`Servlet` 类中方法的调用次数：
* 构造方法：一次
* `init` 方法：一次
* `service` 方法：用户发送请求的次数
* `destroy` 方法：一次

若 `Servlet` 类没有无参构造方法：
* 报错：500 错误
	* 500 是一个 HTTP 协议的错误状态码
	* 500 一般情况下是因为服务器端的 Java 程序出现了异常（服务器内部错误）
	* 在 Servlet 开发当中，不建议程序员定义构造方法

无参数构造方法不能代替 `init` 方法：
* Servlet 规范中要求：JavaWeb 程序员编写 `Servlet` 类时不建议手动编写构造方法，因为编写构造方法很容易让无参数构造方法消失，导致 `Servlet` 对象无法实例化

`service` 方法是处理用户请求的核心方法
`init` 方法通常用于初始化操作，且只需执行一次，如：初始化数据库连接池，初始化线程...
`destroy` 方法通常用于关闭资源、保存数据
