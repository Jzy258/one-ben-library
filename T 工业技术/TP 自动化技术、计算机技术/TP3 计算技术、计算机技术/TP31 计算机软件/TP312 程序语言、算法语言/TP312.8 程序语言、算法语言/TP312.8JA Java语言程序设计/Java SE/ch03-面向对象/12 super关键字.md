---
title: '12 super关键字'
---

# 12 super关键字

* `super` 代表当前对象的父类型特征
* `super` 与实例有关，不能用于静态上下文
* `super` 不是另一个实例，可看作当前实例的部分
* `this` 可以单独输出，`super` 不能单独输出
* 当一个构造方法第一行没有调用 `super(实参);` 和 `this(实参);` ，构造方法就会自动在第一行调用 `super();`
* 父类和子类中定义了相同属性或方法时，若需要在子类中访问父类的特征时，`super.` 不能省略
* `super();` 作用：
* 代码复用
* “模拟” 先有父亲，再有儿子
* `super();` 只能出现在构造方法第一行
* 在 Java 中，只要 `new` 对象，`Object` 的无参数构造方法一定会执行
  ```java
  @IntrinsicCandidate  
  public Object() {}
  ```
