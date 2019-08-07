# -*- coding: utf-8 -*-
# https://cloud.tencent.com/developer/article/1351630
import cv2
import numpy as np

def main():
  nemo = cv2.imread("./imgs/nemo.png")
  cv2.imshow("input", nemo)
  nemo = cv2.cvtColor(nemo, cv2.COLOR_BGR2RGB)
  # 颜色转换
  hsv_nemo = cv2.cvtColor(nemo, cv2.COLOR_RGB2HSV)

  light_orange = (1, 190, 200)
  dark_orange = (18, 255, 255)
  mask = cv2.inRange(hsv_nemo, light_orange, dark_orange)
  result = cv2.bitwise_and(nemo, nemo, mask=mask)
  result = cv2.cvtColor(result, cv2.COLOR_RGB2BGR)
  cv2.imshow("result", result)

  cv2.waitKey(0)
  cv2.destroyAllWindows()

main()
