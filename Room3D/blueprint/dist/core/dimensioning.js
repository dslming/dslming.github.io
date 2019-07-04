"use strict";
/// <reference path="../core/configuration.ts" />
var BP3D;
(function (BP3D) {
    var Core;
    (function (Core) {
        /** Dimensioning in Inch. */
        Core.dimInch = "inch";
        /** Dimensioning in Meter. */
        Core.dimMeter = "m";
        /** Dimensioning in Centi Meter. */
        Core.dimCentiMeter = "cm";
        /** Dimensioning in Milli Meter. */
        Core.dimMilliMeter = "mm";
        /** Dimensioning functions. */
        var Dimensioning = /** @class */ (function () {
            function Dimensioning() {
            }
            /** Converts cm to dimensioning string.
             * @param cm Centi meter value to be converted.
             * @returns String representation.
             */
            Dimensioning.cmToMeasure = function (cm) {
                switch (Core.Configuration.getStringValue(Core.configDimUnit)) {
                    case Core.dimInch:
                        var realFeet = ((cm * 0.393700) / 12);
                        var feet = Math.floor(realFeet);
                        var inches = Math.round((realFeet - feet) * 12);
                        return feet + "'" + inches + '"';
                    case Core.dimMilliMeter:
                        return "" + Math.round(10 * cm) + " mm";
                    case Core.dimCentiMeter:
                        return "" + Math.round(10 * cm) / 10 + " cm";
                    case Core.dimMeter:
                    default:
                        return "" + Math.round(10 * cm) / 1000 + " m";
                }
            };
            return Dimensioning;
        }());
        Core.Dimensioning = Dimensioning;
    })(Core = BP3D.Core || (BP3D.Core = {}));
})(BP3D || (BP3D = {}));
