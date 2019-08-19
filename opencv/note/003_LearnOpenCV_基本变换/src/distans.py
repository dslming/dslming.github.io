import numpy as np
import cv2


class linedetector:
    def __init__(self):
        self.lines = []

    def find_lines(self, frame):
        h, w, ch = frame.shape
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        ret, binary = cv2.threshold(gray, 0, 255,
                                    cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        # cv2.imshow("binary image", binary)
        # cv2.imwrite("D:/Python/opencv/binary.png", binary)
        dist = cv2.distanceTransform(binary, cv2.DIST_L1,
                                     cv2.DIST_MASK_PRECISE)
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

    def line_fitness(self, pts, image, color=(0, 0, 255)):
        h, w, ch = image.shape
        [vx, vy, x, y] = cv2.fitLine(np.array(pts), cv2.DIST_L1, 0, 0.01, 0.01)
        y1 = int((-x * vy / vx) + y)
        y2 = int(((w - x) * vy / vx) + y)
        cv2.line(image, (w - 1, y2), (0, y1), color, 2)
        return image


if __name__ == "__main__":
    src = cv2.imread('test3.png')
    ld = linedetector()
    lines_img = ld.find_lines(src)
    # cv2.imshow("lines_img", lines_img)
    edges = cv2.Canny(lines_img, 50, 150)
    # cv2.imshow("edges", edges)
    # ret, thresh = cv2.threshold(img_gray, 0, 255,
    #                             cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    # 寻找二值化图中的轮廓
    contours, hierarchy = cv2.findContours(edges, cv2.RETR_TREE,
                                           cv2.CHAIN_APPROX_SIMPLE)
    print(len(contours))  # 结果应该为2
    cv2.drawContours(src, contours, -1, (0, 0, 255), 2)
    cv2.imshow("win", src)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
