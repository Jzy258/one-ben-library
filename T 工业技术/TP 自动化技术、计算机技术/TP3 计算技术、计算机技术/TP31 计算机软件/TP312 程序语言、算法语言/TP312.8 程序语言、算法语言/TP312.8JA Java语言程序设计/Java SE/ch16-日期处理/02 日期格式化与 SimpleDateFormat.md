* `SimpleDateFormat`：
	* `new SimpleDateFormat(格式)`：
		* 创建指定日期格式模板的格式化器
	* `format(date)`：
		* 格式化 `Date` 对象
	* `parse(str)`：
		* 按指定模板解析日期字符串
	* **问题**：
		* 非线程安全：
			* 多线程共享一个 `SimpleDateFormat` 会导致并发混乱，偶发 `NumberFormatException`
		* `parse` 必须使用 `try-catch` 包裹
			* 格式不匹配会抛出受检异常 `ParseException`
* 非线程安全的兼容性解决方法：
	* 方式一：每次使用都 `new` 一个，用完即弃
	* 方式二：使用 `ThreadLocal` 包装
		```java
private static final ThreadLocal<SimpleDateFormat> TL = 
	ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));

// 使用
TL.get().format(date);
TL.get().parse(str);
		```
