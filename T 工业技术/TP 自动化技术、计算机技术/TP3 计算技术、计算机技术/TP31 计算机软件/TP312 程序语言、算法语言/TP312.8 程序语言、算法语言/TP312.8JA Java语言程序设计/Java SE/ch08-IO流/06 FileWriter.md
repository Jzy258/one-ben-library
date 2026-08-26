---
title: '06 FileWriter'
---

# 06 FileWriter

* `FileWriter`
	* 文件字符输出流
	* 常用构造方法：
	* `FileWriter(String fileName)`
	* `FileWriter(String fileName, boolean append)`
	* 常用方法：
	* `void write(char[] cbuf)`
	* `void write(char[] cbuf, int off, int len)`
	* `void write(String str)`
	* `void write(String str, int off, int len)`
	* `void flush()`
	* `void close()`
	* `Writer append(CharSequence csq, int start, int end)`
	* 使用 `FileReader` 和 `FileWriter` 可以拷贝普通文本文件，不能拷贝非文本文件
* 关于文件路径
	* **相对路径的当前位置默认为项目（Project）的根目录**
	* 从类的根路径加载资源：
      ```java
      String path = Thread.currentThread().getContextClassLoader().getResource().getPath();
      ```
	* 优点：通用，在任何系统都可使用，并返回绝对路径
	* 缺点：文件必须放在类路径下
