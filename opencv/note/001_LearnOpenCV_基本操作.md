> v0.0.1 2019/9/13 DSLMing
> 首次创作
>
> 感谢:
> http://ex2tron.wang/opencv-python-introduction-and-installation/


### 准备工作
#### 1、安装环境


首先安装python, 然后安装依赖,本教程编写时使用的软件版本是：OpenCV 4.x，Python 3.x。
```
pip3 install opencv-python
pip3 install numpy
```

#### 2、编码规范
最常用的依赖引入方式为:
```python
# -*- coding: utf-8 -*-
import cv2 as cv
import numpy as np
```

命名规范:
```python
# 函数/方法: 小驼峰
findTransform()
# 变量: 下划线连接小写字母
binary_image = cv.imread("./test.png")
```


#### 3、图片的读写
读:
```python
# filename: 文件名
# flags:
# - cv.IMREAD_COLOR：彩色图，默认值(1)
# - cv.IMREAD_GRAYSCALE：灰度图(0)
# - cv.IMREAD_UNCHANGED：包含透明通道的彩色图(-1)
cv.imread(filename, flags)
```

显示:
```python
# winname: 窗口名
# mat: 图片数据
cv.imshow(winname, mat)
cv.waitKey(0)
```
但是程序显示一闪而过,需要停留下来,所以:
```python
# 等待, 0表示一直等
cv2.waitKey(0)
# 销毁所有的窗口
cv2.destroyAllWindows()
```
保存:
```python
cv2.imwrite(filename, img)
```

#### 4、图片属性
img.shape获取图像的形状，图片是彩色的话，返回一个包含行数(高度)、列数(宽度)和通道数的元组，灰度图只返回行数和列数：
```python
# img 是彩色图
height, width, channels = img.shape
# img是灰度图
height, width = img.shape
```

#### 5、获取和修改像素点值
通过行列的坐标来获取某像素点的值，对于彩色图，结果是B,G,R三个值的列表，对于灰度图或单通道图，只有一个值：
```python
# 彩色,第100行,90列的像素值
px = img[100, 90]
print(px)  # [103 98 197], BGR
# blue通道
px_blue = img[100, 90, 0]
print(px_blue)  # 103
```

修改像素值,img[y, x]:
```python
img[100, 90] = [255, 255, 255]
print(img[100, 90])  # [255 255 255]
```
#### 5、性能评估
评估代码运行时间:
```python
import cv2 as cv
start = cv.getTickCount()
# 这里写测试代码...
count = 0.1
for i in range(1000):
    count = count * 0.9
end = cv.getTickCount()
print((end - start) / cv.getTickFrequency(), 's')
```

优化原则:
- 尽量避免使用循环，尤其嵌套循环，因为极其慢！！！
- 优先使用OpenCV/Numpy中封装好的函数
- 尽量将数据向量化，变成Numpy的数据格式
- 尽量避免数组的复制操作

> 全文结束
