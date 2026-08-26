* path 环境变量
	* 环境变量 path：
	* 右击 "此电脑" -> 属性 -> 高级系统设置 -> Path
	* DOS 窗口会根据环境变量 path 中的路径寻找命令，如无此命令则报错：
		* 'xxx' 不是内部或外部命令，也不是可运行的程序或批处理文件。
	* 路径与路径之间的分隔符：
		* windows：“;”（分号）
		* linux：“:”（冒号）
* 编写第一个 Java 程序
	* 在硬盘的任何位置新建一个 Java 源文件，起名：HelloWorld.java
	```java
	public class HelloWorld {
		public static void main(String[] args) {
			System.out.println("Hello world!");
		}
	}
	```
	* `()`、`{}`、`[]`、`""` 最好成对写
	* 编译第一个 Java 程序：
	* 使用 `javac` 命令，首先确保 `javac` 命令能用
	* 语法：`javac java源文件的路径`
	* 运行第一个 Java 程序：
	* 语法：`java 类名`
	* `java` 命令后面跟的不是文件路径，而是**类名**
	* 运行时当前路径必须为 .class 文件所在的位置
* 环境变量classpath
	* 环境变量 classpath 是隶属于 Java 语言的，不是 Windows 操作系统的
	* classpath 为类加载器指路（与 path 类似，默认为当前位置）
	* 一旦设置 classpath，则不会再在当前路径寻找
	* 可以通过加一个 “.” 添加当前路径
* 关于编译时的乱码问题
	* 文本编辑器与 `javac` 的编码方式不一致时，编译时会报错：
	* 错误: 编码 UTF-8 的不可映射字符
	* 解决方式1：改变 `javac` 的编码方式
	* `javac -encoding GBK HelloWorld.java`
	* 解决方式2：改变文本编辑器的编码方式
