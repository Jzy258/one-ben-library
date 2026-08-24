---
title: '12 AJAX跨域问题'
---

# 12 AJAX跨域问题

跨域：
* 在一个域名的网页中请求另一个域名的资源
* 以下请求方式不存在问题：
	* 超链接
	* form 提交
	* `window.location.href`
* AJAX 的跨域请求会被 CORS（同源策略）阻止
	* 跨域时，不允许共享同一个 `XMLHttpRequest` 对象，不安全
	* 同源：协议、域名、端口均一致

解决方案 1：设置响应头
* 在请求的资源中设置允许跨域请求：
  ```java
	response.setHeader("Access-Control-Allow-Origin", "允许访问的源");
  ```
	* 允许访问的源可以使用通配符

解决方案 2：jsonp
* 不是真正的 AJAX 请求，但可以实现局部刷新的效果
* 原理：将后端响应作为 JS 代码引入并解析执行
* 只支持 GET 请求
  ```html
	<!-- 前端页面 -->
	...
	<script src="访问后端程序的URL"></script>
	...
  ```
```java
	/* 后端资源 */
	...
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		out.print("引入的JS代码");
	}
	...
```
* 动态实现：
  ```html
	<!-- 前端 -->
	...
	<script type="text/javascript">
		window.onload = () => {
			document.getElementById("ID").onclick = () => {
				const htmlScriptElement = document.createElement("script");
				htmlScriptElement.type = "text/javascript";
				htmlScriptElement.src = "URL?func=函数名";
				document.getElementByTagName("body")[0].appendChild(htmlScriptElement);
			}
		}
	</script>
	...
  ```
```java
	/* 后端 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String func = request.getParameter("func");
		response.getWriter().print(func + "({JSON})")
	}
```
* jQuery 封装版：
  ```html
	<script type="text/javascript">
		$(function() {
			$("#btn").click(function () {
				$.ajax({
					type: "GET",
					url: "http://localhost:8081/serverB/jsonp",
					datatype: "jsonp",
					success: function(data) {
						$("#display").html(data.username + ": " + data.password);
					},
					// 也可以指定函数名
					// jsonp: "函数名",
					// jsonpCallback: "函数"
				})
			})
		})
	</script>
  ```
	* jQuery 会发送请求，并附加 `callback=jQuery#####_#####` 参数，表示 jQuery 自动生成的函数
      ```java
    	/* 后端 */
    	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String callback = request.getParameter("callback");
		response.getWriter().print(callback + "({JSON})")
    	}
      ```
	* jQuery 会自动调用 `callback` 所指函数，并调用指定的回调函数

解决方案 3：代理机制
* 在本服务器中创建代理 Servlet，前端向代理发送请求，代理通过 `HttpClient` 等组件与另一服务器通讯，发送请求并接收响应

解决方案 4：nginx 反向代理

