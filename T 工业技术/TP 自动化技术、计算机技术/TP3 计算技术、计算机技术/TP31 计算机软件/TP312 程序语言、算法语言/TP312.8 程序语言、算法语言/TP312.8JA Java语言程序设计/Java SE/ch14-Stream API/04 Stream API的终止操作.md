---
title: '04 Stream API的终止操作'
---

# 04 Stream API的终止操作

	* 触发终止操作时才会真正执行中间操作，终止操作执行完毕会返回计算的结果，并且操作的 `Stream` 失效，不能再执行中间操作或终止操作
* 遍历（forEach）
	* 遍历（forEach）：使用 `Stream` 接口提供的 `void forEach(Consumer<? super T> action);` 方法来遍历计算的结果
	* **例**：遍历操作的案例
      ```java
      List<Student> list = StudentData.getStudentList();
      // 遍历所有的元素
      list.stream().forEach(System.out :: println);
      // 遍历学生年龄大于20的元素
      list.stream().filter(stu -> stu.getAge() > 20).forEach(System.out :: println);
      ```
* 匹配（match）
	* 匹配（match）：就是判断 `Stream` 中是否存在某些元素，`Stream` 接口提供的匹配方法如下：
	* `boolean allMatch(Predicate<? super T> predicate)`：检查是否匹配所有的元素
	* `boolean anyMatch(Predicate<? super T> predicate)`：检查是否至少匹配一个元素
	* `boolean noneMatch(Predicate<? super T> predicate)`：检查是否一个元素都不匹配
	* `Optional<T> findFirst()`：获得第一个元素
	* 此处的 `Optional` 是一个值的容器，可以通过 `optional.get()` 方法获得容器的值
	* **例**：匹配操作的案例
      ```java
      List<Student> list = StudentData.getStudentList();
      // 需求：匹配学生名字是否都为“王五”
      boolean all = list.stream().allMatch(stu -> stu.getName().equals("王五"));
      System.out.println("检查是否匹配所有的元素：" + all);
      // 需求：匹配学生名字是否至少有一个为“王五”
      boolean any = list.stream().anyMatch(stu -> stu.getName().equals("王五"));
      System.out.println("检查是否至少匹配一个元素：" + any);
      // 需求：匹配学生名字中是否全部都没有“王五”
      boolean none = list.stream().noneMatch(stu -> stu.getName().equals("王五"));
      System.out.println("检查是否一个元素都不匹配：" + none);
      // 需求：获得第一个学生
      Student firstStu = list.stream().findFirst().get();
      System.out.println(firstStu);
      // 需求：获得第四个学生
      // 思路：跳过前面3个学生，然后再获得第一个元素
      Optional<Student> skipStu = list.stream().skip(3).findFirst();
      System.out.println(skipStu);
      ```
* 归约（reduce）
	* 归约（reduce）：将所有元素按照指定的规则合并成一个结果（逐个比较），常用的归约方法如下：
	* `Optional<T> reduce(BinaryOperator<T> accumulator)`
	* `T reduce(T identity, BinaryOperator<T> accumulator)`
	* **例**：归约操作的案例
      ```java
      List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);
      // 需求：获得集合中所有元素“相加”的结果
      // Integer sum = list.stream().reduce((x, y) -> x + y).get();
      Integer sum = list.stream().reduce(Integer :: sum).get();
      System.out.println(sum);
      // 需求：获得集合中所有元素“相乘”的结果
      Integer result = list.stream().reduce((x, y) -> x * y).get();
      System.out.println(result);
      // 需求：获得最大长度的元素
      String str = Stream.of("I", "love", "you", "too").reduce((str1, str2) -> str1.length() > str2.length() ? str1 : str2).get();
      System.out.println(str);
      // 需求：获得所有学生的总年龄
      Integer sumAge = StudentData.getStudentList().stream().map(Student::getAge).reduce((age1, age2) -> age1 + age2).get();
      System.out.println(sumAge);
      // 需求：获得10和集合中所有元素“相加”的结果
      Integer sum1 = list.stream().reduce(10, Integer :: sum);
      System.out.println(sum1);
      ```
	* `reduce` 操作可以实现从一组元素中生成一个值，而 `max()`、`min()`、`count()` 等方法都属于 `reduce` 操作，将它们单独设为方法只是因为常用，在 `Stream` 接口中这些方法如下：
	* `long count()`：获得元素的个数
	* `Optional<T> max(Comparator<? super T> comparator)`：获得最大的元素
	* `Optional<T> min(Comparator<? super T> comparator)`：获得最小的元素
	* **例**：获得最大、最小和元素的个数
      ```java
      List<Student> list = StudentData.getStudentList();
      // 需求：获得元素的个数
      long count = StudentData.getStudentList().stream().count();
      System.out.println(count);

      // 需求：获得年龄“最大”的学生
      Student maxStu = list.stream().max((stu1, stu2) -> stu1.getAge() - stu2.getAge()).get();
      System.out.println(maxStu);
      // 需求：获得学生的“最大”年龄
      Integer maxAge = list.stream().map(Student::getAge).max(Integer::compare).get();
      System.out.println(maxAge);

      // 需求：获得年龄“最小”的学生
      Student minStu = list.stream().min((stu1, stu2) -> stu1.getAge() - stu2.getAge()).get();
      System.out.println(minStu);
      // 需求：获得学生的“最小”年龄
      Integer minAge = list.stream().map(Student::getAge).min(Integer::compare).get();
      System.out.println(minAge);
      ```
* 收集（collect）
	* 收集（collect）：把一个流收集起来，最终可以是收集成一个值也可以收集成一个新的集合
	* 调用 `Stream` 接口提供的 `<R, A> R collect(Collector<? super T, A, R> collector);` 方法来实现，参数中的 `Collector` 对象大都是直接通过 `Collectors` 工具类获得，实际上传入的 `Collector` 决定了 `collect()` 的行为
* 归集（toList / toSet / toMap）
	* 因为 `Stream` 流不存储数据，那么在 `Stream` 流中的数据完成处理后，如果需要把 `Stream` 流的数据存入到集合中，那么就需要使用归集的操作
	* 在 `Collectors` 提供的 `toList`、`toSet` 和 `toMap` 比较常用，另外还有 `Collectors` 提供的 `toCollection` 等比较复杂一些的用法
	* **例**：演示 `toList`、`toSet` 和 `toMap` 的实现
      ```java
      List<String> stringList = Arrays.asList("I", "love", "you", "too");
      // 需求：将Stream转化为List集合
      List<String> list = stringList.stream().collect(Collectors.toList());
      System.out.println(list);
      // 需求：将Stream转化为Set集合
      Set<String> set = stringList.stream().collect(Collectors.toSet());
      System.out.println(set);
      // 需求：将Stream转化为Map集合
      // 明确：每个元素以“:”来分割，左边的为key，右边的为value
      Stream<String> stream = Stream.of("张三:成都", "李四:武汉", "王五:重庆");
      Map<String, String> map = stream.collect(Collectors.toMap(str -> str.substring(0, str.indexOf(":")), str -> str.substring(str.indexOf(":") + 1)));
      map.forEach((k, v) -> System.out.println("key：" + k + "，value：" + v));
      ```
	* 将 `Stream` 流中计算的数据转化为 `List` 和 `Set` 集合时，此时并没有明确存储数据对应集合的具体类型，想要明确存储数据对应集合的具体类型，则就需要使用 `toCollection` 来实现
	* **例**：
	* 演示 `toCollection` 的实现
      ```java
      List<String> list = Arrays.asList("I", "love", "you", "too");
      // 需求：将Stream转化为ArrayList集合
      ArrayList<String> arrayList = list.stream().collect(Collectors.toCollection(ArrayList::new));
      System.out.println(arrayList);
      // 需求：将Stream转化为LinkedList集合
      LinkedList<String> linkedList = list.stream().collect(Collectors.toCollection(LinkedList::new));
      System.out.println(linkedList);
      // 需求：将Stream转化为HashSet集合
      HashSet<String> hashSet = list.stream().collect(Collectors.toCollection(HashSet::new));
      System.out.println(hashSet);
      // 需求：将Stream转化为TreeSet集合
      TreeSet<String> treeSet = list.stream().collect(Collectors.toCollection(TreeSet::new));
      System.out.println(treeSet);
      ```
	* 获得年龄大于 18 岁的女同学，然后返回按照年龄进行升序排序后的 `List` 集合
      ```java
      List<Student> list = StudentData.getStudentList();
      ArrayList<Student> arrayList =
      list.stream().filter(stu -> stu.getAge() > 18) // 过滤年龄小于等于18的学生
      .filter(stu -> stu.getSex().equals("女")) // 过滤男性学生
      .sorted(Comparator.comparing(Student::getAge)) // 按照年龄执行升序排序
      .collect(Collectors.toCollection(ArrayList::new)); // 转化为ArrayList存储
      arrayList.forEach(System.out :: println);
      ```
	* 可以使用 `Stream` 提供的 `toArray` 静态方法实现将 `Stream` 转换为数组
	* **例**：将 `Stream` 中计算的数据转化为数组
      ```java
      List<String> list = Arrays.asList("aa", "bb", "cc", "dd");
      // 需求：将Stream转化为数组
      Object[] array = list.stream().toArray();
      System.out.println(Arrays.toString(array));
      // 需求：将Stream转化为“指定类型”的数组
      String[] stringArray = list.stream().toArray(String[]::new);
      System.out.println(Arrays.toString(stringArray));
      ```
* 统计（counting / averaging）
	* `Collectors` 提供了一系列用于数据统计的静态方法：
	* 计数：`counting`
	* 平均值：`averagingInt`、`averagingLong`、`averagingDouble`
	* 最值：`maxBy`、`minBy`
	* 求和：`summingInt`、`summingLong`、`summingDouble`
	* 统计以上所有：`summarizingInt`、`summarizingLong`、`summarizingDouble`
	* **例**：对学生的年龄进行统计
      ```java
      List<Student> list = StudentData.getStudentList();
      // 需求：获得元素的个数
      Long count = list.stream().collect(Collectors.counting());
      System.out.println(count);
      // 需求：获得学生的平均年龄
      Double averAge = list.stream().collect(Collectors.averagingDouble(Student::getAge));
      System.out.println(averAge);
      // 需求：获得最大年龄的学生
      Student stu = list.stream().collect(Collectors.maxBy((stu1, stu2) -> stu1.getAge() - stu2.getAge())).get();
      System.out.println(stu);
      // 需求：获得所有学生年龄之和
      Long sum = list.stream().collect(Collectors.summingLong(Student::getAge));
      System.out.println(sum);
      // 需求：获得年龄的所有的信息
      IntSummaryStatistics collect = list.stream().collect(Collectors.summarizingInt(Student::getAge));
      System.out.println(collect);
      ```
* 分组（groupingBy）
	* 分组（groupingBy）：将 `Stream` 按条件分为两个 `Map`，比如按照学生年龄分为两个 `Map` 集合
	* **例**：按照学生性别分为两个 `Map` 集合
      ```java
      List<Student> list = StudentData.getStudentList();
      // 需求：按照学生性别进行分组
      Map<String, List<Student>> map = list.stream().collect(Collectors.groupingBy(Student::getSex));
      map.forEach((k, v) -> System.out.println("key：" + k + "，value：" + v));
      ```
* 接合（joining）
	* 接合（joining）：把 `Stream` 计算的数据按照一定的规则进行拼接
	* **例**：获得所有学生的名字拼接成一个字符串
      ```java
      List<Student> list = StudentData.getStudentList();
      // 需求：将所有学生的姓名连接成一个字符串，每个名字之间以“,”连接
      String allName = list.stream().map(Student::getName).collect(Collectors.joining(", "));
      System.out.println(allName);
      ```
