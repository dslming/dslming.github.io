/**
 * /// <reference path="../../lib/jQuery.d.ts" />
/// <reference path="../model/floorplan.ts" />
/// <reference path="floorplanner_view.ts" />
 */
// grid parameters
const gridSpacing = 20; // pixels
const gridWidth = 1;
const gridColor = "#f1f1f1";

// room config
const roomColor = "#f9f9f9";

// wall config
const wallWidth = 5;
const wallWidthHover = 7;
const wallColor = "#dddddd"
const wallColorHover = "#008cba"
const edgeColor = "#888888"
const edgeColorHover = "#008cba"
const edgeWidth = 1

const deleteColor = "#ff0000";

// corner config
const cornerRadius = 0
const cornerRadiusHover = 7
const cornerColor = "#cccccc"
const cornerColorHover = "#008cba"

const floorplannerModes = {
  MOVE: 0,
  DRAW: 1,
  DELETE: 2
};

/** how much will we move a corner to make a wall axis aligned (cm) */
const snapTolerance = 25;

// FloorPlanner用于呈现/交互的视图。
export class FloorplannerView {
  /** The canvas element. */
  private canvasElement: HTMLCanvasElement;
  private viewmodel: Floorplanner
  /** The 2D context. */
  private context: any;

  /** */
  constructor(canvasEle: HTMLCanvasElement, viewmodel: Floorplanner) {
    this.canvasElement = canvasEle
    this.context = this.canvasElement.getContext('2d');
    this.viewmodel = viewmodel
    var scope = this;
    window.onresize = () => {
      scope.handleWindowResize();
    }
    this.handleWindowResize();
  }

  /** */
  public handleWindowResize() {
    var canvasSel = this.canvasElement
    var parent: HTMLElement = canvasSel.parentElement || document.body
    canvasSel.style.height = `${parent.clientHeight} px`
    canvasSel.style.width = `${parent.clientWidth} px`
    this.canvasElement.height = parent.clientHeight
    this.canvasElement.width = parent.clientWidth
    this.draw();
  }

  /** */
  public draw() {
    this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.drawGrid();
    // this.floorplan.getRooms().forEach((room) => {
    //   this.drawRoom(room);
    // })
    // this.floorplan.getWalls().forEach((wall) => {
    //   this.drawWall(wall);
    // });
    // this.floorplan.getCorners().forEach((corner) => {
    //   this.drawCorner(corner);
    // });
    if (this.viewmodel.mode == floorplannerModes.DRAW) {
      this.drawTarget(this.viewmodel.targetX, this.viewmodel.targetY, this.viewmodel.lastNode);
    }
    // this.floorplan.getWalls().forEach((wall) => {
    //   this.drawWallLabels(wall);
    // });
  }

  /** */
  private drawWallLabels(wall: any) {
    // // we'll just draw the shorter label... idk
    // if (wall.backEdge && wall.frontEdge) {
    //   if (wall.backEdge.interiorDistance < wall.frontEdge.interiorDistance) {
    //     this.drawEdgeLabel(wall.backEdge);
    //   } else {
    //     this.drawEdgeLabel(wall.frontEdge);
    //   }
    // } else if (wall.backEdge) {
    //   this.drawEdgeLabel(wall.backEdge);
    // } else if (wall.frontEdge) {
    //   this.drawEdgeLabel(wall.frontEdge);
    // }
  }

  /** */
  private drawWall(wall: any) {
    // var hover = (wall === this.viewmodel.activeWall);
    // var color = wallColor;
    // if (hover && this.viewmodel.mode == floorplannerModes.DELETE) {
    //   color = deleteColor;
    // } else if (hover) {
    //   color = wallColorHover;
    // }
    // this.drawLine(
    //   this.viewmodel.convertX(wall.getStartX()),
    //   this.viewmodel.convertY(wall.getStartY()),
    //   this.viewmodel.convertX(wall.getEndX()),
    //   this.viewmodel.convertY(wall.getEndY()),
    //   hover ? wallWidthHover : wallWidth,
    //   color
    // );
    // if (!hover && wall.frontEdge) {
    //   this.drawEdge(wall.frontEdge, hover);
    // }
    // if (!hover && wall.backEdge) {
    //   this.drawEdge(wall.backEdge, hover);
    // }
  }

  /** */
  // private drawEdgeLabel(edge: Model.HalfEdge) {
  //   var pos = edge.interiorCenter();
  //   var length = edge.interiorDistance();
  //   if (length < 60) {
  //     // dont draw labels on walls this short
  //     return;
  //   }
  //   this.context.font = "normal 12px Arial";
  //   this.context.fillStyle = "#000000";
  //   this.context.textBaseline = "middle";
  //   this.context.textAlign = "center";
  //   this.context.strokeStyle = "#ffffff";
  //   this.context.lineWidth = 4;

  //   this.context.strokeText(Core.Dimensioning.cmToMeasure(length),
  //     this.viewmodel.convertX(pos.x),
  //     this.viewmodel.convertY(pos.y));
  //   this.context.fillText(Core.Dimensioning.cmToMeasure(length),
  //     this.viewmodel.convertX(pos.x),
  //     this.viewmodel.convertY(pos.y));
  // }

  /** */
  // private drawEdge(edge: Model.HalfEdge, hover) {
  //   var color = edgeColor;
  //   if (hover && this.viewmodel.mode == floorplannerModes.DELETE) {
  //     color = deleteColor;
  //   } else if (hover) {
  //     color = edgeColorHover;
  //   }
  //   var corners = edge.corners();

  //   var scope = this;
  //   this.drawPolygon(
  //     Core.Utils.map(corners, function (corner) {
  //       return scope.viewmodel.convertX(corner.x);
  //     }),
  //     Core.Utils.map(corners, function (corner) {
  //       return scope.viewmodel.convertY(corner.y);
  //     }),
  //     false,
  //     null,
  //     true,
  //     color,
  //     edgeWidth
  //   );
  // }

  /** */
  // private drawRoom(room: Model.Room) {
  //   var scope = this;
  //   this.drawPolygon(
  //     Core.Utils.map(room.corners, (corner: Model.Corner) => {
  //       return scope.viewmodel.convertX(corner.x);
  //     }),
  //     Core.Utils.map(room.corners, (corner: Model.Corner) =>  {
  //       return scope.viewmodel.convertY(corner.y);
  //     }),
  //     true,
  //     roomColor
  //   );
  // }

  /** */
  // private drawCorner(corner: Model.Corner) {
  //   var hover = (corner === this.viewmodel.activeCorner);
  //   var color = cornerColor;
  //   if (hover && this.viewmodel.mode == floorplannerModes.DELETE) {
  //     color = deleteColor;
  //   } else if (hover) {
  //     color = cornerColorHover;
  //   }
  //   this.drawCircle(
  //     this.viewmodel.convertX(corner.x),
  //     this.viewmodel.convertY(corner.y),
  //     hover ? cornerRadiusHover : cornerRadius,
  //     color
  //   );
  // }

  /** */
  private drawTarget(x: number, y: number, lastNode: any) {
    this.drawCircle(
      this.viewmodel.convertX(x),
      this.viewmodel.convertY(y),
      cornerRadiusHover,
      cornerColorHover
    );
    if (this.viewmodel.lastNode) {
      this.drawLine(
        this.viewmodel.convertX(lastNode.x),
        this.viewmodel.convertY(lastNode.y),
        this.viewmodel.convertX(x),
        this.viewmodel.convertY(y),
        wallWidthHover,
        wallColorHover
      );
    }
  }

  /** */
  private drawLine(startX: number, startY: number, endX: number, endY: number, width: number, color: any) {
    // width is an integer
    // color is a hex string, i.e. #ff0000
    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);
    this.context.lineWidth = width;
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  /** */
  // private drawPolygon(xArr, yArr, fill, fillColor, stroke?, strokeColor?, strokeWidth?) {
  //   // fillColor is a hex string, i.e. #ff0000
  //   fill = fill || false;
  //   stroke = stroke || false;
  //   this.context.beginPath();
  //   this.context.moveTo(xArr[0], yArr[0]);
  //   for (var i = 1; i < xArr.length; i++) {
  //     this.context.lineTo(xArr[i], yArr[i]);
  //   }
  //   this.context.closePath();
  //   if (fill) {
  //     this.context.fillStyle = fillColor;
  //     this.context.fill();
  //   }
  //   if (stroke) {
  //     this.context.lineWidth = strokeWidth;
  //     this.context.strokeStyle = strokeColor;
  //     this.context.stroke();
  //   }
  // }

  /** */
  private drawCircle(centerX: any, centerY: any, radius: any, fillColor: any) {
    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = fillColor;
    this.context.fill();
  }

  /** returns n where -gridSize/2 < n <= gridSize/2  */
  private calculateGridOffset(n: any) {
    if (n >= 0) {
      return (n + gridSpacing / 2.0) % gridSpacing - gridSpacing / 2.0;
    } else {
      return (n - gridSpacing / 2.0) % gridSpacing + gridSpacing / 2.0;
    }
  }

  /**
   * 绘制格子
  */
  public drawGrid() {
    var offsetX = this.calculateGridOffset(-this.viewmodel.originX);
    var offsetY = this.calculateGridOffset(-this.viewmodel.originY);
    var width = this.canvasElement.width;
    var height = this.canvasElement.height;
    for (var x = 0; x <= (width / gridSpacing); x++) {
      this.drawLine(gridSpacing * x + offsetX, 0, gridSpacing * x + offsetX, height, gridWidth, gridColor);
    }
    for (var y = 0; y <= (height / gridSpacing); y++) {
      this.drawLine(0, gridSpacing * y + offsetY, width, gridSpacing * y + offsetY, gridWidth, gridColor);
    }
  }
}

/**
 * FloorPlanner实现了一个用于创建楼层平面图的交互式工具。
 * The Floorplanner implements an interactive tool for creation of floorplans.
 */
export class Floorplanner {
  /** */
  public mode = 0;
  /** */
  public activeWall: any;
  /** */
  public activeCorner: any;
  /** */
  public originX = 0;
  /** */
  public originY = 0;
  /** drawing state */
  public targetX = 0;
  /** drawing state */
  public targetY = 0;
  /** drawing state */
  public lastNode: any;
  /** */
  private wallWidth: number;
  /** */
  // private modeResetCallbacks = $.Callbacks();
  /** */
  private canvasElement: any;
  /** */
  public view: FloorplannerView;
  /** */
  private mouseDown = false;
  /** */
  private mouseMoved = false;
  /** in ThreeJS coords */
  private mouseX = 0;
  /** in ThreeJS coords */
  private mouseY = 0;
  /** in ThreeJS coords */
  private rawMouseX = 0;
  /** in ThreeJS coords */
  private rawMouseY = 0;
  /** mouse position at last click */
  private lastX = 0;
  private lastY = 0;
  /** */
  private cmPerPixel: number;
  /** */
  private pixelsPerCm: number;
  /** */
  constructor(canvas: string) {
    this.canvasElement = document.querySelector(`#${canvas}`)
    this.view = new FloorplannerView(this.canvasElement, this);
    var cmPerFoot = 30.48;
    var pixelsPerFoot = 15.0;
    this.cmPerPixel = cmPerFoot * (1.0 / pixelsPerFoot);
    this.pixelsPerCm = 1.0 / this.cmPerPixel;
    this.wallWidth = 10.0 * this.pixelsPerCm;
    // Initialization:
    this.setMode(floorplannerModes.DRAW);
    var scope = this;
    this.canvasElement.onmousedown = () => {
      scope.mousedown();
    };
    this.canvasElement.onmousemove = (event: any) => {
      scope.mousemove(event);
    };
    this.canvasElement.onmouseup = () => {
      scope.mouseup();
    };
    this.canvasElement.onmouseleave = () => {
      scope.mouseleave();
    };

    this.view.drawGrid()
    document.onkeyup = (e: any) => {
      if (e.keyCode == 27) {
        scope.escapeKey();
      }
    }
    // floorplan.roomLoadedCallbacks.add(() => {
    //   scope.reset()
    // });
  }

  /** */
  private escapeKey() {
    this.setMode(floorplannerModes.MOVE);
  }

  /** */
  private updateTarget() {
    if (this.mode == floorplannerModes.DRAW && this.lastNode) {
      if (Math.abs(this.mouseX - this.lastNode.x) < snapTolerance) {
        this.targetX = this.lastNode.x;
      } else {
        this.targetX = this.mouseX;
      }
      if (Math.abs(this.mouseY - this.lastNode.y) < snapTolerance) {
        this.targetY = this.lastNode.y;
      } else {
        this.targetY = this.mouseY;
      }
    } else {
      this.targetX = this.mouseX;
      this.targetY = this.mouseY;
    }

    this.view.draw();
  }

  /** */
  private mousedown() {
    this.mouseDown = true;
    this.mouseMoved = false;
    this.lastX = this.rawMouseX;
    this.lastY = this.rawMouseY;

    // delete
    if (this.mode == floorplannerModes.DELETE) {
      if (this.activeCorner) {
        this.activeCorner.removeAll();
      } else if (this.activeWall) {
        this.activeWall.remove();
      } else {
        this.setMode(floorplannerModes.MOVE);
      }
    }
  }

  /** */
  private mousemove(event: any) {
    this.mouseMoved = true;
    // update mouse
    this.rawMouseX = event.clientX;
    this.rawMouseY = event.clientY;

    this.mouseX = (event.clientX - this.canvasElement.offsetLeft) * this.cmPerPixel + this.originX * this.cmPerPixel;
    this.mouseY = (event.clientY - this.canvasElement.offsetTop) * this.cmPerPixel + this.originY * this.cmPerPixel;

    // update target (snapped position of actual mouse)
    if (this.mode == floorplannerModes.DRAW || (this.mode == floorplannerModes.MOVE && this.mouseDown)) {
      this.updateTarget();
    }

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
    if (this.mouseDown && !this.activeCorner && !this.activeWall) {
      this.originX += (this.lastX - this.rawMouseX);
      this.originY += (this.lastY - this.rawMouseY);
      this.lastX = this.rawMouseX;
      this.lastY = this.rawMouseY;
      this.view.draw();
    }

    // dragging 拖动
    if (this.mode == floorplannerModes.MOVE && this.mouseDown) {
      if (this.activeCorner) {
        this.activeCorner.move(this.mouseX, this.mouseY);
        this.activeCorner.snapToAxis(snapTolerance);
      } else if (this.activeWall) {
        this.activeWall.relativeMove(
          (this.rawMouseX - this.lastX) * this.cmPerPixel,
          (this.rawMouseY - this.lastY) * this.cmPerPixel
        );
        this.activeWall.snapToAxis(snapTolerance);
        this.lastX = this.rawMouseX;
        this.lastY = this.rawMouseY;
      }
      this.view.draw();
    }
  }

  /** */
  private mouseup() {
    this.mouseDown = false;

    // drawing
    // if (this.mode == floorplannerModes.DRAW && !this.mouseMoved) {
    if (this.mode == floorplannerModes.DRAW) {
      // var corner = this.floorplan.newCorner(this.targetX, this.targetY);
      if (this.lastNode != null) {
        // this.floorplan.newWall(this.lastNode, corner);
      }
      // if (corner.mergeWithIntersected() && this.lastNode != null) {
      // this.setMode(floorplannerModes.MOVE);
      // }
      // this.lastNode = corner;

      this.lastNode = {
        x: this.targetX,
        y: this.targetY
      }
    }
  }

  /** */
  private mouseleave() {
    this.mouseDown = false;
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
  private setMode(mode: number) {
    this.lastNode = null;
    this.mode = mode;
    // this.modeResetCallbacks.fire(mode);
    this.updateTarget();
  }

  /** Sets the origin so that floorplan is centered */
  private resetOrigin() {
    // var centerX = this.canvasElement.innerWidth() / 2.0;
    // var centerY = this.canvasElement.innerHeight() / 2.0;
    // var centerFloorplan = this.floorplan.getCenter();
    // this.originX = centerFloorplan.x * this.pixelsPerCm - centerX;
    // this.originY = centerFloorplan.z * this.pixelsPerCm - centerY;
  }

  /** Convert from THREEjs coords to canvas coords. */
  public convertX(x: number): number {
    return (x - this.originX * this.cmPerPixel) * this.pixelsPerCm;
  }

  /** Convert from THREEjs coords to canvas coords. */
  public convertY(y: number): number {
    return (y - this.originY * this.cmPerPixel) * this.pixelsPerCm;
  }
}
