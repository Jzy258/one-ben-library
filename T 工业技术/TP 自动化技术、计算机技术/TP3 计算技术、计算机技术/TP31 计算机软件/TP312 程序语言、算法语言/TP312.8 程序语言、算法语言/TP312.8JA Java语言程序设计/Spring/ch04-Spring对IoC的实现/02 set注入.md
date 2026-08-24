---
title: '02 set注入'
---

# 02 set注入

使用 `value` 注入的简单数据类型：
* 基本数据类型、包装类、`Enum`、`String` 或其他 `CharSequence`、`Number`、`Date`、`Temporal`、`ZoneId`、`TimeZone`、`File`、`Path`、`URI`、`URL`、`InetAddress`、`Charset`、`Currency`、`Locale`、`UUID`、`Pattern`、`Class`

`p` 命名空间注入：
* p（Property）
* 作用：简化 set 注入的配置
* 在 `applicationContext.xml` 的根节点中添加属性：
  ```xml
  <beans ...
	xmlns:p="http://www.springframework.org/schema/p">
	...
  </beans>
  ```

util 命名空间简化配置：
* 作用：配置复用
* 在 `applicationContext.xml` 的根节点中添加属性：
  ```xml
  <beans ...
	xmlns:util="http://www.springframework.org/schema/util"
	xsi:schemaLocation="...
		http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd">
	...
  </beans>
  ```

`c` 命名空间注入：
* c（Constructor）
* 作用：简化构造注入的配置
* 在 `applicationContext.xml` 的根节点中添加属性：
  ```xml
  <beans ...
	xmlns:c="http://www.springframework.org/schema/c">
	...
  </beans>
  ```

引入外部属性配置文件：
* 在 `applicationContext.xml` 中添加：
  ```xml
  <beans ...
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="...
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
	...
	
  </beans>
  ```
