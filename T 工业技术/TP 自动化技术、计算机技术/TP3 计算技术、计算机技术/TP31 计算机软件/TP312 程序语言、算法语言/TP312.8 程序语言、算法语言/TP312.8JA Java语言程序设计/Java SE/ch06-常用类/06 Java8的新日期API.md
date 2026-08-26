---
title: '06 Java8的新日期API'
---

# 06 Java8的新日期API

* java.time 包
	* Java 8 的新日期 API 是线程安全的
	* `java.time.LocalDate`、`java.time.LocalTime`、`java.time.LocalDateTime`：日期、时间、日期时间
	* `java.time.Instant`：时间戳信息
	* `java.time.Duration`：计算两个时间对象之间的时间间隔，精度为纳秒
	* `java.time.Period`：计算两个日期之间的时间间隔，以年、月、日为单位
	* `java.time.temporal.TemporalAdjusters`：提供一些方法用于日期时间调整
	* `java.time.format.DateTimeFormatter`：用于日期时间的格式化
* LocalDateTime 类
	* `static LocalDateTime now()`：获取当前时间，精确到纳秒
	* `static LocalDateTime of(int year, int month, int dayOfMonth, int hour, int second, int nanoOfSecond)`：获取指定时间
	* `LocalDateTime plusYears(long years)`等：加时间
	* `LocalDateTime minusYears(long years)`等：减时间
	* 链式调用：返回值类型与调用者相同时能够连续调用实例方法
	* `LocalDateTime with(TemporalAdjuster adjuster)`：使用时间矫正器矫正时间
	* `static LocalDateTime parse(CharSequence text)`：将字符串分析为 `LocalDateTime`
* Instant 类
	* `static Instant now()`：获取当前时间
	* `long epochMilli()`：返回时间戳
* Duartion 类
	* `static Duartion between(Temporal startInclusive, Temporal endExclusive)`：计算两个时间戳之间的时间间隔
	* `long toDays()`：将 `Duration` 转换为天数
* Period 类
	* `static Period between(LocalDate startDateInclusive, LocalDate endDateExclusive)`：计算时间间隔
	* `int getDays()`：获取相差天数
	* 与 `Duration` 中的 `toDays()` 不同，`getDays()` 不会返回天数的合计
* TemporalAdjusters 接口
	* `static TemporalAdjuster firstDayOfMonth()`：本月的第一天
	* `static TemporalAdjuster lastDayOfMonth()`：本月的最后一天
	* `static TemporalAdjuster firstDayOfYear()`：本年的第一天
	* `static TemporalAdjuster lastDayOfYear()`：本年的最后一天
	* `static TemporalAdjuster firstDayOfNextYear()`：下一年的第一天
	* `static TemporalAdjuster next(DayOfWeek dayOfWeek)`：下周的某一天
* DayOfWeek 枚举
	* 枚举了一周中的某一天，如：
	* `MONDAY`：星期一
* DateTimeFormatter 类
	* `static DateTimeFormatter ofPattern(String pattern)`：设置格式化样式，字符串格式同 `java.util.SimpleDateFormat`
	* `String format(TemporalAccessor temporal)`：将 `LocalDateTime` 格式化为字符串
