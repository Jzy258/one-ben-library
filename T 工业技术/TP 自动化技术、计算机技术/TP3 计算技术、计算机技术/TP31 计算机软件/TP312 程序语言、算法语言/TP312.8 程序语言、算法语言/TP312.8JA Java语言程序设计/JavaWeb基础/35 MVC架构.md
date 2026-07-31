MVC 架构：
* M（Model，数据 / 业务）：负责处理业务、数据
* V（View，视图 / 展示）：负责页面展示
* C（Controller，控制器）：调度 M 和 V

作用：
* 解决了用户交互中数据、视图、控制逻辑之间的关系问题

流程：
* 用户向 Controller 发送请求
* Controller 调用 Model 处理业务
* Model 处理数据和业务
* Model 将处理结果返回给 Controller
* Controller 调用 View 展示
* View 展示数据
* Controller 响应用户

视图层的组件包括：
* JSP
* Freemarker
* Velocity
* Thymeleaf
* HTML
* ...

DAO（Data Access Object，数据访问对象）设计模式：
* JavaEE 的设计模式之一
* 负责数据库的 CRUD，不负责处理业务
* 一般一张表对应一个 DAO

Java Bean 类的属性不建议设为基本数据类型，一般使用包装类

三层架构：
* 组成：
	* 表示层 / 表现层 / Web 层（Servlet / JSP）
		* 通常在表现层中使用 MVC 架构
	* 业务逻辑层（Service）
	* 持久化层（DAO）
* 作用：
	* 实现了表现、业务、数据访问之间的职责分离

