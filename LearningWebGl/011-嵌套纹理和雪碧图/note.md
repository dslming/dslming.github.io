作者: DSLMing
时间: 2019.10.23

> 参考:
> FunWithWebGL2 014 Texture Masks
> FunWithWebGL2 015 Texture Atlas

### 一、嵌套纹理
指定纹理的位置,从而将2张纹理组合成一个新的纹理。
例如,有纹理A:
<img src="./01.png">

还有纹理B:
<img src="./02.png">

最终组合为:
<img src="./03.png">

#### 1、片元代码
```js
precision mediump float;
uniform sampler2D uMask_A;
uniform sampler2D uMask_B;
uniform vec3[2] uColors;
in highp vec2 vUV;
out vec4 outColor;

void main(void){
  // 0.2 是让mask_a的颜色强度弱一些
  vec4 mask_a = texture(uMask_A,vUV*4.0) * 0.2;
  vec4 mask_b = texture(uMask_B,vUV*2.0);
  float c = min(mask_a.r + mask_b.r,1.0);

  outColor = vec4( mix(uColors[0],uColors[1], c), 1.0);
}
```

这个纹理坐标放大4倍和放大2倍,那么就会重复相应的倍数。例如放大4倍:
```js
vec4 mask_a = texture(uMask_A,vUV*4.0);
float c = min(mask_a.r,1.0);
```
<img src="./04.png">

将不同的纹理进行放缩然后混合就可以达到嵌套纹理的效果了。

<全文结束>



### 二、雪碧图
效果如图:
<img src="./05.png">
<img src="./atlas_mindcraft.png">

1) 指定每个立方体6个面在雪碧图的位置。
```glsl
var texMap = [
  [3,0, 3,0, 3,0, 2,0, 3,0, 2,9],			//GrassDirt
  [4,1, 4,1, 4,1, 5,1, 4,1, 5,1],			//Log
  [11,1, 10,1, 10,1, 9,1, 10,1, 9,1],		//Chest
  [7,7, 6,7, 6,7, 6,7, 6,7, 6,6],			//Pumpkin
  [8,8, 8,8, 8,8, 9,8, 8,8, 9,8],			//WaterMelon
  [8,0, 8,0, 8,0, 10,0, 8,0, 9,0]			//TNT
];
```

2) 将texMap 传给着色器uFaces.
```js
for(var i=0; i < gCubes.length; i++){
  gShader.setUniforms("uFaces",texMap[i]).renderModel( gCubes[i].preRender() );
}
```

3) 顶点着色器代码
```js
in vec4 a_position;
in vec3 a_norm;
in vec2 a_uv;

uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uCameraMatrix;
uniform vec2[6] uFaces;
out highp vec2 vUV;

const float size = 1.0/16.0;

void main(void){
  int f = int(a_position.w);
  float u = uFaces[f].x * size + a_uv.x * size;
  float v = uFaces[f].y * size + a_uv.y * size;
  // 计算uv坐标给片元着色器中使用
  vUV = vec2(u,v);
  ...
}
```

4) 片元着色器
```js
precision mediump float;
uniform sampler2D uAltas;
in highp vec2 vUV;
out vec4 outColor;

void main(void){ outColor = texture(uAltas,vUV); }
```

<全文结束>
