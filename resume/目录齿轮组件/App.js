// import * as THREE from './lib/three.module.js'
import { Stage } from './Stage.js'
window.THREE = THREE
const TweenLite = window.TweenLite
const Power2 = window.Power2

const positionNum = [
  {
    x: 0, y: 20, z: 50
  },
  {
    x: 40, y: 30, z: 0
  },
  {
    x: -40, y: 30, z: 0
  }
]

class App {
  constructor() {
    window.lm = this
    this.curve = null
    this.stage = new Stage("#app")
    this.addPlan()
    this.addCylinder()
    this.addText("01", { x: -4, y: 20, z: 0 }, 0xffffff)

    this.stage.run()
    this.addCard()
    this.stage.onUpdate(() => {
    })

    let index = 1
    setInterval(() => {
      index++
      if (index > 3) {
        index = 1
      }
      this.changeCare(index)
    }, 2000);
  }

  addCard() {
    var img1 = new THREE.TextureLoader().load("01.png");
    var m1 = new THREE.SpriteMaterial({ map: img1 });
    var card1 = new THREE.Sprite(m1);
    card1.name = "card1"

    var img2 = new THREE.TextureLoader().load("02.png");
    var m2 = new THREE.SpriteMaterial({ map: img2 });
    var card2 = new THREE.Sprite(m2);
    card2.name = "card2"

    var img3 = new THREE.TextureLoader().load("03.png");
    var m3 = new THREE.SpriteMaterial({ map: img3 });
    var card3 = new THREE.Sprite(m3);
    card3.name = "card3"


    card1.scale.set(20, 20, 20)
    card2.scale.set(20, 20, 20)
    card3.scale.set(20, 20, 20)

    card2.position.set(40, 30, 0)
    card3.position.set(-40, 30, 0)
    card1.position.set(0, 20, 50)

    this.stage.scene.add(card1);
    this.stage.scene.add(card2);
    this.stage.scene.add(card3);

    this.card1 = card1
    this.card2 = card2
    this.card3 = card3
  }

  /**
   *
   * @param {*} selectedNum 当前选择的编号 1~3
   */
  changeCare(selectedNum) {
    this.addText(`0${selectedNum}`, { x: -4, y: 20, z: 0 }, 0xffffff)
    switch (selectedNum) {
      case 1:
        TweenLite.to(this.card1.position, 1, {
          x: positionNum[0].x,
          y: positionNum[0].y,
          z: positionNum[0].z
        });

        TweenLite.to(this.card2.position, 1, {
          x: positionNum[1].x,
          y: positionNum[1].y,
          z: positionNum[1].z
        });

        TweenLite.to(this.card3.position, 1, {
          x: positionNum[2].x,
          y: positionNum[2].y,
          z: positionNum[2].z
        });

        // this.card1.position.set(positionNum[0].x, positionNum[0].y, positionNum[0].z)
        // this.card2.position.set(positionNum[1].x, positionNum[1].y, positionNum[1].z)
        // this.card3.position.set(positionNum[2].x, positionNum[2].y, positionNum[2].z)
        break;

      case 2:
        TweenLite.to(this.card2.position, 1, {
          x: positionNum[0].x,
          y: positionNum[0].y,
          z: positionNum[0].z
        });

        TweenLite.to(this.card1.position, 1, {
          x: positionNum[2].x,
          y: positionNum[2].y,
          z: positionNum[2].z
        });

        TweenLite.to(this.card3.position, 1, {
          x: positionNum[1].x,
          y: positionNum[1].y,
          z: positionNum[1].z
        });
        // this.card2.position.set(positionNum[0].x, positionNum[0].y, positionNum[0].z)
        // this.card1.position.set(positionNum[2].x, positionNum[2].y, positionNum[2].z)
        // this.card3.position.set(positionNum[1].x, positionNum[1].y, positionNum[1].z)
        break;

      case 3:
        TweenLite.to(this.card1.position, 1, {
          x: positionNum[1].x,
          y: positionNum[1].y,
          z: positionNum[1].z
        });
        TweenLite.to(this.card2.position, 1, {
          x: positionNum[2].x,
          y: positionNum[2].y,
          z: positionNum[2].z
        });
        TweenLite.to(this.card3.position, 1, {
          x: positionNum[0].x,
          y: positionNum[0].y,
          z: positionNum[0].z
        });
        // this.card1.position.set(positionNum[1].x, positionNum[1].y, positionNum[1].z)
        // this.card2.position.set(positionNum[2].x, positionNum[2].y, positionNum[2].z)
        // this.card3.position.set(positionNum[0].x, positionNum[0].y, positionNum[0].z)
        break;
    }
  }

  addText(text, position, color) {
    this.text && this.stage.scene.remove(this.text)

    // load font
    var loader = new THREE.FontLoader();
    loader.load('./lib/optimer_bold.typeface.json', (font) => {
      var mat = new THREE.MeshBasicMaterial({
        color,
      });
      let geo = new THREE.TextGeometry(text, { size: 8, height: 2, font })
      var mesh = new THREE.Mesh(geo, mat)
      mesh.name = "text"
      mesh.position.set(position.x, position.y, position.z)
      this.text = mesh
      this.stage.scene.add(mesh)
    })
  }

  addPlan() {
    var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20);
    var planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x17103a,
      wireframe: false
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.name = "plane"
    plane.rotation.x = -1.8;
    this.stage.scene.add(plane)
    this.stage.camera.position.set(0, 90, 120);
  }

  addCylinder() {
    var g1 = new THREE.CylinderGeometry(35, 35, 15, 32);
    var m1 = new THREE.MeshBasicMaterial({ color: 0x005676 });
    var c1 = new THREE.Mesh(g1, m1);
    c1.rotation.x = -0.2
    this.stage.scene.add(c1);
    c1.name = "c1"


    var g2 = new THREE.CylinderGeometry(25, 25, 8, 32);
    var m2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    var c2 = new THREE.Mesh(g2, m2);
    c2.rotation.x = -0.2
    c2.position.set(0, 8, 0)
    c2.name = "c2"
    this.stage.scene.add(c2);
  }
}

window.onload = () => {
  new App()
}
