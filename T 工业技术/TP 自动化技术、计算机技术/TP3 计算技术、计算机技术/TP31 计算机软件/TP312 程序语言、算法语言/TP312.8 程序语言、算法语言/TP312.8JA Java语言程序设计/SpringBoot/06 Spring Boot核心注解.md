> module `spring-boot003`
* Spring Boot 框架两大机制：
	* 启动器
	* 自动配置
* 自动配置机制：
	* 默认启用（通过 `@SpringBootApplication` 的元注解 `@EnableAutoConfiguration`）
	* Spring Boot 提供了很多配置，每个配置对应一个配置类
	* 配置类在 Spring Boot 容器启动并**满足某些条件后**会自动生效
		* 不会同时加载全部
	* `spring-boot-autoconfigure.jar`：
		* Spring Boot 启动后会加载 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`，并创建对应的配置类对象，但实际加载的只有其中 20~30个
		* `org.springframework.boot.autoconfigure` 包内存有所有可用的配置类
		* `META-INF/spring/spring-configuration-metadata.json` 中存储所有默认配置
	* 静态资源的默认存放位置：
		* `/META-INF/resources`
		* `/resources`
		* `/static`
		* `/public`
* `@ComponentScan`：
	* 组件扫描范围：入口类所在目录及其子目录
	* 修改扫描范围：
		* 在 `@SpringBootApplication` 注解传入 `scanBasePackages` 参数