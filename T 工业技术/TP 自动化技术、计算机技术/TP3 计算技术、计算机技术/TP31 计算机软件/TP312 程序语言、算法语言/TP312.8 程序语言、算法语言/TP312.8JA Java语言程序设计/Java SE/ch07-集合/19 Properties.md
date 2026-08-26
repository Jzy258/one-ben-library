---
title: '19 Properties'
---

# 19 Properties

* 属性类，通常和 `.properties` 属性文件一起使用
* 线程安全的
* 不支持泛型，`key` 和 `value` 只能是 `String` 类型
* 相关方法：
* `Object setProperty(String key, String value)`：同 `put()`
* `String getProperty(String key)`：通过 `key` 获取 `value`
* `Set<String> propertyNames()`：获取所有的 `key`
