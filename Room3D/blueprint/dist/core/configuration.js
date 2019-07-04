"use strict";
/// <reference path="dimensioning.ts" />
var BP3D;
(function (BP3D) {
    var Core;
    (function (Core) {
        // GENERAL:
        /** The dimensioning unit for 2D floorplan measurements. */
        Core.configDimUnit = "dimUnit";
        // WALL:
        /** The initial wall height in cm. */
        Core.configWallHeight = "wallHeight";
        /** The initial wall thickness in cm. */
        Core.configWallThickness = "wallThickness";
        /** Global configuration to customize the whole system.  */
        var Configuration = /** @class */ (function () {
            function Configuration() {
            }
            /** Set a configuration parameter. */
            Configuration.setValue = function (key, value) {
                this.data[key] = value;
            };
            /** Get a string configuration parameter. */
            Configuration.getStringValue = function (key) {
                switch (key) {
                    case Core.configDimUnit:
                        return this.data[key];
                    default:
                        throw new Error("Invalid string configuration parameter: " + key);
                }
            };
            /** Get a numeric configuration parameter. */
            Configuration.getNumericValue = function (key) {
                switch (key) {
                    case Core.configWallHeight:
                    case Core.configWallThickness:
                        return this.data[key];
                    default:
                        throw new Error("Invalid numeric configuration parameter: " + key);
                }
            };
            /** Configuration data loaded from/stored to extern. */
            Configuration.data = {
                dimUnit: Core.dimInch,
                wallHeight: 250,
                wallThickness: 10
            };
            return Configuration;
        }());
        Core.Configuration = Configuration;
    })(Core = BP3D.Core || (BP3D.Core = {}));
})(BP3D || (BP3D = {}));
