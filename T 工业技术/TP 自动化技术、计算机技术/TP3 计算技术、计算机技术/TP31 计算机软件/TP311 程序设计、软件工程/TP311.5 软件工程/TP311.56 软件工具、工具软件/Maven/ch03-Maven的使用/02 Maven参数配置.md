配置本地仓库：
* `<localRepository>` 设为本地的文件夹，用于存储本地 `jar` 包

配置远程仓库镜像：
* `<mirrors>` 中添加：
	```xml
	<mirror>
	  <id>nexus-aliyun</id>
	  <mirrorOf>central</mirrorOf>
	  <name>Nexus Aliyun</name>
	  <url>https://maven.aliyun.com/repository/central</url>
	</mirror>
	```


