* 单元：一个项目的每一个部分
* 需要引入 JUnit 框架的 jar 包
* 单元测试类（测试用例）：`XxxTest`
* 黑盒测试：功能性测试，挑毛病，不需要编程知识
* 白盒测试：程序员编写测试类对单元进行测试
* 导入 jar 包：选中后右键，选择 “添加为库”
* 需要 `@Test` 注解标注
* 返回值类型必须是 `void`
* 方法名：`testXxx`
* 断言：
```java
Assertions.assertEquals(expected, actual);
```
* 当期待值和实际值相等时，测试通过；不等时报错
* `@BeforeAll`：该方法在所有测试之前执行
* `@AfterAll`：该方法在所有测试之后执行
* `@BeforeEach`：每一个测试方法执行前执行
* `@AfterEach`：每一个测试方法执行后执行
* 单元测试中 `Scanner` 失效：帮助 -> 编辑自定义虚拟机设置... -> 在 “IDEA64.exe.vmoptions” 文件中添加 “-Deditable.java.test.console=true” -> 重启IDEA
