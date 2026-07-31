`ServletContext`（Servlet 上下文对象）：
* `Servlet` 对象的环境
- 在同一个 webapp 中，所有 `Servlet` 对象共享同一个 `ServletContext` 对象
- `ServletContext` 对象在 webapp 启动时由 Tomcat 创建，在服务器关闭时销毁（即 `ServletContext` 对象是应用级对象）
- 一个 `ServletContext` 对象通常对应一个 web.xml 文件
* `ServletContext` 是一个接口，Tomcat 服务器用 `org.apache.catalina.core.ApplicationContextFacade` 实现了 `ServletContext` 接口

常用方法：
* `String getInitParameter(String name)`：通过初始化参数的 `name` 获取 `value`
* `Enumeration<String> getInitParameterNames()`：获取所有的初始化参数的 `name`
* 以上两个方法获取以下信息：
	```xml
<context-param>
	<param-name>pageSize</param-name>
	<param-value>10</param-value>
</context-param>
<context-param>
	<param-name>startIndex</param-name>
	<param-value>0</param-value>
</context-param>
	```
	* 以上的配置信息属于应用级的配置信息（项目共享的配置信息）
	* Servlet 级配置信息配置在 `<servlet>` 标签中即可，使用 `ServletConfig` 对象获取
* `String getContextPath()`：获取应用的根路径
* `String getRealPath(String path)`：获取应用的绝对路径（真实路径）

IDEA 可以创建多个 Tomcat 实例，日志分别存储在 `CATALINA_BASE/logs` 中
手动启动 Tomcat 的日志存储在 `CATALINA_HOME/logs` 中

记录日志：
* `void log(String message)`：记录日志
* `void log(String message, Throwable t)`：抛出异常并记录日志
* `logs` 目录下的日志文件：
	* `catalina.yyyy-MM-dd.log`：服务器端的 Java 程序运行的控制台信息
	* `localhost.yyyy-MM-dd.log`：`ServletContext` 对象的 `log` 方法记录的日志
	* `localhost_access_log.yyyy-MM-dd.txt`：访问日志

`ServletContext` 对象也称应用域

如果所有的用户共享一份数据，且很少被修改、数据量很少，可以将这些数据放到 `ServletContext` 中
* 数据量太大会占用堆内存，且这个对象的生命周期比较长，会影响服务器的性能
* 所有用户共享的数据如果涉及到修改操作，必然会存在线程并发所带来的安全问题，所以 `ServletContext` 对象中的数据一般都是只读的
* 这样存放数据可以大大提升效率，应用域相当于一个缓存，数据不需要从数据库中再次获取

操作 `ServletContext` 的属性数据：
* 存：`void setAttribute(String name, Object value)`
* 取：`Object getAttribute(String name)`
* 删：`void removeAttribute(String name)`
* 编写 `Servlet` 类的时候，实际不直接继承 `GenericServlet` 类

B/S 结构系统基于 HTTP，在 Servlet 规范当中，提供了 `HttpServlet` 类
我们编写的 Servlet 类要继承 `HttpServlet`
`HttpServlet` 是 HTTP 协议专用的，处理 HTTP 协议更便捷
继承结构：
* `jakarta.servlet.Servlet`
* `jakarta.servlet.GenericServlet implements Servlet`
* `jakarta.servlet.http.HttpServlet extends GenericServlet`

缓存机制：
* 堆内存中的字符串常量池
	* `"abc"` 先在字符串常量池中查找，如果有则直接使用，如果没有则新建并放入字符串常量池
* 堆内存中的整数型常量池
    - `[-128 ~ 127]` 共 256 个 `Integer` 类型的引用位于整数型常量池中，不超过这个范围的整数对象可直接从常量池中取
* 连接池（Connection Cache）
	* 存放 Java 语言连接数据库的 `java.sql.Connection` 对象
    - JVM 和 MySQL 数据库分别是一个进程，进程和进程之间建立连接很耗费资源
    - 可以提前先创建好 N 个 `Connection` 连接对象，放到一个集合当中，称为连接池
    - 每一次用户连接时不需要再新建连接对象，直接从连接池中获取连接对象，大大提升访问效率，也可以保证数据库的安全性
* 线程池
	* Tomcat 服务器支持多线程
    - Tomcat 服务器启动时会先创建好 N 个线程 `Thread` 对象并放到集合当中，称为线程池
    - 用户发送请求后，需要有一个对应的线程来处理，此时可以直接从线程池中获取线程，效率较高
	* 所有 Web 服务器都支持多线程，都有线程池机制
* Redis
	* NoSQL 数据库（非关系型数据库，缓存数据库）
* 向 `ServletContext` 应用域中存储数据相当于放到缓存中

