将 `open()` 方法的 `method` 参数设为 `"POST"`

在 `send()` 方法中添加参数，格式为：
* `"name1=value1&name2=value2"`

在 `open()` 方法后添加 `XMLHttpRequest#setRequestHeader("Content Type", "application/x-www-form-urlencoded");`，设置请求头的内容类型为表单数据

