---
title: '02 where'
---

# 02 where

```sql
SELECT * FROM t_car
<where>
	<if test="brand != null and brand != ''">
		AND brand LIKE #{brand}
	</if>
	<if test="car_type != null and car_type != ''">
		AND car_type = #{carType}
	</if>
</where>
```

可以自动去除前缀的 `AND` 和 `OR`，后缀不会自动去除

