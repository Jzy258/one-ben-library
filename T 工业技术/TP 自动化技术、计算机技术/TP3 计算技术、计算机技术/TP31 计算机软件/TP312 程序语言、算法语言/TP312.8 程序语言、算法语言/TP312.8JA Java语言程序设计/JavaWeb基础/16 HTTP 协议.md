协议：
* 一套规范 / 标准
* 遵守协议可以实现标准化

HTTP 协议：
* W3C 制定的超文本传输协议
	* 通信协议：发送消息的模板
	* W3C：
	    - 万维网联盟组织
	    - 负责制定标准：HTTP、HTML 4.0、HTML5、XML、DOM 等规范
    - 万维网之父：蒂姆·伯纳斯·李
* 超文本：
	* 非普通文本，如流媒体：声音、视频、图片等
    - 遵守 HTTP 协议不但可以传送普通字符串，同样支持传递声音、视频、图片等流媒体信息
    - B 和 S 同时遵循 HTTP 协议可以达成解耦合：互相不依赖
* HTTP 协议包括：
	* 请求协议：
		* B 向 S 发送数据时遵循的标准，规定了发送的数据具体格式
    - 响应协议
		* S 向 B 发送数据时遵循的标准，规定了发送的数据具体格式

请求协议（B -> S）：
* 包括 4 部分
	- 请求行
	- 请求头
	- 空白行
	- 请求体

查看协议报文内容：
* F12 -> network

HTTP 请求协议的具体报文（GET 请求）：
```
GET /schrant/?username=schrant HTTP/1.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br, zstd 
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,ja;q=0.5 
Connection: keep-alive 
Cookie: Webstorm-6c8ac0cd=f6e559c5-906b-4fe1-aaf5-020edd5a38cd; Idea-92bb2405=315b4771-743b-42e7-8397-03ab6c17e2ad 
Host: localhost:8080 Referer: http://localhost:8080/schrant/? 
Sec-Fetch-Dest: document 
Sec-Fetch-Mode: navigate 
Sec-Fetch-Site: same-origin 
Sec-Fetch-User: ?1 
Upgrade-Insecure-Requests: 1 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0 
sec-ch-ua: "Chromium";v="134", "Not:A-Brand";v="24", "Microsoft Edge";v="134" 
sec-ch-ua-mobile: ?0 
sec-ch-ua-platform: "Windows"
```

HTTP 请求协议的具体报文（POST 请求）：
```
POST /schrant/ HTTP/1.1 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7 
Accept-Encoding: gzip, deflate, br, zstd 
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,ja;q=0.5 
Cache-Control: max-age=0 
Connection: keep-alive 
Content-Length: 16 
Content-Type: application/x-www-form-urlencoded 
Cookie: Webstorm-6c8ac0cd=f6e559c5-906b-4fe1-aaf5-020edd5a38cd; Idea-92bb2405=315b4771-743b-42e7-8397-03ab6c17e2ad 
Host: localhost:8080 
Origin: http://localhost:8080 
Referer: http://localhost:8080/schrant/ 
Sec-Fetch-Dest: document 
Sec-Fetch-Mode: navigate 
Sec-Fetch-Site: same-origin 
Sec-Fetch-User: ?1 
Upgrade-Insecure-Requests: 1 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0 
sec-ch-ua: "Chromium";v="134", "Not:A-Brand";v="24", "Microsoft Edge";v="134" 
sec-ch-ua-mobile: ?0 
sec-ch-ua-platform: "Windows"
```

请求报文详解：
- 请求行
	* 请求方式：
		* `GET`（常用的）
        - `POST`（常用的）
        - `DELETE`
        - `PUT`
        - `HEAD`
        - `OPTIONS`
        - `TRACE`
	* URI（统一资源标识符）：
		* 网络中某个资源的名字，无法用于定位资源
        - URL（统一资源定位符）：网络中的某个资源，可以通过 URL 定位到该资源
        *  URL 包括 URI，如：
	        - URL：http://localhost:8080/schrant/
	        - URI：/schrant/
	* HTTP协议版本号
- 请求头
	* 请求的主机
    - 主机的端口
    - 浏览器信息
    - 平台信息
    - Cookie 等信息
    - ...
* 空白行
	* 分隔请求头和请求体
* 请求体
	* 向服务器发送的具体数据

响应协议（S -> B）：
* 状态行
* 响应头
* 空白行
* 响应体

HTTP 响应协议报文：
```
HTTP/1.1 200 ok
Accept-Ranges: bytes 
ETag: W/"373-1743341964684" 
Last-Modified: Sun, 30 Mar 2025 13:39:24 GMT 
Content-Type: text/html 
Content-Length: 373 
Date: Sun, 30 Mar 2025 13:39:30 GMT 
Keep-Alive: timeout=20 
Connection: keep-alive

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My first webapp here</title>
</head>
<body>
    <h1>My First Webapp</h1>
    <a href="/schrant/user-list">Users</a>
    <form>
        <label>
            用户名
            <input type="text" name="username" />
            <input type="submit" />
        </label>
    </form>
</body>
</html>
```

响应报文详解：
- 状态行
	* 协议版本号（HTTP/1.1）
	* 状态码（HTTP 协议中规定的响应状态号，对应不同的响应结果）：
		* 200：请求响应成功，正常结束
        - 404：访问的资源不存在，通常因为路径写错或服务器中对应的资源启动失败
        - 405：前端发送的请求方式与后端请求的处理方式不一致，如：
	        - 前端是 POST 请求，后端按照 GET 方式处理
			* 前端是 GET 请求，后端按照 POST 方式处理
        - 500：服务器端程序出现异常
        - 以 4 开始的一般是浏览器端错误；以 5 开始的一般是服务器端错误
	* 状态的描述信息，如：
		* ok：表示正常成功结束
        - not found：表示资源找不到
- 响应头：
	- 响应的内容类型
    - 响应的内容长度
    - 响应的时间
    - ...
- 空白行：
	- 分隔响应头和响应体
- 响应体：
	- 响应的正文，是一个长的字符串，被浏览器渲染、解释并执行，最终展示出效果

向服务器发送 GET 请求或 POST 请求：
* 发送 POST 请求：使用 `<form method="post">` 表单
* 其他所有情况都是 GET 请求，包括：
	* 在浏览器地址栏直接输入 URL 访问
    - 点击超链接
    - 使用 `<form>` 表单（未设置 `method` 属性）提交数据
    - 使用 `<form method="get">`
    - ...

GET 请求和 POST 请求的区别：
* GET 请求在请求行上发送数据（数据会挂在 URI 后面，用 `?` 分隔，导致发送的数据回显在浏览器的地址栏上）
* POST 请求在请求体中发送数据
- GET 请求只能发送普通的字符串，且有长度限制，不同的浏览器限制不同，无法发送大数据量
* POST 请求可以发送任何类型的数据，可以发送大数据量，理论上没有长度限制
* GET 请求比较适合从服务器端获取数据
* POST 请求比较适合向服务器端传送数据
* GET 请求是安全的：从服务器上获取数据，不会对服务器造成威胁
* POST 请求是不安全的：向服务器提交数据，如果这些数据通过后门进入服务器，服务器则不安全；另外 POST 提交数据，一般拦截请求大部分会选择拦截（监听）POST 请求
* GET 请求支持缓存
    - GET 请求的响应结果会被浏览器缓存起来，在浏览器缓存当中每一个 GET 请求的路径对应一个资源
    - 每次发送 GET 请求，浏览器先从本地浏览器缓存中找，找不到才会从服务器获取，目的是提高用户体验
    - 希望每一次 GET 请求都从服务器获取，不从缓存中取：
	    - 实现每一次 GET 请求的请求路径不同
	    - 可以在路径后添加一个时间戳，这样每一次的请求路径都不一样
* POST 请求不支持缓存（POST 用于修改服务器端资源）

GET 请求和 POST 请求如何选择：
* 目的是获取服务器端的数据，还是向服务器发送数据
	* 从服务器上获取资源：GET 请求
	* 向服务器提交数据：POST 请求
* 大部分 `<form>` 提交都是 POST 方式，因为要填写大量的数据传给服务器
* 如果表单中有敏感信息，建议使用 POST 请求，因为 GET 请求会将敏感信息回显到浏览器地址栏
* 文件上传一定是 POST 请求
* 其他情况都可以使用 GET 请求

GET 请求和 POST 请求的数据格式是完全相同的，但是位置不同
* 格式：`name=value&name=value&name=value&name=value`
	* `name`：`<form>` 表单中 `<input>` 标签的 `name` 属性
	* `value`：`<form>` 表单中 `<input>` 标签的 `value` 属性

GET 请求是安全的，从服务器获取数据
POST 请求是危险的，向服务器提交数据，危险数据可能通过后门进入服务器
一般会选择拦截 POST 请求

GET 支持缓存
* 任何 GET 请求的响应结果都会被浏览器缓存，每一个 GET 请求的路径对应一个资源
* 每次发送 GET 请求后，浏览器都会先从本地缓存中寻找，找不到再从服务器获取
* 需求：每次发送 GET 请求都从服务器获取，不从本地缓存中查找
	* 可以在每次发送的请求后添加不同的查询信息（如发送请求时的系统毫秒数，及时间戳）
POST 不支持缓存
* POST 请求响应结果的缓存没有意义

GET 和 POST 如何选择：
* 从服务器获取数据一般使用 GET，向服务器提交数据一般使用 POST
* 大部分 `<form>` 表单提交采用 POST 方式
* 如果表单中有敏感信息，建议使用 POST，因为 GET 会将信息回显在浏览器地址栏
* 文件上传使用 POST

GET 请求和 POST 请求发送数据的位置不同，但格式相同：
* `name=value&name=value...`
* `name` 对应 `<form>` 表单中 `<input>` 的 `name` 属性
* `value` 对应 `<form>` 表单中 `<input>` 的 `value` 属性

