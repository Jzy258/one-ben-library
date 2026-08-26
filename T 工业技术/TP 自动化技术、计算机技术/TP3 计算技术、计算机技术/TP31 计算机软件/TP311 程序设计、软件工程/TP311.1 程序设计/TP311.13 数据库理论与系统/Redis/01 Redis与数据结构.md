* Redis：
	* 基于内存的键值对数据库
	* **特点**：
		* 存取速度快
		* 容量小
		* 易失
	* 独立运行，支持多进程共享
	* 数据查询流程：
		* 查询 Redis -> 查不到则查询 DB -> 写回 Redis
* 数据结构：
	* String（字符串）：
		* 存：
			* `SET user:1:name "ao_saku"`
			* 通常使用 `:` 分层，非必须
		* 取：
			* `GET user:1:name`
		* 自增：
			* `INCR user:1:count`
			* 原子操作
		* 设置过期时间：
			* `EXPIRE cache:key 3600`
		* 查看剩余时间：
			* `TTL cache:key`
			* 单位：s
			* `-1`：
				* 永不过期
			* `-2`：
				* 已过期，不存在
		* **适用于**：
			* 单值缓存
			* 计数器
			* 分布式 ID
		* 位操作：
			* 置位：
				* `SETBIT 键 位数 0/1`
			* 获取某一位的值：
				* `GETBIT 键 位数`
			* 统计 `1` 的个数：
				* `BITCOUNT 键`
	* Hash（哈希表）：
		* 存对象：
			* `HSET user:1 name ao_saku age 20`
		* 取单个字段：
			* `HGET user:1 name`
		* 取全部字段：
			* `HGETALL user:1`
		* 字段自增：
			* `HINCRBY user:1 age 1`
		* 删除字段：
			* `HDEL user:1 name`
		* **适用于**：
			* 用户信息
			* 商品详情
		* 修改单个字段时不需要将整个对象序列化为 JSON，若使用 String 则需整体序列化
		* Hash 的字段不能单独设置过期时间，只能使整个 `key` 过期
	* List（列表）：
		* 有序
		* 左进右出
		* 左端插入：
			* `LPUSH queue:task task1 task2`
		* 右端弹出：
			* `RPOP queue:task`
		* 查看全部：
			* `LRANGE queue:task 0 -1`
			* 负数表示从右向左
		* **适用于**：
			* 消息队列
			* 最新消息列表
	* Set（集合）：
		* 无序
		* 自动去重
		* 存：
			* `SADD tag:java "泛型" "集合" "泛型"`
		* 列出所有：
			* `SMEMBERS tag:java`
		* 判断是否在集合里：
			* `SISMEMBER tag:java "泛型"`
		* 取交集：
			* `SINTER set1 set2`
		* **适用于**：
			* 标签去重
			* 共同好友
	* Zset（有序集合）：
		* 存：
			* `ZADD rank 90 user1 85 user2`
		* 获取倒序排序的前几名：
			* `ZREVRANGE rank 0 9 WITHSCORES`
			* 下标从 `0` 开始
		* 获取某项分数：
			* `ZSCORE rank user1`
		* 自增：
			* `ZINCRBY rank 10 user1`
		* **适用于**：
			* 排行榜
	* 命名规范：
		* `业务:实体:ID`
