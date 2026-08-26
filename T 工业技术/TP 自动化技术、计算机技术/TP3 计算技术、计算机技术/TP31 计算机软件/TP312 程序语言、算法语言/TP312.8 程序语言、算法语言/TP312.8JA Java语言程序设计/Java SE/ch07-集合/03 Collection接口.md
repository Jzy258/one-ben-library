---
title: '03 Collection接口'
---

# 03 Collection接口

* 通用方法
	* `boolean add(E e)`：向集合中添加元素
	* 自动装箱
	* `int size()`：获取集合的元素个数
	* `boolean addAll(Collection<? extends E> c)`：向集合中添加另一个集合的所有元素
	* `boolean contains(Object o)`：判断集合中是否包含某元素
	* `boolean remove(Object o)`：从集合中移除元素
	* `void clear()`：清空集合
	* `boolean isEmpty()`：判断集合是否为空
	* `Object[] toArray()`：将集合转换为数组
* 遍历
	* `boolean hasNext()`：判断当前光标是否还有下一个元素
	* `E next()`：获取当前光标的下一个元素，并将光标下移一位
