---
title: '04 反射 Field'
---

# 04 反射 Field

* 反射 `Field` 包括：
* `Class` 的 `getDeclaredField(String fieldName)`：
	* 通过字段名获取 `Field`
* `Class` 的 `Field[] getFields()`：
	* 获取所有 `public` 修饰的属性 / 字段
* `Class` 的 `Field[] getDeclaredFields()`：
	* 获取所有属性，包括私有的
* 私有的字段需要使用 `void setAccessible(boolean flag)` 打破封装
	* 修改某个对象的属性值：`Field` 的 `set(myObject, newValue)`
* `Field` 类的常用方法：
* `Class<?> getType()`：获取属性 /字段的类型
* `String getName()`：获取名称
* `String getSimpleName()`：获取简单名称
* `int getModifiers()`：获取修饰符列表
	* 获取到的是整数，是各个修饰符相加得到的结果
	* 默认 = 0，`public` = 1，`private` = 2，`protected` = 4，`static` = 8，`final` = 16
	* 可以使用 `Modifier` 的 `toString(int mod): String` 将整数转换为修饰符字符串
