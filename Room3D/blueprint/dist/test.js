"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var floorplanner_1 = require("./floorplanner/floorplanner");
var Blueprint3d = /** @class */ (function () {
    function Blueprint3d(options) {
        this.floorplanner = new floorplanner_1.Floorplanner(options.floorplannerElement);
        // this.model = new Model(options.textureDir);
        // this.three = new Three.Main(this.model, options.threeElement, options.threeCanvasElement, {});
        // if (!options.widget) {
        //   // this.floorplanner = new Floorplanner.Floorplanner(options.floorplannerElement, this.model.floorplan);
        // }
        // else {
        //   // this.three.getController().enabled = false;
        // }
        this.run();
    }
    Blueprint3d.prototype.run = function () {
        console.error('start...');
    };
    return Blueprint3d;
}());
window.Blueprint3d = Blueprint3d;
