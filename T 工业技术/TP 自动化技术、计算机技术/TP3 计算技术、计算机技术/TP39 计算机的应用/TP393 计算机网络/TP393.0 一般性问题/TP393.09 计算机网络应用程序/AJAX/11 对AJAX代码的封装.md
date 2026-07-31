目的：减少重复代码

封装目标选择器：
```js
function jQuery(selector) {  
    switch(selector.charAt(0)) {  
        case "#": {  
            return document.getElementById(selector.substring(1));  
        }  
        case ".": {  
            return document.getElementsByClassName(selector.substring(1));  
        }  
    }  
}
```

封装页面加载回调函数：
```js
window.onload = selector;
```

封装 `innerHTML` 属性：
```js
this.html = function (html) {  
    domObj.innerHTML = html;  
}
```

封装事件函数：
```js
this.click = function (func) {  
    domObj.onclick = func;  
}
```

封装 `value` 属性：
```js
this.val = function (val) {  
    if (val === undefined) {  
        return domObj.value;  
    } else {  
        domObj.value = val;  
    }  
}
```

封装 AJAX：
```js
jQuery.ajax = function (args) {  
    console.log(args);  
    xhr = new XMLHttpRequest();  
    xhr.onreadystatechange = function () {  
        if (xhr.readyState === 4) {  
            if (xhr.status === 200) {  
                let jsonObj = JSON.parse(xhr.responseText);  
                console.log(jsonObj);  
                args.success(jsonObj);  
            }  
        }  
    }  
    if (args.method.toUpperCase() === "GET") {  
        xhr.open("GET", args.url + "?" + args.data, args.async || true);  
        xhr.send();  
    }  
    if (args.method.toUpperCase() === "POST") {  
        xhr.open("POST", args.url, args.async || true);  
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
        xhr.send(args.data);  
    }  
}
```

