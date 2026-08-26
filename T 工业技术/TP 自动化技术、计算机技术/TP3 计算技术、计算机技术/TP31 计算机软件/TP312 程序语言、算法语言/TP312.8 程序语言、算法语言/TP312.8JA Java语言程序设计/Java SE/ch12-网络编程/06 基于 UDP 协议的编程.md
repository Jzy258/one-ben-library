* UDP 协议编程概述
	* 在 UDP 通信协议下，两台计算机之间进行数据交互，不需要先建立连接，发送端直接往指定的 IP 和端口上发送数据即可，但是不能保证数据一定能让对方收到，也不能确定什么时候可以送达
	* `java.net.DatagramSocket` 类和 `java.net.DatagramPacket` 类是 UDP 编程中需要使用的两个类，并且发送端和接收端都需要使用，且发送端与接收端是两个独立的运行程序
	* `DatagramSocket`：负责接收和发送数据，创建接收端时需要指定端口号
	* `DatagramPacket`：负责把数据打包，创建发送端时需指定接收端的 IP 地址和端口
* `DatagramSocket` 类
	* `DatagramSocket` 类用于接收和发送数据，需指定端口号
	* 构造方法：
	* `DatagramSocket()`：创建发送端的数据报套接字
	* `DatagramSocket(int port)`：创建接收端的数据报套接字，并指定端口号
	* 实例方法：
	* `void send(DatagramPacket p)`：发送数据报
	* `void receive(DatagramPacket p)`：接收数据报
	* `void close()`：关闭数据报套接字
* `DatagramPacket` 类
	* `DatagramPacket` 类负责把发送的数据打包（打包的数据为 `byte` 数组），需指定接收端的 IP 地址和端口
	* 构造方法：
	* `DatagramPacket(byte buf[], int offset, int length)`：创建接收端的数据报
	* `DatagramPacket(byte buf[], int offset, int length, InetAddress address, int port)`：创建发送端的数据报，并指定接收端的 IP 地址和端口号
	* 实例方法：
	* `synchronized byte[] getData()`：返回数据报中存储的数据
	* `synchronized int getLength()`：获得发送或接收数据报中的长度
* 基于 UDP 编程的实现
	* 接收端：
	* 创建 `DatagramSocket` 对象（接收端），并指定端口号
	* 创建 `DatagramPacket` 对象（数据报）
	* 调用 `receive()` 方法，用于接收数据报
	* 调用 `close()` 方法关闭资源
	* 发送端：
	* 创建 `DatagramSocket` 对象（发送端）
	* 创建 `DatagramPacket` 对象（数据报），并指定接收端 IP 地址和端口
	* 调用 `send()` 方法，用于发送数据报
	* 调用 `close()` 方法关闭资源
