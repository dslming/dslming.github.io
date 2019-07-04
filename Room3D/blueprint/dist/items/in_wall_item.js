"use strict";
/// <reference path="../../lib/three.d.ts" />
/// <reference path="../model/model.ts" />
/// <reference path="wall_item.ts" />
/// <reference path="metadata.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BP3D;
(function (BP3D) {
    var Items;
    (function (Items) {
        /** */
        var InWallItem = /** @class */ (function (_super) {
            __extends(InWallItem, _super);
            function InWallItem(model, metadata, geometry, material, position, rotation, scale) {
                var _this = _super.call(this, model, metadata, geometry, material, position, rotation, scale) || this;
                _this.addToWall = true;
                return _this;
            }
            ;
            /** */
            InWallItem.prototype.getWallOffset = function () {
                // fudge factor so it saves to the right wall
                return -this.currentWallEdge.offset + 0.5;
            };
            return InWallItem;
        }(Items.WallItem));
        Items.InWallItem = InWallItem;
    })(Items = BP3D.Items || (BP3D.Items = {}));
})(BP3D || (BP3D = {}));
