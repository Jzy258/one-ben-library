`XMLHttpRequest` 对象：
* AJAX 的核心对象
* 用于发送 AJAX 请求并接收服务器返回的数据
* 现代服务器内置
* 方法：
	* `open()`：建立浏览器和服务器的通道
	* `send()`：发送请求
	* ...
* 属性：
	* `readyState`：表示 XMLHttpRequest 的状态
		* 0：请求未初始化
		* 1：服务器连接已建立
		* 2：请求已收到
		* 3：正在处理请求
		* 4：请求已完成，相应已就绪
	* `onreadystatechange`：
		* 当 `readyState` 属性发生变化时调用的函数

