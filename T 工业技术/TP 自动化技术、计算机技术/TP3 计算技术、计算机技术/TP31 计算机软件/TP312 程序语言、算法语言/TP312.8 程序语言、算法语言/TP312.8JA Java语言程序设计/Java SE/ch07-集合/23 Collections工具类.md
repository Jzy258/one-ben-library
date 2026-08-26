* `static <T extends Comparable<? super T>> void sort(List<T> list)`：排序
* `static <T> void sort(List<T> list, Comparator<? super T> c)`：使用指定比较器的排序
* `static void shuffle(List<?> list)`：混排，打乱顺序
* `static void reverse(List<?> list)`：反转
* `static <T> void fill(List<? super T> list, T obj)`：替换所有元素
