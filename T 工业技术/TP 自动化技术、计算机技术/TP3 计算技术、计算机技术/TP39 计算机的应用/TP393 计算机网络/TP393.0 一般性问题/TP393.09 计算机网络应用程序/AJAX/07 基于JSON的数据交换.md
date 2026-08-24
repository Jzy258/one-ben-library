---
title: '07 基于JSON的数据交换'
---

# 07 基于JSON的数据交换

前端将 JSON 字符串转换为 JSON 对象：
* `eval` 函数：
	* 将字符串作为 JS 代码解析
* `JSON.parse(string)` 方法：
	* 将 `string` 字符串解析为 JSON 对象并返回

后端将 Java 对象转换成 JSON 字符串：
* `fastjson2`：
  ```xml
	<!-- Source: https://mvnrepository.com/artifact/com.alibaba.fastjson2/fastjson2 -->
	<dependency>
	    <groupId>com.alibaba.fastjson2</groupId>
	    <artifactId>fastjson2</artifactId>
	    <version>2.0.60</version>
	    <scope>compile</scope>
	</dependency>
  ```
	* `JSON.toJSONString(Object object)`