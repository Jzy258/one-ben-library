---
title: '01 Lambda表达式概述'
---

# 01 Lambda表达式概述

* Lambda 表达式的引入
	* （JDK1.8）
	* 可以取代大部分的匿名内部类，尤其在集合的遍历和其他集合操作中，可以极大地优化代码结构
	* 实现对 `List` 集合的 “降序” 排序操作：
	* 使用匿名内部类实现
      ```java
      List<Integer> list = Arrays.asList(3, 6, 1, 7, 2, 5, 4);
      Collections.sort(list, new Comparator<Integer>() {
  	@Override
  	public int compare(Integer o1, Integer o2) {
		return o2 - o1;
  	}
      });
      System.out.println("排序后：" + list);
      ```
	* 使用 Lambda 表达式实现：
      ```java
      List<Integer> list = Arrays.asList(3, 6, 1, 7, 2, 5, 4);
      Collections.sort(list, (o1, o2) -> o2 - o1);
      System.out.println("排序后：" + list);
      ```
* 函数式编程思想概述
	* 在 Java 语言中面向对象（OOP）编程就是一切，但是随着 Python 和 Scala 等语言的崛起和新技术的挑战，Java 也做出调整，不但支持 OOP 还支持 OOF（面向函数编程）
	* 引入 Lambda 表达式之后，Java 语言也开始支持函数式编程，但是 Lambda 表达式不是 Java 语言最早使用的，目前 C++、C#、Python、Scala 等语言都支持 Lambda 表示
	* 面向对象的思想：做一件事情，找一个能解决这个事情的对象，然后调用对象的方法，最终完成事情
	* 函数式编程思想：只要能获得结果，谁去做的，怎么做的都不重要，重视的是结果，不重视实现过程
	* 在函数式编程语言中，函数被当成一等公民对待，Lambda 表达式的类型是函数，但是 Lambda 表达式却是一个对象，而不是函数，它们必须依附于一类特别的对象类型，也就是所谓的函数式接口
	* Lambda 表达式就是一个函数式接口的实例，这就是 Lambda 表达式和函数式接口的关系
	* 只要一个对象是函数式接口的实例，那么该对象就可以使用 Lambda 表达式来表示
* 函数式接口
	* 能够使用 Lambda 表达式的一个重要依据是必须有相应的函数式接口
	* 函数式接口：一个接口中有且只有一个抽象方法
	* 如果在接口上声明 `@FunctionalInterface` 注解，编译器就会按照函数式接口的定义来要求该接口，也就是该接口中有且只能定义一个抽象方法
	* 函数式接口允许在抽象方法外定义一个或多个默认方法
      ```java
      @FunctionalInterface
      public interface Flyable {
  	void showFly();
      default void show() {
        System.out.println("（JDK1.8）接口可以定义默认方法和静态方法");
      }
      }

      public class Test01 {
  	public static void main(String[] args) {
		Flyable flyable = () -> {
      System.out.println("小鸟自由自在的飞翔");
      };
      flyable.showFly();
      }
      }
      ```
	* 只要保证接口中有且只有一个抽象方法，即使接口中没有使用 `@FunctionalInterface` 注解标注，该接口也属于函数式接口
* Lambda 表达式和匿名内部类
	* 所需类型不同：
	* 匿名内部类：可以是接口，抽象类，具体类
	* Lambda 表达式：只能是接口
	* 使用限制不同
	* 如果接口中有且仅有一个抽象方法，可以使用 Lambda 表达式，也可以使用匿名内部类
	* 如果接口中有多个抽象方法，则就只能使用匿名内部类，而不能使用 Lambda 表达式
	* 实现原理不同
	* 匿名内部类：编译之后，会生成一个单独的 .class 字节码文件
	* Lambda 表达式：编译之后，没有生成一个单独的 .class 字节码文件
