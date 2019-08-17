> v0.0.1 2019/9/14 DSLMing
> 首次创作
>
> 感谢:
> https://zhaoxuhui.top//blog/2017/05/07/%E5%9F%BA%E4%BA%8EPython%E7%9A%84OpenCV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%865.html
> 放射变换: http://www.opencv.org.cn/opencvdoc/2.3.2/html/doc/tutorials/imgproc/imgtrans/warp_affine/warp_affine.html


#### 1、几何变换
原始图像:
<img src="msb.png">

**缩放:**
```python
img = cv2.imread("msb.png")
height, width = img.shape[:2]
resize_res = cv2.resize(img, (2 * width, 2 * height), interpolation=cv2.INTER_CUBIC)
```
<img src="resize.png">

**平移:**
```python
# 建立一个M矩阵，表示沿x方向平移100像素，沿y方向平移50像素
M = np.float32([[1, 0, 100], [0, 1, 50]])
# 三个参数依次为输入图像、平移矩阵以及输出图像大小
move_res = cv2.warpAffine(img, M, (img.shape[1], img.shape[0]))
```
<img src="move_res.png">

**旋转:**
```python
# 第一个参数是旋转中心，这里设置为图片中心
# 第二个参数是旋转角度
# 第三个参数是旋转后的缩放因子
# 可以通过设置这三个参数来控制旋转后超出边界的问题
M = cv2.getRotationMatrix2D((width / 2, height / 2), 45, 0.6)
rotat_res = cv2.warpAffine(img, M, (img.shape[1], img.shape[0]))
```
<img src="rotat_res.png">

**仿射变换:**
```python
pts1 = np.float32([[50, 50], [200, 50], [50, 200]])
pts2 = np.float32([[10, 100], [200, 50], [100, 250]])
M = cv2.getAffineTransform(pts1, pts2)
radiation_res = cv2.warpAffine(img, M, (img.shape[1], img.shape[0]))
```
<img src="radiation_res.png">

**透视变换:**
```python
pts1 = np.float32([[56, 65], [368, 52], [28, 387], [389, 390]])
pts2 = np.float32([[0, 0], [300, 0], [0, 300], [300, 300]])
M = cv2.getPerspectiveTransform(pts1, pts2)
perspective_res = cv2.warpPerspective(img, M, (img.shape[1], img.shape[0]))
```
<img src="perspective_res.png">


> 全文结束

#### 2、距离变换
图像距离变换是二值化图像处理与操作中的常用手段， 其主要思想是通过标识空间点(目标点与背景点)距离，将二值化图像转换为灰度图像。 可用于骨架提取、图像窄化等等。它的结果是得到一张与输入影像类似的灰度图像， 但是灰度值只出现在前景区域，并且离物体边缘越远的像素灰度值越大。
```python
# 调用距离变换函数
# 第一个参数是二值化图像
# 第二个参数是类型distanceType
# 第三个参数是maskSize
# 返回的结果是一张灰度图像，但注意这个图像直接采用OpenCV的imshow显示是有问题的
# 所以采用Matplotlib的imshow显示或者对其进行归一化再用OpenCV显示
dist = cv2.distanceTransform(binary, cv2.DIST_L2, 5)
```


#### 3、霍夫变换
**标准直线变换:**
```python
# 参数1：要检测的二值图（一般是阈值分割或边缘检测后的图）
# 参数2：距离r的精度，值越大，考虑越多的线
# 参数3：角度θ的精度，值越小，考虑越多的线
# 参数4：累加数阈值，值越小，考虑越多的线
drawing = np.zeros(img.shape[:], dtype=np.uint8)
lines = cv2.HoughLines(edges, 0.8, np.pi / 180, 90)
```

**统计概率直线变换:**
```python
drawing = np.zeros(img.shape[:], dtype=np.uint8)
# minLineLength：最短长度阈值，比这个长度短的线会被排除
# maxLineGap：同一直线两点之间的最大距离
lines = cv2.HoughLinesP(edges, 0.8, np.pi / 180, 90, minLineLength=50, maxLineGap=10)
```

**圆变换:**
```python
drawing = np.zeros(img.shape[:], dtype=np.uint8)
# 2.霍夫圆变换
circles = cv2.HoughCircles(edges, cv2.HOUGH_GRADIENT, 1, 20, param2=30)
circles = np.int0(np.around(circles))
```
