* `IService` 接口：
	* MyBatis-Plus 为 Service 层提供的核心接口
	* 继承自 `ServiceImpl` 类
	* **作用**：
		* 封装了大多数常用的业务逻辑方法
			* 组合了多个 DAO 操作
			* 处理批量任务
			* 管理事务
		* 简化 Service 层的代码
		* 提供语义化方法
			* **如**：
				* `save`、`remove`、`get`、`list`
	* **使用步骤**：
		* 创建 Service 接口继承 `IService`，指定实体类型
		* 创建实现类继承 `ServiceImpl` 并实现上述 Service 接口
			* 默认的 CRUD 方法已经实现，无需编写
			* 只需要实现 Service 接口中自定义的业务方法
		* 在 Controller 中注入 Service 接口
	* **常用方法**：
		* `save`：
			* 插入数据
			* `saveBatch`：
				* 批量插入
		* `saveOrUpdate`：
			* ID 存在在更新，否则插入
			* **原理**：
				* 先根据 ID 执行 `selectById`
				* 若存在则执行 `updateById`
				* 否则执行 `insert`
			* `saveOrUpdateBatch`：
				* 批量版
		* `remove`：
			* 删除数据
			* 若配置逻辑删除，则默认执行逻辑删除
			* `removeById`：
				* 按主键删除
			* `removeByIds`：
				* 按主键批量删除
			* `removeByMap`：
				* 按 `Map` 条件删除
			* `remove`：
				* 按 `Wrapper` 条件删除
			* `removeBatchByIds`：
				* 按主键批量删除
		* `update`：
			* 更新数据
			* `updateById`：
				* 根据主键更新数据
			* `update`：
				* 按 `Wrapper` 条件更新数据
				* `entity` 参数不为 `null` 时则将数据更新为 `entity` 的值
			* `updateBatchById`：
				* 按主键批量更新数据
		* `get`：
			* 查询单条数据
			* `getById`：
				* 按主键查询单条数据
			* `getOne`：
				* 传入 `Wrapper` 按条件查询单条数据
				* `throwEx` 参数指定得到多条记录时是否抛异常
			* `getMap`：
				* 按 `Wrapper` 条件查询，并以 `Map` 形式返回结果
			* `getObj`：
				* 按 `Wrapper` 条件查询，并将结果通过 `mapper` 函数转换为指定类型
		* `list`：
			* 查询所有记录或按 `Wrapper` 条件查询多条数据
			* `listByIds`：
				* 按主键查询多条数据
			* `listByMap`：
				* 按 `Map` 条件查询多条数据
			* `listMaps`：
				* 按条件查询数据并以 `List<Map>` 形式返回
			* `listObjs`：
				* 按条件查询并以 `List<Object>` 形式返回或通过 `mapper` 函数转换成指定类型
		* `page`：
			* 分页查询，传入 `Page` 对象和 `Wrapper`，返回含记录的 `Page` 对象
			* `pageMaps`：
				* 以 `Map` 形式返回结果
		* `count`：
			* 查询总记录数或满足 `Wrapper` 条件的记录数
		* 链式查询：
			* 通过 `query` 或 `lambdaQuery` 获取链式查询构建器
			* 使用 `QueryWrapper` 或 `LambdaQueryWrapper` 提供的条件方法筛选
			* 最后使用 `get` 或 `list` 等执行查询
		* 链式更新：
			* 通过 `update` 或 `lambdaUpdate` 获取链式更新构建器
			* 使用 `UpdateWrapper` 或 `LambdaUpdateWrapper` 提供的条件方法筛选
			* 最后使用 `update()` 执行更新
	* 在 Service 实现类上使用 `@Transactional` 注解以支持事务管理
	* 含 `Batch`  的批量操作方法默认每批 1000 条，可通过配置调整
		* 可以在数据库连接 URL 后添加 `rewriteBatchedStatements=true` 参数提高批量操作性能
