---
title: '14 Map继承结构'
---

# 14 Map继承结构

* （见7.2.mdj）
* `HashSet`：无序不重复集合，底层采用哈希表数据结构
* `LinkedHashSet`：有序集合，底层采用双向链表、哈希表数据结构
* `TreeMap`：有序可排序集合，底层采用红黑树
* `Map` 集合以键值对的方式存储：key-value
* 以上底层都创建了 `Map` 对象，取键值对中的 `Key` 部分作为 `Set`
* `Map` 和 `Collection` 没有继承关系
* `key` 和 `value` 都是引用数据类型
* 对于 `Map` 集合来说，`key` 主导，`value` 是 `key` 的附属
* `HashTable`：底层采用哈希表，线程安全的，效率较低，使用较少
* `Properties`：`key` 和`value` 都是 `String` 类型
