* `V put(K key, V value)`：添加键值对
* `void putAll(Map<? extends K,? extends V> m)`：添加多个键值对
* `V get(Object key)`：通过`key`获取 `value`
* `boolean containsKey(Object key)`：是否包含某个 `key`
* `boolean containsValue(Object value)`：是否包含某个 `value`
* `V remove(Object key)`：通过 `key` 删除 `key-value`
* `void clear()`：清空 `Map`
* `int size()`：键值对个数
* `boolean isEmpty()`：判断是否为空 `Map`
* `Collection<V> values()`：获取所有的 `value`
* `Set<K> keySet()`：获取所有的 `key`
* `Set<Map.Entry<K,V>> entrySet()`：获取所有键值对的 `Set` 视图，效率比直接使用 `Iterator` 获取
* `Entry`：定义在 `Map` 中的键值对内部类
* `static <K,V> Map<K,V> of(K k1, V v1, K k2, V v2, K k3, V v3)`：静态方法，使用现有的 `key-value` 构造只读的 `Map`（最多 10 对键值对）
* `V getOrDefault(Object key, V defaultValue)`：返回指定 `key` 的 `value`，若 `key` 不存在，返回 `defaultValue`
