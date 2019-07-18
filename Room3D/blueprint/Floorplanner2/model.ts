/** 当前的模式 */
enum FloorPlannerMode {
  /** 平移 */
  MOVE = 'MOVE',
  /** 绘画 */
  DRAW = 'DRAW',
  /** 删除 */
  DELETE = 'DELETE'
};

enum MouseStatus {
  DOWN = 'DOWN',
  MOVE = 'MOVE',
  UP = 'UP',
  LEAVE = 'LEAVE'
}

interface ModelInterface {
  getData(): any
  setData(obj: any): void
}

interface WallLine {
  index: number,
  data: Array<any>
}
/**
 * floorplanner 的所有数据集合
 */

let data: any = {
  namespace: 'floorpanner',
  mode: FloorPlannerMode.DRAW,
  mouse: {
    originX: 0,
    originY: 0,
    targetX: 0,
    targetY: 0,
    /** in ThreeJS coords */
    mouseX: 0,
    mouseY: 0,
    /** 鼠标移动时最后一个数据 */
    rawMouseX: 0,
    rawMouseY: 0,
    /** 鼠标按下时的坐标 */
    lastX: 0,
    lastY: 0,
    status: MouseStatus.UP,
    // 鼠标的上一个状态
    lastNode: null
  },
  camera: {
    cmPerPixel: 0,
    pixelsPerCm: 0,
  },
  wall: {
    wallWidth: 0,
    lines: []
  }
}

class Model implements ModelInterface {
  getData() {
    return data
  }

  setData(newData: any) {
    for (let key in newData) {
      if (key === 'mode') {
        data.mode = newData.mode
      } else if (key === 'mouse') {
        for (let keyMouse in newData.mouse) {
          data.mouse[keyMouse] = newData.mouse[keyMouse]
        }
      } else if (key === 'camera') {
        for (let keyCamera in newData.camera) {
          data.camera[keyCamera] = newData.camera[keyCamera]
        }
      } else if (key === 'wall') {
        for (let keyWall in newData.wall) {
          data.wall[keyWall] = newData.wall[keyWall]
        }
      } else {
        data[key] = newData[key];
      }
    }
  }
}

export {
  FloorPlannerMode,
  ModelInterface,
  MouseStatus,
  Model
}
