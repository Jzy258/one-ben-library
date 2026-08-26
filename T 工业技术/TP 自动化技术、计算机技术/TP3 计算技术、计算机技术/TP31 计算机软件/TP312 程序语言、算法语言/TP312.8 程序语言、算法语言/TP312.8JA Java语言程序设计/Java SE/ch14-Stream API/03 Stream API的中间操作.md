---
title: '03 Stream API的中间操作'
---

# 03 Stream API的中间操作

	* 中间操作属于惰式执行，直到执行终止操作才会真正的进行数据的计算，此处调用中间操作只会返回一个标记了该操作的新 `Stream` 对象，因此可以进行链式操作
	* 在后续的操作中，调用 `StudentData` 类的 `getStudentList()` 静态方法，就能获得一个存储 `Student` 对象的 `List` 集合
      ```java
      public class Student {
      private String name;
      private int age;
      private String sex;
      private String city;

      public Student() {}
      public Student(String name, int age, String sex, String city) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.city = city;
      }

      /*setter和getter方法省略*/

      @Override
      public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", sex='" + sex + '\'' +
                ", city='" + city + '\'' +
                '}';
      }
      }
      public class StudentData {
      /**
      * 获得一个存储Student对象的List集合
      */
      public static List<Student> getStudentList() {
        ArrayList<Student> list = new ArrayList<>();
        list.add(new Student("张三", 21, "男", "武汉"));
        list.add(new Student("李四", 18, "女", "重庆"));
        list.add(new Student("王五", 25, "女", "成都"));
        list.add(new Student("赵六", 22, "男", "武汉"));
        list.add(new Student("王麻子", 16, "女", "成都"));
        return list;
      }
      }
      ```
* 筛选（filter）
	* 筛选（filter）：按照一定的规则校验流中的元素，将符合条件的元素提取到新的流中的操作
	* 该操作使用了 `Stream` 接口提供的 `Stream<T> filter(Predicate<? super T> predicate);` 方法来实现（可以运用 Lambda 表达式）
	* **例**：使用筛选的案例
      ```java
      // 需求：筛选出年龄大于20的学生对象
      Stream<Student> stream1 = StudentData.getStudentList().stream();
      stream1.filter(stu -> stu.getAge() > 20).forEach(System.out :: println);
      // 需求：筛选出字符串长度大于3的元素
      Stream<String> stream2 = Stream.of("hello", "too", "like", "ande");
      stream2.filter(str -> str.length() > 3).forEach(System.out :: println);
      ```
* 映射（map）
	* 映射（map）：将一个流的元素按照一定的映射规则映射到另一个流中，该操作使用了 `Stream` 接口提供的 `<R> Stream<R> map(Function<? super T, ? extends R> mapper);` 方法来实现
	* **例**：使用映射的案例
      ```java
      // 需求：把字符串中的字母全部转化为大写
      Stream<String> stream1 = Stream.of("hello", "too", "like", "ande");
      // stream1.map(str -> str.toUpperCase()).forEach(System.out :: println);
      stream1.map(String :: toUpperCase).forEach(System.out :: println);

      // 需求：获得集合中所有学生的名字
      Stream<Student> stream2 = StudentData.getStudentList().stream();
      // stream2.map(stu -> stu.getName()).forEach(System.out :: println);
      stream2.map(Student :: getName).forEach(System.out :: println);

      // 需求：获得集合中性别为男的学生名字
      // 思路：先筛选，后映射
      Stream<Student> stream3 = StudentData.getStudentList().stream();
      stream3.filter(stu -> stu.getSex().equals("男")).map(Student :: getName).forEach(System.out :: println);
      ```
	* 在 `Stream` 接口中，可以实现 “将多个集合中的元素映射到同一个流中”，该操作使用了 `Stream` 接口提供的 `<R> Stream<R> flatMap(Function<? super T, ? extends Stream<? extends R>> mapper);` 方法来实现
	* **例**：将多个集合中的元素映射到同一个流中
      ```java
      // 需求：将两个集合中的元素映射到同一个流中
      List<String> list1 = new ArrayList<>();
      list1.add("aa");
      list1.add("bb");
      list1.add("cc");

      List<String> list2 = new ArrayList<>();
      list2.add("dd");
      list2.add("ee");
      list2.add("ff");

      Stream<List<String>> stream = Stream.of(list1, list2);
      stream.flatMap(List<String>::stream).forEach(System.out::println);
      ```
* 除重（distinct）
	* 除重（distinct）：除去重复的元素，底层使用了 `hashCode()` 和 `equals(Object obj)` 方法来判断元素是否相等，该操作使用了 `Stream` 接口提供的 `Stream<T> distinct();` 方法来实现
	* **例**：演示除重的操作
      ```java
      // 需求：除去重复的元素
      Stream.of(11, 22, 33, 44, 33).distinct().forEach(System.out :: println);

      // 需求：除去重复的学生（除重后输出学生对象）
      StudentData.getStudentList().stream().distinct().forEach(System.out :: println);

      // 需求：除去年龄相同的学生（除重后输出学生年龄）
      // 思路：先映射，后除重
      StudentData.getStudentList().stream().map(Student :: getAge).distinct().forEach(System.out :: println);
      ```
* 排序（sorted）
	* 排序（sorted）：对元素执行 “升序” 或 “降序” 的排列操作。在 `Stream` 接口中提供了 `Stream<T> sorted();` 方法，专门用于对元素执行 “自然排序”，使用该方法则元素对应的类就必须实现 `Comparable` 接口
	* **例**：使用自然排序的案例
      ```java
      // 需求：对元素执行“升序”排序
      Stream.of(4, 1, 3, 6, 2, 5).sorted().forEach(System.out :: println);

      // 需求：按照学生的年龄执行“升序”排序（排序后输出学生对象）
      StudentData.getStudentList().stream().sorted().forEach(System.out :: println);

      // 需求：按照学生的年龄执行“升序”排序（排序后输出学生年龄）
      StudentData.getStudentList().stream().map(Student :: getAge).sorted().forEach(System.out :: println);
      ```
	* 在 `Stream` 接口中还提供了 `Stream<T> sorted(Comparator<? super T> comparator);` 方法，专门用于对元素执行 “指定排序”，这样就能对某一个类设置多种排序规则
	* **例**：使用指定排序的案例
      ```java
      // 需求：对元素执行“升序”排序
      Stream.of(4, 1, 3, 6, 2, 5).sorted(Integer :: compare).forEach(System.out :: println);

      // 需求：按照学生的年龄执行“降序”排序（排序后输出学生对象）
      StudentData.getStudentList().stream().sorted((stu1, stu2) -> stu2.getAge() - stu1.getAge()).forEach(System.out :: println);

      // 需求：按照学生的年龄执行“升序”排序（排序后输出学生年龄）
      StudentData.getStudentList().stream().map(Student :: getAge).sorted(Integer :: compare).forEach(System.out :: println);
      ```
* 合并（concat）
	* 合并（concat）：将两个 `Stream` 合并为一个，此处使用 `Stream` 接口提供的 `public static <T> Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b)` 静态方法来实现
	* **例**：将两个 `Stream` 合并为一个
      ```java
      Stream<String> stream1 = Stream.of("aa", "bb", "cc");
      Stream<String> stream2 = Stream.of("11", "22", "33");
      Stream.concat(stream1, stream2).forEach(System.out :: println);
      ```
* 截断和跳过
	* 跳过（skip）：跳过 `n` 个元素开始操作，此处使用 `Stream` 接口提供的 `Stream<T> skip(long n);` 方法来实现
	* 截断（limit）：截取 `n` 个元素的操作，此处使用 `Stream` 接口提供的 `Stream<T> limit(long maxSize);` 方法来实现
	* **例**：从指定位置开始截取 `n` 个元素
      ```java
      // 需求：从索引为2的位置开始截取3个元素
      Stream.of(11, 22, 33, 44, 55, 66).skip(2).limit(3).forEach(System.out :: println);
      ```
