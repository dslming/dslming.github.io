> v0.0.1 2019/9/15 DSLMing
> 首次创作
>
> 感谢:
> http://ex2tron.wang/opencv-python-image-thresholding/
>https://zhaoxuhui.top//blog/2017/05/17/%E5%9F%BA%E4%BA%8EPython%E7%9A%84OpenCV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%866.html

### 图像梯度
图像梯度简单来说就是求导。OpenCV提供三种不同的梯度滤波器，或者说高通滤波器： Sobel、Scharr和Laplacian。Sobel和Scharr其实就是求一阶或二阶导数。Scharr是对Sobel(使用小的卷积核求解梯度角度时)的优化。 Laplacian是求二阶导数。

**Sobel算子:**
Sobel算子是高斯平滑与微分操作的结合体，所以它的抗噪声能力很好。 主要用作边缘检测，在技术上，它是离散性差分算子，用来运算图像亮度函数的灰度之近似值。 在图像的任何一点使用此算子，将会产生对应的灰度矢量或是其法矢量。
该算子包含两组3x3的矩阵，分别为横向及纵向，将之与图像作平面卷积，即可分别得出横向及纵向的亮度差分近似值。

**Scharr算子:**
与Sobel算子类似.

**Laplacian算子:**
它可以使用二阶导数的形式定义，可假设其离散实现类似于二阶Sobel导数。事实上OpenCV在计算时， 直接调用Sobel算子。
