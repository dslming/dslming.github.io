import numpy as np
import cv2

img = cv2.imread("msb.png")
height, width = img.shape[:2]

# 缩放
# resize_res = cv2.resize(img, (2 * width, 2 * height),
#                         interpolation=cv2.INTER_CUBIC)
# cv2.imwrite("../doc/resize.png", resize_res)

# 平移
# # 建立一个M矩阵，表示沿x方向平移100像素，沿y方向平移50像素
# M = np.float32([[1, 0, 100], [0, 1, 50]])
# # 三个参数依次为输入图像、平移矩阵以及输出图像大小
# move_res = cv2.warpAffine(img, M, (img.shape[1], img.shape[0]))
# cv2.imwrite("../doc/move_res.png", move_res)

# 旋转
# # 第一个参数是旋转中心，这里设置为图片中心
# # 第二个参数是旋转角度
# # 第三个参数是旋转后的缩放因子
# # 可以通过设置这三个参数来控制旋转后超出边界的问题
# M = cv2.getRotationMatrix2D((width / 2, height / 2), 45, 0.6)
# rotat_res = cv2.warpAffine(img, M, (img.shape[1], img.shape[0]))
# cv2.imwrite("../doc/rotat_res.png", rotat_res)

# 仿射变换
# pts1 = np.float32([[50, 50], [200, 50], [50, 200]])
# pts2 = np.float32([[10, 100], [200, 50], [100, 250]])
# M = cv2.getAffineTransform(pts1, pts2)
# radiation_res = cv2.warpAffine(img, M, (img.shape[1], img.shape[0]))
# cv2.imwrite("../doc/radiation_res.png", radiation_res)

# 透视变换
pts1 = np.float32([[56, 65], [368, 52], [28, 387], [389, 390]])
pts2 = np.float32([[0, 0], [300, 0], [0, 300], [300, 300]])
M = cv2.getPerspectiveTransform(pts1, pts2)
perspective_res = cv2.warpPerspective(img, M, (img.shape[1], img.shape[0]))
cv2.imwrite("../doc/perspective_res.png", perspective_res)

# cv2.waitKey(0)
# cv2.destroyAllWindows()
