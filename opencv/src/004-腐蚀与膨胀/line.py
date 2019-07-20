#coding=utf-8
import cv2
import numpy as np

# 读取图像
img_original = cv2.imread('line.jpg')
(rows, cols, n) = img_original.shape
# 灰度
img_gray = cv2.cvtColor(img_original, cv2.COLOR_BGR2GRAY)
# 二值化
ret,img_binary = cv2.threshold(img_gray, 200, 255, cv2.THRESH_BINARY);
# 提取水平线
kernel = cv2.getStructuringElement(cv2.MORPH_RECT,(rows/16,1))
img_horizontal = cv2.dilate(img_binary, kernel)
img_horizontal = cv2.erode(img_horizontal, kernel)
img_horizontal = cv2.blur(img_horizontal,(2,2))
# 提取垂直线
kernel = cv2.getStructuringElement(cv2.MORPH_RECT,(1,cols/16))
img_vertical = cv2.dilate(img_binary, kernel)

# 显示
cv2.imshow('img_original', img_original)
cv2.imshow('img_horizontal', img_horizontal)
cv2.imshow('img_vertical', img_vertical)
cv2.waitKey(0)
