---
title: '02 Lambda表达式的使用'
---

# 02 Lambda表达式的使用

* Lambda 表达式的语法
	* Lambda 表达式本质就是一个匿名函数，在函数的语法中包含返回值类型、方法名、形参列表和方法体等，而在 Lambda 表达式中我们只需要关心形参列表和方法体
	* Lambda 表达式的语法为 `函数类((形参列表) -> {方法体实现})`，其中 “->” 为 Lambda 操作符或箭头操作符，“形参列表” 为对应接口实现类中重写方法的形参列表，“方法体实现” 为对应接口实现类中重写方法的方法体
	* **例**：
      ```java
      List<Integer> list = Arrays.asList(3, 6, 1, 7, 2, 5, 4);
      Collections.sort(list, new Comparator<Integer>() {
  	@Override
  	public int compare(Integer o1, Integer o2) {
	    return o2 - o1;
  	}
      });
      ```
	* 以上的匿名内部类对应的Lambda表达式代码实现如下：
      ```java
      List<Integer> list = Arrays.asList(3, 6, 1, 7, 2, 5, 4);
      Collections.sort(list, (Integer o1, Integer o2) -> {
  	return o2 - o1;
      });
      System.out.println("排序后：" + list);
      ```
	* Lambda本质上就是去掉了一堆没有意义的代码，只留下核心的代码逻辑
* Lambda 表达式的使用
* Lambda 表达式的基本使用
	* 使用 Lambda 表达式时，必须有上下文环境，才能推导出 Lambda 对应的接口类型
	* 无返回值函数式接口：
	* 无返回值无参数
      ```java
      @FunctionalInterface
      interface NoParameterNoReturn {
  	void test();
      }

      public class Test01 {
  	public static void main(String[] args) {
		NoParameterNoReturn obj = () -> {
	    	System.out.println("无参无返回值");
	    };
		obj.test();
  	}
      }
      ```
	* 无返回值一个参数
      ```java
      @FunctionalInterface
      interface OneParameterNoReturn {
  	void test(int num);
      }

      public class Test01 {
  	public static void main(String[] args) {
		OneParameterNoReturn obj = (int num) -> {
			System.out.println("无返回值一个参数 --> " + num);
		};
		obj.test(20);
  	}
      }
      ```
	* 无返回值多个参数
      ```java
      @FunctionalInterface
      interface MoreParameterNoReturn {
  	void test(String str1, String str2);
      }

      public class Test01 {
  	public static void main(String[] args) {
		MoreParameterNoReturn obj = (String str1, String str2) -> {
			System.out.println(str1 + " : " + str2);
		};
		obj.test("你好", "世界");
  	}
      }
      ```
	* 有返回值函数接口
	* 有返回值无参数
      ```java
      @FunctionalInterface
      interface NoParameterHasReturn {
  	int test();
      }

      public class Test01 {
  	public static void main(String[] args) {
		NoParameterHasReturn obj = () -> {
			return 1314;
		};
		System.out.println(obj2.test());
  	}
      }
      ```
	* 有返回值一个参数
      ```java
      @FunctionalInterface
      interface OneParameterHasReturn {
  	String test(double num);
      }

      public class Test01 {
  	public static void main(String[] args) {
		OneParameterHasReturn obj = (double num) -> {
			return "传入的小数为：" + num;
		};
		System.out.println(obj2.test(1314.0));
  	}
      }
      ```
	* 有返回值多个参数
      ```java
      @FunctionalInterface
      interface MoreParameterHasReturn {
  	String test(int num1, int num2);
      }
      public class Test01 {
  	public static void main(String[] args) {
		MoreParameterHasReturn obj = (int num1, int num2) -> {
			return "运算的结果为：" + (num1 + num2);
		};
		System.out.println(obj.test(20, 30));
  	}
      }
      ```
* Lambda表达式的语法精简
	* Lambda 表达式的语法格式可以更加的精简，但是相应的代码可读性也会变差
	* 在以下的应用场景中，可以对 Lambda 表达式的语法进行精简：
	* 形参类型可以省略，如果需要省略，则每个形参的类型都要省略
	* 如果形参列表中只存在一个形参，那么形参类型和小括号都可以省略
	* 方法体只有一行语句，那么方法体的大括号可以省略
	* 方法体中只有一条 `return` 语句，那么大括号可以省略，且必须去掉 `return` 关键字
	* 例：
      ```java
      public class Test01 {
  	public static void main(String[] args) {
		MoreParameterNoReturn obj1 = (str1, str2) -> {
			System.out.println(str1 + " : " + str2);
		};
		obj1.test("你好", "世界");

		OneParameterHasReturn obj2 = num -> {
			return "传入的小数为：" + num;
		};
		System.out.println(obj2.test(1314.0));

		NoParameterNoReturn obj3 = () -> System.out.println("无参无返回值");
		obj3.test();

		MoreParameterHasReturn obj8 = (a, b) -> "运算的结果为：" + (a + b);
		System.out.println(obj8.test(20, 30));
  	}
      }
      ```
* 四个基本的函数式接口
	* | 名字  | 接口名              | 对应的抽象方法              | 解释          |
	* | --- | ---------------- | -------------------- | ----------- |
	* | 消费  | `Consumer<T>`    | `void accept(T t);`  | 有参数，无返回值    |
	* | 生产  | `Supplier<T>`    | `T get();`           | 无参数，有返回值    |
	* | 转换  | `Function<T, R>` | `R apply(T t);`      | 有参数，有返回值    |
	* | 判断  | `Predicate<T>`   | `boolean test(T t);` | 有参数，布尔类型返回值 |
	* 以上的函数式接口都在 `java.util.function` 包中，通常函数接口出现的地方都可以使用 Lambda 表达式，所以不必记忆函数接口的名字，这些函数式接口及子接口在后续学习中很常用
	* `Consumer`：
	* `default Consumer andThen(Consumer after)`：返回一个组合的 `Consumer`，用于合并两个 `Consumer`，便于依次执行
	* `Predicate`：
	* `default Predicate nagate()`：返回一个否定的 `Predicate`，实现逻辑非
	* `default Predicate or(Predicate other)`：返回一个组合的 `Predicate`，实现逻辑或
	* `default Predicate and(Predicate other`：返回一个组合的 `Predicate`，实现逻辑与
	* `Function`：
	* `default Function<T, V> andThen(Function after)`：返回一个组合的 `Function`，先对输入执行当前函数，再对其返回值执行 `after`
* Lambda 表达式的方法引用
* 方法引用概述
	* 如果 Lambda 表达式的方法体中除了调用现有方法（已存在的方法）之外什么都不做，满足这样的条件就有机会使用方法引用来实现
      ```java
      // 使用Lambda表达式
      Function<Double, Long> function1 = aDouble -> Math.round(aDouble);
      System.out.println(function1.apply(3.14));

      // 使用方法引用
      Function<Double, Long> function2 = Math :: round;
      System.out.println(function2.apply(3.14));
      ```
	* 方法引用可以看做是 Lambda 表达式深层次的表达，方法引用就是 Lambda 表达式，也就是函数式接口的一个实例，通过方法的名字来指向一个方法，可以认为是 Lambda 表达式的一个语法糖
	* 在 Lambda 表达式的方法引用中，主要有实例方法引用、静态方法引用、特殊方法引用和构造方法引用、数组引用
* 实例方法引用
	* 语法：`对象 :: 实例方法`
	* 特点：在 Lambda 表达式的方法体中，通过 “对象” 来调用指定的某个 “实例方法”
	* 要求：函数式接口中抽象方法的返回值类型和形参列表与内部通过对象调用某个实例方法的返回值类型和形参列表保持一致
	* -----
	* **例**：
	* 实现 `Consumer`：
      ```java
      // 使用匿名内部类
      Consumer<String> consumer1 = new Consumer<String>() {
  	@Override
  	public void accept(String str) {
		System.out.println(str);
  	}
      };
      consumer1.accept("hello world");

      // 使用Lambda表达式
      Consumer<String> consumer2 = str -> System.out.println(str);
      consumer2.accept("hello world");

      // 使用方法引用来
      Consumer<String> consumer3 = System.out :: println;
      consumer3.accept("hello world");
      ```
	* 实现 `Supplier`：
      ```java
      Teacher teacher = new Teacher("ande", 18);
      // 使用匿名内部类
      Supplier<String> supplier1 = new Supplier<String>() {
  	@Override
  	public String get() {
		return teacher.getName();
  	}
      };
      System.out.println(supplier1.get());

      // 使用Lambda表达式
      Supplier<String> supplier2 = () -> teacher.getName();
      System.out.println(supplier2.get());

      // 使用方法引用
      Supplier<String> supplier3 = teacher :: getName;
      System.out.println(supplier3.get());
      ```
* 静态方法引用
	* 语法：`类 :: 静态方法`
	* 特点：在 Lambda 表达式的方法体中，通过 “类名” 来调用指定的某个 “静态方法”
	* 要求：函数式接口中抽象方法的返回值类型和形参列表与内部通过类名调用某个静态方法的返回值类型和形参列表保持一致
	* **例**：
	* 实现 `Function` 类的 `apply()` 方法
      ```java
      // 使用匿名内部类
      Function<Double, Long> function1 = new Function<Double, Long>() {
  	@Override
  	public Long apply(Double aDouble) {
		return Math.round(aDouble);
  	}
      };
      System.out.println(function1.apply(3.14));

      // 使用Lambda表达式
      Function<Double, Long> function2 = aDouble -> Math.round(aDouble);
      System.out.println(function2.apply(3.14));

      // 使用方法引用
      Function<Double, Long> function3 = Math :: round;
      System.out.println(function3.apply(3.14));
      ```
* 特殊方法引用
	* 语法：`类名 :: 实例方法`
	* 特点：在 Lambda 表达式的方法体中，通过方法的第一个形参来调用指定的某个 “实例方法”
	* 要求：把函数式接口中抽象方法的第一个形参作为方法的调用者对象，并且从第二个形参开始（或无参）可以对应到被调用实例方法的参数列表中，并且返回值类型保持一致
	* **例**：
	* 实现 `Comparator`：
      ```java
      // 使用匿名内部类
      Comparator<Double> comparator1 = new Comparator<Double>() {
  	@Override
  	public int compare(Double o1, Double o2) {
		return o1.compareTo(o2);
  	}
      };
      System.out.println(comparator1.compare(10.0, 20.0));

      // 使用Lambda表达式
      Comparator<Double> comparator2 = (o1, o2) -> o1.compareTo(o2);
      System.out.println(comparator2.compare(10.0, 20.0));

      // 使用方法引用
      Comparator<Double> comparator3 = Double :: compareTo;
      System.out.println(comparator3.compare(10.0, 20.0));
      ```
	* 需求：实例化 `Function` 接口的实现类对象，然后获得传入 `Teacher` 对象的姓名
      ```java
      // 使用匿名内部类
      Teacher teacher = new Teacher("ande", 18);
      Function<Teacher, String> function1 = new Function<Teacher, String>() {
  	@Override
  	public String apply(Teacher teacher) {
		return teacher.getName();
  	}
      };
      System.out.println(function1.apply(teacher));

      // 使用Lambda表达式
      Function<Teacher, String> function2 = e -> e.getName();
      System.out.println(function2.apply(teacher));

      // 使用方法引用
      Function<Teacher, String > function3 = Teacher :: getName;
      System.out.println(function3.apply(teacher));
      ```
* 构造方法引用
	* 语法：`类名 :: new`
	* 特点：在 Lambda 表达式的方法体中，返回指定 “类名” 来创建出来的对象
	* 要求：创建对象所调用构造方法形参列表和函数式接口中的方法的形参列表保持一致，并且方法的返回值类型和创建对象的类型保持一致
	* **例**：
	* 实例化 `Supplier` 接口的实现类对象，然后调用重写方法返回 `Teacher` 对象
      ```java
      // 使用匿名内部类
      Supplier<Teacher> supplier1 = new Supplier<Teacher>() {
  	@Override
  	public Teacher get() {
		return new Teacher();
  	}
      };
      System.out.println(supplier1.get());

      // 使用Lambda表达式
      Supplier<Teacher> supplier2 = () -> new Teacher();
      System.out.println(supplier2.get());

      // 使用构造方法引用
      Supplier<Teacher> supplier3 = Teacher :: new;
      System.out.println(supplier3.get());
      ```
	* 实例化 `Function` 接口的实现类对象，然后调用重写方法返回 `Teacher` 对象
      ```java
      // 使用匿名内部类
      Function<String, Teacher> function1 = new Function<String, Teacher>() {
  	@Override
  	public Teacher apply(String name) {
		return new Teacher(name);
  	}
      };
      System.out.println(function1.apply("ande"));

      // 使用Lambda表达式
      Function<String, Teacher> function2 = name -> new Teacher(name);
      System.out.println(function2.apply("ande"));

      // 使用构造方法引用
      Function<String, Teacher> function3 = Teacher :: new;
      System.out.println(function3.apply("ande"));
      ```
* 数组引用
	* 语法：`数组类型 :: new`
	* 特点：在 Lambda 表达式的方法体中，创建并返回指定类型的 “数组”
	* 要求：重写的方法有且只有一个整数型的参数，并且该参数就是用于设置数组的空间长度，并且重写方法的返回值类型和创建数组的类型保持一致
	* **例**：实例化 `Function` 接口的实现类对象，并在重写方法中返回指定长度的 `int` 类型数组
      ```java
      // 使用匿名内部类
      Function<Integer, int[]> function1 = new Function<Integer, int[]>() {
  	@Override
  	public int[] apply(Integer integer) {
		return new int[integer];
  	}
      };
      System.out.println(Arrays.toString(function1.apply(10)));

      // 使用Lambda表达式
      Function<Integer, int[]> function2 = num -> new int[num];
      System.out.println(Arrays.toString(function2.apply(20)));

      // 使用方法引用
      Function<Integer, int[]> function3 = int[] :: new;
      System.out.println(Arrays.toString(function3.apply(30)));
      ```
* Lambda 在集合当中的使用
	* 集合当中新增了部分方法，以便与 Lambda 表达式对接
	* 要用 Lambda 操作集合就一定要看懂源码
* forEach 方法
	* 在 `Collection` 集合和 `Map` 集合中，都提供了 `forEach()` 方法用于遍历集合
	* 在 `Collection` 集合中，提供的 `forEach()` 方法的形参为 `Consumer` 接口（消费型接口），通过该方法再配合 Lambda 表达式就可以遍历 `List` 和 `Set` 集合中的元素
	* **例**：遍历 `List` 集合中的元素
      ```java
      List<Integer> list = Arrays.asList(11, 22, 33, 44, 55);
      // 使用匿名内部类来实现
      list.forEach(new Consumer<Integer>() {
  	@Override
  	public void accept(Integer element) {
		System.out.println(element);
  	}
      });

      // 使用Lambda表达式来实现
      list.forEach(element -> System.out.println(element));

      // 使用方法引用来实现
      list.forEach(System.out :: println);
      ```
	* 在 `Map` 集合中，提供的 `forEach()` 方法的形参为 `BiConsumer` 接口，而 `BiConsumer` 接口属于两个参数的消费型接口，通过该方法再配合 `Lambda` 表达式就可以遍历 `Map` 集合中的元素
	* **例**：遍历 `Map` 集合中的元素
      ```java
      // 实例化Map集合并添加键值对
      HashMap<String, String> map = new HashMap<>();
      map.put("张三", "成都");
      map.put("李四", "重庆");
      map.put("王五", "西安");
      // 使用匿名内部类来实现
      map.forEach(new BiConsumer<String, String>() {
  	@Override
  	public void accept(String key, String value) {
		System.out.println("key：" + key + "，value：" + value);
  	}
      });
      // 使用Lambda表达式来实现
      map.forEach((k, v) -> System.out.println("key：" + k + "，value：" + v));
      ```
* removeIf 方法
	* 在 `Collection` 集合中，提供的 `removeIf()` 方法的形参为 `Predicate` 接口（判断型接口），通过该方法再配合 Lambda 表达式就可以遍历 `List` 和 `Set` 集合中的元素。
	* **例**：删除 `List` 集合中的某个元素
      ```java
      // 创建List集合并添加元素
      List<String> list = new ArrayList<>(Arrays.asList("aa", "bb", "cc", "dd"));
      // 使用匿名内部类来实现
      list.removeIf(new Predicate<String>() {
  	@Override
  	public boolean test(String element) {
		return "bb".equals(element);
  	}
      });
      System.out.println(list); // 输出：[aa, cc, dd]

      // 使用Lambda表达式来实现
      list.removeIf("cc" :: equals);
      System.out.println(list); // 输出：[aa, dd]
      ```
