* `cv2`：
	* **本质**：OpenCV 的 Python 接口模块
	* Python 包：
		* `opencv-python`（主模块）、`opencv-contrib-python`（社区贡献超集）
* `cv2.imread(filename[, flags])`：
	* **作用**：读取图像
	* **参数**：
		* `filename`：图像文件路径，字符串
		* `flags`：
			* 读取模式，默认为 `cv2.IMREAD_COLOR`
	* **返回值**：
		* 成功返回 Numpy 数组
		* 失败返回 `None`（静默失败）
* `cv2.rectangle(img, pt1, pt2, color, thickness)`：
	* **作用**：绘制矩形
	* **参数**：
		* `img`：输入图像 Numpy 数组
		* `pt1`：一个对角的坐标，像素的 `(x, y)`
		* `pt2`：另一个对角的坐标，像素的 `(x, y)`
		* `color`：颜色，BGR 顺序的元组
		* `thickness`：线宽，整数，默认为 `1`
			* 负值：实心，填充颜色
* `cv2.line(img, pt1, pt2, color, thickness)`：
	* **作用**：绘制直线
	* **参数**：
		* `img`：输入图像 Numpy 数组
		* `pt1`：起点坐标，像素的 `(x, y)`
		* `pt2`：终点坐标，像素的 `(x, y)`
		* `color`：颜色，BGR 顺序的元组
		* `thickness`：线宽，整数，默认为 `1`
* `cv2.circle(img, center, radius, color, thickness)`：
	* **作用**：绘制圆
	* **参数**：
		* `img`：输入图像 Numpy 数组
		* `center`：圆心坐标，像素的 `(x, y)`
		* `radius`：半径，整数
		* `color`：颜色，BGR 顺序的元组
		* `thickness`：线宽，整数，默认为 `1`
			* 负值：实心，填充颜色
* `cv2.imwrite(filename, img)`：
	* **作用**：将图像保存到磁盘
	* **参数**：
		* `filename`：
			* 保存路径，字符串；扩展名决定格式
		* `img`：要保存的图像
	* **返回值**：
		* 成功返回 `True`
		* 失败返回 `False`（静默失败）
* `cv2.ellipse(img, center, axes, angle, startAngle, endAngle, color, thickness)`：
	* **作用**：绘制弧线
	* **参数**：
		* `img`：输入图像
		* `center`：圆 / 椭圆中心
		* `axes`：半轴长度，`(长半轴, 短半轴)`
		* `angle`：椭圆旋转角度，圆通常为 0
		* `startAngle`：起始角，单位度
		* `endAngle`：结束角，单位度
		* `color`、`thickness` 同上
