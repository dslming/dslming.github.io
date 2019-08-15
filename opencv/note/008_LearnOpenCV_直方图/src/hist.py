import cv2
import numpy as np
import matplotlib.pyplot as plt
"""
# 灰度直方图
img = cv2.imread('hist.png', 0)
# images:待处理的图像，图像格式为uint8或float32，传入时用[ ]括起来，如[img]。
# channels:对应图像需要统计的通道，若是灰度图则为0，彩色图像B、G、R对应0、1、2，注意同样需要用[ ]括起来，如[0]。
# mask:掩膜图像。如果统计整幅图像就设置为None，否则这里传入设计的掩膜图像。
# histSize:前面说过了，BIN的数目。同样用[ ]括起来，如[256]。
# ranges:像素量化范围，通常为0 - 255。
# cv2.calcHist(images,channels,mask,histSize,ranges[,hist[,accumulate]])
hist = cv2.calcHist([img], [0], None, [256], [0, 256])
plt.plot(hist)
plt.show()
"""
"""
# RGB 直方图
img = cv2.imread('sea.jpg')
# img = cv2.GaussianBlur(img, (65, 65), 3)
img = cv2.medianBlur(img, 9)
# 新建一个元组，分别对应不同通道的颜色以供遍历
color = ('b', 'g', 'r')
# 对于一个列表或数组，既要遍历索引又要遍历元素时
# 使用内置enumerate函数会更加直接、优美
# 它会将数组或列表组成一个索引序列
# 使我们再获取索引和索引内容的时候更加方便
plt.title('BGR hist')
for i, col in enumerate(color):
    histr = cv2.calcHist([img], [i], None, [256], [0, 255])
    plt.plot(histr, color=col)
    plt.xlim([0, 255])
plt.grid(True)
# plt.show()
plt.savefig("../doc/hist_cal.png")
"""

# 直方图均衡化
img = cv2.imread('hist.png', 0)
equ = cv2.equalizeHist(img)
cv2.imwrite('../doc/equalization_befor_pic.jpg', np.hstack((img, equ)))  # 并排显示
plt.hist(img.ravel(), 256, [0, 256])
plt.hist(equ.ravel(), 256, [0, 256])
plt.savefig("../doc/equalization_befor_hist.jpg")
# cv2.waitKey(0)
# hist = cv2.calcHist([img], [0], None, [256], [0, 256])
# plt.plot(hist)
# plt.show()
