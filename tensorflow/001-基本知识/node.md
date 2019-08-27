#### 1、流程
- 使用图 (graph) 来表示计算任务.
- 在被称之为 会话 (Session) 的上下文 (context) 中执行图.
- 使用 tensor 表示数据.
- 通过 变量 (Variable) 维护状态.
- 使用 feed 和 fetch 可以为任意的操作(arbitrary operation) 赋值或者从其中获取数据

#### 2、图和op
graph就是由一系列op构成的。
```python
# 图的定义可以被省略
g = tf.Graph()
# 创建常量张量constant 和 加法add 都被成为op
a = tf.constant(2)
b = tf.constant(3)
x = tf.add(a, b)
```

#### 3、会画
在会画中启动图。
```python
import tensorflow as tf
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

with tf.compat.v1.Session() as sess:
    g = tf.Graph()
    matrix1 = tf.constant([[3., 3.]])
    matrix2 = tf.constant([[2.], [2.]])
    product = tf.matmul(matrix1, matrix2)
    result = sess.run([product])
    sess.close()
    print(result)
```

#### 4、变量

