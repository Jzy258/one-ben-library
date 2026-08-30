* 容器技术：
	* 命名空间：
		* 用于区分同名元素
	* **作用**：
		* 创建隔离的环境
	* **发展**：
		* `chroot`：
			* 更改根目录视图，实现文件隔离，限制程序操作范围
		* `Jails`：
			* 实现操作系统虚拟化
			* 为进程提供独立的进程空间、网络空间、文件系统，实现环境隔离
		* LXC 技术：
			* 利用 Linux 系统内的 `namespace` 实现隔离
			* 使用 `cgroups` 实现资源限制
		* Docker Hub：
			* `dotCloud` 公司简化 LXC，提供用于分享容器环境的平台 Docker Hub
			* 推行一套用于构建容器环境的标准 Dockerfile
		* OCI：
			* 指定同一的容器运行时和镜像的格式标准
		* Kubernetes：
			* 云原生领域服务器集群容器的编排管理工具
	* **解决问题**：
		* 软件交付时的环境问题
	* 容器能共享操作系统的内核，无需单独的虚拟软件隔离
* Docker：
	* Rocky Linux 默认会启用 `podman` 容器管理技术，该工具与 Docker 存在不兼容性，需要提前卸载
		* `podman` 的相关依赖存在于 `"Container Management"` 组中，需要一并移除
	* 基于 C/S 架构
		* Docker Client 通过 `/var/run/docker.socket` 与 Docker Daemon 通信，从而实现容器相关的管理
		* 若 Docker 服务出现问题，则容器无法正常工作
	* 镜像（Image）：
		* 静态文件，只读模板
		* 定义容器中的文件资源、启动命令、环境变量等
	* 容器（Container）：
		* 运行时状态
		* 基于一个特定的镜像创建出的隔离环境
		* 有独立的文件系统、网络、进程等资源
	* 镜像仓库（Registry）：
		* 用于上传、下载、分享镜像的网站平台
	* 配置国内 Docker 镜像代理：
		* `vim /etc/docker/daemon.json`
          ```json
			{
				"registry-mirrors": [
					"http://docker.1ms.run"
				]
			}
          ```
		* 需要重启 `docker` 服务

---
补充：
* DNAT（Destination Network Address Translation，目标网络地址转换）：
	* **作用**：
		* 将数据包的目标 IP 地址和端口替换成另一个地址
	* **工作流程**：
		* 对外提供公网 IP 地址和端口
		* 数据包通过公网 IP 和端口到达网关
		* 网关检查预设的 DNAT 规则，将数据包的目标 IP 和端口替换为对应的私有 IP 和端口
		* 服务器处理请求，将响应返回网关
		* 网关将响应的源 IP 和端口替换为公网 IP 和端口，返回给用户
	* **应用场景**：
		* 端口转发
		* 发布内网服务
* `/etc/os-release`：
	* 查看系统信息