---
title: '03 API层面的变化'
---

# 03 API层面的变化

* API层面的变化
* String存储结构改变
	* （Java 9前）String底层采用char类型数组来存储字符；（Java9）String底层采用byte类型的数组来存储字符，节约存储空间
* String新增的方法
	* （Java 11）String类新增了一些方法
      ```java
      // 空格，制表符，换行等都认为是空的
      boolean blank = "\t \n".isBlank();
      System.out.println(blank); // 输出：true

      String source = "\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000www.baidu.com\u3000\u3000\u3000\u3000\u3000";
      // 去除“前后”的中文空格
      System.out.println(source.strip());
      // 去除“开头”的中文空格
      System.out.println(source.stripLeading());
      // 去除“末尾”的中文空格
      System.out.println(source.stripTrailing());

      // 把字符串内容重复n份
      String repeat = "xixi".repeat(3);
      System.out.println(repeat); // 输出：xixixixixixi

      // 按照换行来分割字符串，返回的结果是Stream对象
      Stream<String> lines = "a\nb\nc\n".lines();
      System.out.println(lines.count()); // 输出：3
      ```
	* （Java 12）String类新增了一些方法
      ```java
      // 在字符串前面添加n个空格
      String result2 = "Java Golang".indent(4);
      System.out.println(result2);
      ```
* 接口支持私有方法
	* （Java 9）接口中允许定义“私有”的静态方法和成员方法，但是不能定义私有的默认方法
	* 示例：演示接口中的私有静态方法和成员方法
      ```java
      public interface Flyable {
      // 私有的静态方法
      private static void staticMethod() {
        System.out.println("static method ...");
      }
      // 私有的成员方法
      private void method() {
        System.out.println("default method ...");
      }
      }
      ```
* 标识符命名的变化
	* （Java 9）“\_”不能独立命名标识符，如果使用就会报错
* 简化编译运行程序
	* （Java 11）通过java命令可以直接运行Java程序
* 创建不可变集合
	* （Java 9）可以通过List、Set和Map接口提供的of(E... elements)静态方法来创建不可变集合，此类集合不能添加、删除、修改元素
	* 示例：创建不可变集合
      ```java
      // 创建不可变List集合
      List<Integer> list = List.of(1, 2, 3, 4, 5);
      System.out.println(list);
      // 创建不可变Set集合
      // 注意：如果Set集合中有相同的元素，则就会抛出IllegalArgumentException异常。
      Set<Integer> set = Set.of(1, 2, 3, 4, 5, 4);
      System.out.println(set);
      // 创建不可变Map集合
      Map<Integer, String> map = Map.of(123, "武汉", 456, "成都");
      System.out.println(map);
      ```
	* Arrays.asList与List.of的区别：
		* List.of：不能向集合中添加或删除元素，也不能修改集合中的元素
		* Arrays.asList：不能向集合中添加或删除元素，但是可以修改集合中的元素
	* 示例：Arrays.asList与List.of的区别
      ```java
      // 通过Arrays.asList()方法创建不可变集合
      List<Integer> list1 = Arrays.asList(1, 2, 3, 4, 5);
      // list1.add(6); // 抛出UnsupportedOperationException异常
      // list1.remove(2); // 抛出UnsupportedOperationException异常
      list1.set(2, 33); // 没有问题
      System.out.println(list1); // 输出：[1, 2, 33, 4, 5]

      // 通过List.of()方法创建不可变集合
      List<Integer> list2 = List.of(1, 2, 3, 4, 5);
      // list2.add(6); // 抛出UnsupportedOperationException异常
      // list2.remove(2); // 抛出UnsupportedOperationException异常
      // list2.set(2, 33); // 抛出UnsupportedOperationException异常
      ```
* Optional API
	* （Java 8）引入Optional类，简洁地对null值进行处理，从而避免出现空指针异常（NullPointerException）
	* 本质上，Optional 类是一个包含有可选值的包装类，意味着 Optional 类中既可以含有对象也可以为null
* 创建Optional对象
	* 使用Optional类提供的of()和ofNullable()静态方法来创建包含值的Optioanal实例
	* 如果将null当作参数传进去of()会抛出空指针异常，如果将null当作参数传进去ofNullable()就不会抛出空指针异常
	* 示例：创建一个Optional实例
      ```java
      // 创建一个包含“null”的Optional示例
      Optional<Object> optional1 = Optional.ofNullable(null);
      // 创建一个包含“对象”的Optional示例
      Optional<String> optional2 = Optional.ofNullable("hello");
      ```
* Optional类的方法
	* 使用以下两个方法获得Optional实例中包含的值
	* | **方法名** | **描述** |
	* | --- | --- |
	* | public T get() | 如果值不为null，则直接取出该值；如果值为null，则抛出空指针异常。 |
	* | public T orElse(T other) | 如果值不为null，则直接取出该值；如果值为null，则取出的就是参数other的值。 |
	* 开发中一般采用orElse(T other)方法
	* 示例：演示get()方法
      ```java
      // 创建一个包含“null”的Optional示例
      Optional<Object> optional1 = Optional.ofNullable(null);
      Object obj1 = optional1.get(); // 抛出空指针异常
      // 创建一个包含“对象”的Optional示例
      Optional<String> optional2 = Optional.ofNullable("hello");
      String str = optional2.get();
      System.out.println(str); // 输出：hello
      ```
	* 示例：演示orElse(T other)方法
      ```java
      // 创建一个包含“null”的Optional示例
      Optional<Object> optional1 = Optional.ofNullable(null);
      Object str1 = optional1.orElse("world");
      System.out.println(str1); // 输出：world
      // 创建一个包含“对象”的Optional示例
      Optional<String> optional2 = Optional.ofNullable("hello");
      String str2 = optional2.orElse("world");
      System.out.println(str2); // 输出：hello
      ```
