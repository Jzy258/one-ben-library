添加或删除标签内内容的前缀或后缀

```sql
SELECT * FROM t_car
<trim prefix="WHERE" suffixOverrides="AND|OR">
	<if test="brand != null and brand != ''">
		brand LIKE #{brand} AND
	</if>
	<if test="car_type != null and car_type != ''">
		car_type = #{carType}
	</if>
</where>
```

