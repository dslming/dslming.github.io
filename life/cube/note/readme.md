### 后期处理的使用

#### 1、不使用后期处理
效果:
<img src="1.png">

完整代码
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>不使用任何后期处理</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <link type="text/css" rel="stylesheet" href="stylesheet.css">
  </head>

  <body>
    <script type="module">
      import * as THREE from './three.module.js';
      import { OrbitControls } from "./OrbitControls.js";
      import { EffectComposer } from './EffectComposer.js';
      import { ShaderPass } from './ShaderPass.js';
      import { TexturePass } from './TexturePass.js';
      import { ClearPass } from './ClearPass.js';
      import { MaskPass, ClearMaskPass } from './MaskPass.js';
      import { CopyShader } from './CopyShader.js';
      import { FXAAShader } from './FXAAShader.js';
      window.THREE = THREE
      let fxaaEffect;
      let controls;
      let camera, composer, renderer;
      let box, plane;
      let bufferOfScene;
      let sceneMaskPlane;
      let sceneCube;
      let light1;

      init();
      animate();

      function init() {
        window.addEventListener('resize', onWindowResize, false);

        // 相机
        let aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000);
        camera.aspect = aspect;
        camera.position.z = 8;

        // 场景
        sceneMaskPlane = new THREE.Scene();
        sceneCube = new THREE.Scene();
        sceneCube.fog = new THREE.FogExp2(0x0f0f0f, .1);
        window.scene = sceneCube

        // 渲染器
        renderer = new THREE.WebGLRenderer();
        renderer.sortObjects = false;
        renderer.setClearColor(0x303030);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 1.;
        document.body.appendChild(renderer.domElement);

        // 标准网格材质,基于物理的渲染（PBR）
        let boxMaterial = new THREE.MeshStandardMaterial({ color: 0xDD7733 });
        boxMaterial.roughnessMap = new THREE.TextureLoader().load("./roughness.jpg");
        boxMaterial.roughnessMap.repeat.set(2, 2);
        // st超过坐标范围都重复采样
        boxMaterial.roughnessMap.wrapS = THREE.RepeatWrapping;
        boxMaterial.roughnessMap.wrapT = THREE.RepeatWrapping;
        // 粗糙度,1.0表示完全漫反射
        boxMaterial.roughness = 1.;
        // 渲染背面
        boxMaterial.side = THREE.BackSide;
        // 深度检测
        boxMaterial.depthTest = THREE.GreaterDepth;

        // 几何体
        let boxSize = 4.;
        box = new THREE.Mesh(new THREE.BoxBufferGeometry(boxSize, boxSize, boxSize), boxMaterial);
        box.castShadow = true;
        box.receiveShadow = true;
        box.name = "box"
        sceneCube.add(box);

        // 灯光
        light1 = new THREE.PointLight(0xFFEFDF, 1, 100);
        light1.castShadow = true;
        light1.position.set(.1, .4, 1.8);
        light1.name = "light1"
        sceneCube.add(light1);
        let light2 = new THREE.PointLight(0xEFDFCF, .75, 100);
        light2.castShadow = true;
        light2.position.set(-.2, .7, .6);
        light2.name = "light2"
        sceneCube.add(light2);

        // 物件
        let thingMaterial1 = new THREE.MeshStandardMaterial({ color: 0xEE5555 });
        let thing1 = new THREE.Mesh(new THREE.CylinderBufferGeometry(.4, .4, 1.75, 32), thingMaterial1);
        thing1.castShadow = true;
        thing1.receiveShadow = true;
        thing1.position.set(.0, -1.1, .0);
        thing1.name = "thing1"
        sceneCube.add(thing1);

        // 平台
        let sideSize = 3.95;
        plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(sideSize, sideSize, 1, 1));
        sceneMaskPlane.add(plane);

        // orbit controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(.0, .0, .0);
        controls.enableDamping = true;
        controls.dampingFactor = .25;
        controls.minDistance = 2.;
        controls.maxDistance = 10.;
        controls.zoomSpeed = .3;
        controls.minPolarAngle = Math.PI * .1;
        controls.maxPolarAngle = Math.PI * .9;
        controls.autoRotate = false;
        controls.autoRotateSpeed = 2.5;
        controls.update();
        controls.saveState();

        // ------------------------------后期处理----------------
      }

      function onWindowResize() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        var pixelRatio = renderer.getPixelRatio();
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      function animate() {
        controls.update();
        requestAnimationFrame(animate);
        var time = performance.now() * .001;
        renderer.render(sceneCube, camera);
      }
    </script>
  </body>

</html>

```

#### 2、使用灰色后期处理
[WebGL着色器和Three.js自己定义后期处理着色器]()

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <title>Masking experiments by MacSlow</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <link type="text/css" rel="stylesheet" href="stylesheet.css">
  </head>

  <body>
    <script type="module">
      import * as THREE from './three.module.js';
      import { OrbitControls } from "./OrbitControls.js";
      import { EffectComposer } from './EffectComposer.js';
      import { ShaderPass } from './ShaderPass.js';
      import { TexturePass } from './TexturePass.js';
      import { ClearPass } from './ClearPass.js';
      import { MaskPass, ClearMaskPass } from './MaskPass.js';
      import { CopyShader } from './CopyShader.js';
      import { FXAAShader } from './FXAAShader.js';
      import { RenderPass } from './RenderPass.js';
      window.THREE = THREE

      let CustomGrayScaleShader = {
        uniforms: {
          "tDiffuse": { type: "t", value: null },
          "rPower": { type: "f", value: 0.2126 },
          "gPower": { type: "f", value: 0.7152 },
          "bPower": { type: "f", value: 0.0722 }
        },

        // 0.2126 R + 0.7152 G + 0.0722 B 图像灰度化加权平均法
        // 对于后期处理步骤，vertexshader始终是相同的
        vertexShader: `
          varying vec2 vUv;
          void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`,
        fragmentShader: `
          uniform float rPower;
          uniform float gPower;
          uniform float bPower;
          uniform sampler2D tDiffuse;

          varying vec2 vUv;
          void main() {
          // 获取对应顶点的像素
          vec4 texel = texture2D( tDiffuse, vUv );
          // 计算灰度值
          float gray = texel.r*rPower + texel.g*gPower + texel.b*bPower;
          // 返回灰度化的顶点颜色
          gl_FragColor = vec4( vec3(gray), texel.w );
          }`
      };

      let fxaaEffect;
      let controls;
      let camera, composer, renderer;
      let box, plane;
      let bufferOfScene;
      let sceneMaskPlane;
      let sceneCube;
      let light1;

      init();
      animate();

      function init() {
        // 相机
        let aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000);
        camera.aspect = aspect;
        camera.position.z = 8;

        // 场景
        sceneMaskPlane = new THREE.Scene();
        sceneCube = new THREE.Scene();
        sceneCube.fog = new THREE.FogExp2(0x0f0f0f, .1);
        window.scene = sceneCube

        // 渲染器
        renderer = new THREE.WebGLRenderer();
        renderer.sortObjects = false;
        renderer.setClearColor(0x303030);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 1.;
        document.body.appendChild(renderer.domElement);

        // 标准网格材质,基于物理的渲染（PBR）
        let boxMaterial = new THREE.MeshStandardMaterial({ color: 0xDD7733 });
        boxMaterial.roughnessMap = new THREE.TextureLoader().load("./roughness.jpg");
        boxMaterial.roughnessMap.repeat.set(2, 2);
        // st超过坐标范围都重复采样
        boxMaterial.roughnessMap.wrapS = THREE.RepeatWrapping;
        boxMaterial.roughnessMap.wrapT = THREE.RepeatWrapping;
        // 粗糙度,1.0表示完全漫反射
        boxMaterial.roughness = 1.;
        // 渲染背面
        boxMaterial.side = THREE.BackSide;
        // 深度检测
        boxMaterial.depthTest = THREE.GreaterDepth;

        // 几何体
        let boxSize = 4.;
        box = new THREE.Mesh(new THREE.BoxBufferGeometry(boxSize, boxSize, boxSize), boxMaterial);
        box.castShadow = true;
        box.receiveShadow = true;
        box.name = "box"
        sceneCube.add(box);

        // 灯光
        light1 = new THREE.PointLight(0xFFEFDF, 1, 100);
        light1.castShadow = true;
        light1.position.set(.1, .4, 1.8);
        light1.name = "light1"
        sceneCube.add(light1);
        let light2 = new THREE.PointLight(0xEFDFCF, .75, 100);
        light2.castShadow = true;
        light2.position.set(-.2, .7, .6);
        light2.name = "light2"
        sceneCube.add(light2);

        // 物件
        let thingMaterial1 = new THREE.MeshStandardMaterial({ color: 0xEE5555 });
        let thing1 = new THREE.Mesh(new THREE.CylinderBufferGeometry(.4, .4, 1.75, 32), thingMaterial1);
        thing1.castShadow = true;
        thing1.receiveShadow = true;
        thing1.position.set(.0, -1.1, .0);
        thing1.name = "thing1"
        sceneCube.add(thing1);

        // 平台
        let sideSize = 3.95;
        plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(sideSize, sideSize, 1, 1));
        sceneMaskPlane.add(plane);

        // orbit controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(.0, .0, .0);
        controls.enableDamping = true;
        controls.dampingFactor = .25;
        controls.minDistance = 2.;
        controls.maxDistance = 10.;
        controls.zoomSpeed = .3;
        controls.minPolarAngle = Math.PI * .1;
        controls.maxPolarAngle = Math.PI * .9;
        controls.autoRotate = false;
        controls.autoRotateSpeed = 2.5;
        controls.update();
        controls.saveState();

        // ------------------------------后期处理----------------
        composer = new EffectComposer(renderer);
        var renderPass = new RenderPass(sceneCube, camera);
        var effectCopy = new ShaderPass(CopyShader);
        effectCopy.renderToScreen = true;
        // renderPass 通道：它只会渲染场景，但不会把结果输出到场景上
        var shaderPass = new ShaderPass(CustomGrayScaleShader);
        composer.addPass(renderPass);
        composer.addPass(shaderPass);
        composer.addPass(effectCopy);

        window.addEventListener('resize', onWindowResize, false);
        onWindowResize()
      }

      function onWindowResize() {
        var width = window.innerWidth;
        var height = window.innerHeight;

        renderer.setSize(width, height);
        composer.setSize(width, height);

        var pixelRatio = renderer.getPixelRatio();
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      function animate() {
        controls.update();
        requestAnimationFrame(animate);
        var time = performance.now() * .001;
        composer.render(time);
      }
    </script>
  </body>

</html>
```
