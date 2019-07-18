#coding=utf-8
import cv2
import numpy as np

img = cv2.imread('msb.png')
'''
[
  [
    #B  G  R
    [1, 0, 3],
    [1, 2, 3],
    [4, 5, 6],
    ... #一共有639个,每行有3列
  ],
  ... #一共有469个
  [
    [1, 0, 3],
    [1, 2, 3],
    [4, 5, 6],
  ]
]
'''
print(img.shape) # (469, 639, 3),469行,每行有639列,每个元素有3个数描述
# 图片最后一个像素的色值
print(img[469-1][639-1])[0]
print(img[469-1][639-1])[1]
print(img[469-1][639-1])[2]

cv2.imwrite('new.png', img)

