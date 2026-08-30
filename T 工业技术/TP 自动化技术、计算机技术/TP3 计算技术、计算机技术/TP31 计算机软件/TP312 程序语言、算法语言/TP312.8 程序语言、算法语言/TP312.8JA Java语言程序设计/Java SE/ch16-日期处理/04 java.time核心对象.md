* 相比旧日期 API 的优点：
	* 不可变：
		* 每次运算返回新对象
		* 原对象不变
	* 职责分离：
		* 时刻 / 本地时间 / 带区时 / 间隔各使用一个类
	* 支持链式调用
	* 以纳秒为精度
* `LocalDate`：
	* `LocalDate.now()`：
		* 获取当前时间
	* `LocalDate.of()`：
		* 指定年月日
	* `LocalDate.parse()`：
		* 解析
		* 使用 ISO 8601 格式 `yyyy-MM-dd`
		* 使用其他格式需要附带格式化器，否则抛出 `DateTimeParseException`
* `LocalTime`：
	* `LocalTime.now()`：
		* 获取当前时间
	* `LocalTime.of(时, 分)`：
		* 指定时分
* `LocalDateTime`：
	* `LocalDate` 和 `LocalTime` 的结合
* 读取：
	* `getXxx()`（如 `getYear()`）：
		* 获取指定字段（如获取年）
		* `getDayOfMonth()`：
			* 获取当前日期是一个月中的第几天
		* `getDayOfWeek()`：
			* 获取当前日期是星期几
		* `getMonthValue()`：
			* 获取月份值
		* `getMonth()`：
			* 获取月份枚举
			* `Month` 的 `getValue()` 可以获取月份实际值
* 运算：
	* 返回新对象
	* `plusXxxs()`（如 `plusYears(1)`）：
		* 为当前日期增加指定时间间隔（如增加 1 年）
	* `withXxx()`：
		* 修改指定字段
		* 在原对象的**副本**的基础上改动
	* `with()`：
		* 使用 `TemporalAdjuster` 调整日期时间
* 转换：
	* `date.atTime(时, 分)`：
		* `LocalDate` -> `LocalDateTime`
	* `date.atStartOfDay()`：
		* `LocalDate` -> `LocalDateTime`，并将时间字段设为当天的 00:00
	* `dateTime.toLocalDate()`：
		* `LocalDateTime` -> `LocalDate`
	* `dateTime.toLocalTime()`：
		* `LocalDateTime` -> `LocalTime`
	* `atZone()`：
		* 指定时区
	* `toInstant()`：
		* `LocalDateTime` -> `Instant`
		* 需要提前指定时区
* 格式化：
	* `dateTime.format(格式化器)`：
		* 按指定格式格式化
* 默认不包含时区信息
