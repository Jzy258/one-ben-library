* Lombok：
	* **作用**：
		* 通过注解减少 Java 中的样板代码
	* 只在编译阶段起作用，不会影响程序的运行效率
* 主要注解：
	* `@Getter` / `@Setter`：
		* 生成 Getter 和 Setter 方法
		* 自己编写的会覆盖自动生成的
	* `@NoArgsConstructor`：
		* 生成无参构造方法
	* `@AllArgsConstructor`：
		* 生成全参构造方法
	* `@RequiredArgsConstructor`：
		* 生成包含所有被 `final` 修饰的实例变量的构造方法
			* 通常用于 Bean 的自动注入
		* 若没有 `final` 修饰的实例变量，则自动生成无参构造方法
	* `@ToString` / `@EqualsAndHashCode`：
		* 用于生成 `toString` 方法和 `equals` / `hashCode` 方法
		* 可以使用 `exclude` 属性定制上述方法的比较条件
	* `@Data`：
		* 等价于 `@ToString` + `@EqualsAndHashCode` + `@Getter` + `@Setter` + `@RequiredArgsConstructor`
* 其他注解：
	* `@Value`：
		* 等价于 `@AllArgsConstructor` + `@ToString` + `@EqualsAndHashCode` + `@RequiredArgsConstructor`
		* **作用**：
			* 生成不可变对象
	* `@Builder`：
		* 按照建造者模式构造类
		* 只需要提供属性
		* 在集合属性上添加 `@Singular` 注解可以生成方法，用来向集合中添加元素
			* 集合属性名需要为复数形式，生成的方法名则为单数形式
			* 否则需要指定方法名
	* `@Slf4j`：
		* 生成日志常量，便于记录日志
* 建造者模式（Builder Pattern）：
	* **作用**：
		* 用于解决对象创建时参数过多的问题，使对象的构造过程可以逐步完成
	* **结构**：
		* 私有属性
		* Setter / Getter
		* 私有全参构造
		* 建造者类（一般是静态内部类）
			* 与属性同名的方法：
				* 用于为属性赋值，返回建造者对象
			* `build` 方法：
				* 用于返回建造出的对象
		* 静态方法 `XxxBuilder`：
			* 用于获取建造者对象
