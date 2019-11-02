作者: DSLMing
时间: 2019.11.1

> 参考:
> FunWithWebGL2 024 Picking with Framebuffers

### 利用帧缓存实现3D拾取(3D Picking)


#### 1、3D拾取的概念和原理
1) 对每一个三角形在程序运行时附加一个索引
2) 让片段着色器输出每个像素所在三角形的索引值
3) 得到颜色缓冲，但是并不包含颜色值，而是像素所在的图元的索引值
4) 当鼠标点击在窗口上，我们将根据鼠标的点击位置来获得这个索引并将这个三角形渲染成红色
5) 由于有深度测试，所以能够保证当片元之间相互覆盖时也可以得到最顶部的片元的索引（离相机最近的）

#### 4、渲染管线（渲染流水线）
> 参考:
> [渲染管线（图形流水线）](https://www.cnblogs.com/hammerc/p/11190470.html)
> [WebGL 基础知识](http://eux.baidu.com/blog/fe/832)
> [渲染管线的三个概念阶段](https://blog.csdn.net/qq_36383623/article/details/81095366)

渲染管线是指将数据从3D场景转换成2D图像，最终在屏幕上显示出来的总过程。
它分为几个阶段:`应用阶段`、`几何阶段`、`光栅阶段`。

<img src="./04.png">

- Vertex Array: 顶点数组
- Vertex Shader: 顶点着色器
- Primitive Assemply: 图元组装
- Rasterization: 栅格化
- Fragment Shader: 片段着色器
- Per-Fragment Operations: 逐像素处理
- Framebuffer: 帧缓存

##### 1) 应用阶段(CPU负责)
应用阶段最主要的就是把我们准备好的场景数据。
- 准备场景数据、模型及光源
- 剔除（Culling）：剔除不可见物体，提高性能
- 设置渲染状态 材质、纹理、shader的数据
- 输出渲染所需的信息，即输出渲染图元（Rendering Primitives）

##### 2) 几何阶段(GPU负责)
几何阶段是用来负责大多数`逐顶点`以及`逐图元`的操作。

**坐标变换**
通常在顶点着色器中应用坐标变换, 计算每个顶点的最终坐标位置。

##### 3) 光栅化阶段(由GPU负责)
#### 2、从相机空间到屏幕坐标
<img src="02.png" />
相机空间中的一个顶点v，经过透视变换后进入了CVV中。这个变换矩阵实际上完成了两个工作:
1) 顶点从3D空间投影到2D的投影平面（Projection Plane）上。
2) 将投影平面上的2D投影点通过线性插值变换到齐次裁剪空间CVV中。
3) 将CVV中的点通过线性插值变换到viewport中。

#### 3、WebGL 引擎渲染流程
> 参考:
> [图解WebGL&Three.js工作原理](https://www.cnblogs.com/wanbo/p/6754066.html)
> [读一个WebGL引擎的渲染流程](https://www.jianshu.com/p/de0e31608622)

渲染的过程可以大致描述为：
1)更新Scene与Camera的世界坐标变换矩阵【2、4】
2)根据二者的矩阵作用到渲染对象上进行投影变换【6】
3)渲染背景【7】
4)渲染场景【8】
<img src="03.png">




#### 参考
[深入探索3D拾取技术](https://blog.csdn.net/popy007/article/details/8477484)


