* `axios.create()`：
	* 创建 `AxiosInstance`，用于自定义配置而不污染全局
	* `baseURL`：
		* 所有请求自动拼接的基础 URL
	* `timeout`：
		* 请求超时时间
* `AxiosInstance#interceptors.request.use`：
	* 指定每次请求发出前执行的回调函数
	* **参数**：
		* `config`：
			* 本次请求的配置
* `AxiosInstance#interceptors.response.use`：
	* 指定每次响应接收后执行的回调函数和异常处理
	* 响应回调参数：
		* `response`：
			* 响应对象
			* `data`：
				* 后端传回的 JSON 数据
	* 异常处理回调参数：
		* `error`：
			* 异常对象
* `AxiosInstance#request()`：
	* 发送 HTTP 请求
	* **参数**：
		* `url`：
			* 发送请求的目标 URL
		* `method`：
			* 请求方法
		* `params`：
			* 额外参数
			* 适用于 `GET` 请求
		* `data`：
			* 额外参数
			* 适用于 `POST` 请求
	* 返回值类型为 `Promise`
