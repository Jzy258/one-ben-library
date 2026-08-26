---
title: '18 HashTable'
---

# 18 HashTable

* 底层：哈希表
* 线程安全的，方法都被 `synchronized` 修饰；使用较少，保证线程安全有其他方式
* 初始化容量：11
* 默认加载因子：0.75
* 扩容策略：2 倍
* 与`HashMap`的区别：
* `HashMap` 线程不安全，效率高，`key` 和 `value` 允许 `null`
* `Hashtable` 线程安全，效率低，`key` 和 `value` 不允许 `null`
* `Hashtable` 不属于集合框架的传统方法：
* `Enumeration keys()`：获取所有 `key` 的迭代器
* `Enumeration elements()`：获取所有 `value` 的迭代器
* `Enumeration` 的相关方法：
* `boolean hasMoreElements()`：是否含有元素
* `E nextElement()`：获取元素
