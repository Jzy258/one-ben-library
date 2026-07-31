作用：指导 JSP 翻译引擎工作

包括：
* `include`：在 JSP 中完成静态包含
* `taglib`：引入 JSTL 标签库
* `page`：JSP 页面相关指令

语法：
* `<%@ 指令名 属性名=值 属性名=值 ...%>`

`page` 指令常用属性：
* `session`：
	* 可选值：`true | false`
	* 默认值：`true`
	* 启用 JSP 的内置对象 `session`
	* 没有 `session` 时会创建
* `contentType`：
	* 指定响应内容类型
	* 如：`text/json`、`text/html`
* `pageEncoding`：
	* 指定响应内容字符集
	* 相当于在 `contentType` 中添加 `charset=XXX`
* `import`：
	* 导入对应的 Java 类库
	* 包和包之间用 `,` 分隔
* `errorPage`：
	* 指定页面出错时跳转到的页面路径
	* 可能对某些 4XX 错误无效
	* 建议优先使用 `web.xml` 配置以区分不同的错误编号
* `isErrorPage`：
	* 可选值：`true | false`
	* 默认值：`false`
	* 启用 JSP 内置对象 `exception`
	* 用于捕获页面中抛出的异常
	* 适用于 `errorPage` 页面

JSP 九大内置对象：
* 包括：
	* `jakarta.servlet.jsp.PageContext pageContext`
	* `jakarta.servlet.http.HttpServletRequest request`
	* `jakarta.servlet.http.HttpSession session`
	* `jakarta.servlet.ServletContext application`
	* `jakarta.servlet.http.HttpServletResponse response`
	* `jakarta.servlet.jsp.JspWriter out`
	* `jakarta.servlet.ServletConfig config`
	* `java.lang.Throwable exception`
	* `java.lang.Object page`
* `pageContext`、`request`、`session`、`application` 
	* 作用域对象，都有 `setAttribute`、`getAttribute`、`removeAttribute` 方法
	* `pageContext` < `request` < `session` < `application` 
	* 使用尽可能小的作用域
* `page`：
	* 相当于 `this`，即当前 `Servlet` 对象
* `isELIgnored`：
	* 可选值：`true | false`
	* 默认值：`false`
	* 是否忽略 EL 表达式，即是否不解析 EL 表达式而直接以普通字符串的形式输出
	* 局部忽略可以使用 `\${}` 转义