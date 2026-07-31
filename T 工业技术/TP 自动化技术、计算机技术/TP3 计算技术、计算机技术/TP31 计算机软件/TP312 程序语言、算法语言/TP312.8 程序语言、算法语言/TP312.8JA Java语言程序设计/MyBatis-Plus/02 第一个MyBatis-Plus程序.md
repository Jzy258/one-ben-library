> module `mybatis-plus-001`
* **实现步骤**：
	* 引入依赖 `mybatis-plus-spring-boot4-starter`
	* 配置 `application.yml`：
		* `mybatis-plus.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl`：
			* 开启 SQL 日志
		* `mybatis-plus.global-config.db-config.id-type=auto`：
			* 自动选择主键策略
	* 建库建表
	* 使用 `@TableName` 注解实体类
	* Mapper 继承 `BaseMapper`，泛型使用对应实体类
	* 在启动类添加 `@MapperScan` 扫描 Mapper
	* 运行测试
