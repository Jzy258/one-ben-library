---
title: '01 MyBatis核心对象生命周期和作用域'
---

# 01 MyBatis核心对象生命周期和作用域

`SqlSessionFactoryBuilder`：
* 只要创建过 `SqlSessionFactory` 就不再需要
* 方法作用域（作为局部方法变量）

`SqlSessionFactory`：
* 应该在应用的运行期间一直存在
* 只需要创建一个
* 应用作用域
* 使用静态单例模式

`SqlSession`：
* 每一个线程都应该有一个 `SqlSession` 实例
* 线程不安全
* 请求（或方法）作用域
* 