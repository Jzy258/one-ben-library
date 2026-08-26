* 常用属性
	* `static final PrintStream err`：标准错误输出流，输出红色字体
	* `static final InputStream in`：标准输入流
	* `static final PrintStream out`：标准输出流
* 常用方法
	* `static void gc()`：建议启动垃圾回收器
	* `static native long nanoTime()`：获取自 `1970-1-1 00:00:00 000000000` 到当前时间的纳秒数
	* `static java.util.Map<String,String> getenv()`：获取系统环境变量
	* `static Properties getProperties()`：获取系统属性
	* `static String getProperty(String key)`：根据属性名获取系统属性
