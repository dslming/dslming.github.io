# -*- coding: utf-8 -*-

import cv2
import numpy as np
SZ = 200  # 训练图片长宽

def deskew(img):
    # 图像矩
    m = cv2.moments(img)
    if abs(m['mu02']) < 1e-2:
        return img.copy()
    skew = m['mu11'] / m['mu02']
    M = np.float32([[1, skew, -0.5 * SZ * skew], [0, 1, 0]])
    # 仿射变换
    img = cv2.warpAffine(img, M, (SZ, SZ), flags=cv2.WARP_INVERSE_MAP | cv2.INTER_LINEAR)
    return img

# 单通道方式读入
img = cv2.imread("./imgs/456.jpg", 0)
ret = deskew(img)

cv2.namedWindow("ret", cv2.WINDOW_AUTOSIZE)
cv2.imshow("ret", ret)
cv2.waitKey(0)
cv2.destroyAllWindows()
