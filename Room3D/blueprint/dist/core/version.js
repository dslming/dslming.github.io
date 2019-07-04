"use strict";
var BP3D;
(function (BP3D) {
    var Core;
    (function (Core) {
        /** Version information. */
        var Version = /** @class */ (function () {
            function Version() {
            }
            /** The informal version. */
            Version.getInformalVersion = function () {
                return "1.0 Beta 1";
            };
            /** The technical version. */
            Version.getTechnicalVersion = function () {
                return "1.0.0.1";
            };
            return Version;
        }());
        Core.Version = Version;
    })(Core = BP3D.Core || (BP3D.Core = {}));
})(BP3D || (BP3D = {}));
console.log("Blueprint3D " + BP3D.Core.Version.getInformalVersion()
    + " (" + BP3D.Core.Version.getTechnicalVersion() + ")");
