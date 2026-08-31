* PowerShell 与 CMD 的区别：
	* CMD：
		* 一切都是文本
		* 管道传输字符串
	* PowerShell：
		* 一切都是对象
		* 管道传输对象
* cmdlet：
	* **结构**：
		* 动词 + 名词
* 常用 CMD - PS 对照表：
	* `dir`  = `Get-ChildItem`
		* = `ls` = `gci`
	* `cd` = `Set-Location`
		* = `sl` = `cd`
	* `cls` = `Clear-Host`
	* `copy` = `Copy-Item`
	* `del` = `Remove-Item`
	* `move` = `Move-Item`
	* `type` = `Get-Content`
		* = `cat`
	* `echo` = `Write-Output`
	* `findstr` = `Select-String`
		* = `sls`
	* `tasklist` = `Get-Process`
		* = `ps` = `gps`
	* `taskkill` = `Stop-Process`
		* = `kill`
	* `set` = `Get-ChildItem Env:`
* `Get-Command`：
	* 列出所有命令
	* `-Name`：
		* 筛选名称中包含指定内容的命令
		* 支持通配符
* `Get-Help`：
	* 查询命令帮助
* `Get-Process`：
	* 查询正在运行的进程
	* `-Id`：
		* 筛选指定 PID
	* `$PID`：
		* 获取当前进程的 PID
* `Get-Member`：
	* 查询进程对象的属性 / 方法
* `Where-Object`：
	* 按条件筛选对象