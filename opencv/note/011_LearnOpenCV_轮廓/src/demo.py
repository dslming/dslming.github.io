import numpy as np
import cv2

img = cv2.imread('test.png')
imgray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
ret, thresh = cv2.threshold(imgray, 127, 255, 0)
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE,
                                       cv2.CHAIN_APPROX_SIMPLE)
cnt = contours[0]
epsilon = 0.1 * cv.arcLength(cnt, True)
approx = cv.approxPolyDP(cnt, epsilon, True)
cv2.drawContours(img, approx, -1, (0, 0, 255), 3)
cv2.imshow("test", img)
cv2.waitKey(0)
