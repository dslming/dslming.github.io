import { Time, normalizeQuadIn, zTween } from './Tool'
const THREE = (window as any).THREE

export class FF91Props {
  static Accel = 5;
  static Decel = -10;
  static MaxVel = 70 * 1610 / 3600;
  static MaxTurn = Math.PI * 0.2;
  static Length = 5.25;
  static Width = 2.283;
  static WheelTrack = 1.72;
  static WheelBase = 3.2;
  static WheelDiam = 0.78;
  static WheelCirc = FF91Props.WheelDiam * Math.PI;
  constructor () {
  }
}

export class CarProps {
    time: Time;
    velocity: any;
    speed: number;
    accel: number;
    pos: any;
    longitMomentum: number;
    lateralMomentum: number;
    wAngleInner: number;
    wAngleOuter: number;
    wAngleTarg: number;
    joyVec: any;
    keys: any[];
    braking: boolean;
    headLights: number;
    omega: number;
    theta: number;
    frameDist: any;
    wAngleSign: any;
    radFrontIn: any;
    radBackIn: any;
    radBackOut: any;
    radFrontOut: any;

  constructor () {
    this.time = new Time(undefined);
    this.velocity = new THREE.Vector2();
    this.speed = 1;
    this.accel = 0;
    this.pos = new THREE.Vector2();
    this.longitMomentum = 0;
    this.lateralMomentum = 0;
    this.wAngleInner = 0;
    this.wAngleOuter = 0;
    this.wAngleTarg = 0;
    this.joyVec = new THREE.Vector2();
    this.keys = new Array();
    this.braking = false;
    this.headLights = 2;
    this.omega = 0;
    this.theta = 0;
  }

  onKeyDown(evt: any) {
    if (this.keys.indexOf(evt.keyCode) === -1) {
      this.keys.push(evt.keyCode);
    }
  }

  onKeyUp(evt: any) {
    this.keys.splice(this.keys.indexOf(evt.keyCode), 1);
  }

  readKeyboardInput() {
    for (var i = 0; i < this.keys.length; i++) {
      switch (this.keys[i]) {
      case 38:
        this.accel += FF91Props.Accel;
        this.accel *= normalizeQuadIn(this.speed, FF91Props.MaxVel, FF91Props.MaxVel - 10);
        break;
      case 40:
        this.accel += FF91Props.Decel;
        break;
      case 37:
        this.wAngleTarg += FF91Props.MaxTurn;
        break;
      case 39:
        this.wAngleTarg -= FF91Props.MaxTurn;
        break;
      }
    }
  }

  onJoystickMove(_vec:any) {
    this.joyVec.x = _vec.x / -40;
    this.joyVec.y = _vec.y / -40;
    if (Math.abs(this.joyVec.x) > 0.85) {
      this.joyVec.y = 0;
    }
    if (Math.abs(this.joyVec.y) > 0.95) {
      this.joyVec.x = 0;
    }
  }

  onKnobMove(_vec:any, _section:any) {
    this.joyVec.x = _vec.x / -150;
    this.joyVec.y = _vec.y / -150;
    if (_section === 5 && Math.abs(this.joyVec.x) < 0.1) {
      this.joyVec.x = 0;
    }
  }

  readJoyStickInput() {
    this.wAngleTarg = this.joyVec.x * FF91Props.MaxTurn;
    if (this.joyVec.y >= 0) {
      this.accel = this.joyVec.y * FF91Props.Accel;
      this.accel *= normalizeQuadIn(this.speed, FF91Props.MaxVel, FF91Props.MaxVel - 10);
    } else {
      this.accel = this.joyVec.y * -FF91Props.Decel;
    }
  }

  changeHeadlights(_new:any) {
    this.headLights = THREE.Math.clamp(Math.round(_new), 0, 4);
  }

  update(_time:any) {
    if (this.time.update(_time) === false) {
      return false;
    }
    this.accel = 0;
    this.wAngleTarg = 0;
    if (this.keys.length > 0) {
      this.readKeyboardInput();
    } else if (this.joyVec.x != 0 || this.joyVec.y != 0) {
      this.readJoyStickInput();
    }
    this.accel *= this.time.delta;
    this.speed += this.accel;
    this.braking = this.accel < 0;
    if (this.speed < 0) {
      this.speed = 0;
      this.accel = 0;
    }
    this.frameDist = this.speed * this.time.delta;
    this.wAngleTarg *= normalizeQuadIn(this.speed, FF91Props.MaxVel + 10, 3);
    this.wAngleInner = zTween(this.wAngleInner, this.wAngleTarg, this.time.delta * 2);
    this.wAngleSign = this.wAngleInner > 0.001 ? 1 : this.wAngleInner < -0.001 ? -1 : 0;
    this.omega = this.wAngleInner * this.speed / FF91Props.WheelBase;
    this.theta += this.omega * this.time.delta;
    this.velocity.set(Math.cos(this.theta) * this.frameDist, -Math.sin(this.theta) * this.frameDist);
    this.pos.add(this.velocity);
    this.longitMomentum = zTween(this.longitMomentum, this.accel / this.time.delta, this.time.delta * 6);
    this.lateralMomentum = this.omega * this.speed;
    if (this.wAngleSign) {
      this.radFrontIn = FF91Props.WheelBase / Math.sin(this.wAngleInner);
      this.radBackIn = FF91Props.WheelBase / Math.tan(this.wAngleInner);
      this.radBackOut = this.radBackIn + FF91Props.WheelTrack * this.wAngleSign;
      this.wAngleOuter = Math.atan(FF91Props.WheelBase / this.radBackOut);
      this.radFrontOut = FF91Props.WheelBase / Math.sin(this.wAngleOuter);
    } else {
      this.radFrontOut = 100;
      this.radBackOut = 100;
      this.radBackIn = 100;
      this.radFrontIn = 100;
      this.wAngleOuter = 0;
    }
    return true;
  }
}