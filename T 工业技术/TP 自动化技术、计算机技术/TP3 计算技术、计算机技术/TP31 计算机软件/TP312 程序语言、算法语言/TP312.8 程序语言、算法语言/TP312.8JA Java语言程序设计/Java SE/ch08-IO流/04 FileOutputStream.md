* 文件字节输出流
* 常用构造方法：
* `FileOutputStream(String name)`：创建输出流，先将文件清空，再不断写入
	* 只在第一次执行时清空文件
	* **文件可以不存在，但文件路径必须存在**
* `FileOutputStream(String name, boolean append)`：创建输出流，在原文件最后以追加形式不断写入
* 常用方法：
* `write(int b)`：写一个字节
* `void write(byte[] b)`：将字节数组中所有数据全部写出
* `void write(byte[] b, int off, int len)`：将字节数组的一部分写出
* `void close()`：关闭流
* `void flush()`：刷新
* 使用 `FileInputStream` 和 `FileOutputStream` 可以完成文件的复制
* 多个流需要同时关闭时最好分开 `try`，不会互相影响
* （Java7）`try-with-resources`（资源自动关闭）：
* 凡是实现了 `AutoCloseable` 接口的流都可以使用 `try-with-resources` 自动关闭
* 语法：
```java
try (
	声明的流;
	声明的流;
	声明的流;
...
) {
	...
} catch (Exception e) {
	...
}
```
* `FileOutputStream` 不需要 `flush()`，因为 `FileOutputStream` 没有重写 `flush()` 方法，但重写了 `close()` 方法进行了一些操作，如关闭 `channel` 等；而在父类 `OutputStream` 中，`close()` 和 `flush()` 的实现均为空
