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
	* `JwtUtil`【自定义】：
		* **本质**：JWT 工具类，提供 JWT 相关功能
		* **私有字段**：
			* `SECRET`：BCrypt 算法所需的密钥
		* **静态方法**：
			* `generateToken(UserDetails): String`：
				* 通过 `UserDetails` 生成 Access Token
			* `generateRefreshToken(UserDetails): String`：
				* 通过 `UserDetails` 生成 Refresh Token
			* `parseToken(String): Claims`：
				* 从 Token 中解析出各项 `Claim`
	* `JwtAuthenticationFilter`：
		* **本质**：
			* `@Component`
			* 继承 `OncePerRequestFilter`（每次请求前过滤）
		* **属性**：
			* `stringRedisTemplate`：【自动注入】
				* 提供了对 Redis 的字符串读写
		* **方法**：
			* `doFilterInternal(HttpServletRequest, HttpServletResponse, FilterChain): void`：
				* 过滤器逻辑
				* 完成校验 Token 等工作
		* 应设在 `AnoymousAuthenticationFilter` 前执行
			* `UsernamePasswordAuthenticationFilter` 是 formLogin 的产物，移除后不存在
		* **工作流程**：
			* 从请求头获取 Token `Authorization: Bearer token`
			* 调用 `JwtUtil.parseToken` 验签
			* 构造认证对象 `UsernamePasswordAuthenticationToken`
			* 注入安全上下文
	* `SecurityConfig`：
		* **本质**：
			* `@Configuration`
			* Spring Security 的核心配置类
		* **属性**：
			* `jwtAuthenticationFilter`【自动注入】
		* **方法**：
			* `securityFilterChain(HttpSecurity)`：
				* 通过注入 `HttpSecurity`配置安全过滤器链
				* 用于配置需要认证的请求、登录方式、是否启用 CSRF、会话管理方式、自定义过滤器等
			* `bCryptPasswordEncoder(): PasswordEncoder`：
				* 将 BCrypt 密码哈希编码器暴露为 Bean
			* `authenticationManager(AuthenticationConfigutation): AuthenticationManager`：
				* 从 Spring Security 的 `AuthenticationConfiguration` 中获取已经装配好的 `AuthenticationManager`，并暴露为 Bean
				* 便于在登录接口、JWT 认证、自定义认证逻辑中注入使用
			* `userDetailsService(PasswordEncoder) : UserDetailsService`：
				* 根据用户名加载用户信息
				* 将该服务暴露为 Bean
				* `PasswordEncoder` 自动注入
	* `AuthenticationController`：
		* **本质**：
			* `@RestController`
		* **属性**：
			* `authenticationManager`【自动注入】
			* `stringRedisTemplate`【自动注入】
			* `userDetailsService`【自动注入】
		* **方法**：
			* `login(LoginRequest): ResponseEntity<...>`：
				* 处理登录请求
			* `refresh(RefreshRequest) : ResponseEntity<...>`：
				* 处理刷新 Token 请求
			* `logout(RefreshRequest) : ResponseEntity<...>`：
				* 处理登出请求
	* `SecurityContextHolder`：
		* 是 `ThreadLocal`，同一请求的过滤器链和 Controller 在同一线程上
	* `AuthenticationManager`：
		* 能自动完成整个认证流程：
			* 查询用户
			* 使用 BCrypt 比对
			* 抛出相应的异常
* 当没有 formLogin 或 httpBasic 时，Spring Security 的默认入口为 `Http403ForbiddenEntryPoint`，直接 403 报错
