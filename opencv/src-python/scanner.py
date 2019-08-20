import cv2
import numpy as np


def rectify(h):
    # h: 包含轮廓的四个点位置信息(x,y),
    h = h.reshape((4, 2))
    hnew = np.zeros((4, 2), dtype=np.float32)
    # 位置信息(x,y)相加
    add = h.sum(1)
    hnew[0] = h[np.argmin(add)]
    hnew[2] = h[np.argmax(add)]
    # 相减法, y-x
    diff = np.diff(h, axis=1)
    hnew[1] = h[np.argmin(diff)]
    hnew[3] = h[np.argmax(diff)]
    return hnew


image = cv2.imread('imgs/trans.png')
height, width = image.shape[:2]
rate = width / height
new_width = 500
new_height = int(new_width / rate)
image = cv2.resize(image, (new_width, new_height))
orig = image.copy()
# cv2.imshow("input", orig)

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
gray = cv2.bitwise_not(gray)
blurred = cv2.GaussianBlur(gray, (5, 5), 0)

edged = cv2.Canny(blurred, 0, 50)
orig_edged = edged.copy()
(contours, n) = cv2.findContours(edged, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
print(type(contours))

contours = sorted(contours, key=cv2.contourArea, reverse=True)
for c in contours:
    p = cv2.arcLength(c, True)
    approx = cv2.approxPolyDP(c, 0.02 * p, True)
    if len(approx) == 4:
        target = approx
        break
cv2.drawContours(image, [target], -1, (0, 0, 255), 2)
pts1 = rectify(target)
pts2 = np.float32([[0, 0], [new_width, 0], [new_width, new_height],
                   [0, new_height]])
M = cv2.getPerspectiveTransform(pts1, pts2)
dst = cv2.warpPerspective(orig, M, (new_width, new_height))
# cv2.imshow("ret", dst)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
