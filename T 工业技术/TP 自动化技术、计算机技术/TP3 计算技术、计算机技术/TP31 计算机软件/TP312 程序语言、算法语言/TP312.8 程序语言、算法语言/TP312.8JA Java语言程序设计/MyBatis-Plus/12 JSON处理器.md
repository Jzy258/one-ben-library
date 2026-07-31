* JSON 处理器：
	* **作用**：
		* 解决 Java 对象与 JSON 字段之间的自动映射问题
	* 内置 JSON 处理器：
		* `JacksonTypeHandler`：
			* 基于 Jackson 库
		* `FastjsonTypeHandler`：
			* 基于阿里 Fastjson 库
		* `GsonTypeHandler`：
			* 基于 Gson 库
	* **使用方法**：
		* 在 Entity 中使用 `@TableName(autoResultMap = true)` 开启自动映射
		* 使用`@TableField(typeHandler = JacksonTypeHandler.class)` 指定需要自动映射的字段和处理器
		* 确保对应的数据库字段类型为 `JSON`
