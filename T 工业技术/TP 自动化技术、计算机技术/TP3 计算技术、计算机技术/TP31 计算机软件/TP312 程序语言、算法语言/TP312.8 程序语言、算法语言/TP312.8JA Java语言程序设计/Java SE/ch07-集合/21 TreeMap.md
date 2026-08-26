---
title: '21 TreeMap'
---

# 21 TreeMap

* `TreeMap` 底层：红黑树
* `TreeMap` 和 `HashMap` 用法一样，需要 `key` 排序时，可以使用 `TreeMap`
* `TreeMap` 的 `key` 不能是 `null`
* 让 `TreeMap` 的 `key` 可排序的方式：
* `key` 实现 `Comparable` 接口，并提供 `compareTo()`，添加比较规则（比较规则不变）
* 创建 `TreeMap` 集合时，传一个比较器，比较器实现 `Comparator` 接口，在 `compare()` 方法中添加比较规则
* 不能添加 `null` 的集合：
* `Hashtable`
* `Properties`
* `TreeMap` 的 `key`
* `TreeSet`
