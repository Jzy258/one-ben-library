---
title: '07 List接口'
---

# 07 List接口

	* 有序可重复
* 常用方法
	* `void add(int index, E element)`：在指定下标处添加元素
	* `E remove(int index)`：根据下标删除元素
	* `E set(int index, E element)`：修改指定下标的元素
	* `E get(int index)`：根据下标获取元素
	* `int indexOf(Object o)`：获取指定元素第一次出现的下标
	* `int lastIndexOf(Object o)`：获取指定元素最后一次出现的下标
	* `List<E> subList(int fromIndex, int toIndex)`：根据下标截取子列表
	* `static <E> List<E> of(E... elements)`：返回包含任意数量元素的只读列表
	* 若试图修改此列表的元素，则抛出 `UnsupportedCoperationException`
	* `ListIterator<E> listIterator()`：获取 `ListIterator`
	* `ListIterator<E> listIterator(int index)`：从某一下标开始获取 `ListIterator`
* ListIterator
	* `void add(E e)`：将元素添加到光标位置（后续元素下移），并将光标下移一位
	* `boolean hasPrevious()`：判断光标是否存在上一个元素
	* `E previous()`：获取上一个元素（将光标上移一位，然后返回光标指向的元素）
	* `int nextIndex()`：获取当前光标的下标
	* `int previousIndex()`：获取光标的上一个位置的下标
	* `void set(E e)`：修改上一次next()方法返回的那个数据
	* 前提：先调用了 `next()` 方法，否则抛出 `IllegalStateException`（无效状态异常）
	* `void sort(Comparator<? super E> c)`：排序该列表
* Comparator
	* 单独定义一个 `Comparator` 类存放重写的 `compareTo()` 方法
	* 可以采用匿名内部类
