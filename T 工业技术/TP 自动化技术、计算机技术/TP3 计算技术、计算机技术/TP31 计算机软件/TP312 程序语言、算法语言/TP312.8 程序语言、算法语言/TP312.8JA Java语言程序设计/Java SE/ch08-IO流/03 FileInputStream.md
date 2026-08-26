* 文件字节输入流，可以读取任何文件
* 常用构造方法：
* `FileInputStream(String name)`：创建一个文件字节输入流对象，参数是文件的路径
	* 若未找到该路径，则抛出 `FileNotFoundException`（文件未找到异常）
	* 路径可以采用斜杠（`/`）和反斜杠（`\`，需要转义）
* 常用方法：
* `int read()`：从文件读取一个字节
	* 返回值读取到的字节本身，没有读到任何数据返回 -1
* `int read(byte[] b)`：一次读取多个字节
	* 如果文件内容足够多，则一次最多读取 `b.length` 个字节
	* 返回值是读取到字节总数，没有读取到任何数据则返回 -1
* `int read(byte[] b, int off, int len)`：读到数据后向 `byte` 数组中存放时，从 `off` 开始存放，最多读取 `len` 个字节
	* 读取不到任何数据则返回 -1
* `long skip(long n)`：跳过 `n` 个字节
* `int available()`：返回流中剩余的估计字节数量
* `void close()`：关闭流
* `long skip(long n)`：跳过 `n` 个字节
* 将 `byte[]` 数组转换为 `String` 时可能出现乱码问题，不太适合读取纯文本
