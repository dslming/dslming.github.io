import numpy as np
import cv2
from PIL import ImageFont, ImageDraw, Image

img = np.zeros((300, 300, 3), np.uint8)

# line
# cv2.line(img, (0, 50), (300, 50), (255, 0, 0), 2)
# cv2.imshow("dist", img)

# rectangle 矩形
# cv2.rectangle(img, (150, 100), (250, 250), (255, 0, 0), 2)
# cv2.imshow("dist", img)

# cicle
# draw = np.zeros((300, 300, 3), np.uint8)
# cv2.circle(draw, (150, 150), 70, (100, 100, 200), -1)
# cv2.imshow("draw", draw)

# text
# cv2.putText(img, "test text", (10, 25), cv2.FONT_HERSHEY_SIMPLEX, 1,
#             (255, 255, 255), 1, cv2.LINE_AA)
# cv2.imshow("draw", img)

# 中文
# text = "中文微软雅黑测试"
# fontPath = "./msyh.ttf"
# font = ImageFont.truetype(fontPath, 20)
# imgPil = Image.fromarray(img)
# draw = ImageDraw.Draw(imgPil)
# draw.text((30, 60), text, font=font, fill=(255, 255, 255))
# img = np.array(imgPil)
# cv2.imshow('My Image', img)

cv2.waitKey(0)
cv2.destroyAllWindows()
