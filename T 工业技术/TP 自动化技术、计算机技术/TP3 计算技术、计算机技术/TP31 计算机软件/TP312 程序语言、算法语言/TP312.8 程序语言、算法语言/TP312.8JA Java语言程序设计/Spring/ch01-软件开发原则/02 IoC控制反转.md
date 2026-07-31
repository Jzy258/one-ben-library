IoC（Inversion of Control，控制反转）：
* 将对象的创建权和对象与对象之间的管理权交给第三方容器
* 常见实现方式：DI（Dependence Injection，依赖注入）
	* 基于 `set` 方法
	* 基于构造方法（容易出现循环依赖问题）
	* 字段注入（直接通过反射机制给 `Field` 赋值）

Spring 框架自动完成：
* 实现类对象的创建
* 管理对象和对象之间的依赖关系

