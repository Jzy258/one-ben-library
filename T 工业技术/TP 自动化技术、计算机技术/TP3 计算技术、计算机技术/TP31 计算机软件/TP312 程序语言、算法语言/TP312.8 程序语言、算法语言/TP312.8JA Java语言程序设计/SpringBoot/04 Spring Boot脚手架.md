* 脚手架（Scaffold）：预设项目模板
* Spring Initializr：
	* 通过填写网页表单生成项目框架
	* IDEA 内置了 Spring Initializr
> module `springboot-003`
* 脚手架生成目录结构：
	* `/.mvn/wrapper/maven-wrapper.properites`：
		* maven 包装器脚本
		* **作用**：
			* 执行后会下载 maven 工具到 `/.mvn/wrapper` 目录下
			* 保证项目组使用统一版本的 maven
	* `/mvnw`：
		* Linux 环境下启动 maven 包装器脚本的命令
	* `/mvnw.cmd`：
		* Windows 环境下启动 maven 包装器脚本的命令
	* `/resources/application.properties`：
		* 集中式管理配置文件
	* `/HELP.md`：
		* 项目的帮助文档，用于记录项目的构建方式、依赖管理、运行方法等，以便开发者快速了解