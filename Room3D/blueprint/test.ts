import * as THREE from "three";
import Model from './model/model'

(window as any ).THREE = THREE
export interface Options {
  /** */
  widget?: boolean;
  /**3D Viewer */
  threeElement?: string;
  /** 2D Floorplanner */
  floorplannerElement?: string;
  /** The texture directory. */
  textureDir: string;
}

class Blueprint3d {
  private model: Model;

  private three: any; // Three.Main;
  // private floorplanner: Floorplanner.Floorplanner;

  constructor(options: Options) {
    this.model = new Model(options.textureDir);
    // this.three = new Three.Main(this.model, options.threeElement, options.threeCanvasElement, {});

    if (!options.widget) {
      // this.floorplanner = new Floorplanner.Floorplanner(options.floorplannerElement, this.model.floorplan);
    }
    else {
      // this.three.getController().enabled = false;
    }
  }
}

(window as any).Blueprint3d = Blueprint3d
