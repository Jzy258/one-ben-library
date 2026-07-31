后端 Servlet 中设置响应内容类型为 XML：
```java
response.setContentType("text/xml");
```

前端接收 XML 字符串：
```js
let respDoc = this.responseXML;
```
* 返回类型为 XML 文档

访问 XML 数据：
```js
let elements =  respDoc.getElementsByTagName(string);
```

