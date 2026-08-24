---
title: '02 Spring的7个模块'
---

# 02 Spring的7个模块

Spring 的 7 个模块：
* 基础核心：Spring Core Container：
	* 实现 IoC 功能
	* 管理所有 Bean 的声明周期
	* 不依赖其他模块
* 核心增强：Spring AOP
	* 提供面向切面编程支持，将横切关注点模块化，通过动态代理织入核心业务
	* 依赖 Spring Core Container
* 核心增强：Spring Context
	* 提供企业级服务（如国际化、事件传播、数据验证、定时调度等）
	* 依赖 Spring Core Container
* 数据访问层：Spring Data Access
	* 提供统一的数据访问方案（包括 JDBC、事务管理、ORM 框架）
	* 依赖 Spring Core Container、Spring AOP
* Web 基础：Spring Web
	* Web 开发的公共基础，提供文件上传、HTTP 请求等功能
	* 依赖 Spring Core Container、Spring Context
* Web 层：Spring Web MVC
	* 基于 Servlet API 的同步阻塞式 MVC 框架，适合传统 Web 应用开发
	* 依赖 Spring Web、Spring Core Container、Spring Context
* Web 层：Spring WebFlux
	* 异步阻塞响应式 Web 框架
	* 支持响应式流背压，适合高并发、低延迟的实时应用
	* 对 Spring Web MVC 的补充
	* 依赖 Spring Web、Spring Core Container、Reactor

Web 同步与 Web 异步的区别：
* 同步：主线程按顺序执行，执行当前任务时，后续任务等待
* 异步：主线程不等待，后续任务继续执行，当前任务完成后发送消息通知
	* 通过回调函数实现

