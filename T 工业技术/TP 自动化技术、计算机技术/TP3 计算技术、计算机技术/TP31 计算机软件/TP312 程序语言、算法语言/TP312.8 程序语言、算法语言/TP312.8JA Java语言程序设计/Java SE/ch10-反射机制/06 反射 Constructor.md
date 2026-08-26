---
title: '06 反射 Constructor'
---

# 06 反射 Constructor

* 通过反射机制获取 `Constructor`：
  ```java
  Constructor constructor2 = clazz.getDeclaredConstructor(paramTypes);
  ```
* 通过 `Constructor` 创建对象：
  ```java
  Class clazz = MyClass.class;
  Constructor constructor = clazz.getDeclaredConstructor(paramTypes);
  Object[] args = {arg1, arg2, arg3};
  Object myObject = constructor.newInstance(args);
  ```
* 可以用这种方式替代 `Class` 的已过时的 `newInstance()` 方法
