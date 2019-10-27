作者: DSLMing
时间: 2019.10.24

> 参考:
> FunWithWebGL2 017 Terrains

### 过程纹理-地形
纹理一般分成两类, 直接贴图的图片、通过代码生成纹理----**过程纹理**(procedural texture)。**过程纹理**简单来说就是一个时间(运算)换空间(内存)的换算。

使用triangle_strip绘制模式来连接顶点网格的点以创建平面。 在perlin噪声的帮助下，我们将平面变成了丘陵地形，然后通过组装一个简单的着色器以应用基本照明来完成它，从而更容易从视觉上看到我们的地形曲率。 我们通过使用一些在网上找到的着色器代码来完成它，以创建低多边形（例如，地形的漫反射着色）。
<img src="./01.png">

#### 1、Perlin Noise(柏林噪声)
Perlin Noise 可以用来表现自然界中无法用简单形状来表达的物体的形态，比如火焰、烟雾、表面纹路等,地形的高度图是通过 Perlin Noise 生成的。
<img src="./02.png">

Perlin Noise有两种:Simplex噪声、分形噪声。

#### 2、使用canvas 创建图像
创建 100*100 像素的 ImageData 对象，其中每个像素都是红色的，然后把它放到画布上。
<img src="./03.png">

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
// imgData.data.length = width * height * 4
var imgData=ctx.createImageData(100,100);
for (var i=0; i<imgData.data.length; i+=4) {
  // RGBA
  imgData.data[i+0]=255;
  imgData.data[i+1]=0;
  imgData.data[i+2]=0;
  imgData.data[i+3]=255;
}
ctx.putImageData(imgData,10,10);
```

每个像素由4个值构成, 分别对应RGBA。例如第一个像素的构成:
```js
R: imgData.data[0]
G: imgData.data[1]
B: imgData.data[2]
A: imgData.data[3]
```



#### 参考
[Perlin noise](https://www.cnblogs.com/VanHu/p/4941258.html)
[Perlin噪声](https://zh.m.wikipedia.org/zh/Perlin%E5%99%AA%E5%A3%B0)
[如何在游戏中使用Perlin Noise](http://devmag.org.za/2009/04/25/perlin-noise/)
[噪音 - Perlin Noise](https://www.cnblogs.com/babyrender/archive/2008/10/27/BabyRender.html)
[Unity3D教程：PerlinNoise原理及实现](https://gameinstitute.qq.com/community/detail/106827)
