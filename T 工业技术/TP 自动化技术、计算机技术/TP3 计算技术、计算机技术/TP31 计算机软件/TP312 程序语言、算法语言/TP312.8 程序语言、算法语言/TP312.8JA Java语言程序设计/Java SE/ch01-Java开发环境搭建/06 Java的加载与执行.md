* JDK的安装与配置
	* Oracle官网：[Oracle](https://www.oracle.com/)
	* Java类库源码：jdk-21/lib/src.zip
	* jdk 目录下两个重要目录：
	* bin 目录：存放 jdk 命令
		* java.exe：负责运行
		* javac.exe：负责编译
	* lib 目录：存放 jdk 类库
* Java的加载与执行
	* 任何一个 Java 程序都分为**编译**和**运行**两个阶段：
	* 编译阶段和运行阶段可以在不同操作系统上完成
	* 编译阶段将 .java 文件（Java 源文件）编译为 .class 文件（字节码文件）
	* 编译的作用就是检查源文件是否符合 Java 语法
	* 字节码文件不是机器码，操作系统无法与其直接交互
	* “xxx.class” 的类名为 “xxx”
	* 运行时和编译阶段无关
	* 使用 `javac 源文件（如“Helloworld.java”）` 编译
	* 使用 `java 类名` 启动类加载器（classloader），类加载器寻找类名所对应的类，并将其解释为机器码，由操作系统执行
	* Java 既是编译型语言，又是解释型语言
* JDK JRE JVM：
	* JDK（Java Development Kit）：Java 开发工具包
	* JRE（Java Runtime Environment）：Java 运行时环境
	* JVM（Java Virtural Machine）：Java 虚拟机
	* JDK 包含 JRE，JRE 包含 JVM
	* ---
	* `java.exe` 是 JVM 的启动器，而非 Java 解释器本身
	* `javap.exe`：Java 类分解器
	* 用于分析、解析、反编译 `.class` 字节码文件
	* `-c`：显示字节码指令
	* `-p`：显示所有成员（包括 `private`）
	* `-v`：
