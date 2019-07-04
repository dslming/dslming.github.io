"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Three = window.THREE;
var Blueprint3d = /** @class */ (function () {
    // private floorplanner: Floorplanner.Floorplanner;
    /** Creates an instance.
     * @param options The initialization options.
     */
    function Blueprint3d(options) {
        // this.model = new Model.Model(options.textureDir);
        // this.three = new Three.Main(this.model, options.threeElement, options.threeCanvasElement, {});
        if (!options.widget) {
            // this.floorplanner = new Floorplanner.Floorplanner(options.floorplannerElement, this.model.floorplan);
        }
        else {
            // this.three.getController().enabled = false;
        }
    }
    return Blueprint3d;
}());
exports.Blueprint3d = Blueprint3d;
