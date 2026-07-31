声明 Bean 的注解：
* `@Component`
* `@Controller`
* `@Service`
* `@Repository`

`@Controller`、`@Service`、`@Repository` 是语义化的 `@Component`
* 功能完全一致，但提升了可读性
* 建议在三层架构中使用对应的注解：
	* 表示层使用 `@Controller`
	* 业务层使用 `@Service`
	* 持久层使用 `@Repository`

使用注解的步骤：
* 引入 aop 依赖
	* 引入 context 依赖时传递引入
* 在配置文件中添加 `context` 命名空间
