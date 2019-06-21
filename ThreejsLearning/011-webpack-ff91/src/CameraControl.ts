let THREE = (window as any).THREE

export default abstract class CameraControl {
  static RADIANS = Math.PI / 180;
  static AXIS_X = new THREE.Vector3(1, 0, 0);
  static AXIS_Y = new THREE.Vector3(0, 1, 0);

  forceUpdate: boolean;
  options: { 
    distance: number; 
    focusPos: any;
    rotation: any;
    rotRange: { xMax: number; xMin: number; yMax: number; yMin: number; }; 
    distRange: { max: number; min: number; }; 
    fov: number; 
    eyeSeparation: number; 
    smartUpdates: boolean; 
  };

  vpW: number;
  vpH: number;
  quatX: any;
  quatY: any;
  camHolder: any;
  gyro: { orient: number; alpha?: any, beta?: any, gamma?: any};
  defaultEuler: any;
  distActual: any;
  distTarget: any;
  focusActual: any;
  focusTarget: any;
  rotActual: any;
  rotTarget: any;

  constructor(_options: any) {
    this.forceUpdate = true;
    this.options = {
      distance: 90,
      focusPos: new THREE.Vector3(),
      rotation: new THREE.Vector3(),
      rotRange: {
        xMax: Number.POSITIVE_INFINITY,
        xMin: Number.NEGATIVE_INFINITY,
        yMax: 90,
        yMin: -90
      },
      distRange: {
        max: Number.POSITIVE_INFINITY,
        min: Number.NEGATIVE_INFINITY
      },
      fov: 45,
      eyeSeparation: 1.5,
      smartUpdates: false
    };
    this.readOptions(_options);
    this.vpW = window.innerWidth;
    this.vpH = window.innerHeight;
    this.quatX = new THREE.Quaternion();
    this.quatY = new THREE.Quaternion();
    this.camHolder = new THREE.Object3D();
    this.gyro = { orient: 0 };
    if (window.orientation !== undefined) {
      this.defaultEuler = new THREE.Euler(90 * CameraControl.RADIANS, 180 * CameraControl.RADIANS, (180 + parseInt(window.orientation.toString(), 10)) * CameraControl.RADIANS);
    } else {
      this.defaultEuler = new THREE.Euler(0, 0, 0);
    }
  }

  readOptions(_options: any) {
    var opt:any = this.options;
    for (var key in _options) {
      if (key === 'rotRange') {
        for (var key in _options.rotRange) {
          opt.rotRange[key] = _options.rotRange[key];
        }
      } else if (key === 'distRange') {
        for (var key in _options.distRange) {
          opt.distRange[key] = _options.distRange[key];
        }
      } else if (key === 'focusPos') {
        for (var key in _options.focusPos) {
          opt.focusPos[key] = _options.focusPos[key];
        }
      } else if (key === 'rotation') {
        for (var key in _options.rotation) {
          opt.rotation[key] = _options.rotation[key];
        }
      } else {
        opt[key] = _options[key];
      }
    }
    this.distActual = opt.distance;
    this.distTarget = opt.distance;
    this.focusActual = new THREE.Vector3(opt.focusPos.x, opt.focusPos.y, opt.focusPos.z);
    this.focusTarget = this.focusActual.clone();
    this.rotActual = new THREE.Vector3(opt.rotation.x, opt.rotation.y, opt.rotation.z);
    this.rotTarget = this.rotActual.clone();
  }

  setDistance(dist: any) {
    this.distTarget = dist;
    this.distTarget = THREE.Math.clamp(this.distTarget, this.options.distRange.min, this.options.distRange.max);
    this.forceUpdate = true;
  }

  setDistRange(max: any, min: any) {
    this.options.distRange.max = max;
    this.options.distRange.min = min;
  }

  setRotation(_rotX: any, _rotY: any, _rotZ: any) {
    if (_rotX === void 0) {
      _rotX = 0;
    }
    if (_rotY === void 0) {
      _rotY = 0;
    }
    if (_rotZ === void 0) {
      _rotZ = 0;
    }
    this.rotActual.set(_rotX, _rotY, _rotZ);
    this.rotTarget.set(_rotX, _rotY, _rotZ);
    this.gyro.alpha = undefined;
    this.gyro.beta = undefined;
    this.gyro.gamma = undefined;
    this.forceUpdate = true;
  }

  setRotRange(xMax: number, xMin: number, yMax: number, yMin: number) {
    this.options.rotRange.xMax = xMax !== undefined ? xMax : this.options.rotRange.xMax;
    this.options.rotRange.xMin = xMin !== undefined ? xMin : this.options.rotRange.xMin;
    this.options.rotRange.yMax = yMax !== undefined ? yMax : this.options.rotRange.yMax;
    this.options.rotRange.yMin = yMin !== undefined ? yMin : this.options.rotRange.yMin;
  }

  clearRotRange() {
    this.options.rotRange.xMax = Number.POSITIVE_INFINITY;
    this.options.rotRange.xMin = Number.NEGATIVE_INFINITY;
    this.options.rotRange.yMax = Number.POSITIVE_INFINITY;
    this.options.rotRange.yMin = Number.NEGATIVE_INFINITY;
  }

  setFocusPos(_posX: any, _posY: any, _posZ: any) {
    if (_posX === void 0) {
      _posX = 0;
    }
    if (_posY === void 0) {
      _posY = 0;
    }
    if (_posZ === void 0) {
      _posZ = 0;
    }
    this.focusActual.set(_posX, _posY, _posZ);
    this.focusTarget.set(_posX, _posY, _posZ);
    this.forceUpdate = true;
  }

  getDistance() {
    return this.distTarget;
  }

  dolly(distance: any) {
    this.distTarget += distance;
    this.distTarget = THREE.Math.clamp(this.distTarget, this.options.distRange.min, this.options.distRange.max);
  }

  orbitBy(angleX: any, angleY: any) {
    this.rotTarget.x += angleX;
    this.rotTarget.y += angleY;
    this.rotTarget.x = THREE.Math.clamp(this.rotTarget.x, this.options.rotRange.xMin, this.options.rotRange.xMax);
    this.rotTarget.y = THREE.Math.clamp(this.rotTarget.y, this.options.rotRange.yMin, this.options.rotRange.yMax);
  }

  orbitTo(angleX: any, angleY: any) {
    this.rotTarget.x = angleX;
    this.rotTarget.y = angleY;
    this.rotTarget.x = THREE.Math.clamp(this.rotTarget.x, this.options.rotRange.xMin, this.options.rotRange.xMax);
    this.rotTarget.y = THREE.Math.clamp(this.rotTarget.y, this.options.rotRange.yMin, this.options.rotRange.yMax);
  }

  pan(distX: any, distY: any) {
    this.focusTarget.x -= distX;
    this.focusTarget.y += distY;
  }

  onWindowResize(vpW: any, vpH: any) {
    this.vpW = vpW;
    this.vpH = vpH;
    this.forceUpdate = true;
  }

  onDeviceReorientation(orientation: any) {
    this.gyro.orient = orientation * CameraControl.RADIANS;
    this.forceUpdate = true;
  }

  onGyroMove(alpha: any, beta: any, gamma: any) {
    var acc = this.gyro;
    acc.alpha = alpha;
    acc.beta = beta;
    acc.gamma = gamma;
  }

  follow(target: any) {
    this.distTarget = THREE.Math.clamp(this.distTarget, this.options.distRange.min, this.options.distRange.max);
    this.distActual += (this.distTarget - this.distActual) * 0.01;
    this.focusTarget.set(target.x, target.y + 1, target.z + this.distActual);
    this.focusActual.lerp(this.focusTarget, 0.01);
    this.camHolder.position.copy(this.focusActual);
    this.camHolder.lookAt(target);
  }

  changesOccurred() {
    if (this.options.smartUpdates && this.rotActual.manhattanDistanceTo(this.rotTarget) < 0.01 && Math.abs(this.distActual - this.distTarget) < 0.01 && this.focusActual.manhattanDistanceTo(this.focusTarget) < 0.01) {
      return false;
    }
    return true;
  }
}