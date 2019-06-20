import headLightsVS from './shader/head_light_frag.glsl'
import headLightsFS from './shader/head_light_vert.glsl'

import AssetLoader from './AssetLoader'

const THREE = (window as any).THREE

export class Control {
    vp: any;
    sceneWGL: any
    assetLoader: AssetLoader
    rendererWGL: any
    continer: any

    constructor() {
        // 资源加载
        let manifesto = [
            // Cube textures
            { name: "envReflection", type: "cubetexture", ext: "jpg" },
            { name: "envSkybox", type: "cubetexture", ext: "jpg" },
            // Car lights
            { name: "flareHead", type: "texture", ext: "jpg" },
            { name: "flareTurn", type: "texture", ext: "jpg" },
            { name: "lightTurn", type: "texture", ext: "jpg" },
            { name: "lightStop", type: "texture", ext: "jpg" },
            // Car geometry
            { name: "body", type: "mesh", ext: "json" },
            { name: "wheel", type: "mesh", ext: "json" },
            { name: "xrays", type: "mesh", ext: "json" },
            // Car textures
            { name: "thread", type: "texture", ext: "jpg" },
            { name: "shadow", type: "texture", ext: "jpg" },
            { name: "led", type: "texture", ext: "png" },
        ];
        this.assetLoader = new AssetLoader("./static/", manifesto, ()=>{console.error('load over...')})
        this.assetLoader.start()

        // 场景
        this.sceneWGL = new THREE.Scene()
        this.sceneWGL.name = 'sceneWGL'

        // 渲染
        this.vp = new THREE.Vector2(window.innerWidth, window.innerHeight)
        this.sceneWGL.background = new THREE.Color(0x000000);
        this.rendererWGL = new THREE.WebGLRenderer({ antialias: true });
        this.rendererWGL.setSize(this.vp.x, this.vp.y);
        this.continer = document.getElementById("GLCanvas")
        this.continer.appendChild(this.rendererWGL.domElement);
    }
}