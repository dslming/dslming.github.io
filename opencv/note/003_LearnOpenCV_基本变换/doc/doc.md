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
