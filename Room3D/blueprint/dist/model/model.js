"use strict";
/// <reference path="../../lib/three.d.ts" />
/// <reference path="../../lib/jQuery.d.ts" />
/// <reference path="floorplan.ts" />
/// <reference path="scene.ts" />
var BP3D;
(function (BP3D) {
    var Model;
    (function (Model_1) {
        /**
         * A Model connects a Floorplan and a Scene.
         */
        var Model = /** @class */ (function () {
            /** Constructs a new model.
             * @param textureDir The directory containing the textures.
             */
            function Model(textureDir) {
                /** */
                this.roomLoadingCallbacks = $.Callbacks();
                /** */
                this.roomLoadedCallbacks = $.Callbacks();
                /** name */
                this.roomSavedCallbacks = $.Callbacks();
                /** success (bool), copy (bool) */
                this.roomDeletedCallbacks = $.Callbacks();
                this.floorplan = new Model_1.Floorplan();
                this.scene = new Model_1.Scene(this, textureDir);
            }
            Model.prototype.loadSerialized = function (json) {
                // TODO: better documentation on serialization format.
                // TODO: a much better serialization format.
                this.roomLoadingCallbacks.fire();
                var data = JSON.parse(json);
                this.newRoom(data.floorplan, data.items);
                this.roomLoadedCallbacks.fire();
            };
            Model.prototype.exportSerialized = function () {
                var items_arr = [];
                var objects = this.scene.getItems();
                for (var i = 0; i < objects.length; i++) {
                    var object = objects[i];
                    items_arr[i] = {
                        item_name: object.metadata.itemName,
                        item_type: object.metadata.itemType,
                        model_url: object.metadata.modelUrl,
                        xpos: object.position.x,
                        ypos: object.position.y,
                        zpos: object.position.z,
                        rotation: object.rotation.y,
                        scale_x: object.scale.x,
                        scale_y: object.scale.y,
                        scale_z: object.scale.z,
                        fixed: object.fixed
                    };
                }
                var room = {
                    floorplan: (this.floorplan.saveFloorplan()),
                    items: items_arr
                };
                return JSON.stringify(room);
            };
            Model.prototype.newRoom = function (floorplan, items) {
                var _this = this;
                this.scene.clearItems();
                this.floorplan.loadFloorplan(floorplan);
                items.forEach(function (item) {
                    var position = new THREE.Vector3(item.xpos, item.ypos, item.zpos);
                    var metadata = {
                        itemName: item.item_name,
                        resizable: item.resizable,
                        itemType: item.item_type,
                        modelUrl: item.model_url
                    };
                    var scale = new THREE.Vector3(item.scale_x, item.scale_y, item.scale_z);
                    _this.scene.addItem(item.item_type, item.model_url, metadata, position, item.rotation, scale, item.fixed);
                });
            };
            return Model;
        }());
        Model_1.Model = Model;
    })(Model = BP3D.Model || (BP3D.Model = {}));
})(BP3D || (BP3D = {}));
