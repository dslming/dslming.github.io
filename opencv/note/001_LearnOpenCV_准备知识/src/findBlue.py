import numpy as np
import cv2
'''
# 获取蓝色的hsv,以此确定蓝色的范围
blue = np.uint8([[[255, 0, 0]]])
hsv_blue = cv2.cvtColor(blue, cv2.COLOR_BGR2HSV)
print(hsv_blue)  # [[[120 255 255]]]
'''

capture = cv2.VideoCapture(0)
# 蓝色的范围，不同光照条件下不一样，可灵活调整
blue = np.uint8([[[255, 0, 0]]])
hsv_blue = cv2.cvtColor(blue, cv2.COLOR_BGR2HSV)
print(hsv_blue)  # [[[120 255 255]]] = np.array([100, 110, 110])
upper_blue = np.array([130, 255, 255])
while (True):
    # 1.捕获视频中的一帧
    ret, frame = capture.read()
    # 2.从BGR转换到HSV
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    # 3.inRange()：介于lower/upper之间的为白色，其余黑色
    mask = cv2.inRange(hsv, lower_blue, upper_blue)
    # 4.只保留原图中的蓝色部分
    res = cv2.bitwise_and(frame, frame, mask=mask)
    cv2.imshow('frame', frame)
    cv2.imshow('mask', mask)
    cv2.imshow('res', res)
    if cv2.waitKey(1) == ord('q'):
        break
