Bean 的生命周期：
* Bean 对象从创建开始到最终销毁的整个过程
* 存在一些特殊的时间节点
* 任何一个声明周期都基于回调机制，需要在特定的时间节点设置回调函数

5 步版：
* 实例化 Bean
	* 调用无参构造方法
* Bean 属性赋值
	* 调用 `set` 方法
* 初始化 Bean
	* 调用 `init` 方法
* 使用 Bean
* 销毁 Bean

7 步版：
* 实例化 Bean
	* 调用无参构造方法
* Bean 属性赋值
	* 调用 `set` 方法
* Bean 后处理器 `before` 执行
* 初始化 Bean
* Bean 后处理器 `after` 执行
	* 调用 `init` 方法
* 使用 Bean
* 销毁 Bean

10 步版：
* 实例化 Bean
	* 调用无参构造方法
* Bean 属性赋值
	* 调用 `set` 方法
* 检查 Bean 是否实现 Aware 相关接口，并设置相关依赖，包括：
	* `BeanNameAware`：Spring 将 Bean 的名字传递给 Bean
	* `BeanClassLoaderAware`：Spring 将加载该 Bean 的类加载器传递给 Bean
	* `BeanFactoryAware`：Spring 将 Bean 工厂对象传递给 Bean
* Bean 后处理器 `before` 执行
* 检查 Bean 是否实现 `InitializingBean` 接口，并调用接口方法
* 初始化 Bean
* Bean 后处理器 `after` 执行
	* 调用 `init` 方法
* 使用 Bean
* 检查 Bean 是否实现 DisposableBean 接口，并调用接口方法
* 销毁 Bean

Bean的作用域不同，管理方式也不同：
* 对于 `singleton` 作用域的 Bean，Spring 能精确知道其何时被创建、何时初始化完成、何时被销毁
* 对于 `prototype` 作用域的 Bean，Spring 只负责创建，随后交给客户端代码管理，不再跟踪其生命周期

