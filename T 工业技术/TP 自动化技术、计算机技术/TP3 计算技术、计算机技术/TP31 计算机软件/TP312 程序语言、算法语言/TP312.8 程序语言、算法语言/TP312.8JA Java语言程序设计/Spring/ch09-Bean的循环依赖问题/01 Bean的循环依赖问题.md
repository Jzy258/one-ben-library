---
title: '01 Bean的循环依赖问题'
---

# 01 Bean的循环依赖问题

循环依赖：
* A 对象有 B 属性且 B 对象有 A 属性
* setter 注入的循环依赖可以自动解决
	* 解决方式：在调用 setter 前提前暴露 Bean 地址
	* 构造方法和 setter 的调用分离，因此可以实现（而构造注入不行）]

Spring 能解决的循环依赖问题：
* set 注入，且至少有一方为 singleton

