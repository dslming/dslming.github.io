import CameraControl from './CameraControl'
import { zTween } from './Tool'

let THREE = (window as any).THREE

export default class Camera extends CameraControl {
    camera: any;
    vpW: any;
    vpH: any;
    forceUpdate: any;
    focusActual: any;
    gyro: any;
    rotActual: any;
    quatX: any;
    quatY: any;
    distActual: any;
    distTarget: any;

    constructor(options:any) {
      super(options)
      this.camera = new THREE.PerspectiveCamera(this.options.fov, this.vpW / this.vpH, 0.1, 100);
    }
    
    onWindowResize(vpW:any, vpH:any) {
      super.onWindowResize(vpW, vpH);
      this.camera.aspect = this.vpW / this.vpH;
      this.camera.updateProjectionMatrix();
    };
    
    update() {
      if (!this.forceUpdate && !this.changesOccurred()) {
        return false;
      }
      this.focusActual.lerp(this.focusTarget, 0.05);
      this.camera.position.copy(this.focusActual);
      if (this.gyro.alpha && this.gyro.beta && this.gyro.gamma) {
        this.camera.setRotationFromEuler(this.defaultEuler);
        this.camera.rotateZ(this.gyro.alpha * CameraControl.RADIANS);
        this.camera.rotateX(this.gyro.beta * CameraControl.RADIANS);
        this.camera.rotateY(this.gyro.gamma * CameraControl.RADIANS);
        this.camera.rotation.z += this.gyro.orient;
      } else {
        this.rotActual.lerp(this.rotTarget, 0.05);
        this.quatX.setFromAxisAngle(CameraControl.AXIS_X, -THREE.Math.degToRad(this.rotActual.y));
        this.quatY.setFromAxisAngle(CameraControl.AXIS_Y, -THREE.Math.degToRad(this.rotActual.x));
        this.quatY.multiply(this.quatX);
        this.camera.quaternion.copy(this.quatY);
      }
      if (this.distActual !== this.distTarget) {
        this.distActual = zTween(this.distActual, this.distTarget, 0.05);
      }
      this.camera.translateZ(this.distActual);
      this.forceUpdate = false;
      return true;
    }
}