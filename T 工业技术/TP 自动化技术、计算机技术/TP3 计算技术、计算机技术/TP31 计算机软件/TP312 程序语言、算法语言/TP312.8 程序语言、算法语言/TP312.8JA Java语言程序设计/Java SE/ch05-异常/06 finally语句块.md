* 一定会执行
* 通常用于完成资源的释放
* `finally` 语句块至少需要配合 `catch` 语句使用
* `try` 语句块执行完毕后，`finally` 语句块才会执行（遵循自上而下运行原则）
* `try` 语句块中出现 `System.exit(0);` 则 JVM 直接关闭，`finally` 语句块不执行
* `try` 语句块和 `finally` 语句块中都有 `return` 语句，则按顺序执行完代码后执行 `finally` 语句块中的 `return` 语句
