# -*- coding: utf-8 -*-
import cv2 as cv
import numpy as np
'''
细化轮廓
'''
# 预处理
src = cv.imread("./loseWeight.png")
gray = cv.cvtColor(src, cv.COLOR_BGR2GRAY)
blurred = cv.GaussianBlur(gray, (5, 5), 2)
cv.imshow("gray", blurred)

# 二值化, 目标是255, 背景是0
ret, binary = cv.threshold(blurred, 225, 255, cv.THRESH_BINARY_INV)
cv.imshow("binary", binary)

# 距离图像, 每个像素值是该像素与其最近背景像素的距离
dist_transform = cv.distanceTransform(binary, cv.DIST_L2, 3)
cv.imshow("dist_transform", dist_transform)

w, h = dist_transform.shape[:2]
n = 0
m = 0
maxValue = 0
for i in range(w):
    for j in range(h):
        if (dist_transform[i][j] > maxValue):
            n = i
            m = j
            maxValue = dist_transform[i][j]
print(maxValue, n, m)

dist = np.zeros((w, h), dtype=np.float)
for i in range(w):
    for j in range(h):
        if (dist_transform[i][j] > maxValue / 2.5):
            dist[i][j] = 255
cv.imshow("dist", dist)

cv.waitKey(0)
cv.destroyAllWindows()