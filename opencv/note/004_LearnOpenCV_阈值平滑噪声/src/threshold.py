import numpy as np
import cv2

img = cv2.imread("chess.png")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 固定阈值
ret, th = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
print(ret)
# cv2.imwrite("../doc/threshold_fix.png", th)

# 自适应阈值
th = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                           cv2.THRESH_BINARY, 17, 6)
cv2.imwrite("../doc/threshold_adapt.png", th)
