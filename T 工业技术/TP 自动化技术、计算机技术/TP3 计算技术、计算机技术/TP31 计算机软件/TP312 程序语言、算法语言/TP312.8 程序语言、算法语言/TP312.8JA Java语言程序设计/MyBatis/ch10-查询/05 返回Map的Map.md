可以选定主键值作为外层 `Map` 的键，查询到的 `Map` 结果作为外层 `Map` 的值，即 `Map<Xxx, Map<String, Object>>`
* 便于根据主键值取出对应结果

```java
@MapKey("主键的key")
Map<Xxx, Map<String, Object>> selectXxx(Xxx xxx);
```

