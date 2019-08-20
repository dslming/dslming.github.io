重点:
- findContours 的输入是二值图像
- findContours 的输出是二值图像

#### 1、找到轮廓
```python
import numpy as np
import cv2 as cv
im = cv.imread('test.png')
imgray = cv.cvtColor(im, cv.COLOR_BGR2GRAY)
ret, thresh = cv.threshold(imgray, 127, 255, 0)
# 返回值 contours 是一个列表, 每个列表是包含完整轮廓的(x,y)坐标
contours, hierarchy = cv.findContours(thresh, cv.RETR_TREE,
                                      cv.CHAIN_APPROX_SIMPLE)
print(len(contours)) # 6,包含 6条轮廓
print(contours[0].shape) # (205, 1, 2), 第0条轮廓是由205个(x,y)坐标组成
print(contours[0][0][0]) # [175  63], 第0条轮廓的第一个点的第一个坐标值:(175,63)
```

#### 2、绘制轮廓
```python
# 方式1, 绘制所有轮廓
# 参数1: 图片
# 参数2: 点集合
# 参数3: -1:所有轮廓, 3: 第contours[3]条轮廓, 0: 当前轮廓线
cv2.drawContours(img, contours, -1, (0,255,0), 3)
# 方式2, 绘制第四条轮廓
cv2.drawContours(img, contours, 3, (0,255,0), 3)
# 方式3, 绘制第四条轮廓
cnt = contours[4]
cv.drawContours(img, [cnt], 0, (0,255,0), 3)
```

#### 3、轮廓特征
**矩:**
```python
import numpy as np
import cv2 as cv
img = cv.imread('star.jpg',0)
ret,thresh = cv.threshold(img,127,255,0)
contours,hierarchy = cv.findContours(thresh, 1, 2)
cnt = contours[0]
M = cv.moments(cnt)
print( M )
```

**轮廓区域:**
```python
area = cv.contourArea（cnt）
```

**轮廓周长:**
```python
perimeter = cv.arcLength(cnt,True)
```

**轮廓近似:**
```python
epsilon = 0.1*cv.arcLength(cnt,True)
# 对图像轮廓点进行多边形拟合
# 第一个参数: 点集合
# 第二个参数: 精度
# 第三个参数: 是否封闭
# 返回: 拟合后的点集合
approx = cv.approxPolyDP(cnt,epsilon,True)
```
