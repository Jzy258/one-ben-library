```sql
UPDATE t_car
<set>
	<if test="brand != null and brand != ''">
		brand = #{brand},
	</if>
	<if test="car_type != null and car_type != ''">
		car_type = #{carType},
	</if>
</set>
WHERE
	id = #{id}
```

最后的 `,` 会被自动删除

