---
title: '09 public class 和 class 的区别'
---

# 09 public class 和 class 的区别

* 一个 java 源文件中可以定义多个 class
* 编译之后，每个 class 都会对应生成一个 .class 字节码文件
* public class 只能定义 1 或 0 个
* 每个类中都可以编写 main 方法，但在实际的开发当中，入口一般只有一个
* ---
* 一个 Java 源文件中最多有 1 个 `public class`：
* 便于编译器根据文件名确定 `public` 类，简化了 `.class` 文件查找过程
* 提高代码的可维护性
* 便于在 IDE 中导航
* 使构建工具更容易管理项目结构
