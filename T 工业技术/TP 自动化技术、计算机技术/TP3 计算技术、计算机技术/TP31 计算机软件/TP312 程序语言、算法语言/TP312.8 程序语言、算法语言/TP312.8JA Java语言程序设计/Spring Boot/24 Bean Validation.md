---
title: '24 Bean Validation'
---

# 24 Bean Validation

* Bean Validation：
	* **作用**:
		* 用于校验数据
	* **适用于**：
		* DTO 等传入数据的场景
	* 基础约束：
		* `@NotNull`：
			* 值不为 `null`
			* **适用于**：任何类型
		* `@NotEmpty`：
			* 值不为 `null` 且 `length > 0` 或 `size > 0`
			* **适用于**：`String`、`Collection`、`Map`、数组
		* `@NotBlank`：
			* 值不为 `null` 且 `trim` 后 `length > 0`
			* **适用于**：`String`
		* `@Size(min, max)`：
			* `length` 或 `size` 的大小范围			
			* **适用于**：`String`、`Collection`、`Map`、数组
		* `@Min(value)`：
			* 最小值
			* 数值类型
		* `@Max(value)`：
			* 最大值
			* 数值类型
		* `@Email`：
			* 邮箱格式
			* **适用于**：`String`
		* `@Pattern(regexp)`：
			* 正则匹配
			* **适用于**：`String`
	* 特殊约束：
		* `@Positive` / `@PositiveOrZero`：
			* 正数 / 非负数
			* **适用于**：数值类型
		* `@Negative` / `@NegativeOrZero`：
			* 负数 / 非正数
			* **适用于**：数值类型
		* `@Past` / `@PastOrPresent`：
			* 过去 / 过去或现在
			* **适用于**：日期 API
		* `@Future` / `@FutureOrPresent`：
			* 未来 / 未来或现在
			* **适用于**：日期 API
		* `@Digits(integer, fraction)`：
			* 数字位数限制
			* **适用于**：浮点数等
	* 使用步骤：
		* 在类中的属性上编写校验规则
		* 在需要校验的参数上加 `@Valid` 注解
		* 校验失败则抛出 `MethodArgumentNotValidException` 异常
