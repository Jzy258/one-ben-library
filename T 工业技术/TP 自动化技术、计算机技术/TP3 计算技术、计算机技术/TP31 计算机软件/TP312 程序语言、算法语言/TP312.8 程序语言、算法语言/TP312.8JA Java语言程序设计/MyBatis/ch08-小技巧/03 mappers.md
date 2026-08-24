---
title: '03 mappers'
---

# 03 mappers

`<mapper>` 的属性：
* `resource`
* `url`
* `class`：
	* 提供 `Mapper` 接口的全限定名称
	* 会从指定接口的同级目录下寻找 `XxxMapper.xml`
	* 可以在 `resources` 目录下创建与 `Mapper` 接口相同的包结构

`<mappers>` 下的 `<package>` 可以指定一个包内所有接口都从同级目录寻找 `XxxMapper.xml`

