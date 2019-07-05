### 环境
#### 1、生产环境
编译:
npm run build:dll
npm run build

因为第三方依赖是单独打包的,使用:
<script src="../dist/test.js"></script>
<script src="../dll/dll.js"></script>

#### 2、开发环境
编译:
npm run dev

使用:
将所有依赖全部以内存方式注入。
<script src="test.js"></script>