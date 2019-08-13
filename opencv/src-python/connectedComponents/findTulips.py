# -*- coding: utf-8 -*-

# 出自: https://axa.biopapyrus.jp/ia/opencv/%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%A4%9C%E5%87%BA.html
import cv2
import numpy as np
import random

# load image, change color spaces, and smoothing
img = cv2.imread('tulips.png')
img_HSV = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
img_HSV = cv2.GaussianBlur(img_HSV, (9, 9), 3)

# detect tulips
img_H, img_S, img_V = cv2.split(img_HSV)
_thre, img_flowers = cv2.threshold(img_H, 120, 255, cv2.THRESH_BINARY)
cv2.imwrite('tulips_mask.jpg', img_flowers)

# find tulips
nlabels, labels = cv2.connectedComponents(img_flowers)

img = np.zeros(img.shape[0:3])
height, width = img.shape[0:2]
cols = []

# background is label=0, objects are started from 1
for i in range(1, nlabels):
    cols.append(
        np.array([
            random.randint(0, 255),
            random.randint(0, 255),
            random.randint(0, 255)
        ]))

for i in range(1, nlabels):
    img[labels == i, ] = cols[i - 1]

# save
cv2.imwrite('tulips_object.jpg', img)
