---
title: '06 第一个Servlet应用'
---

# 06 第一个Servlet应用

步骤：
* 在 webapps 目录下新建一个目录
* 在 webapp 的根下新建一个目录：WEB-INF
	* 这个目录的名字是 Servlet 规范中规定的，必须全部大写
* 在 WEB-INF 目录下新建一个目录：classes
	* 必须是全部小写
	* 一定存放 Java 程序编译之后的 class 文件
* 在 WEB-INF 目录下新建一个目录：lib
	* 非必须，但如果一个 webapp 需要第三方 jar 包（如数据库连接驱动 jar 包）就要放到这个 lib 目录下
	* 必须全部小写
* 在 WEB-INF 目录下新建一个文件：web.xml
	* 必须的
	* 一个配置文件，描述了请求路径和 Servlet 类之间的对照关系
    - 最好从其他 webapp 中拷贝，最好别手写
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>

      <web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
					https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
      version="5.0"
      metadata-complete="true">

      </web-app>
      ```
* 编写一个 Java 程序，必须实现 `Servlet` 接口
	* `Servlet` 接口不在 JDK 中
    - Servlet.class 是 Oracle 提供的
    - 是 JavaEE 的规范中的一员
    - Tomcat 服务器实现了 Servlet 规范，%CATALINA_HOME%\lib 目录下 servlet-api.jar 中有 Servlet.class 文件
    - 从 Jakarta EE 9 开始，`Servlet` 接口的全名变为 `jakarta.servlet.Servlet`
	* 旧版本项目使用 `javax.servlet.Servlet`，无法直接部署到 Tomcat10+ 版本上
    - Java 源程序的位置无所谓，只需要将 Java 源代码编译之后的 class 文件放到 classes 目录下
* 编译 Java 源程序
	* 配置环境变量 `CLASSPATH=.;C:\dev\apache-tomcat-10.0.12\lib\servlet-api.jar`
      ```java
      package com.dustbin.servlet;  
  
      import jakarta.servlet.ServletConfig;  
      import jakarta.servlet.ServletException;  
      import jakarta.servlet.ServletRequest;  
      import jakarta.servlet.ServletResponse;  
  
      import java.io.IOException;  
      import java.io.PrintWriter;  

      public class MyServlet implements jakarta.servlet.Servlet {  
  
      @Override  
      public void init(ServletConfig servletConfig) throws ServletException {  
  
      }  
  
      @Override  
      public ServletConfig getServletConfig() {  
        return null;  
      }  
  
      @Override  
    	public void service(ServletRequest request, ServletResponse response)
		throws ServletException, IOException {
		// 设置内容的类型为html
		// 需要在输出流声明前设置
	    response.setContentType("text/html");
	    // 声明打印输出流，输出到指定的路径/schrant/foo/bar/buz
	    PrintWriter out = response.getWriter();
	    // 输出信息（可以为html标签）
	    out.print("<h1>hello servlet!</h1>");
    	}
  
      @Override  
      public String getServletInfo() {  
        return "";  
      }  
  
      @Override  
      public void destroy() {  
  
      }  
      }
      ```
- 将以上编译之后的 class 文件拷贝到 WEB-INF\classes 目录下
* 在 web.xml 文件中编写配置信息，让 “请求路径” 和 “Servlet 类名” 关联在一起
	* 称为在 web.xml 文件中注册 `Servlet` 类
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>

      <web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
					https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
      version="5.0"
      metadata-complete="true">

      <!-- servlet描述信息 -->
      <!-- 任何一个servlet都对应一个servlet-mapping -->
      <servlet>
    	<!-- 目前随便写 -->
    	<servlet-name>name</servlet-name>
    	<!-- 此处必须是带有包名的全限定类名 -->
    	<servlet-class>com.dustbin.servlet.MyServlet</servlet-class>
      </servlet>

      <!-- servlet映射信息 -->
      <servlet-mapping>
    	<!-- 与上面的一致 -->
    	<servlet-name>name</servlet-name>
    	<!-- 这里需要一个路径，必须以 / 开始，目前可以随便写 -->
    	<url-pattern>/foo/bar/buz</url-pattern>
      </servlet-mapping>

      </web-app>
      ```
* 启动Tomcat服务器，打开浏览器，在浏览器地址栏上输入 URL
	* URL 路径必须和 web.xml 文件中的 `url-pattern` 一致
    - 注意：浏览器上的请求路径和web.xml文件中的url-pattern的唯一区别就是：浏览器上的请求路径带项目名：/crm
    - html 页面只能放到 WEB-INF 目录外面
* 不需要我们编写 `main` 方法，Tomcat 服务器启动时负责调用 `main` 方法，我们只需要编写 `Servlet` 接口的实现类，然后将其注册到 web.xml 文件中

一个合法的 webapp 目录结构：
```
%webapproot%
|---WEB-INF
|   |---classes
|   |---lib
|   |---web.xml
|---html
|---css
|---javascript
|---image
....
```

浏览器发送请求，到最终服务器调用 Servlet 中方法的粗略过程：
* 用户访问
* Tomcat 服务器接收到请求，截取路径：/schrant/foo/bar/buz
* Tomcat 服务器找到 schrant 项目
* Tomcat 服务器在 web.xml 文件中查找 /foo/bar/buz 对应的 `Servlet` 是：`com.dustbin.servlet.MyServlet`
* Tomcat 服务器通过反射机制，创建 `com.dustbin.servlet.MyServlet` 的对象
* Tomcat 服务器调用 `com.dustbin.servlet.MyServlet` 对象的 `service` 方法

编写 JDBC 程序：
* 直接编写
* 将 MySQL 驱动 jar 包复制到 WEB-INF 的 lib 目录中

（补充）Java EE 的版本：
* Java EE 目前最高版本是 Java EE 8
* Java EE 被 Oracle 捐献给了 Apache
* Apache 把 Java EE 改名为 jakarta EE
* Java EE 8 版本升级之后的 "JavaEE 9" 称为 Jakarta EE 9