# https://blog.csdn.net/sinat_27763257/article/details/81054214
"""
f(x, y, z) = (x + y) * z
q = (x + y)
f = q * z

df/dq = z
df/dz = q

dq/dx = 1
dq/dy = 1

df/dx = df/dq * dq/dx = z * 1.0
df/dy = df/dq * dq/dy = z * 1.0
df/dz = q = x + y
"""

# 设置输入值
x = -2
y = 5
z = -4

# 进行前向传播
q = x + y  # q becomes 3
f = q * z  # f becomes -12

# 进行反向传播:
# 首先回传到 f = q * z
dfdz = q  # df/dz = q, 所以关于z的梯度是3
dfdq = z  # df/dq = z, 所以关于q的梯度是-4
# 现在回传到q = x + y
dfdx = 1.0 * dfdq  # dq/dx = 1. 这里的乘法是因为链式法则
dfdy = 1.0 * dfdq  # dq/dy = 1
dfdz = x + y  # 3
print(dfdx, dfdy, dfdz)  # -4, -4, 3
if i == 1:
    print(1)
