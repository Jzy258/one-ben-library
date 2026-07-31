目的：解决 `web.xml` 中配置信息过多的问题

Servlet 3.0 之后推出了各种 Servlet 注解

一些不经常变化的配置建议使用注解

注解对象的使用：
```java
@注解名(属性名1 = 属性值1, 属性名2 = 属性值2...)
```
* 当注解的属性是一个数组，且数组中只有一个元素，则大括号可以省略
* 属性名为 `value` 则可省略 `value = `
`jakarta.servlet.annotation.WebServlet`：标记为 Servlet
* 作用于：`TYPE`
* 属性：
	* `String name`：相当于 `<servlet-name>`
	* `String[] urlPatterns`：相当于 `<url-pattern>`，可配置多个 URL，都指向同一个 Servlet 类
	* `loadOnStartup`：相当于 `int <load-on-startup>`，指定启动时加载，创建 `Servlet` 对象
	* `WebInitParam[] initParams`：相当于 `<init-param>`，其中每一个 `WebInitParam` 注解对象都有 `String name` 和 `String value` 属性
	* `String[] value`：与 `urlPattern` 作用相同