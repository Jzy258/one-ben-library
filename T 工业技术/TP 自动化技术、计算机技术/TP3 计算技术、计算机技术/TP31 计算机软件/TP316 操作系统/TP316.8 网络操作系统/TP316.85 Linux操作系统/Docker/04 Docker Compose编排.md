* 多阶段构建：
	* 将构建拆分为纯构建和运行，确保运行环境的干净
	* **基本流程**：
		* `FROM 构建镜像 AS build`：
			* 用于构建的镜像
			* 取别名为 `build`
		* 构建配置
		* `FROM 运行镜像`：
			* 用于运行的镜像
		* `COPY --from=build 构建镜像中的工件 运行镜像中的目标位置`
			* 从构建阶段拷贝文件
		* 运行配置
* `docker compose`：
	* **作用**：
		* 实现多个容器联动的脚本
		* 便于编排多个 `docker run` 命令，实现脚本化
	* 编写 `docker-compose.yml`：
		* `services`：
			* 定义编排的各项服务
		* 服务内的指令：
			* `image`：
				* 基本镜像
			* `environment`：
				* 环境变量
			* `volumes`：
				* 将容器内的卷挂载到磁盘上的实际位置
			* `ports`：
				* 监听端口
			* `build`：
				* 按指定路径下的 `dockerfile` 构建
			* `depends_on`：
				* 依赖的服务
		* `volumes`：
			* 声明卷
	* `docker compose up`：
		* 基于 `yml` 中的配置启动相关容器资源
		* `-d`（detach，分离模式）：
			* 在后台运行
	* `docker compose down`：
		* 删除相关容器和网络等资源
		* 不会删除挂载的目录
	* `docker compose ps`：
		* 查看所有服务的状态
	* `docker compose logs -f 服务`：
		* 实时查看服务日志
	* `docker compose exec 服务 bash`：
		* 进入服务容器控制台
