* Spring Data Redis：
	* Spring 封装的 Redis 客户端模块
	* 底层默认使用 Lettuce 连接 Redis
* 依赖：
	* `spring-boot-starter-data-redis`
* 配置：
	* `spring.data.redis`：
		* `host`：
			* 服务器主机地址
		* `port`：
			* Redis 端口号
* `StringRedisTemplate` 和 `RedisTemplate`：
	* `StringRedisTemplate`：
		* 键和值类型必须为 `String`
		* 使用 `String` 序列化器
		* 适用于缓存简单值
	* `RedisTemplate`：
		* 键和值类型可以为任意对象
		* 默认使用 `JdkSerializationRedisSerializer`
			* 基于 `Serializable` 的序列化器
			* 可能导致乱码
		* 适用于缓存对象
* 序列化器：
	* 自定义 `RedisTemplate` bean：
		```java
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(
            RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);

        // key 用 String 序列化器
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());

        // value 用 JSON 序列化器
        GenericJacksonJsonRedisSerializer jsonRedisSerializer = GenericJacksonJsonRedisSerializer.builder()  
	        // 保留 @class 类型信息，确保取出的对象能还原成原类型
	        // 存在反序列化漏洞风险，生产环境慎用
	        // 若关闭，则取出对象的类型退化为 LinkedHashMap
	        .enableUnsafeDefaultTyping()  
	        .build();
        template.setValueSerializer(jsonRedisSerializer);
        template.setHashValueSerializer(jsonRedisSerializer);

        template.afterPropertiesSet();
        return template;
    }
}
		```
	* 使用 `GenericJacksonJsonRedisSerializer` 存对象时：
		* 值为 JSON 字符串，取出时要强转回原类型
		* 对象必须有无参构造
	* `RedisTemplate` 存储的字符串显示时带 `""`，因为按 JSON 处理
* Redis 数据结构在 Java 中的映射：
	* String：
		```java
// 设为 30 分钟过期
// redisTemplate.opsForValue().set("question:" + id, question, 30, TimeUnit.MINUTES);
redisTemplate.opsForValue().set("question:" + id, question, Duration.ofMinutes(30));
Question q = (Question) redisTemplate.opsForValue().get("question:" + id);
		```
	* Hash：
		```java
redisTemplate.opsForHash().put("user:100", "name", "ao_saku");
Object name = redisTemplate.opsForHash().get("user:100", "name");
		```
	* List：
		```java
redisTemplate.opsForList().leftPush("queue:task", "task1");
Object task = redisTemplate.opsForList().rightPop("queue:task");
		```
	* Set：
		```java
redisTemplate.opsForSet().add("tag:java", "泛型", "集合");
Boolean has = redisTemplate.opsForSet().isMember("tag:java", "泛型");
		```
	* Zset：
		```java
redisTemplate.opsForZSet().add("rank", "user1", 90);
Set<String> top3 = redisTemplate.opsForZSet().reverseRange("rank", 0, 2);
		```
