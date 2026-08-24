---
title: '05 choose、when、otherwise'
---

# 05 choose、when、otherwise

```sql
SELECT * FROM t_car
<where>
	<choose>
		<when test="brand != null and brand != ''">
			brand LIKE #{brand}
		</if>
		<when test="car_type != null and car_type != ''">
			car_type = #{carType}
		</if>
		<otherwise>
			guide_price = #{guidePrice}
		</otherwise>
	</choose>
</where>
```

相当于 `if ... else if ... else ...`
* 只能选择一个分支

