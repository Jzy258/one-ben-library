* 通过反射机制获取 `Method`：
```java
Method method = clazz.getDeclaredMethod("methodName", paramTypes);
```
* 通过 `Method` 调用方法
```java
Class clazz = MyClass.class;
Method method = clazz.getDeclaredMethod("methodName", paramTypes);
Object[] args = {arg1, arg2, arg3};
Object result = method.invoke(myObject, args);
```
