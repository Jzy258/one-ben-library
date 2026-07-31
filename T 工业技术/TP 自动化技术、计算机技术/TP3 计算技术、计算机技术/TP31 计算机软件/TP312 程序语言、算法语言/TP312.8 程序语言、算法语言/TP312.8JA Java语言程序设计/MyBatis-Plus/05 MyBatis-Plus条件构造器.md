* 条件构造器（Wrapper）：
	* **用途**：
		* 构建动态 SQL 条件
		* 允许通过链式调用编写 `WHERE` 条件
	* **常用类**：
		* `AbstractWrapper`：
			* 抽象基类，定义所有共有的条件方法
		* `QueryWrapper`：
			* 用于查询
			* 额外拥有 `select` 方法，可指定查询字段
		* `UpdateWrapper`：
			* 用于更新
			* 额外拥有 `set` 方法，可指定查询字段
		* `LambdaQueryWrapper` / `LambdaUpdateWrapper`【推荐】：
			* 通过 Lambda 表达式引用实体类属性
	* **常用方法**：
		* 比较：
			* `eq`：等于
			* `ne`：不等于
			* `gt`：大于
			* `ge`：大于等于
			* `lt`：小于
			* `le`：小于等于
			* `between`：在 ... 之间
			* `notBetween`：不在 ... 之间
		* 空值判断：
			* `isNull`：字段值为空
			* `isNotNull`：字段值非空
		* 模糊：
			* `like`：模糊匹配
			* `notLike`：模糊反向匹配
			* `likeLeft`：左模糊
			* `likeRight`：右模糊
		* 范围：
			* `in`：字段值在指定集合中
			* `notIn`：字段值不在指定集合中
			* `inSql`：在子查询的结果集中
			* `notInSql`：不在子查询的结果集中
		* 逻辑：
			* `and`：与
			* `or`：或
		* 排序：
			* `orderByAsc`：升序排序
			* `orderByDesc`：降序排序
		* 分组：
			* `groupBy`：分组
			* `having`：分组后过滤
		* `select`：
			* 指定查询的字段
		* `allEq`：
			* 通过 `Map` 批量设置多个 `eq` 条件
		* `func`：
			* 处理复杂条件逻辑的函数式接口
		* `nested`：
			* 嵌套条件，起到括号的作用
* `QueryWrapper`：
	* **作用**：
		* 构建 `SELECT` 查询的 `WHERE` 条件
		* 通过链式调用生成 SQL 条件，比手写 SQL 更安全
	* 动态查询：
		* 通过条件方法的 `condition` 参数控制该条件是否有效
		* 实现根据传入业务方法的参数是否为空动态定制查询条件
	* 复杂逻辑组合：
		* 使用 `and` 和 `or` 实现与、或条件
		* `and` 采用传参的方式开始一段新的条件范围，以保证优先级
		* `or` 采用链式调用
	* 子查询：
		* `inSql`：
			* 传入需要比较的字段、子查询 SQL 语句（`String`）
		* `notInSql`：
			* 同理
	* 嵌套查询：
		* `nested`：
			* 传入条件字段、子查询条件（Lambda 表达式）
* `UpdateWrapper`：
	* **核心方法**：
		* `set`：
			* 传入需要更新的字段和值
		* `setSql`：
			* 直接传入 SQL 片段并执行，适用于复杂更新
		* `QueryWrapper` 的所有条件方法
	* 使用 `LambdaUpdateWrapper` 使用的 Lambda 表达式均为 Getter
	* `update`：
		* `entity`：
			* 用于指定需要更新的字段
			* 若已经使用 `set` 方法指定了更新字段，则传入 `null` 即可
	* 使用 `setSql` 需要警惕 SQL 注入
	* 