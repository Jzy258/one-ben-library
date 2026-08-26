---
title: '22 Set接口'
---

# 22 Set接口

* HashSet
	* `Set` 接口继承 `Collection`，没有任何新增任何方法
	* 无序不可重复
	* `HashSet` 底层为 `HashMap`，`HashSet` 中元素实际放到了 `HashMap` 的 `key` 部分
	* 放在 `HashSet` 中的元素要同时重写 `hashCode()` + `equals()`
	* 最底层：哈希表
	* `LinkedHashSet` 底层是 `LinkedHashMap`
	* 底层：哈希表 + 双向链表
	* `LinkedHashSet` 集合：有序不可重复
	* 有序：存进去的顺序和取出的顺序一样
	* 元素需重写 `hashCode()` + `equals`
	* 若 `HashSet` 集合中已存在某元素（或 `object.equals()` 返回为 `true`），再次添加则添加失败，返回 `false`
	* 添加成功返回 `true`
* TreeSet
	* 底层：`TreeMap`（红黑树）
	* 有序（可排序）不可重复
	* 排序：实现 `Comparable` 接口，或在构造 `TreeSet` 集合时传一个比较器
	* 不能存放 `null`
