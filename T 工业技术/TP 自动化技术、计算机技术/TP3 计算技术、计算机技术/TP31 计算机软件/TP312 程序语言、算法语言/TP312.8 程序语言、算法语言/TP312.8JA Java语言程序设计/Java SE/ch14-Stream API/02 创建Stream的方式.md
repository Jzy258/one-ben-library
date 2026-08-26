---
title: '02 创建Stream的方式'
---

# 02 创建Stream的方式

* 通过 Collection 接口提供的方法
	* 通过 `Collection` 接口提供的 `stream()` 方法来创建 Stream 流
      ```java
      List<String> list = Arrays.asList("aa", "bb", "cc");
      Stream<String> stream = list.stream();
      ```
* Arrays 类提供的方法
	* 通过 `Arrays` 类提供的 `stream()` 静态方法来创建 Stream 流
      ```java
      String[] arr1 = {"aa", "bb", "cc"};
      Stream<String> stream = Arrays.stream(arr1);

      int[] arr2 = {11, 22, 33, 44};
      IntStream intStream = Arrays.stream(arr2);

      long[] arr3 = {11, 22, 33, 44};
      LongStream longStream = Arrays.stream(arr3);

      double[] arr4 = {1.0, 2.0, 3.0};
      DoubleStream doubleStream = Arrays.stream(arr4);
      ```
	* `Stream`、`IntStream`、`LongStream` 和 `DoubleStream` 都继承于 `BaseStream` 接口
* Stream 接口提供的方法
	* 通过 `Stream` 接口提供的 `of(T... values)` 静态方法来创建 Stream 流
      ```java
      Stream<String> stringStream = Stream.of("aa", "bb", "cc");
      Stream<Integer> integerStream = Stream.of(11, 22, 33, 44);
      ```
* 顺序流和并行流
	* 上述获得 `Stream` 对象的方式称为 “顺序流”，顺序流对 `Stream` 元素的处理是单线程的，即一个一个元素进行处理，处理数据的效率较低
	* 如果 Stream 流中的数据处理没有顺序要求，并且还希望可以并行处理 `Stream` 的元素，那么就可以使用 “并行流” 来实现，从而提高处理数据的效率
	* 一个普通 `Stream` 转换为可以并行处理的 `Stream` 需要调用 `Stream` 提供的 `parallel()` 方法进行转换，从而并行地处理 `Stream` 的元素，不需要编写任何多线程代码就可以实现并行处理带来的执行效率的提升
	* `isParallel()`：判断 Stream 流是否为并行流
	* `parallel()` 方法返回的就是 “方法的调用者对象”，没有创建新的对象
	* **例**：把顺序流转化为并行流
      ```java
      // 创建一个“顺序流”Stream对象
      Stream<String> stream = Stream.of("aa", "bb", "cc");
      // 验证：stream是否为并行流
      System.out.println(stream.isParallel());         // 输出：false
      // 将Stream对象转化为“并行流”
      Stream<String> parallelStream = stream.parallel();
      System.out.println(stream == parallelStream);    // 输出：true
      // 验证：stream是否为并行流
      System.out.println(stream.isParallel());         // 输出：true
      ```
	* 在 `Collection` 接口中，还专门提供了一个 `parallelStream()` 方法，用于获得一个并行流
	* **例**：使用 `parallelStream()` 方法获得一个并行流
      ```java
      List<String> list = Arrays.asList("aa", "bb", "cc");
      // 创建一个“并行流”Stream对象
      Stream<String> stream = list.parallelStream();
      // 验证：stream是否为并行流
      System.out.println(stream.isParallel()); // 输出：true
      ```
