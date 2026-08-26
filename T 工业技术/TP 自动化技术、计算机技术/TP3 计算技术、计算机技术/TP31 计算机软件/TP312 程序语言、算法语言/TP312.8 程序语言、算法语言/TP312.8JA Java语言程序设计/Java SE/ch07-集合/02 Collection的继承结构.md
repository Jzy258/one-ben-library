* `Collection`：所有以单个形式存储元素的集合的接口
* `Iterable`：所有的`Collection`都是可以迭代（遍历）的
* `Iterator<T> iterator()`：迭代器，用于遍历集合
* 使用迭代器的`boolean hasNext()`和`E next()`方法可完成对集合的遍历
* 继承 `Collection`：
* `Queue`：队列
* （Java21）`SequencedCollection`：有序集合
* `Set`：无序集合
* 有序集合：集合中存储的元素有下标**或**可排序
* 无序集合：集合中存储的元素没有下标**且**未排序
* `HashSet`：底层采用哈希表数据结构
* `TreeSet`：底层采用红黑树数据结构
* `ArrayList`：底层采用数组数据结构
* `Vector`：底层采用数组数据结构，是线程安全的，可以模拟栈数据结构
* `LinkedList`：底层采用双向链表数据结构，可以模拟双向队列
* `List`：元素可重复
* `Set`：元素不可重复
