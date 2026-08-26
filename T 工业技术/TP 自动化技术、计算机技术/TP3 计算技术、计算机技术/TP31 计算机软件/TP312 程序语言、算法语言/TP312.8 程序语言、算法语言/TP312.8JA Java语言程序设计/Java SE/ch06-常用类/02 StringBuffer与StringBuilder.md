* 可变长度字符串
	* `StringBuffer` 对方法添加了同步锁，是线程安全的，但效率比 `StringBuilder` 低
	* `StringBuilder` 和 `StringBuffer` 都实现了 `Comparable`、`CharSequence`、`Appendable` 接口，继承了 `AbstractStringBuilder` 抽象类
	* `StringBuilder` 的 `value` 属性没有 `final` 修饰
	* `StringBuilder` 初始容量为 `16`
	* `AbstractStringBuilder` 的 `count` 属性：目前 `StringBuilder` 中真实存储的字符数
	* `append()` 方法的扩容策略：每次扩容为原来的 2 倍加 2
* 常用方法
	* `append()`：追加字符串
	* `delete()`：删除从 `start` 到 `end - 1` 的字符串
	* `deleteCharAt()`：删除某一字符
	* `insert()`：在指定位置插入字符串
	* `replace()`：将 `start` 到 `end - 1` 替换为 `str`
	* `reverse()`：反转
	* `setCharAt()`：将下表为 `index` 的字符更改为 `ch`
	* `setLength()`：修改 `StringBuilder` 对象的长度（溢出部分会被截断）
* String 的效率问题
	* 频繁使用 `+` 会频繁的调用 `toString()` 方法，创建大量 `String` 对象，导致效率很低，同时给 GC 带来很大压力
