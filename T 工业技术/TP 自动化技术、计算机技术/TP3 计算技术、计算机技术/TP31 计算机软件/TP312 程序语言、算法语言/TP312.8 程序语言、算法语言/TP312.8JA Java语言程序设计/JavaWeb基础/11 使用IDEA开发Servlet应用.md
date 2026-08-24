---
title: '11 使用IDEA开发Servlet应用'
---

# 11 使用IDEA开发Servlet应用

新建工程：
* 创建一个空工程

新建模块
- 新建一个普通的 Java SE 模块（不要 Java Enterprise 模块）

添加框架支持
* 选择 Web 应用程序，IDEA 会自动生成一个符合 Servlet 规范的 webpp 目录结构
- web 目录就是 webapp 的根

编写 Servlet
* 在项目结构 -> 模块 -> 依赖中引用所需 jar 包（Tomcat）
- 实现 `jakarta.servlet.Servlet` 接口中的 5 个方法：
	- `init`
	- `getServletConfig`
	- `service`
	- `getServletInfo`
	- `destroy`
* 在 Servlet 当中的 `service` 方法中编写业务代码
* 在 `WEB-INF` 目录下新建一个子目录：`lib`（必须全部小写），将连接数据库的驱动 `jar` 包放到 `lib` 目录下
* 在 `web.xml` 文件中完成注册（请求路径和 Servlet 之间对应起来）
  ```java
	<?xml version="1.0" encoding="UTF-8"?>
	
	<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
		   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		   xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
		   version="4.0">
	
	  <servlet>
		  <servlet-name>myServlet</servlet-name>
		  <servlet-class>cn.ginna.javaweb.servlet.MyServlet</servlet-class>
	  </servlet>
	  
	  <servlet-mapping>
		  <servlet-name>myServlet</servlet-name>
		  <url-pattern>/test</url-pattern>
	  </servlet-mapping>
	  
	</web-app>
  ```
	* HTML 文件不能放到 WEB-INF 目录里面

IDEA 工具关联 Tomcat 服务器，将 webapp 部署到 Tomcat 服务器中
* Add Configuration -> 加号 -> Tomcat Server --> Local
- 设置服务器的参数（基本上不用动）
- 在 Deployment 中部署 webapp
- 修改 Application context

启动 Tomcat 服务器
* 建议使用 debug 模式

打开浏览器，访问服务器

