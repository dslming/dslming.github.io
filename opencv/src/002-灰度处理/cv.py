#coding=utf-8
import cv2
import numpy as np
img = cv2.imread('line.jpg')

# 转为灰度
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
cv2.imshow('gray', img_gray)
cv2.waitKey(0)
