---
title: '02 Java 内置注解'
---

# 02 Java 内置注解

* `@Deprecated`：用来标记过时的元素，在编译阶段遇到这个注解时会发出提醒警告，告诉开发者正在调用一个过时的元素比如过时的类、过时的方法、过时的属性等
* `@Deprecated(since = "9", forRemoval = true)`：自 Java 9 开始已过时，且已被移除
* `@Override`：修饰实例方法，则该方法必须是个重写方法，否则就会编译失败
* 只能注解实例方法
* `@SuppressWarnings`：抑制警告，在实际开发中，建议尽量不要忽略警告，而是真正的去解决警告
* `@SuppressWarnings("rawtypes")`：抑制未使用泛型的警告
* `@SuppressWarnings("resource")`：抑制未关闭资源的警告
* `@SuppressWarnings("deprecation")`：抑制使用了已过时资源时的警告
* `@SuppressWarnings("all")`：抑制所有警告
* “未检查的类型转换” 只能通过 `@SuppressWarnings("unchecked")` 解决（源码自己都这么写）
* `@FunctionalInterface`：“函数式接口”的注解，JDK1.8版本引入的新特性，该接口有且只能存在一个抽象方法，否则就会发生编译错误（接口中的默认方法或静态方法可以有多个）
