import tensorflow as tf
message = tf.constant('hello world tensorflow')
sess = tf.Session()
print(sess.run(message).decode())
sess.close()
