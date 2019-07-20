#coding=utf-8
import cv2
import numpy as np

# 读取图像
img_original = cv2.imread('word-line.jpg')
# 灰度
img_gray = cv2.cvtColor(img_original, cv2.COLOR_BGR2GRAY)
# 二值化
# ret,img_binary = cv2.threshold(img_gray, 250, 255, cv2.THRESH_BINARY);
h, w = img_gray.shape
T = cv2.mean(img_gray)[0]
img_binary = np.zeros((h, w), dtype=np.uint8)
for row in range(h):
    for col in range(w):
        pv = img_gray[row, col]
        if pv > T:
            img_binary[row, col] = 255
        else:
            img_binary[row, col] = 0
# 开操作
kernel = cv2.getStructuringElement(cv2.MORPH_RECT,(4,4))
# img_word = cv2.morphologyEx(img_binary,cv2.MORPH_OPEN,kernel)
img_word = cv2.dilate(img_binary, kernel)
img_word = cv2.erode(img_word, kernel)

# 显示
cv2.imshow('img_original', img_original)
cv2.imshow('img_word', img_word)
cv2.waitKey(0)
