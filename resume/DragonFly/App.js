import * as THREE from './lib/three.module.js'
import { Stage } from './Stage.js'
import { GLTFLoader } from './lib/GLTFLoader.js'
window.THREE = THREE
import HotPoint from './HotPoint.js'

let that = null
class App {
  constructor() {
    that = this
    window.lm = this
    this.curve = null
    this.hotPoints = []
    this.stage = new Stage("#app")
    this.addWall2()
    this.addPoint()
    this.initRay()
    this.stage.run()
    this.stage.onUpdate(() => {
      this.updateScreenPosition()
    })
  }

  initRay() {
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let that = this
    const objs = that.hotPoints.map(item => { return item.sprite })

    function onMouseClick(event) {
      let clientX = 0
      let clientY = 0

      if (event.targetTouches) {
        // 移动端点击事件
        clientX = event.targetTouches[0].clientX
        clientY = event.targetTouches[0].clientY
      } else {
        // PC 点击事件
        clientX = event.clientX
        clientY = event.clientY
      }

      //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
      mouse.x = (clientX / that.stage.renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = - (clientY / that.stage.renderer.domElement.clientHeight) * 2 + 1;

      // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
      raycaster.setFromCamera(mouse, that.stage.camera);
      var intersects = raycaster.intersectObjects(objs);

      let name = null
      if (intersects.length > 0) {
        name = intersects[0].object.name
        // that.hotPoints[name - 1].click = true
        // camObj[name].fn(that.camCtl)
      } else {
        name = null
      }
      if (name != null) {
        that.hotPoints.forEach(item => {
          if (item.name == name) {
            item.click = !item.click
          } else {
            item.click = false
          }
        });
      } else {
        that.hotPoints.forEach(item => {
          item.click = false
        });
      }
    }

    function onMouseMove(event) {
      let clientX = 0
      let clientY = 0

      // PC 点击事件
      clientX = event.clientX
      clientY = event.clientY

      //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
      mouse.x = (clientX / that.stage.renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = - (clientY / that.stage.renderer.domElement.clientHeight) * 2 + 1;

      // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
      raycaster.setFromCamera(mouse, that.stage.camera);
      var intersects = raycaster.intersectObjects(objs);
      if (intersects.length > 0) {
        let name = intersects[0].object.name
        that.hotPoints[name - 1].changeColor(true)
      } else {
        that.hotPoints.forEach(item => {
          item.changeColor(false)
        });
      }
    }
    let canvas = that.stage.renderer.domElement;
    canvas.addEventListener('click', onMouseClick);
    canvas.addEventListener('touchstart', onMouseClick);
  }

  addPoint() {
    const size = 8
    let hotPoint1 = new HotPoint(this.stage, 1, { x: 25, y: 15, z: 0 })
    let hotPoint2 = new HotPoint(this.stage, 2, { x: -20, y: 15, z: 0 })
    let hotPoint3 = new HotPoint(this.stage, 3, { x: -40, y: -15, z: 0 })
    this.hotPoints.push(hotPoint1)
    this.hotPoints.push(hotPoint2)
    this.hotPoints.push(hotPoint3)
  }

  addWall2() {
    var loader = new GLTFLoader();
    loader.load('./model/scene.gltf', (gltf) => {
      let dragonFly = gltf.scene
      this.stage.scene.add(dragonFly);
      dragonFly.scale.set(20, 20, 20)
      dragonFly.position.y = -50
      dragonFly.rotation.set(0, 1.47, 0)
    }, e => {
      let load = document.querySelector(".loading > .count")
      var p = Math.max(parseInt(e.loaded / e.total | 1) * 100, 100)
      if (isNaN(p)) {
        if (p != undefined) {
          load.innerText = JSON.stringify(e).toString()
        }
        return
      }

      load.innerText = `${p}%`
      if (p == 100) {
        setTimeout(() => {
          document.querySelector(".box-loading").style.opacity = 0
          document.querySelector(".box-loading").style.zIndex = -1
        }, 500);
      }
    })
  }

  updateScreenPosition() {
    this.hotPoints.forEach(hot => {
      const name = hot.name
      this.setTip(`.tip${name}`, hot.click, hot.sprite.position)
    });
  }

  setTip(name, isShow, position) {
    const annotation = document.querySelector(name);
    const vector = new THREE.Vector3(position.x + 1, position.y + 1, position.z);
    const canvas = this.stage.renderer.domElement;

    vector.project(this.stage.camera);

    vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
    vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));

    annotation.style.top = `${vector.y}px`;
    annotation.style.left = `${vector.x}px`;
    annotation.style.opacity = isShow ? 1 : 0;
    annotation.style.zIndex = isShow ? 1 : -1;
  }

}

window.onload = () => {
  new App()
}
