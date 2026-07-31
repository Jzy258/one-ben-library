`DefaultSingletonBeanFactory`：
* 三级缓存：
	* `singletonObjects` 属性：
		* *`ConcurrentHashMap` 类型，分段锁实现*
		* 一级缓存，用于缓存成熟 Bean
	* `earlySingletonObjects` 属性：
		* 二级缓存，用于缓存早期 Bean
	* `singletonFactories` 属性：
		* 三级缓存，用于缓存 Bean 工厂对象
* `addSingletonFactory` 方法：
	* 添加单例 Bean 工厂
```java
protected void addSingletonFactory(String beanName, ObjectFactory<?> singletonFactory) {  
	Assert.notNull(singletonFactory, "Singleton factory must not be null");
	/* 提前暴露Bean工厂 */
	this.singletonFactories.put(beanName, singletonFactory);  
	/* 互斥地将早期Bean从二级缓存中移除 */
	this.earlySingletonObjects.remove(beanName);  
	this.registeredSingletons.add(beanName);  
}
```
* `getSingleton` 方法：
```java
protected @Nullable Object getSingleton(String beanName, boolean allowEarlyReference) {  
	/* 尝试从一级缓存获取Bean */
    Object singletonObject = this.singletonObjects.get(beanName);  
    /* 无法从一级缓存获取Bean */
    if (singletonObject == null && isSingletonCurrentlyInCreation(beanName)) {  
		/* 尝试从二级缓存获取Bean */
        singletonObject = this.earlySingletonObjects.get(beanName);  
        /* 无法从二级缓存获取Bean */
        if (singletonObject == null && allowEarlyReference) {
	        /* 加锁确保互斥操作 */
            if (!this.singletonLock.tryLock()) {  
	            return null;  
            }  
            try {  
                singletonObject = this.singletonObjects.get(beanName);  
                if (singletonObject == null) {  
	                singletonObject = this.earlySingletonObjects.get(beanName);  
	                if (singletonObject == null) {
		                /* 尝试从三级缓存获取Bean工厂 */
	                    ObjectFactory<?> singletonFactory = this.singletonFactories.get(beanName);  
	                    if (singletonFactory != null) {  
		                    /* 
			                    通过Bean工厂创建Bean
								 -  可能是普通Bean，也可能是代理Bean
			                 */
	                        singletonObject = singletonFactory.getObject();
	                        /* 清除三级缓存 */
	                        if (this.singletonFactories.remove(beanName) != null) {  
		                        /* 将新建的Bean（半成品）存入二级缓存 */
		                        this.earlySingletonObjects.put(beanName, singletonObject);  
	                        } else {  
		                        singletonObject = this.singletonObjects.get(beanName);  
		                    }      
		                }  
	                }  
	            }  
	        } finally {  
		        this.singletonLock.unlock();  
		    }  
		}  
	}  
    return singletonObject;  
}
```

流程（以 `Employee` 和 `Employer` 循环依赖为例）：
* 创建 `Employee` 实例：
	* `context.getBean("employeeBean", Employee.class)`
		* 底层调用了 `doCreateBean("employeeBean")` 方法
	* 实例化：通过反射机制调用构造函数，创建一个原始 `Employee` 实例
	* 提前曝光：Spring 将一个能生产 `Employee`  的 `ObjectFactory` 放入三级缓存 `singletonFactory` 中
* 注入 `Employee` 的属性：
	* Spring 发现 `Employee` 有一个 `@Autowired` 的属性 `employer`
	* 执行 `getBean("employerBean", Employer.class)`
* 创建 `Employer` 实例：
	* `context.getBean("employerBean", Employer.class)`
		* 底层调用了 `doCreateBean("employerBean")` 方法
	* 实例化：创建原始 `Employer` 实例
	* 提前曝光：将 `Employer` 的 `ObjectFactory` 放入三级缓存
* 注入 `Employer` 的属性：
	* Spring 发现 `Employer` 有一个 `@Autowired` 的属性 `employee`
	* 执行 `getBean("employeeBean", Employer.class)`
* 解决循环依赖：
	* Spring 在一级缓存中找不到 `Employee` 实例
	* Spring 在二级缓存中找不到 `Employee` 实例
	* Spring 在三级缓存中找到了 `Employee` 的 `ObjectFactory` 实例
	* 执行该 `ObjectFactory` 的 `getBean` 方法
		* 可能返回 `Employee` 的原始对象，也可能返回一个被 AOP 增强的代理对象
	* 将该对象放入二级缓存
	* 将 `ObjectFactory` 从三级缓存中移除
	* 将 `Employee` 的早期 Bean 注入给 `Employer` 的 `employee` 属性
* 完成创建：
	* `Employer` 实例完成属性注入，完成后续的初始化，放入一级缓存
	* 调用返回，`Employee` 将 `Employer` 实例注入到 `employer` 属性中
	* `Employee` 完成属性注入，完成后续的初始化，放入一级缓存

