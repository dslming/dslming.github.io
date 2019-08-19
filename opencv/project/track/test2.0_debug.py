# ex2tron's blog:
# http://ex2tron.wang
# 图片和视频下载：http://pic.ex2tron.top/cv2_lane_detection_material.zip

import cv2
import numpy as np
import time
from moviepy.editor import VideoFileClip

# 高斯滤波核大小
blur_ksize = 5

# Canny边缘检测高低阈值
canny_lth = 50
canny_hth = 150

# 霍夫变换参数
rho = 1
theta = np.pi / 180
threshold = 15
min_line_len = 40
max_line_gap = 20


def find_lines(frame):
    h, w = frame.shape
    ret, binary = cv2.threshold(frame, 0, 255,
                                cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    dist = cv2.distanceTransform(binary, cv2.DIST_L1, cv2.DIST_MASK_PRECISE)
    # cv2.imshow("distance", dist / 15)
    dist = dist / 15
    result = np.zeros((h, w), dtype=np.uint8)
    ypts = []
    for row in range(h):
        cx = 0
        cy = 0
        max_d = 0
        for col in range(w):
            d = dist[row][col]
            if d > max_d:
                max_d = d
                cx = col
                cy = row
        result[cy][cx] = 255
        ypts.append([cx, cy])

    xpts = []
    for col in range(w):
        cx = 0
        cy = 0
        max_d = 0
        for row in range(h):
            d = dist[row][col]
            if d > max_d:
                max_d = d
                cx = col
                cy = row
        result[cy][cx] = 255
        xpts.append([cx, cy])
    return result


def process_an_image(img):
    # old = img.copy()
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    blur_gray = cv2.GaussianBlur(gray, (blur_ksize, blur_ksize), 1)
    ret, th = cv2.threshold(gray, 195, 255, cv2.THRESH_BINARY)
    kernel = np.ones((3, 3), np.uint8)
    dia = cv2.dilate(th, kernel, iterations=1)
    kernel = np.ones((5, 5), np.uint8)
    edges = cv2.erode(dia, kernel, iterations=1)
    # 标记四个坐标点用于ROI截取
    rows, cols = img.shape[:2]
    points = np.array([[(0, rows), (390, 20), (550, 60), (cols, rows)]])
    mask = np.zeros_like(edges)
    cv2.fillPoly(mask, points, 255)
    masked_img = cv2.bitwise_and(edges, mask)
    # cv2.imshow("masked_img", masked_img)

    contours, hierarchy = cv2.findContours(masked_img, cv2.RETR_TREE,
                                           cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(img, contours, -1, (0, 0, 255), 2)
    cv2.imshow("win", img)
    return img
    """
    # edges = cv2.Canny(blur_gray, canny_lth, canny_hth)
    cv2.imshow("ret_find_line", ret_find_line)
    # cv2.waitKey(0)
    # 2. 标记四个坐标点用于ROI截取
    rows, cols = edges.shape
    points = np.array([[(0, rows), (390, 60), (460, 60), (cols, rows)]])
    # [[[0 540], [460 325], [520 325], [960 540]]]
    # cv2.fillPoly(edges, points, 255)
    # cv2.imshow("win", edges)
    # cv2.waitKey(0)

    roi_edges = roi_mask(edges, points)
    # cv2.imshow("win", roi_edges)
    # cv2.waitKey(0)

    # 3. 霍夫直线提取
    drawing, lines = hough_lines(roi_edges, rho, theta, threshold,
                                 min_line_len, max_line_gap)
    draw_lines(drawing, lines)
    # cv2.imshow("win", drawing)
    # cv2.waitKey(0)

    # 4. 车道拟合计算
    # draw_lanes_new(drawing, lines)
    # cv2.imshow("drawing", drawing)
    # cv2.waitKey(0)

    # 5. 最终将结果合在原图上
    result = cv2.addWeighted(img, 0.9, drawing, 0.2, 0)
    return result
    """
    """
    """


def roi_mask(img, corner_points):
    # 创建掩膜
    mask = np.zeros_like(img)
    cv2.fillPoly(mask, corner_points, 255)
    masked_img = cv2.bitwise_and(img, mask)
    return masked_img


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


def draw_lines(img, lines, color=[0, 0, 255], thickness=1):
    for line in lines:
        for x1, y1, x2, y2 in line:
            cv2.line(img, (x1, y1), (x2, y2), color, thickness)


def draw_lanes_new(img, lines, color=[255, 0, 0], thickness=8):
    # a. 划分左右车道
    left_lines, right_lines = [], []
    # if type(lines) != list:
    #     return
    for line in lines:
        for x1, y1, x2, y2 in line:
            k = (y2 - y1) / (x2 - x1)
            if k < 0:
                left_lines.append(line)
            else:
                right_lines.append(line)


def draw_lanes(img, lines, color=[255, 0, 0], thickness=8):
    # a. 划分左右车道
    left_lines, right_lines = [], []
    # if type(lines) != list:
    #     return
    for line in lines:
        for x1, y1, x2, y2 in line:
            k = (y2 - y1) / (x2 - x1)
            if k < 0:
                left_lines.append(line)
            else:
                right_lines.append(line)

    if (len(left_lines) <= 0 or len(right_lines) <= 0):
        return

    # b. 清理异常数据
    # clean_lines(left_lines, 0.1)
    # clean_lines(right_lines, 0.1)
    # drawing = np.zeros((img.shape[0], img.shape[1], 3), dtype=np.uint8)
    # draw_lines(drawing, left_lines)
    # draw_lines(drawing, right_lines)
    # draw_lines(img, lines)
    # cv2.imshow("img", img)
    # cv2.imshow("left_right_lines", drawing)

    # c. 得到左右车道线点的集合，拟合直线
    left_points = [(x1, y1) for line in left_lines for x1, y1, x2, y2 in line]
    left_points = left_points + [(x2, y2) for line in left_lines
                                 for x1, y1, x2, y2 in line]

    right_points = [(x1, y1) for line in right_lines
                    for x1, y1, x2, y2 in line]
    right_points = right_points + \
        [(x2, y2) for line in right_lines for x1, y1, x2, y2 in line]

    left_results = least_squares_fit(left_points, 325, img.shape[0])
    right_results = least_squares_fit(right_points, 325, img.shape[0])

    # 注意这里点的顺序
    vtxs = np.array([[
        left_results[1], left_results[0], right_results[0], right_results[1]
    ]])
    # d.填充车道区域
    cv2.fillPoly(img, vtxs, (0, 255, 0))

    # 或者只画车道线
    # cv2.line(img, left_results[0], left_results[1], (0, 255, 0), thickness)
    # cv2.line(img, right_results[0], right_results[1], (0, 255, 0), thickness)


def clean_lines(lines, threshold):
    # 迭代计算斜率均值，排除掉与差值差异较大的数据
    slope = [(y2 - y1) / (x2 - x1) for line in lines
             for x1, y1, x2, y2 in line]
    while len(lines) > 0:
        mean = np.mean(slope)
        diff = [abs(s - mean) for s in slope]
        idx = np.argmax(diff)
        if diff[idx] > threshold:
            slope.pop(idx)
            lines.pop(idx)
        else:
            break


def least_squares_fit(point_list, ymin, ymax):
    # 最小二乘法拟合
    x = [p[0] for p in point_list]
    y = [p[1] for p in point_list]

    # polyfit第三个参数为拟合多项式的阶数，所以1代表线性
    fit = np.polyfit(y, x, 1)
    fit_fn = np.poly1d(fit)  # 获取拟合的结果

    xmin = int(fit_fn(ymin))
    xmax = int(fit_fn(ymax))

    return [(xmin, ymin), (xmax, ymax)]


# img = cv2.imread("./track.png")
# cv2.imwrite("ret.png", ret)
if __name__ == "__main__":
    output = 'out.mp4'
    cap = cv2.VideoCapture("input.mp4")

    # 一直播放视频，直到手动退出
    while 1:
        # 返回两个值，ret表示读取是否成功，frame为读取的帧内容
        ret, frame = cap.read()
        # 判断读取的帧内容是否为空，否则退出
        if frame is None:
            break
        else:
            process_an_image(frame)
            k = cv2.waitKey(0) & 0xFF
            if k == 27:
                break
cap.release()
