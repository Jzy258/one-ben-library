---
title: '13 File类'
---

# 13 File类

* `File` 类不是 IO 流，通过 `File` 无法读写文件
* `File` 类是路径的抽象表示形式，这个路径可能是目录或文件
* 常用构造方法：
* `File(String pathname)`
* 常用方法：
* `boolean createNewFile()`：创建新文件
* `boolean delete()`：删除文件
* `boolean exists()`：返回路径是否存在
* `String getAbsolutePath()`：获取绝对路径
* `String getName()`：获取名称
* `String getParent()`：获取父路径
* `boolean isAbsolute()`：判断是否为绝对路径
* `boolean isDirectory()`：判断是否为目录
* `boolean isFile()`：判断是否为文件
* `boolean isHidden()`：判断是否为隐藏文件
* `long lastModified()`：获取文件最近修改时间
* `long length()`：获取文件大小
* `File[] listFiles()`：获取子文件和子目录
* `File[] listFiles(FilenameFilter filter)`：获取符合 `filter` 条件的文件
	* `FilenameFilter` 类的 `accept(File dir, String name)` 方法：根据 `dir` 和 `name` 编写相应的筛选规则
* `boolean mkdir()`：创建新目录
* `boolean mkdirs()`：创建多重目录
* `boolean renameTo(File dest)`：重命名（可以达到剪切效果）
* `boolean setReadOnly()`：设为只读文件
* `boolean setWritable(boolean writable)`：设为可写文件
