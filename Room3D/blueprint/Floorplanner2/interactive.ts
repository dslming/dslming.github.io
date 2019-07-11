/**
 * 与浏览器交互的封装
 */
import { ModelInterface, MouseStatus, FloorPlannerMode } from './Model'
import { DrawInterface } from './Draw'
export class Interactive {
  private model: ModelInterface
  private draw!: DrawInterface
  private canvasElement: any

  constructor(canvasEle: any, model: ModelInterface, draw: DrawInterface) {
    this.model = model
    this.draw = draw
    // this.canvasElement = document.querySelector(`#${canvas}`)
    // this.view = new FloorplannerView(this.canvasElement, this);
    this.canvasElement = canvasEle
    let cmPerFoot = 30.48;
    let pixelsPerFoot = 15.0;
    let cmPerPixel = cmPerFoot * (1.0 / pixelsPerFoot);
    let pixelsPerCm = 1.0 / cmPerPixel;
    let wallWidth = 10.0 * pixelsPerCm;

    // 更新model
    this.model.setData({
      camera: {
        cmPerPixel,
        pixelsPerCm,
      },
      wall: {
        wallWidth
      }
    })
    // Initialization:
    // this.setMode(FloorPlannerMode.DRAW);
    this.canvasElement.onmousedown = () => {
      this.mousedown();
    };
    this.canvasElement.onmousemove = (event: any) => {
      this.mousemove(event);
    };
    this.canvasElement.onmouseup = () => {
      this.mouseup();
    };
    this.canvasElement.onmouseleave = () => {
      this.mouseleave();
    };

    // this.view.drawGrid()
    document.onkeyup = (e: any) => {
      if (e.keyCode == 27) {
        this.escapeKey();
      }
    }

    this.draw.drawGrid()
    // floorplan.roomLoadedCallbacks.add(() => {
    //   scope.reset()
    // });
  }

  /** */
  private escapeKey() {
    // this.setMode(FloorPlannerMode.MOVE);
  }

  /** */
  private updateTarget() {
    // if (this.mode == floorplannerModes.DRAW && this.lastNode) {
    //   if (Math.abs(this.mouseX - this.lastNode.x) < snapTolerance) {
    //     this.targetX = this.lastNode.x;
    //   } else {
    //     this.targetX = this.mouseX;
    //   }
    //   if (Math.abs(this.mouseY - this.lastNode.y) < snapTolerance) {
    //     this.targetY = this.lastNode.y;
    //   } else {
    //     this.targetY = this.mouseY;
    //   }
    // } else {
    //   this.targetX = this.mouseX;
    //   this.targetY = this.mouseY;
    // }
    let { mouse: { mouseX, mouseY } } = this.model.getData()
    this.model.setData({
      mouse: {
        targetX: mouseX,
        targetY: mouseY,
      }
    })
    this.draw.drawAll()
  }

  /** */
  private mousedown() {
    let { mouse: { rawMouseX, rawMouseY } } = this.model.getData()

    this.model.setData({
      mouse: {
        status: MouseStatus.DOWN,
        lastX: rawMouseX,
        lastY: rawMouseY,
      }
    })
    console.error('mousedown', this.model.getData())


    // delete
    // if (this.mode == floorplannerModes.DELETE) {
    //   if (this.activeCorner) {
    //     this.activeCorner.removeAll();
    //   } else if (this.activeWall) {
    //     this.activeWall.remove();
    //   } else {
    //     this.setMode(floorplannerModes.MOVE);
    //   }
    // }
  }

  /** */
  private mousemove(event: any) {
    let { camera: { cmPerPixel }, mouse: { originX, originY } } = this.model.getData()

    let mouseX = (event.clientX - this.canvasElement.offsetLeft) * cmPerPixel + originX * cmPerPixel;
    let mouseY = (event.clientY - this.canvasElement.offsetTop) * cmPerPixel + originY * cmPerPixel;
    this.model.setData({
      mouse: {
        status: MouseStatus.MOVE,
        rawMouseX: event.clientX,
        rawMouseY: event.clientY,
        mouseX,
        mouseY,
      },
    })

    // let { mouse: { status } } = this.model.getData()
    // console.error('mousemove', this.model.getData())
    // update target (snapped position of actual mouse)
    // if (this.mode == floorplannerModes.DRAW || (this.mode == floorplannerModes.MOVE && this.mouseDown)) {
    this.updateTarget();
    // }

    // update object target
    // if (this.mode != floorplannerModes.DRAW && !this.mouseDown) {
    //   // var hoverCorner = this.floorplan.overlappedCorner(this.mouseX, this.mouseY);
    //   // var hoverWall = this.floorplan.overlappedWall(this.mouseX, this.mouseY);
    //   var draw = true;
    //   // if (hoverCorner != this.activeCorner) {
    //   //   this.activeCorner = hoverCorner;
    //   //   draw = true;
    //   // }
    //   // // corner takes precendence
    //   // if (this.activeCorner == null) {
    //   //   if (hoverWall != this.activeWall) {
    //   //     this.activeWall = hoverWall;
    //   //     draw = true;
    //   //   }
    //   // } else {
    //   //   this.activeWall = null;
    //   // }
    //   if (draw) {
    //     this.view.draw();
    //   }
    // }

    // panning 平移
    // if (this.mouseDown && !this.activeCorner && !this.activeWall) {
    //   this.originX += (this.lastX - this.rawMouseX);
    //   this.originY += (this.lastY - this.rawMouseY);
    //   this.lastX = this.rawMouseX;
    //   this.lastY = this.rawMouseY;
    //   this.view.draw();
    // }

    // dragging 拖动
    // if (this.mode == floorplannerModes.MOVE && this.mouseDown) {
    //   if (this.activeCorner) {
    //     this.activeCorner.move(this.mouseX, this.mouseY);
    //     this.activeCorner.snapToAxis(snapTolerance);
    //   } else if (this.activeWall) {
    //     this.activeWall.relativeMove(
    //       (this.rawMouseX - this.lastX) * this.cmPerPixel,
    //       (this.rawMouseY - this.lastY) * this.cmPerPixel
    //     );
    //     this.activeWall.snapToAxis(snapTolerance);
    //     this.lastX = this.rawMouseX;
    //     this.lastY = this.rawMouseY;
    //   }
    //   this.view.draw();
    // }
  }

  /** */
  private mouseup() {
    let { mouse: { status, targetX, targetY } } = this.model.getData()
    this.model.setData({
      mouse: {
        status: MouseStatus.UP,
        lastNode: {
          targetX,
          targetY
        }
      }
    })
    console.error('mouseup', status)
    // drawing
    // if (this.mode == floorplannerModes.DRAW && !this.mouseMoved) {
    // if (this.mode == floorplannerModes.DRAW) {
    //   // var corner = this.floorplan.newCorner(this.targetX, this.targetY);
    //   if (this.lastNode != null) {
    //     // this.floorplan.newWall(this.lastNode, corner);
    //   }
    //   // if (corner.mergeWithIntersected() && this.lastNode != null) {
    //   // this.setMode(floorplannerModes.MOVE);
    //   // }
    //   // this.lastNode = corner;

    //   this.lastNode = {
    //     x: this.targetX,
    //     y: this.targetY
    //   }
    // }
  }

  /** */
  private mouseleave() {
    this.model.setData({
      mouse: {
        status: MouseStatus.LEAVE
      }
    })
    this.setMode(FloorPlannerMode.MOVE)
    // this.mouseDown = false;
    //scope.setMode(scope.modes.MOVE);
  }

  /** */
  private reset() {
    // this.resizeView();
    // this.setMode(floorplannerModes.MOVE);
    // this.resetOrigin();
    // this.view.draw();
  }

  /** */
  private resizeView() {
    // this.view.handleWindowResize();
  }

  /** */
  // private setMode(mode: number) {
  //   this.lastNode = null;
  //   this.mode = mode;
  //   // this.modeResetCallbacks.fire(mode);
  //   this.updateTarget();
  // }

  /** Sets the origin so that floorplan is centered */
  private resetOrigin() {
    // var centerX = this.canvasElement.innerWidth() / 2.0;
    // var centerY = this.canvasElement.innerHeight() / 2.0;
    // var centerFloorplan = this.floorplan.getCenter();
    // this.originX = centerFloorplan.x * this.pixelsPerCm - centerX;
    // this.originY = centerFloorplan.z * this.pixelsPerCm - centerY;
  }
  private setMode(mode: FloorPlannerMode) {
    this.model.setData({
      mouse: {
        lastNode: null
      },
      mode: mode
    })
    // this.modeResetCallbacks.fire(mode);
    this.updateTarget();
  }


}
