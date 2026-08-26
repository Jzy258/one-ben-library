---
title: '09 Arrays工具类'
---

# 09 Arrays工具类

* toString() 方法
	* `Arrays`类的构造方法私有化，无法实例化
	* 将数组对象转换为字符串
	* `deepToString()`：深度转换，将多维数组中的每一个一维数组转换为字符串
* equals() 方法
	* 数组中每一个元素相同，则数组相同
	* `deepEquals()`：判断两个多维数组是否相等
* sort() 方法
	* `static void sort(byte[] a)`：排序数组
	* 排序数组时自动调用 `前一个元素.compareTo(后一个元素)`
	* 所以默认升序
	* 所以字符串数组按字典顺序排序
	* 被排序的对象需要实现 `Comparable` 接口，重写 `compareTo()` 方法
	* `compareTo()` 的返回值：
	* 0：相等
	* 负数：当前对象小于待比较对象
	* 正数：当前对象大于待比较对象
	* `static <T> void sort(T[] a, Comparator<? super T> c)`：指定比较器的排序
* （Java 8）parallelSort() 方法
	* `Arrays.parallelSort()`：启用多核CPU并行排序
	* 通常用于排序较大的数据量
	* `System.currentTimeMillis()`：获取从1970.1.1 00:00:00 000 到当前系统时间的毫秒数
	* 数据长度需要超过4096，否则调用 `sort()` 方法
* binarySearch() 方法
	* 使用二分法查找元素，返回下标
	* `Arrays.fill()`方法：用特定元素填充数组
* copyOf() 方法
	* 从原数组中拷贝新数组（或片段）
	* `Arrays.copyOfRange()`：拷贝数组片段
* 其他常用方法
	* `static <T> List<T> asList(T... a)`：将数组 `a` 转换为 `List` 集合
	* `static DoubleStream stream(double[] array)`：创造数组 `array` 的 Stream 流
