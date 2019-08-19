```python
# coding=utf-8
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread("E:\\harris04.jpg")

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 由于Harris算子需要float32的输入图像，因此转换一下数据格式
gray = np.float32(gray)

# Harris算子
# 第一个参数是输入图像，数据类型为float32
# 第二个参数是角点检测中要考虑的领域大小
# 第三个参数是Sobel求导(Ix、Iy)时使用的窗口大小
# 第四个参数是Harris角点检测方程中的自由参数，0.04 - 0.06
dst = cv2.cornerHarris(gray, 2, 3, 0.04)

# 直接在原图上修改，也可以重新复制一份
# 0.01是人为设定的阈值
img[dst > 0.01 * dst.max()] = [0, 0, 255]

plt.imshow(dst, cmap='gray')
cv2.imshow("harris", img)
plt.show()
cv2.waitKey(0)
```
