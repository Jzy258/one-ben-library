---
title: '22 Spring Task定时任务'
---

# 22 Spring Task定时任务

> module `springboot-011`
* Spring 支持定时任务：
	* 定义定时任务类，使用 `@Scheduled` 注解
	* 在主入口使用 `@EnableScheduling` 启用定时任务
* `@Scheduled` 的属性：
	* `fixedRate`：
		* 若执行时间超过规定时间，则本次执行结束后下次执行立即开始
	* `fixedDelay`：
		* 自上一次执行结束开始计时
	* `initialDelay`：
		* 第一次执行前的延迟时间
		* `-1`（默认）表示不延迟
	* `fixedRateString`、`fixedDelayString` 和 `initialDelayString`：
		* 效果同上，但传入字符串参数，可以通过配置文件配置
	* `timeUnit`：
		* 指定时间单位
		* 建议使用 `TimeUnit` 类的常量
* cron 表达式：
	* `秒 分 时 日 月 星期 [年]`
	* 通配符：
		* `*`：
			* 所有可能的值
		* `,`：
			* 列出的值
		* `-`：
			* 值的范围
		* `/`：
			* 增量
		* `?`：
			* 不指定值（只能用于日期或星期字段）
		* `L`：
			* 最后一天或最后一个星期几
		* `W`：
			* 离指定日期最近的工作日
		* `#`：
			* 每月的第几个星期几
