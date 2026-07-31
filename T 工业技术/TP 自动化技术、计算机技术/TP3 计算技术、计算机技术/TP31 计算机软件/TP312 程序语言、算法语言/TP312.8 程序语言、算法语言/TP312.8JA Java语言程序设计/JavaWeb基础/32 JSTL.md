JSTL（JSP Standard Tag Lib，Java Servlet 页面标准标签库）

作用：进一步使前后端分离，避免 JSP 中出现 Java 代码

Tomcat 10 之后引入的 jar 包：
* `jakarta.servlet.jsp.jstl-api-3.0.0.jar`
* `taglibs-standard-impl-1.2.5.jar`
* `taglibs-standard-spec-1.2.5.jar`

常用标签库：
* 核心：`http://java.sun.com/jsp/jstl/core`
* 格式化：`http://java.sun.com/jsp/jstl/fmt`
* SQL：`http://java.sun.com/jsp/jstl/sql`

使用步骤：
* 引入 jar 包
* `<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`
	* `prefix` 相当于命名空间，用于标识标签来源
	* `uri` 指向 jar 包中的一个 `tld`（Tag Library Descriptor，标签库描述文件），描述了标签和 Java 类之间的关系
* 在适当的位置使用标签

原理：
* `uri` 指向的 `tld` 文件实际上是 xml 配置文件
* `tld` 文件描述了标签和 Java 类的关系
* `tld` 文件内容：
	* 由多个 `<tag>` 组成，分别表示各个标签
	* `<description>`：对标签的描述
	* `<name>`：标签名称
	* `<tag-class>`：标签对应的 Java 类
	* `<body-content>`：标签体中可以出现的内容
	* `<attribute>`：标签的属性
		* `<description>`：对属性的描述
		* `<name>`：属性名称
		* `<required>`：属性是否必须
		* `<rtexprvalue>`：该属性是否支持 JSP 运行时表达式（如 EL 表达式）

常用标签：
* `if`：实现条件判断
	* `test`：必需的，`boolean` 属性，条件表达式
	* `var`：存放条件表达式的值
	* `scope`：指定 `var` 的存储域
* `forEach`：对集合进行遍历
	* `items`：需要遍历的集合
	* `var`：
		* 与 `items` 同时出现时，表示正在遍历的集合元素
		* 与 `begin`、`end` 同时出现时，表示循环变量
	* `begin`：循环变量初始值
	* `end`：循环变量
	* `varStatus`：与 `items` 同时出现时，表示变量的状态，有 `count` 属性，表示目前遍历变量计数
* `choose`：相当于 `if ... else if ... else if ...` 或 `switch`，配合 `when`、`otherwise` 使用
	```jsp
	<c:choose>
		<c:when test="">
			...
		</c:when>
		<c:when test="">
			...
		</c:when>
		...
		<c:otherwise>
		</c:otherwise>
	</c:choose>
	```

