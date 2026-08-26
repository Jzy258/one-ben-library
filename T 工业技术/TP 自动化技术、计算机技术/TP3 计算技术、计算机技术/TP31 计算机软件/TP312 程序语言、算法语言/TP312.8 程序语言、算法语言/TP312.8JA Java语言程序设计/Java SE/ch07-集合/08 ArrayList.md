* 底层采用数组的数据结构
* 根据下标查找元素的时间复杂度为 $O(1)$，检索效率高
* 增删元素效率较低，对末尾元素进行增删效率不受影响
* 内存碎片化：
* 常发生于多次分配和释放内存的情况
* 减少内存碎片化的方法：
	* 使用内存池技术，固定分配一部分内存块供程序使用
	* 采用内存对齐，确定分配内存块尺寸
	* 减少对象的分配与回收
	* 对于数据结构的动态增长，采用增量式扩容
* `ArrayList` 默认长度为 `DEFAULT_CAPACITY = 10`
* 可通过带参构造方法 `ArrayList(int initialCapacity)` 指定初始容量
* 常用方法：
* `boolean add(E e)`：在数组末尾添加元素 `e`
* `void add(int index, E element)`：在指定下标处插入元素，后续元素下移
	* `rangeCheckForAdd()` 检查 `index` 是否合法（为正数且未越界）
	* 添加元素后元素个数到达数组容量，则使用 `grow()` 扩容
* `E set(int index, E element)`：替换特定下标的元素
* `E remove(int index)`：删除特定下标的元素
* 扩容策略：
* 使用 `ensureCapacityInternal()` 方法确认扩容大小：
	* `preferCapacity = oldCapacity >> 1` 即原容量的 1.5 倍
		* 1.5 是因为位运算效率高，且扩容倍数既不太大也不太小
	* 若 `preferCapacity` 小于所需容量（`oldCapacity + 1`），则新容量为 `oldCapacity + 1`
* 使用 `grow()` 方法开辟新数组空间，并使用 `Arrays.copyOf()` 方法将原数组复制到新数组中
	* `SOFT_MAX_ARRAY_LENGTH` 是取决于某些 JVM 实现的软最大数组长度，在这些情况中即使数组长度未达到 `Integer.MAX_VALUE` 且有足够的堆内存，也会抛出 `OutOfMemoryError`
