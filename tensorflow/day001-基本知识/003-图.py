import tensorflow as tf
with tf.name_scope('matmul'):
    matrix1 = tf.constant([[3., 3.]], name="matrix1")
    matrix2 = tf.constant([[2.],[2.]], name="matrix2")
    product = tf.matmul(matrix1, matrix2)
    tf.summary.scalar('matrix1', matrix1)
    tf.summary.scalar('matrix2', matrix2)
    tf.summary.scalar('product', product)

with tf.Session() as sess:
    merged_summary = tf.summary.merge_all()
    summary_writer = tf.summary.FileWriter('logs_add/',sess.graph)
    sess.run([product])
    summary_str = sess.run(merged_summary)
    summary_writer.add_summary(summary_str, 1)
