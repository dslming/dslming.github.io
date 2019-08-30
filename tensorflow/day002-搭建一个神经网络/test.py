# https://blog.csdn.net/u012679707/article/details/80485261
# encoding:utf-8
# add_layer1_view.py 练习网络层可视化

# 创建神经网络并训练 #功能：拟合 y=x*x+noise+1
# 功能：将add_layer1的图标可视化

import tensorflow as tf
import numpy as np

# 创建一个神经网络层
def add_layer(input,in_size,out_size,activation_function=None):
    layer_name='layer_name'
    """
    :param input: 数据输入
    :param in_size: 输入大小
    :param out_size: 输出大小
    :param activation_function: 激活函数（默认没有）
    :return:
    """
    with tf.name_scope('layer') :
        with tf.name_scope('Weight'):
            Weight=tf.Variable(tf.random_normal([in_size,out_size]) )
            # Draw histogram: name, variable
            tf.summary.histogram(layer_name + '/weights', Weight)
        with tf.name_scope('biases'):
            biases=tf.Variable(tf.zeros([1,out_size]) +0.1 )
            tf.summary.histogram(layer_name + '/biases', biases)
        with tf.name_scope('W_mul_x_plus_b'):
            W_mul_x_plus_b=tf.matmul(input,Weight) + biases
    #根据是否有激活函数
    if activation_function == None:
        output=W_mul_x_plus_b
    else:
        output=activation_function(W_mul_x_plus_b)

        # at histogram
    tf.summary.histogram(layer_name + '/output', output)
    return output

# 创建一个具有输入层，隐藏层，输出层的三层神经网络，神经元个数分别为1，10，1
x_data=np.linspace(-1,1,300)[:,np.newaxis]   # 创建输入数据  np.newaxis分别是在列(第二维)上增加维度，原先是（300，）变为（300，1）
noise=np.random.normal(0, 0.05,x_data.shape)
y_data=np.square(x_data)+1+noise    # 创建输入数据对应的输出


#定义输入数据
with tf.name_scope('input'):
    xs=tf.placeholder(tf.float32,[None,1],name='x_input')
    ys=tf.placeholder(tf.float32,[None,1],name='y_input')

#定义一个隐藏层
with tf.name_scope('hidden_layer'):
    hidden_layer1=add_layer(xs,1,10,activation_function=tf.nn.relu)

#定义一个输出层
with tf.name_scope('output_layer'):
    prediction=add_layer(hidden_layer1,10,1,activation_function=None)


### 求解神经网络参数 start ###
# 1.定义损失函数
with tf.name_scope('loss'):
    loss=tf.reduce_mean(tf.reduce_sum(tf.square(ys-prediction) ,reduction_indices=[1] ))
    # 2.使用tf.scalar_summary来收集想要显示的变量,命名为loss
    tf.summary.scalar('loss', loss)
# 2.定义训练过程
with tf.name_scope('train'):
    train_step=tf.train.GradientDescentOptimizer(0.1).minimize(loss)
init=tf.global_variables_initializer()
sess=tf.Session()
# 3.定义一个summury op, 用来汇总由scalar_summary记录的所有变量
merged_summary_op = tf.summary.merge_all()
# 4.生成一个summary writer对象，需要指定写入路径,例如我这边就是/tmp/logdir
summary_writer = tf.summary.FileWriter('logs_add_layer1/',sess.graph)
### 求解神经网络参数 end ###

# 进行训练
sess.run(init)
for i in range(1000):
    sess.run(train_step,feed_dict={xs:x_data,ys:y_data})
    if i%100==0:
        #print(sess.run(loss,feed_dict={xs:x_data,ys:y_data} )  )
        # 5.使用sess.run来得到merged_summary_op的返回值
        summary_str = sess.run(merged_summary_op,feed_dict={xs:x_data,ys:y_data})
    # 6.使用summary writer将运行中的loss值写入
    summary_writer.add_summary(summary_str, i)

#关闭sess
sess.close()
