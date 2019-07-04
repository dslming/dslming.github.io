export interface Options {
  /** */
  widget?: boolean;
  /**3D Viewer */
  threeElement?: string;
  /** */
  threeCanvasElement? : string;
  /** 2D Floorplanner */
  floorplannerElement?: string;
  /** The texture directory. */
  textureDir?: string;
}

const Three = (window as any).THREE
export class Blueprint3d {
  // private model: Model.Model;
  private three: any; // Three.Main;
  // private floorplanner: Floorplanner.Floorplanner;

  /** Creates an instance.
   * @param options The initialization options.
   */
  constructor(options: Options) {
    // this.model = new Model.Model(options.textureDir);
    // this.three = new Three.Main(this.model, options.threeElement, options.threeCanvasElement, {});

    if (!options.widget) {
      // this.floorplanner = new Floorplanner.Floorplanner(options.floorplannerElement, this.model.floorplan);
    }
    else {
      // this.three.getController().enabled = false;
    }
  }
}