作者: DSLMing
时间: 2019.10.10

> 参考
> WebGL 编程指南.pdf 第5章

#### 1、纹理映射的步骤
纹理映射的过程需要顶点着色器和片元着色器二者的配合。

##### 1)指定纹理映射方式
为每个顶点指定纹理坐标:
```js
let verticesTexCoords = new Float32Array([
  //顶点坐标   纹理坐标
  -0.5,0.5,  0.0,1.0,
  -0.5,-0.5, 0.0,0.0,
   0.5,0.5,  1.0,1.0,
  0.5,-0.5,  1.0,0.0,
])
```

##### 2)加载纹理并配置
```js
function fLoadTexture(name, img) {
  // 创建一个纹理对象
  var tex = this.createTexture();
  // Set text buffer for work
  this.bindTexture(this.TEXTURE_2D, tex);
  // Push image to GPU.
  this.texImage2D(this.TEXTURE_2D, 0, this.RGBA, this.RGBA, this.UNSIGNED_BYTE, img);
  // Setup up scaling
  this.texParameteri(this.TEXTURE_2D, this.TEXTURE_MAG_FILTER, this.LINEAR);
  this.texParameteri(this.TEXTURE_2D, this.TEXTURE_MIN_FILTER, this.LINEAR_MIPMAP_NEAREST);
  // Setup down scaling
  this.generateMipmap(this.TEXTURE_2D);
  // Precalc different sizes of texture for better quality rendering.
  this.bindTexture(this.TEXTURE_2D, null);									//Unbind
  return tex;
}

// 激活纹理单元
this.gl.activeTexture(this.gl.TEXTURE0);
// 绑定缓冲区
this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
// 传送给片元
this.gl.uniform1i(texture, 0);
```

mesh信息:
```js
var aVert = [ -0.5,0.5,0, -0.5,-0.5,0, 0.5,-0.5,0, 0.5,0.5,0 ],
    aUV = [ 0,0, 0,1, 1,1, 1,0 ],
    aIndex = [ 0,1,2, 2,3,0 ];
```

顶点着色器代码:
```js
#version 300 es
in vec3 a_position;	//Standard position data.
in vec2 a_uv;

uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uCameraMatrix;

// 将UV值插值到片段着色器
out highp vec2 texCoord;

void main(void){
  // 该顶点对应的纹理坐标
  texCoord = a_uv;
  gl_Position = uPMatrix * uCameraMatrix * uMVMatrix * vec4(a_position, 1.0);
}
```

2) 在片元着色器中根据每个片元的纹理坐标从纹理图像中取出纹素颜色。


##### 3)在片元着色器中获取纹理像素颜色
```js
#version 300 es
precision mediump float;
in highp vec2 texCoord;		// What pixel to pull from the texture
uniform sampler2D uMainTex;	// Holds the texture we loaded to the GPU

out vec4 finalColor;
void main(void){
  // 根据该顶点的纹理坐标,去纹理中获取对应的颜色
  finalColor = texture(uMainTex, vec2(texCoord.s, texCoord.t));
}
```
