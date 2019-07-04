"use strict";
/// <reference path="floor_item.ts" />
/// <reference path="in_wall_floor_item.ts" />
/// <reference path="in_wall_item.ts" />
/// <reference path="on_floor_item.ts" />
/// <reference path="wall_floor_item.ts" />
/// <reference path="wall_item.ts" />
var BP3D;
(function (BP3D) {
    var Items;
    (function (Items) {
        /** Enumeration of item types. */
        var item_types = {
            1: Items.FloorItem,
            2: Items.WallItem,
            3: Items.InWallItem,
            7: Items.InWallFloorItem,
            8: Items.OnFloorItem,
            9: Items.WallFloorItem
        };
        /** Factory class to create items. */
        var Factory = /** @class */ (function () {
            function Factory() {
            }
            /** Gets the class for the specified item. */
            Factory.getClass = function (itemType) {
                return item_types[itemType];
            };
            return Factory;
        }());
        Items.Factory = Factory;
    })(Items = BP3D.Items || (BP3D.Items = {}));
})(BP3D || (BP3D = {}));
