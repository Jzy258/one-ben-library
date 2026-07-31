`SqlSession#insert(SQL语句ID, 要插入的对象)`：
* SQL 语句 ID 为 `XxxMapper.xml` 中定义的 SQL 语句
	* SQL 语句中使用 `#{}` 作为占位符
* 要插入的对象可以为：
	* `Map` 对象：
		* 每个键对应一个字段，每个值对应一个数据项
		* `#{}` 占位符中填写键
		* 底层会调用 `get()` 方法，获取不到键对应的值，则值为 `null`
	* POJO 对象：
		* 建议使用包装类，因为查询结果可能为 `null`
		* 底层会调用 POJO 类中的 `getXxx()` 


