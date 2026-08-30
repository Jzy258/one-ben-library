* 基于 session 的认证：
	* 登陆成功 -> 服务器存 session -> 客户端存 `JSESSIONID` Cookie
	* **缺点**：
		* 分布式：
			* 用户请求在 A 服务器登录，被负载均衡分到 B 服务器，B 服务器没有 session，需要重新登录
		* 移动端：
			* 原生 App 不支持 Cookie
		* 前后端分离：
			* 跨域处理 Cookie 较麻烦
* 基于 JWT 的认证：
	* 登陆成功 -> 服务器生成 token 交给客户端 -> 客户端每次请求带上 token -> 服务器在本地检验 token
	* 无需在服务器存储会话状态
* JWT 结构：
	* 用 `.` 分成 3 部分：
		* Header：
			* 算法信息 `{"alg":"HS512","typ":"JWT"}`
		* Payload：
			* 载荷
			* 包括 `sub`（用户）、`exp`（过期时间）、`roles`（角色）等
			* 通过 Base64 编码，不加密
		* Signature：
			* HMACSHA256 签名
			* 用于防止篡改
* 双令牌模型：
	* **问题**：
		* 过期时间设置短会导致频繁登录
		* 过期时间设置长会导致泄露风险大
	* 双令牌：
		* Access Token：
			* 时效短（15 min）
			* 每次请求附带
		* Refresh Token：
			* 时效长（7 d）
			* 不附带在每次请求上
			* Access 过期后通过 Refresh 获取新的 Access
* Redis 黑名单：
	* **作用**：
		* 实现手动登出
	* 黑名单机制：
		* 将手动登出的 token 存入 Redis，设置剩余有效期
		* 校验时先查询 Redis，在名单中则拒绝访问
	```java
redisTemplate.opsForValue().set("blacklist:" + token, "1", Duration.ofSeconds(剩余秒数));

if (redisTemplate.hasKey("blacklist:" + token)) {
    throw new TokenInvalidException("已登出");
}
	```
* JWT 依赖：
	* `jjwt-api`
	* `jjwt-impl`
	* `jjwt-jackson`
* Spring Security 集成 JWT：
	* `JwtAuthenticationFilter`：
		* 设在 `AnonymousAuthenticationFilter` 前执行
			* `UsernamePasswordAuthenticationFilter` 是 formLogin 的产物，移除后不存在
		* **工作流程**：
			* 从请求头获取 token `Authorization: Bearer token`
			* 调用自定义的 `JwtUtil.parseToken` 验签
			* 构造认证对象 `UsernamePasswordAuthenticationToken`
			* 注入安全上下文
	* `SecurityContextHolder`：
		* 是 `ThreadLocal`，同一请求的过滤器链和 Controller 在同一线程上
	* `AuthenticationManager`：
		* 能自动完成整个认证流程：
			* 查询用户
			* 使用 BCrypt 比对
			* 抛出相应的异常
* 当没有 formLogin 或 httpBasic 时，Spring Security 的默认入口为 `Http403ForbiddenEntryPoint`，直接 403 报错
* 