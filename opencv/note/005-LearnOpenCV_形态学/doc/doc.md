> v0.0.1 2019/9/15 DSLMing
> 首次创作
>
> 感谢:
> http://ex2tron.wang/opencv-python-image-thresholding/
>https://zhaoxuhui.top//blog/2017/05/17/%E5%9F%BA%E4%BA%8EPython%E7%9A%84OpenCV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%866.html

### 形态学
- 一般情况下对二值图像进行操作
- 连接相邻的元素或分离成独立的元素
- 腐蚀和膨胀是针对图片中的白色部分

**腐蚀：**
所谓腐蚀是指，卷积核沿着图像滑动，如果与卷积核对应的所有像素值都是1，那么中心元素保持 原来的像素值，否则为0。
这样的操作就会导致所有前景物体会变小，整幅图像的白色区域会减少。这对于去除白噪声很有用， 也可以用来断开两个连接在一起的物体等。
```python
# 这里我们定义了一个5×5，元素值全为1的卷积核
kernel = np.ones((5, 5), np.uint8)
# 第一个参数是待处理图像
# 第二个参数是我们定义的卷积核
# 第三个参数是腐蚀次数，可省略，默认为1
ero = cv2.erode(img, kernel, iterations=1)
```

**膨胀:**
与腐蚀相反，原图像中，与卷积核对应的像素值只要有一个是1，那么新的中心元素的像素值就是1。
一般在去噪声时先用腐蚀，再用膨胀。因为腐蚀 在去掉白噪声的同时，也会使前景对象变小。所以需要再对它进行膨胀。膨胀可以用来连接两个分开的物体。
```python
# 这里我们定义了一个5×5，元素值全为1的卷积核
kernel = np.ones((5, 5), np.uint8)
# 第一个参数是待处理图像
# 第二个参数是我们定义的卷积核
# 第三个参数是膨胀次数，可省略，默认为1
dilate = cv2.dilate(img, kernel, iterations=1)
```

**开运算**
所谓开运算，是先进行腐蚀，再进行膨胀的运算。
```python
kernel = np.ones((5, 5), np.uint8)
# 方法一 自己组合实现开运算，先腐蚀再膨胀
erode = cv2.erode(img, kernel, iterations=1)
dilate = cv2.dilate(erode, kernel, iterations=1)
# 方法二，直接使用内置函数，其中第二个参数指定的是操作类型
opening = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)
```

**闭运算**
与开运算对应，闭运算是先膨胀，再腐蚀。它常被用来填充前景物体中的小洞，或者前景物体上的小黑点。
```python
kernel = np.ones((5, 5), np.uint8)
# 方法一 自己组合实现闭运算，先膨胀再腐蚀
dilate = cv2.dilate(img, kernel, iterations=1)
erode = cv2.erode(dilate, kernel, iterations=1)
# 方法二，直接使用内置函数，其中第二个参数指定的是操作类型
close = cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)
```

**形态学梯度**
其实就是一幅图像膨胀与腐蚀的区别，这样结果看上去就像是前景物体的轮廓。
```python
kernel = np.ones((5, 5), np.uint8)
# 第二个参数指定的是操作类型
gradient = cv2.morphologyEx(img, cv2.MORPH_GRADIENT, kernel)
```

**礼帽:**
原始图像与进行开运算之后得到的图像的差。
```python
tophat = cv2.morphologyEx(img, cv2.MORPH_TOPHAT, kernel)
```

**黑帽:**
原始图像与进行闭运算之后得到的图像的差。
```python
tophat = cv2.morphologyEx(img, cv2.MORPH_BLACKHAT, kernel)
```

**结构化元素**
在前面我们使用Numpy构建的卷积核都是正方形的，但有时我们需要构建一个圆形或椭圆形的卷积核。 为实现这种要求，OpenCV提供cv2.getStructuringElement()。参数为核的形状与大小。
```python
# 普通矩形卷积核
k1 = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
print k1, k1.dtype
```


> 全文结束
