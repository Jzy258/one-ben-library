---
title: '01 Bean的作用域'
---

# 01 Bean的作用域

Spring 的 IoC 容器创建的 Bean 默认是单例的

`XxxService`、`XxxDao` 等不需要改变属性，不存在线程安全问题，是否为单例不重要

