---
title: '26 第一个JSP程序'
---

# 26 第一个JSP程序

在 `WEB-INF` 外创建一个 `index.jsp` 文件，其中为空白
上述文件部署后，启动服务器，使用浏览器访问该地址：
* Tomcat 将 `.jsp` 文件翻译生成 `_jsp.java` 文件，并自动编译生成 `.class` 文件
* 访问 `.jsp` 文件实际上运行了对应的 `.class` 文件

JSP 本质上是一个 Servlet：
* 翻译出的类继承 `HttpBase` 类，`HttpBase` 继承 `HttpServlet`
* JSP 的生命周期与 Servlet 完全相同
* JSP 也是假单例

第一次访问 JSP 速度较慢：
* 将 `.jsp` 翻译生成 `.java`
* 将 `.java` 编译生成 `.class`
* 创建 `Servlet` 对象
* 调用 `init` 方法
* 调用 `service` 方法
之后的每一次访问：
* 调用 `service` 方法

JSP（Java Server Pages）:
* 基于 Java 实现的服务器端的页面
* JSP 是 JavaEE 的 13 个子规范之一
* 每一个 Web 容器都会内置一个 JSP 翻译引擎

对 JSP 进行错误调试时，应检查 `.jsp` 文件对应的 `.java` 文件的代码

JSP 基础语法：
* JSP 中直接编写的文字会自动翻译为 Java 的 `out.write()` 语句，将文字内容作为普通字符串打印在网页上
* 解决中文乱码问题：
	* 在 JSP 文件头部编写 `page` 指令：
      ```jsp
		<%@page contentType="text/html;charset=UTF-8"%>
      ```
		* 设置页面的字符编码为 UTF-8
* `<% Java语句 %>`：脚本块
	* 相当于将 Java 程序直接写入 `Servlet` 的 `service` 方法中
	* 按照自上而下的顺序
* `<%--注释内容--%>`：JSP 专业注释
	* HTML 的注释（`<!--注释内容-->`）仍会被翻译到 Java 文件中，只是在页面中不显示
* `<%! Java代码%>`：声明语法
	* 将 Java 代码置于类体中
	* 不建议使用，单例的 `Servlet` 对象编写静态变量和实例变量会导致线程安全问题
* JSP 九大内置对象：
	* `request`、`response`、`pageContext`、`session`、`application`、`config`、`out`、`page`、`exception`
	* 可以直接在 `service` 方法内部使用
* 输出表达式：`<%= Java表达式%>`
	* 会将表达式的值打印在浏览器上

