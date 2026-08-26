---
title: '08 Java程序的注释'
---

# 08 Java程序的注释

* 注释只存在于 .java 源文件中，不会编译进 .class 字节码文件中
* 单行注释：
* `// 单行注释`
* 多行注释（块注释）：
  ```java
  /* 
    多行注释
	多行注释
	多行注释
	多行注释
	多行注释
	多行注释
  */ 
  ```
* javadoc 注释：
  ```java
  /**
  * javadoc注释
  * javadoc注释
  * javadoc注释
  * javadoc注释
  * javadoc注释
  * javadoc注释
  */
  ```
* `javadoc` 命令能够从源文件中识别 javadoc 注释，并生成 javadoc 文档，如：
* `javadoc -d docs -author -version AnnotationTest.java` 
* 将会在该目录生成 docs 帮助文档
* 注释不是越多越好，要少而精
