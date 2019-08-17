> v0.0.1 2019/9/15 DSLMing
> 首次创作
>
> 感谢:
> http://ex2tron.wang/opencv-python-image-thresholding/
>https://zhaoxuhui.top//blog/2017/05/17/%E5%9F%BA%E4%BA%8EPython%E7%9A%84OpenCV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%866.html

#### 1、分水岭分割
```python
# coding=utf-8
import cv2
import numpy as np
from matplotlib import pyplot as plt

# 打开影像
img = cv2.imread("E:\\coins.jpg")
# 转换为灰度图
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 阈值+反色操作
# 注意将两个操作放在一起的用法
ret, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU + cv2.THRESH_BINARY_INV)

# 进行开运算操作，去除噪声
kernel = np.ones((3, 3), np.uint8)
open = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=2)

# 膨胀操作获取背景
sure_bg = cv2.dilate(open, kernel, iterations=3)

# 距离变换+阈值获取前景
# 距离变换第一个参数是输入图像
# 第二个参数是距离类型
# 第三个参数是范围大小
distance_transform = cv2.distanceTransform(open, cv2.DIST_L2, 5)
# 注意获取某幅图像最大值max()的用法
ret, sure_fg = cv2.threshold(distance_transform, 0.7 * distance_transform.max(), 255, cv2.THRESH_BINARY)

# 背景、前景相减，得到未知区域
sure_fg = np.uint8(sure_fg)
unknown = cv2.subtract(sure_bg, sure_fg)

# 标记图像
ret, markers1 = cv2.connectedComponents(sure_fg)
markers = markers1 + 1
# 注意这种简便用法
# markers和unknown是规模相等的两个矩阵
# 如果unknown某个元素为255，则在markers对应位置上的元素赋为0
markers[unknown == 255] = 0

# 调用分水岭算法
markers3 = cv2.watershed(img, markers)
# 注意OpenCV读取的图像顺序是BGR
# OpenCV中将分水岭边界标记为-1
img[markers3 == -1] = [0, 0, 255]

# 展示结果
plt.imshow(markers3, cmap='jet')
cv2.imshow("result", img)
plt.show()
cv2.waitKey(0)
```
