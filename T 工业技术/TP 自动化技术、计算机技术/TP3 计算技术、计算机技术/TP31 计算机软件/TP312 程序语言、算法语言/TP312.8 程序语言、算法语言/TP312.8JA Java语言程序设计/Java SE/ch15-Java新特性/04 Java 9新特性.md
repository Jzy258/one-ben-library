---
title: '04 Java 9新特性'
---

# 04 Java 9新特性

* Java 9 在 2017 年 9 月 21 日发布，提供了超过 150 项新功能特性
* JEP 261：Module System
* 一种全新的模块化编程方式，目的是更好地支持大型应用程序的开发和维护，使 Java 程序在更为动态、可移植和安全的环境下运行
* JEP 222：jshell: The Java Shell (Read-Eval-Print Loop)
  * 一种交互式的 Java Shell，可以在命令行上快速地进行 Java 代码的编写、验证和执行，从而提高开发者的生产力。
* JEP 213: Milling Project Coin（细化工程改进，该计划旨在引入小型语言特性来提高代码的简洁性和可读性）
  * 在Java 9中，@SafeVarargs注解可以用于一个私有实例方法上。在Java 7和Java 8中，@SafeVarargs注解只能用于静态方法、final实例方法和构造函数。
  * 在Java 9中，可以将效果等同于final变量作为try-with-resources语句块中的资源来使用。在Java 7/8中，try-with-resources语句块中的资源必须是显式的final或事实上的final（即变量在初始化后未被修改），否则编译器会报错。这个限制限制了Java程序员使用try-with-resources语句块的能力，特别是在涉及lambda表达式、匿名类或其他读取外部变量的代码段时。
  * Java 9允许在匿名类实例化时使用钻石操作符(<>)来简化代码，但参数类型必须是具体的、可推导的类型。
  * 从Java9开始，不能使用一个单一的“_”作为标识符了。
  * 从Java9开始，接口中支持定义私有方法。
* JEP 224: HTML5 Javadoc
  * 从Java9开始，javadoc开始支持HTML5的语法。
* JEP 254: Compact Strings
  * 一种新的字符串表示方式，称为紧凑型字符串，以提高Java应用程序的性能和内存利用率。通过String源码得知：char[] 变成了 byte[]。
* JEP 269: Convenience Factory Methods for Collections
  * 更加方便的创建只读集合：List.of("abc", "def", "xyz"); 
* JEP 269：对Stream API进行了增强
  * 其中最显著的是引入了四个新的方法，分别是 `takeWhile()`, `dropWhile()`, `ofNullable()` 和 `iterate()`
* JEP 110：一个新的HTTP客户端API，名为HttpClient，它是一种基于异步和事件驱动的方式，更加高效和灵活的HTTP客户端。
* 运行时镜像（Run-time Image）：
* Java 9 引入模块化系统后用于存储 Java 运行时环境所有模块化类和资源的特定格式的文件集合
* 将以前的 `rt.jar` 拆分成若干模块，并重新组织成一个或多个内部格式的文件
* 以 `lib/modules` 及其他附带文件的形式存在
* 格式：
	* 一种经过优化的、紧凑的内部存储结构
* 支持自定义运行时：
	* 使用 `jlink` 根据应用程序所需的模块，从完整的 JDK 中链接出一个只包含必要模块的精简版运行时镜像，大大减小应用程序的交付体积
* 性能优化：
	* 镜像的内部布局允许类加载器更快地查找和加载类
* 访问：
	* JDK 提供了 JRT 文件系统暴露其内容
	* 可以使用标准的 `java.nio.file` API 浏览和读取镜像中的文件和目录
