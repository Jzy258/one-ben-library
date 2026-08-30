* 编写 `Dockerfile`：
	* `FROM`：
		* 选择一个基础镜像作为自定义镜像的基础
		* 可以使用 `@sha256` 通过摘要锁定版本
	* `WORKDIR`：
		* 指定容器工作目录
	* `RUN`：
		* 构建时运行的命令
	* `ADD`：
		* 自动解压 `tar` 包并复制文件
		* 支持远程 URL【不推荐】
	* `COPY`：
		* 将容器外的文件复制到容器内
	* `EXPOSE`：
		* 运行后需要监听的端口号
		* 只是说明，实际要使用 `docker run -p xxxx`
	* `CMD`：
		* 容器启动时默认执行的命令
		* 使用列表分隔各个命令行参数
		* `docker run 镜像 命令` 可覆盖
		* 常用于指定默认参数
		* 建议使用 exec 形式（JSON 数组），不经过 Shell，支持优雅停机、`docker stop`
	* `ENV`：
		* 指定环境变量
		* 构建时和运行时都存在
		* `docker run -e` 可以覆盖
	* `ARG`：
		* 指定构建时的参数
		* 只在构建时存在
		* `docker build --build-arg` 可覆盖
	* `ENTRYPOINT`：
		* 指定入口命令
		* 容器每次启动都会执行
	* `VOLUME`：
		* 卷
	* `USER`：
		* 用户
	* `HEALTHCHECK`：
		* 监控检查
* 层缓存：
	* **原理**：
		* 若 `COPY`、`RUN` 的输入不变，则直接复用之前的层
	* 依赖层前置：
		```dockerfile
COPY pom.xml
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests
		```
		* `mvn dependency:go-offline`：
			* 解析并下载所有项目依赖
			* 将构件缓存到本地仓库，便于断网后直接复用
		* `mvn package -DskipTests`：
			* 执行项目打包，并跳过测试用例的执行
		* 依赖不变则不会重新安装依赖，只有 `src` 变化会重新构建
* `.dockerignore`：
	* 类似于 `.gitignore`
	* **作用**：
		* 排除不应进入构建上下文的文件
	* **常用配置**：
		```dockerignore
target/
.git/
.idea/
*.log
		```
