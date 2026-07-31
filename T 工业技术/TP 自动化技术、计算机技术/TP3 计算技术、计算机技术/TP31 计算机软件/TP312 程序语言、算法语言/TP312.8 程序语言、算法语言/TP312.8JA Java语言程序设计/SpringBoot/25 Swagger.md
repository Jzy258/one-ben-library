* Swagger：
	* **作用**：
		* 根据代码中的注解自动生成实时在线的 RESTful API 文档
		* 提供可视化的交互界面以测试接口调用
		* 实现代码即文档、文档即测试
	* Swagger 包含工具：
		* Swagger UI：
			* **作用**：
				* 将 OpenAPI 规范的文件渲染成可视化、交互式的 API 文档网页
			* **应用场景**：
				* 前端查看、测试人员调试、交付 API 给合作方
		* Swagger Editor：
			* **作用**：
				* 编写 OpenAPI 规范文件的在线编辑器
			* **应用场景**：
				* 编写 OpenAPI 的 yaml / json 文件
		* Swagger Codegen：
			* **作用**：
				* 根据 OpenAPI 规范文件，自动生成服务器端骨架代码和客户端调用代码
			* **应用场景**：
				* 前后端分离开发，快速生成客户端 SDK，搭建项目基础
	* 注解位置：
		* controller、DTO、响应体、entity、VO 等
	* 