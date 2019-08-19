# coding=utf-8
import cv2
from matplotlib import pyplot as plt

# 依次读取原图与模板
img = cv2.imread("p.jpg")
template = cv2.imread("t.jpg")

# 依次获取模板的宽高，用于后续绘制矩形
h = template.shape[0]
w = template.shape[1]

# 调用匹配函数
# 第一个参数是原图
# 第二个参数是模板
# 第三个参数是匹配算法
# 返回的结果是一个二维的float类型的数组,大小为W-w+1 * H-h+1
res = cv2.matchTemplate(img, template, cv2.TM_CCOEFF)

# 获取返回结果中最值及其在res中的位置
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

# 构造矩形并在原图上绘制
top_left = max_loc
bottom_right = (top_left[0] + w, top_left[1] + h)
cv2.rectangle(img, top_left, bottom_right, (255, 255, 255), 2)

# 在使用Matplotlib显示之前，需要调整BGR的顺序
b = img[:, :, 0]
g = img[:, :, 1]
r = img[:, :, 2]
img = cv2.merge((r, g, b))

# 打印相关信息
print(img.shape)
print(template.shape)
print(res.shape)
print(res.dtype)
print(cv2.minMaxLoc(res))

# 利用Matplotlib绘图对比
plt.subplot(121), plt.imshow(res, cmap='gray')
plt.subplot(122), plt.imshow(img, cmap='gray')
plt.show()
