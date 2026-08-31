* `Invoke-RestMethod`：
	* **作用**：
		* 发送 HTTP 请求，并自动将 JSON 响应解析为对象
	* `-Uri`：
		* 请求地址
	* `-Method`：
		* 请求方法
	* `-Body`：
		* 请求体
	* `-ContentType`：
		* 请求体内容类型
	* `-Headers`：
		* 其他请求头
* `ConvertTo-Json`：
	* 将对象转换为 JSON 字符串
* `Invoke-WebRequest`：
	* **作用**：
		* 发送 HTTP 请求，返回原始响应
	* `StatusCode`：
		* 状态码
	* `Content`：
		* 响应体
	* `Headers`：
		* 响应头
