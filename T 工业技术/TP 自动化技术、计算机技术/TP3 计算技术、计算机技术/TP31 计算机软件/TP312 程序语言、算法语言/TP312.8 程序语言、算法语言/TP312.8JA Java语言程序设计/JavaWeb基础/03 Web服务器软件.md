Web 服务器软件：
* Tomcat（Web 服务器）
* jetty（Web 服务器）
* JBOSS（应用服务器）
* WebLogic（应用服务器）
* WebSphere（应用服务器）

应用服务器和 Web 服务器：
* 应用服务器实现了 JavaEE 的所有规范
* Web 服务器只实现了 JavaEE 中的 Servlet + JSP 两个核心规范
* 应用服务器包含 Web 服务器（如 JBOSS 中内嵌了一个 Tomcat 服务器）

Tomcat：开源免费的轻量级 Web 服务器
* Java 语言编写
* 运行前提：jre

配置环境变量：
* `JAVA_HOME`：JDK 的根目录
* `CATALINA_HOME`：Tomcat 服务器的根

Tomcat 服务器的目录：
- `bin`：命令文件
* `conf`：配置文件
	* `server.xml` 文件可以配置端口号，默认为 8080
* `lib`：核心程序目录
* `logs`：日志目录
* `temp`：临时目录
* `webapps`：存放大量 web 应用
* `work`：存放 JSP 文件翻译之后的 Java 文件以及编译之后的 `class` 文件

测试 Tomcat 服务器是否启动成功：
* 打开浏览器，在浏览器访问 `https://localhost:8080`

解决 Tomcat 服务器在 DOS 命令窗口中的乱码问题：
* 修改 `CATALINA_HOME/conf/logging.properties` 文件中的内容：
	* `java.util.logging.ConsoleHandler.encoding = XXX`
	* 将其修改为与 IDEA 一致



