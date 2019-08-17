import cv2
import matplotlib.pyplot as plt
import imutils
from imutils.perspective import four_point_transform
"""
1、图片预处理
"""
#读入图片
image = cv2.imread("test.png")
height, width = image.shape[:2]
rate = width / height
new_width = 500
new_height = int(new_width / rate)

#转换为灰度图像
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#高斯滤波
blurred = cv2.GaussianBlur(gray, (3, 3), 0)
#自适应二值化方法
blurred = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_MEAN_C,
                                cv2.THRESH_BINARY, 51, 2)
"""
# 2、图像切割
"""
#canny边缘检测
edged = cv2.Canny(blurred, 10, 100)
cnts = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cnts = cnts[1] if imutils.is_cv3() else cnts[0]
docCnt = None
# 确保至少有一个轮廓被找到
if len(cnts) > 0:
    # 将轮廓按大小降序排序
    cnts = sorted(cnts, key=cv2.contourArea, reverse=True)
    # 对排序后的轮廓循环处理
    for c in cnts:
        # 获取近似的轮廓
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)
        # 如果近似轮廓有四个顶点，那么就认为找到了答题卡
        if len(approx) == 4:
            docCnt = approx
            break

newimage = image.copy()
for i in docCnt:
    #circle函数为在图像上作图，新建了一个图像用来演示四角选取
    cv2.circle(newimage, (i[0][0], i[0][1]), 10, (255, 0, 0), -1)
cv2.imshow("newimage", newimage)
# paper = four_point_transform(image, docCnt.reshape(4, 2))
# warped = four_point_transform(gray, docCnt.reshape(4, 2))

# cv2.imshow("paper", paper)
width1, height1 = paper.shape[:2]
# 对灰度图应用二值化算法
thresh = cv2.adaptiveThreshold(warped, 255, cv2.ADAPTIVE_THRESH_MEAN_C,
                               cv2.THRESH_BINARY, 53, 2)
#重塑可能用到的图像
thresh = cv2.resize(thresh, (width1, height1), cv2.INTER_LANCZOS4)
paper = cv2.resize(paper, (width1, height1), cv2.INTER_LANCZOS4)
warped = cv2.resize(warped, (width1, height1), cv2.INTER_LANCZOS4)
# cv2.imshow("thresh", thresh)

#均值滤波
ChQImg = cv2.blur(thresh, (3, 3))
#二进制二值化
ChQImg = cv2.threshold(ChQImg, 100, 225, cv2.THRESH_BINARY)[1]
# cv2.imshow("ChQImg", ChQImg)
'''
threshold参数说明
第一个参数 src    指原图像，原图像应该是灰度图。
第二个参数 x      指用来对像素值进行分类的阈值。
第三个参数 y      指当像素值高于（有时是小于）阈值时应该被赋予的新的像素值
第四个参数 Methods  指，不同的不同的阈值方法，这些方法包括：
            •cv2.THRESH_BINARY
            •cv2.THRESH_BINARY_INV
            •cv2.THRESH_TRUNC
            •cv2.THRESH_TOZERO
            •cv2.THRESH_TOZERO_INV
'''
# 在二值图像中查找轮廓
cnts = cv2.findContours(ChQImg, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
cnts = cnts[1] if imutils.is_cv2() else cnts[0]
for c in cnts:
    # 计算轮廓的边界框，然后利用边界框数据计算宽高比
    (x, y, w, h) = cv2.boundingRect(c)
    if (w > 60 & h > 20) and y > 900 and y < 2000:
        M = cv2.moments(c)
        cX = int(M["m10"] / M["m00"])
        cY = int(M["m01"] / M["m00"])
        #绘制中心及其轮廓
        cv2.drawContours(paper, c, -1, (0, 0, 255), 5, lineType=0)
        cv2.circle(paper, (cX, cY), 7, (255, 255, 255), -1)
        #保存题目坐标信息
        Answer.append((cX, cY))
cv2.imshow("paper2", paper)
cv2.waitKey(0)
cv2.destroyAllWindows()
