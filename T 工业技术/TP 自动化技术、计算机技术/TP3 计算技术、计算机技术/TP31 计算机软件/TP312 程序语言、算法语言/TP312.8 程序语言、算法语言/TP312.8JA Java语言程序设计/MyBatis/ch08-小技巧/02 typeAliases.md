---
title: '02 typeAliases'
---

# 02 typeAliases

`<typeAliases>`：
* 在 `mybatis-config.xml` 中指定
* 包含若干 `<typeAlias>`，具有 `type` 和 `alias` 属性
	* `type` 为需要取别名的类型名
	* `alias` 是为类型取的别名，可以省略，默认为类的简名
* 适用于 `resultType` 等
* 不区分大小写
* 可以用 `<package>` 指定需要起别名的包，不需要为每个类手动起别名