* `<localRepository>`：
	* 指定本地仓库位置
* `<mirror>`：
	* 配置仓库镜像
	* `<id>`：
		* 仓库镜像标识
	* `<name>`：
		* 显示名称
	* `<url>`：
		* 镜像地址
	* `<mirrorOf>`：
		* 拦截对应仓库的请求，重定向到该镜像指向的仓库
* `maven-default-http-blocker`（Maven 3.8.1）：
	* `external:http:*`：
		* 拦截所有外部的、明文 HTTP 协议的仓库请求
	* `<url>` 设为 `http://0.0.0.0`：
		* 拦截在此之前未匹配到的 IP
	* `<blocked>`：
		* `true`
		* 拒绝请求接入
	* **作用**：
		* 禁止使用不加密的 HTTP 拉取依赖
		* 防止中间人篡改 jar