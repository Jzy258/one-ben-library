---
title: '18 HttpServlet源码分析'
---

# 18 HttpServlet源码分析

`HttpServlet` 是专门为 HTTP 协议准备的，比 `GenericServlet` 更适合 HTTP 协议下的开发

`HttpServlet` 在 `jakarta.servlet.http.HttpServlet` 包下

`http` 包中的常用类和接口：
* `jakarta.servlet.http.HttpServlet`（抽象类）
* `jakarta.servlet.http.HttpServletRequest`（请求对象）
* `jakarta.servlet.http.HttpServletResponse`（响应对象）

`HttpServletRequest`（`request` 对象）中封装了请求协议的全部内容
* Tomcat 将请求协议中的数据解析出来，全部封装到 `request` 对象中

`HttpServletResponse`（`response` 对象）响应 HTTP 协议到浏览器

```java
public class MyHttpServlet extends HttpServlet {  
	// 用户第一次发送请求则调用该无参构造方法，创建Servlet对象
    public MyHttpServlet() {  
    }
}

public abstract class GenericServlet 
	implements Servlet, ServletConfig, Serializable {

	// 若用户没有重写init方法，则创建Servlet对象后调用该方法
	public void init(ServletConfig config) throws ServletException {  
	    this.config = config;  
	    this.init();  
	}

	// 间接调用了该方法
	public void init() throws ServletException {  
	}
}

public abstract class HttpServlet extends GenericServlet {
	// 若用户没有重写service方法，则每一次发送请求都会调用该方法
	// 重写了GenericServlet的抽象service方法
	public void service(ServletRequest req, ServletResponse res) 
		throws ServletException, IOException {
	    HttpServletRequest request;  
	    HttpServletResponse response;  
	    try {  
		    // 将ServletRequest和ServletResponse强转为HttpServletRequest和HttpServletResponse
	        request = (HttpServletRequest)req;  
	        response = (HttpServletResponse)res;  
	    } catch (ClassCastException var6) {  
	        throw new ServletException(lStrings.getString("http.non_http"));  
	    }  
	    // 调用HttpServlet重载的service方法
	    this.service(request, response);  
	}

	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {  
	    String method = req.getMethod();  
	    if (method.equals("GET")) {  
	        long lastModified = this.getLastModified(req);  
	        if (lastModified == -1L) {  
	            this.doGet(req, resp);  
	        } else {  
	            long ifModifiedSince;  
	            try {  
	                ifModifiedSince = req.getDateHeader("If-Modified-Since");  
	            } catch (IllegalArgumentException var9) {  
	                ifModifiedSince = -1L;  
	            }  
	  
	            if (ifModifiedSince < lastModified / 1000L * 1000L) {  
	                this.maybeSetLastModified(resp, lastModified);  
	                this.doGet(req, resp);  
	            } else {  
	                resp.setStatus(304);  
	            }  
	        }  
	    } else if (method.equals("HEAD")) {  
	        long lastModified = this.getLastModified(req);  
	        this.maybeSetLastModified(resp, lastModified);  
	        this.doHead(req, resp);  
	    } else if (method.equals("POST")) {  
	        this.doPost(req, resp);  
	    } else if (method.equals("PUT")) {  
	        this.doPut(req, resp);  
	    } else if (method.equals("DELETE")) {  
	        this.doDelete(req, resp);  
	    } else if (method.equals("OPTIONS")) {  
	        this.doOptions(req, resp);  
	    } else if (method.equals("TRACE")) {  
	        this.doTrace(req, resp);  
	    } else if (method.equals("PATCH")) {  
	        this.doPatch(req, resp);  
	    } else {  
	        String errMsg = lStrings.getString("http.method_not_implemented");  
	        Object[] errArgs = new Object[1];  
	        errArgs[0] = method;  
	        errMsg = MessageFormat.format(errMsg, errArgs);  
	        resp.sendError(501, errMsg);  
	    }  
	  
	}
}
```
* 可以根据需要的请求类型重写方法，使用未重写的请求类型将会 405 报错
* 405 错误是前端类型错误，表示使用了错误的请求方式

