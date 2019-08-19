import cv2


def hough_lines(img, rho, theta, threshold, min_line_len, max_line_gap):
    # 统计概率霍夫直线变换
    lines = cv2.HoughLinesP(img,
                            rho,
                            theta,
                            threshold,
                            minLineLength=min_line_len,
                            maxLineGap=max_line_gap)
    # 新建一副空白画布
    drawing = np.zeros((img.shape[0], img.shape[1], 3), dtype=np.uint8)
    return drawing, lines


hough_lines()
img = cv2.imread('test.png')
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
ret, thresh = cv2.threshold(img_gray, 0, 255,
                            cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
# 寻找二值化图中的轮廓
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE,
                                       cv2.CHAIN_APPROX_SIMPLE)
print(len(contours))  # 结果应该为2
cv2.drawContours(img, contours, -1, (0, 0, 255), 2)
cv2.imshow("win", img)
cv2.waitKey(0)
