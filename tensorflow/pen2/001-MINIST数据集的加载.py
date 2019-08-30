import  cv2
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets("model_data/", one_hot=True)

"""
# 数据集结构
minst: {
  test: {
    # 测试数据一个有10000张数据, 也就是10000行数据, 每行有748列.748是由 28*28的像素平铺而成。
    # 所以取出第一个图片就是: img = mnist.test.images[0]
    images: {
      [0:10000]: 灰度图
      shape: (10000, 748)
    },
    labels: {
      # 因为有10000张图片, 所以有10000个label, 每个label 是由一个1*10数组表示,对应位置为1表示当前的label有效
      # 比如 2: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
      shape: (10000, 10)
    }
  },
  train,
  validation
}
"""

# 取出一张图片
img = mnist.test.images[0]
img.shape = [28, 28]
labelTemp = mnist.test.labels[0]
label = ""
for i in range(len(labelTemp)):
  if labelTemp[i] == 1:
    label = i
cv2.imshow(str(label), img)
cv2.waitKey(0)

print("Training data size: ", mnist.train.num_examples)
print("Validating data size: ", mnist.validation.num_examples)
print("Testing data size: ", mnist.test.num_examples)
print("Training data size: ", mnist.train.num_examples)
print("Validating data size: ", mnist.validation.num_examples)
print("Testing data size: ", mnist.test.num_examples)
