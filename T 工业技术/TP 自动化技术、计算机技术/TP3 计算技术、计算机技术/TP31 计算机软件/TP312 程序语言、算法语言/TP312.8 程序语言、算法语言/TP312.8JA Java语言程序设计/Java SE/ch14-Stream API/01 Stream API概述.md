---
title: '01 Stream API概述'
---

# 01 Stream API概述

* （Java 8）什么是 Stream API
	* Java 语言引入了一个全新的流式 Stream API，把真正的函数式编程风格运用到 Java 语言中，可以更方便地操作集合，允许开发人员在不改变原始数据源的情况下操作集合，使代码更加简洁、易读和可维护
	* 使用 Stream API 对集合数据进行操作类似于使用 SQL 执行的数据库查询，也可以使用 Stream API 来并行执行的操作
	* 总结：Stream API 提供了一种高效且易于使用的处理数据的方式
* Stream 和 Collection 的区别
	* Collection：是静态的内存数据结构，强调数据
	* Stream API：是跟集合相关的计算操作，强调计算
	* 总结：Collection 面向内存，存储在内存中；Stream API 面向 CPU，通过 CPU 来计算
* Stream API 的操作步骤
	* 创建 Stream：通过数据源（如集合、数组等）来获取一个 Stream 对象
	* 中间操作：对数据源的数据进行处理，该操作会返回一个 Stream 对象，因此可以进行链式操作
	* 终止操作：执行终止操作时，则才会真正执行中间操作，并且并返回一个计算完毕后的结果
* Stream API 的重要特点
	* Stream 自己不会存储元素，只能对元素进行计算
	* Stream 不会改变数据对象，反而可能会返回一个持有结果的新 Stream
	* Stream 上的操作属于延迟执行，只有等到用户真正需要结果的时候才会执行
	* Stream 一旦执行了终止操作，则就不能再调用其它中间操作或终止操作了
