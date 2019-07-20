#coding=utf-8
import cv2
import numpy as np
img = cv2.imread('msb.png')

# 高斯模糊
gauss_img = cv2.GaussianBlur(img, (5, 5), 1)
# 均值模糊
blur_img = cv2.blur(img, (10, 10))
# 中值模糊
median_img = cv2.medianBlur(img,5)
cv2.
cv2.imshow('blur', blur_img)
cv2.imshow('gauss', gauss_img)
cv2.imshow('median', median_img)
cv2.waitKey(0)

