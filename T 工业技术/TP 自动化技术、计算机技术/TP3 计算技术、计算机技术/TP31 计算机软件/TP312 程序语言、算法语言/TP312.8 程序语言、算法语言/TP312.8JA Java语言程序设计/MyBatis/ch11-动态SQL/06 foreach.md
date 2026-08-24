---
title: '06 foreach'
---

# 06 foreach

```sql
SELECT * FROM t_car WHERE id IN(
	<foreach collection="array" item="id" separator=",">
		#{id}
	</foreach>
)
```

`collection` 属性默认参数名为 `array` 或 `arg0`，也可以在形参列表中通过 `@Param("参数名")` 指定

`()` 可以省略，通过 `open="("` 和 `close=")"` 设定

