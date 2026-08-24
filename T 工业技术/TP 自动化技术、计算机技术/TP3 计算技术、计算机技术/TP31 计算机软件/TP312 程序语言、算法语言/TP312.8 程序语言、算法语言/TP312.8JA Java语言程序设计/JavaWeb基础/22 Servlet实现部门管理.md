---
title: '22 Servlet实现部门管理'
---

# 22 Servlet实现部门管理

第一步：准备数据库
* 使用 Navicat 连接 MySQL
* 新建数据库
* 新建部门表，包括部门编号、部门名称、部门人数等字段
  ```sql
	CREATE TABLE `t_dept` (
	  `deptno` int unsigned NOT NULL AUTO_INCREMENT,
	  `dname` varchar(255)  NOT NULL,
	  `empcnt` int NOT NULL,
	  PRIMARY KEY (`deptno`)
	);
  ```
* 可以预先插入一些记录以供测试

第二步：准备 HTML 页面
* 编写静态的网页
* 完成各个网页之间的正确流转
* 页面包括：
	* `index.html`：欢迎页面
	* `dept-list.html`：部门列表页面
	* `add.html`：新建部门页面
	* `update.html`：修改部门页面
	* `detail.html`：查看部门详细信息页面

第三步：分析系统所包含的各个功能
* 功能：任何涉及到连接数据库的操作
* 可以使用 UML 用例图
* 功能包括：
	* 加载部门列表
	* 跳转到部门新建页面
	* 新建部门
	* 跳转到部门修改页面
	* 修改部门
	* 删除部门
	* 查看部门详情

第四步：在 IDEA 中搭建开发环境
* 创建一个 webapp
* 添加 Tomcat 依赖
* 添加 MySQL 驱动
* 编写 JDBC 工具类 `DBUtil`
	* 注册驱动
	* 获取连接
	* 关闭资源

第五步：实现功能
* 建议从前端到后端按顺序实现
* 修改超链接
* 注册 Servlet
* 编写 Serlet，重写 `doGet` 或 `doPost` 方法

