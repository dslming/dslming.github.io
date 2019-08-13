# coding=utf-8
import numpy as np
import cv2

cap = cv2.VideoCapture(0)

width = int(cap.get(3))
height = int(cap.get(4))

fps = 10
waitTime = 1
if cap.get(5) != 0:
    waitTime = int(1000.0 / cap.get(5))
    fps = cap.get(5)

fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter("./output.avi", fourcc, fps, (width, height))

out_frame = np.zeros((height, width, 3), np.uint8)
frame2gray = np.zeros((height, width, 3), np.uint8)

while cap.isOpened():
    ret, frame = cap.read()
    if frame is None:
        break
    else:
        frame2gray[:, :, 0] = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        frame2gray[:, :, 1] = frame2gray[:, :, 0]
        frame2gray[:, :, 2] = frame2gray[:, :, 0]

        ret, out_frame = cv2.threshold(frame2gray, 128, 255, cv2.THRESH_BINARY)
        out.write(out_frame)
        cv2.imshow("video", frame)
        cv2.imshow("binary", out_frame)
        k = cv2.waitKey(waitTime) & 0xFF
        if k == 27:
            break

cap.release()
out.release()
