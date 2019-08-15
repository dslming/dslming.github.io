### 边缘检测

#### 1、Canny
Canny 边缘检测方法常被誉为边缘检测的最优方法。
**步骤:**
1. 噪声去除
由于边缘检测很容易受到噪声影响，因此 第一步使用5×5的高斯滤波器去除噪声。

2. 计算图像梯度
对平滑后的图像利用Sobel算子计算水平方向和竖直方向的一阶导数(图像梯度,Gx和Gy)。根据得到的这两幅梯度图(Gx和Gy) 找到边界的梯度和方向。计算梯度与方向的公式与之前相同，这里就不再赘述。梯度的方向一般与边界垂直，其一般被归为 4类：垂直、水平、和两个对角线方向。

3. 非极大值抑制
得到梯度方向和大小后，应该对图像做一个整体扫描，去除那些非边界上的点。具体做法是对每一个像素进行检查，看这个点 的梯度是不是周围具有相同梯度方向的点中最大的。

4. 滞后阈值
现在需要确定哪些边界是真正的边界。需要设定两个阈值：minVal、maxVal。当图像的灰度梯度高于maxVal时，认为是真正的边界， 小于minVal时认为不是边界。介于两者之间时，若其与某个被确定为真正边界的点相连，则认为它是边界点，否则不是。

**实现:**
```python
# coding=utf-8
import numpy as np
import cv2
def nothing(x):
    pass
img = cv2.imread("E:\\bin.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
minVal = 100
maxVal = 200
switch = 1
result = gray
cv2.namedWindow("Canny Test")
cv2.createTrackbar('minVal', 'Canny Test', minVal, 255, nothing)
cv2.createTrackbar('maxVal', 'Canny Test', maxVal, 255, nothing)
cv2.createTrackbar('0:Off 1:On', 'Canny Test', switch, 1, nothing)
while 1:
    cv2.imshow('Canny Test', result)
    k = cv2.waitKey(1) & 0xff
    if k == 27:
        break
    maxVal = cv2.getTrackbarPos('maxVal', 'Canny Test')
    switch = cv2.getTrackbarPos('0:Off 1:On', 'Canny Test')
    if switch == 1:
        # 第一个参数是待处理的图像
        # 第二个参数是最小阈值minVal
        # 第三个参数是最大阈值maxVal
        # 第四个参数是Sobel算子卷积核大小，默认为3，可省略
        # 第五个参数是L2Gradient，用于设定求梯度大小的方程。如果为True，则用开根号的那个，否则用绝对值的那个，默认为False，可省略
        result = cv2.Canny(gray, minVal, maxVal)
    else:
        result = gray
cv2.destroyAllWindows()
```
