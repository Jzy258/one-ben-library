* `java.lang.Object`
* `Object` 是所有类的超类
* API：应用程序编程接口
* 常用方法：
* `toString()`：将 Java 对象转换成字符串的形式
	* 默认实现：完整类名 + @ + 哈希码的十六进制
	* `System.out.println()` 方法在打印输出引用时会自动调用 `对象.toString()` 方法
* `equals()`：判断两个对象是否相等
	* 默认实现：使用 `==` 比较
	* 重写时先判断 `this == obj` 和 `this == null`
	* 可以使用 `Object.equals(Object obj1, Object obj2)` 代替
* `hashcode()`：生成该对象的哈希值（转换成十进制）
	* 哈希值通常作为在哈希表中查找该对象的键值
	* 为 `HashHap`、`Hashtable`、`HashSet` 等集合类的优化而设置
	* 本地方法，调用了 C++ 编写的动态链接库
* `finalize()`：对象即将被 GC 垃圾自动回收（该对象没有引用）时执行
* `clone()`：复制该对象
	* 通常用于保护原对象的数据结构
	* 默认实现：本地方法
	* 必须实现 `java.lang.Cloneable` 标志接口，否则抛出 `CloneNotSupportefException`
	* 浅克隆：只克隆当前对象
	* 深克隆：完全克隆对象（包括对象拥有的属性所指向的对象）
