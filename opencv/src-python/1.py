import cv2 as cv
start = cv.getTickCount()
# 这里写测试代码...
count = 0.1
for i in range(1000):
    count = count * 0.9
end = cv.getTickCount()
print((end - start) / cv.getTickFrequency(), 's')
