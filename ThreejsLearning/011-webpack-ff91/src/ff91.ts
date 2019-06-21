
import Camera from './Camera'
import ViewTour from './ViewTour'
import AssetLoader from './AssetLoader'

const THREE = (window as any).THREE

export class Control {
    vp: any;
    cam:any
    sceneWGL: any
    container: any
    viewTour!: ViewTour
    rendererWGL: any
    assetLoader: AssetLoader
    disableRender: boolean

    constructor() {
        this.disableRender = false
        // 场景
        this.sceneWGL = new THREE.Scene()
        this.sceneWGL.name = 'sceneWGL'

        // 渲染
        this.vp = new THREE.Vector2(window.innerWidth, window.innerHeight)
        this.sceneWGL.background = new THREE.Color(0x000000);
        this.rendererWGL = new THREE.WebGLRenderer({ antialias: true });
        this.rendererWGL.setSize(this.vp.x, this.vp.y);
        this.container = document.getElementById("GLCanvas")
        this.container.appendChild(this.rendererWGL.domElement);

        // 相机
        let camOptions = {
            distance: this.vp.y > 550 ? 8 : 6,
            rotRange: {
              xMin: -30,
              xMax: 30,
              yMin: -30,
              yMax: 30
            },
            distRange: {
              max: 20,
              min: 3
            }
        }
        this.cam = new Camera(camOptions)
        this.cam.rotTarget.x = THREE.Math.randFloatSpread(30);
        this.cam.rotTarget.y = THREE.Math.randFloatSpread(30);
        let control = new THREE.OrbitControls(this.cam.camera, this.container)
        control.autoRotate = false
        control.enabled = true

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
        this.assetLoader = new AssetLoader("./static/", manifesto, ()=>{
            console.error('load over...')
            this.viewTour = new ViewTour(this.sceneWGL, this.rendererWGL, this.cam, this.vp);
            this.viewTour.initMeshes(this.assetLoader.cargo);
            this.disableRender = true
        })
        this.assetLoader.start()
    }
    update(t:any) {
        this.disableRender && (this.viewTour.update(t))
    }
}