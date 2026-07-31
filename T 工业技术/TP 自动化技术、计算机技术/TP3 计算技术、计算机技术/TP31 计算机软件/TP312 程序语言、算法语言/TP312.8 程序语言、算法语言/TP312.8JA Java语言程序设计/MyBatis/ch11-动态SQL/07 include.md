提前声明一段 SQL 语句片段
```xml
<sql id="carColumnsSql">
	id, brand, guide_price, car_type
</sql>
```
在上下文中可以引用
```sql
SELECT
	<include refid="carColumnsSql"/>
FROM t_car
```

