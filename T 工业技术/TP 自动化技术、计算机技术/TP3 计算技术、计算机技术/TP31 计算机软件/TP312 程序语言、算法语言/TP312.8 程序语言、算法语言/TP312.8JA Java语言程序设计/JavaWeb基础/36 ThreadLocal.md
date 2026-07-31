`ThreadLocal` 类中有一个 `Map`，用于存放线程对象与其他对象的映射

可以将 `Connection` 对象与当前线程对象绑定，可以实现在同一线程中访问到同一个 `Connection` 对象
* 实现事务功能

