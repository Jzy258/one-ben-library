发送 AJAX GET 请求的步骤：
* 创建 `XMLHttpRequest` 对象
* 注册回调函数 `onreadystatechange`，一般进行两层嵌套 `if` 检查：
	* `this.readystate == 4`：是否已经响应结束
	* `this.status == 200`：访问成功
* 开启通道：`open(method, url, async, user, psw)`
	* 参数：
		* `method`：字符串，请求方式
		* `url`：请求的路径
		* `async`：布尔值，是否为异步请求
		* `user`：用户名
		* `pwd`：密码
	* 可以设置用户名和密码以设定资源访问权限
* 发送请求：`send()`

在回调函数中，不管服务器响应内容是什么格式，都以文本格式获取：`this.responseText`
* 可以通过 Servlet 中的 `response.getWriter()` 获取到的 `out` 对象输出响应内容，该内容以字符串的形式被 `this.responseText` 接收
* 可以采用 JSON、XML 等格式

建立通道时，`open` 方法的 `url` 参数中可以传入参数：`/path?name1=value1&name2=value2`

