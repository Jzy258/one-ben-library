---
title: '03 MyBatis-Plus常用注解'
---

# 03 MyBatis-Plus常用注解

* 常用注解：
	* `@TableName`：
		* 实体类名与数据库表名不一致时，用于指定表名
		* **属性**：
			* `value`：
				* 指定表名
			* `schema`：
				* 指定数据库名
			* `keepGlobalPrefix`：
				* 是否在指定的表名中添加全局表前缀
					* `application.yml` 中可以配置 `mybatis-plus.global-config.db-config.table-prefix` 以指定所有表的前缀
			* `autoResultMap`：
				* 是否自动生成 `resultMap`
			* `resultMap`：
				* 手动指定 `resultMap` 的 ID
				* 指定后，`autoResultMap` 失效
			* `excludeProperty`：
				* 生成 SQL 时排除的实体类属性
				* 适合批量排除
	* `@TableId`：
		* 标识实体类中的主键
		* **属性**：
			* `value`：
				* 指定主键名
			* `type`：
				* 指定逐渐的生成策略
				* **可选值**：
					* `IdType.AUTO`：
						* 使用数据库自增
					* `IdType.ASSIGN_ID`【默认】：
						* 使用雪花算法生成 ID
					* `IdType.INPUT`：
						* 由用户自行设置主键值
					* `IdType.ASSIGN_UUID`：
						* 生成 `String` 类型的 32 位 UUID
					* `IdType.NONE`：
						* 跟随全局配置
	* `@TableField`：
		* **属性**：
			* `value`：
				* 指定数据库表中的字段名
			* `exist`：
				* 该字段在数据表中是否存在
			* `fill`：
				* 配合自动填充功能，指定字段在插入 / 更新时自动填充
				* 配合 `MetaObjectHandler` 使用
				* **适用于**：
					* `create_time`、`update_time` 等审计字段
			* `updateStrategy`：
				* 指定执行 `UPDATE` 操作时的行为
				* 可选值：
					* `NOT_NULL`【默认】：
						* 不为 `null` 时才更新数据
					* `IGNORE`：
						* 强制更新数据
			* `typeHandler`：
				* 用于处理特殊类型的转换
				* **如**：以 `Map` 类型接收表内 JSON 数据时，需要指定 `JacksonTypeHandler` 完成序列化和反序列化
	* `@TableLogic`：
		* 实现逻辑删除
		* 将删除操作变为更新操作 `UPDATE xxx SET deleted = 1`
		* 查询时自动过滤已删除数据
	* `@Version`：
		* 实现乐观锁机制
		* 标记整型版本号字段 `version`，更新数据时检查版本号，防止并发冲突
	* `@EnumValue`：
		* 实现枚举映射
		* 标记枚举类中的字段，指定该枚举在数据库中存储的值
* 实体类与表的对应关系：
	* 默认约定：
		* 表名：`User` -> `user`
		* 字段名：`userName` -> `user_name`
		* 主键：`id` 默认视为主键名
	* 注解覆盖：
		* `@TableName`：指定表名
		* `@TableId`：指定主键字段和生成策略
		* `@TableField`：指定普通字段
	* 核心流程：
		* MyBatis-Plus 通过 `@MapperScan` 扫描到 Mapper 接口
		* 通过 `BaseMapper<T>` 的泛型解析对应实体类信息
		* 生成内部的 `TableInfo` 对象（包含表名、主键、字段映射关系）
		* 将 `TableInfo` 注入到 `BaseMapper` 中，生成预制的 CRUD SQL 语句
* 自动填充：
	* **作用**：
		* 在插入（`INSERT`）或更新（`UPDATE`）数据时，自动为指定字段（如创建时间、更新时间等）赋值
	* **实现步骤**：
		* 在实体类中使用 `@TableField(fill = ?)` 标记需要自动填充的字段，`?` 表示填充时机
			* **可选值**：
				* `FieldFill.INSERT`：
					* 在插入时填充
				* `FieldFill.UPDATE`：
					* 在更新时填充
				* `FieldFill.INSERT_UPDATE`：
					* 在插入和更新时填充
				* `FieldFill.NONE`【默认】：
					* 不处理
		* 实现 `MetaObjectHandler` 类，重写 `insertFill` 和 `updateFill` 方法
			* 通常调用 `this.strictInsertFill` 执行填充
