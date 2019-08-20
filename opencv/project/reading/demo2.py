# coding=utf-8

import cv2
import numpy as np
import imutils
from imutils.perspective import four_point_transform
from imutils import contours

# 定义将问题编号映射到正确答案的答案键，即正确的问题编号
ANSWER_KEY = {0: 1, 1: 4, 2: 0, 3: 3, 4: 1}


# 图片预处理
def pretreatment(img):
    # 读取输入图片
    image = cv2.imread(img)
    orig = image.copy()
    w, h = image.shape[:2]
    # 输入图片灰度化
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # 进行高斯滤波
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    # 进行边缘检测处理
    edged = cv2.Canny(blurred, 75, 200)
    # cv2.imshow("edged", edged)

    # 在边缘图像中发现轮廓
    (contours, n) = cv2.findContours(edged, cv2.RETR_LIST,
                                     cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)
    target = None
    if len(contours) > 0:
        for cnts in contours:
            p = cv2.arcLength(cnts, True)
            approx = cv2.approxPolyDP(cnts, 0.02 * p, True)
            if len(approx) == 4:
                target = approx
                break
    cv2.drawContours(image, [target], -1, (0, 0, 255), 2)
    cv2.imshow("count", image)

    if target is not None:
        warped = four_point_transform(gray, target.reshape(4, 2))
        return warped


def findCorrect(img):
    # 在warped图像上面使用Otsu方法进行阈值分割
    thresh = cv2.threshold(img, 0, 255,
                           cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
    # 在二值图像中寻找轮廓
    cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL,
                            cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    questionCnts = []

    # 遍历每一个轮廓
    for c in cnts:
        # 计算轮廓的BB，并根据BB获得横纵比
        (x, y, w, h) = cv2.boundingRect(c)
        ar = w / float(h)

        # 为了将轮廓标记为问题，区域应足够宽、足够高，且长宽比约等于1
        # 即选择满足条件的结果
        if w >= 20 and h >= 20 and ar >= 0.9 and ar <= 1.1:
            questionCnts.append(c)

    # 对问题轮廓进行排序
    questionCnts = contours.sort_contours(questionCnts,
                                          method="top-to-bottom")[0]
    correct = 0
    # 对于每一个问题而言，有5个可能的答案，遍历每一个可能的答案
    for (q, i) in enumerate(np.arange(0, len(questionCnts), 5)):
        # print("ii=:", q, i), # 0,0  1,5  2,10  3,15,  4,20
        # 对每一个问题的5个答案进行排序
        cnts = contours.sort_contours(questionCnts[i:i + 5])[0]
        bubbled = None
        # 循环遍历每一个轮廓
        for (j, c) in enumerate(cnts):
            # 为每行的答案创建一个mask模板
            mask = np.zeros(thresh.shape, dtype="uint8")
            cv2.drawContours(mask, [c], -1, 255, -1)

            # 将mask应用到阈值图像中，然后计算气泡区域中的非零像素数
            mask = cv2.bitwise_and(thresh, thresh, mask=mask)
            total = cv2.countNonZero(mask)

            # 如果它大于该非0像素，我们认为它是答案
            if bubbled is None or total > bubbled[0]:
                bubbled = (total, j)

        # 初始化轮廓颜色和正确答案的索引
        color = (0, 0, 255)
        k = ANSWER_KEY[q]

        # 将用户的答案和标准答案进行对比，进行统计
        if k == bubbled[1]:
            color = (0, 255, 0)
            correct += 1

        # 在图像中绘制结果
        cv2.drawContours(warped, [cnts[k]], -1, color, 3)


warped = pretreatment("omr_test_01.png")
findCorrect(warped)
# cv2.imshow("target", target)
# cv2.waitKey(0)
