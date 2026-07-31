* 基础配置：
	* `mybatis-plus.mapper-locations=classpath*:/mapper/**/*.xml`：
		* 指定 Mapper.xml 的位置
		* 支持通配符
		* `classpath*:` 表示从所有类路径根目录下寻找，包括 jar 包中的依赖
	* `mybatis-plus.type-aliases-package=com.example.demo.entity`：
		* 指定需要取别名的实体类扫描包
	* `mybatis-plus.type-handlers-package=com.example.demo.handler`：
		* 指定自定义类型处理器扫描路径
	* `mybatis-plus.check-config-location=false`：
		* 启动时是否检查 Mapper.xml 是否存在
		* 开发、测试环境下建议开启，以便快速发现问题；生产环境建议关闭以提高性能
* 自定义类型处理器：
	* **作用**：
		* 处理 Java 对象和数据库字段之间的转换
	* **实现步骤**：
		* 创建处理器类，继承 `BaseTypeHandler`，实现 4 个抽象方法：
			* `setNonNullParameter`：
				* 实现将 Java 对象传入 `PreparedStatement`
			* `getNullableResult`：
				* 从 `ResultSet` 或 `CallableStatement` 取出数据并转换为 Java 对象
				* 共 3 个重载
		* 注册处理器：
			* 在 `application.yml` 中配置 `mybatis-plus.type-handlers-package`，指定处理器包扫描路径
			* 或在需要转换的字段上加 `@TableField(typeHandler = Xxx.class)` 进行局部注册
	* 加密字段处理：
		* 在 `setNonNullParameter` 中加密
		* 在 `getNullableResult` 中解密
	* JSON、简单枚举等类型可以使用内置处理器
* 全局策略配置：
	* `mybatis-plus.global-config.banner=true`：
		* 是否开启 MyBatis-Plus 的 Banner
	* `mybatis-plus.global-config.db-config.id-type=auto`：
		* 全局指定主键策略
	* `mybatis-plus.global-config.db-config.update-strategy=not_null`：
		* 全局指定更新策略
	* 逻辑删除相关：
		* `mybatis-plus.global-config.db-config.logic-delete-field=deleted`：
			* 指定逻辑删除标志字段名
	      * `mybatis-plus.global-config.db-config.logic-delete-value=1`：
		      * 指定用于表示已删除的值
	      * `mybatis-plus.global-config.db-config.logic-not-delete-value=0`：
		      * 指定用于表示未删除的值
      * `mybatis-plus.global-config.db-config.table-prefix`：
	      * 指定表前缀
* MyBatis 原生配置：
	* `mybatis-plus.configuration.map-underscore-to-camel-case=true`：
		* 将数据库表字段的 `snake_case` 转换成 `camelCase`
	* `mybatis-plus.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl`：
		* 开启 MyBatis-Plus 控制台日志
	* `mybatis-plus.configuration.cache-enabled=false`：
		* 是否开启二级缓存
	* `mybatis-plus.configuration.lazy-loading-enabled=true`：
		* 是否开启懒加载
	* ``mybatis-plus.configuration.aggressive-lazy-loading=false`：
		* 是否开启侵略性懒加载
	* `mybatis-plus.configuration.auto-mapping-behavior=partial`：
		* 指定自动映射的行为
		* **可选值**：
			* `partial`【默认】：
				* 部分自动映射
				* 若结果集中有字段名与实体类属性名匹配，则自动填充
				* 不适用于嵌套映射，需要手动配置
			* `full`：
				* 完全自动映射
				* 自动处理所有字段 - 属性映射
				* 可能导致歧义和性能问题
			* `none`：
				* 关闭自动映射
				* 所有结果映射必须在 `<resultMap>` 中手动配置
	* `mybatis-plus.configuration.default-enum-type-handler=org.apache.ibatis.type.EnumOrdinalTypeHandler`：
		* 指定默认枚举处理器
