"use strict";
/// <reference path="../../lib/three.d.ts" />
/// <reference path="../../lib/jQuery.d.ts" />
/// <reference path="../core/utils.ts" />
/// <reference path="../items/factory.ts" />
var BP3D;
(function (BP3D) {
    var Model;
    (function (Model) {
        /**
         * The Scene is a manager of Items and also links to a ThreeJS scene.
         */
        var Scene = /** @class */ (function () {
            /**
             * Constructs a scene.
             * @param model The associated model.
             * @param textureDir The directory from which to load the textures.
             */
            function Scene(model, textureDir) {
                this.model = model;
                this.textureDir = textureDir;
                /** */
                this.items = [];
                /** */
                this.needsUpdate = false;
                /** */
                this.itemLoadingCallbacks = $.Callbacks();
                /** Item */
                this.itemLoadedCallbacks = $.Callbacks();
                /** Item */
                this.itemRemovedCallbacks = $.Callbacks();
                this.scene = new THREE.Scene();
                // init item loader
                this.loader = new THREE.JSONLoader();
                this.loader.crossOrigin = "";
            }
            /** Adds a non-item, basically a mesh, to the scene.
             * @param mesh The mesh to be added.
             */
            Scene.prototype.add = function (mesh) {
                this.scene.add(mesh);
            };
            /** Removes a non-item, basically a mesh, from the scene.
             * @param mesh The mesh to be removed.
             */
            Scene.prototype.remove = function (mesh) {
                this.scene.remove(mesh);
                BP3D.Core.Utils.removeValue(this.items, mesh);
            };
            /** Gets the scene.
             * @returns The scene.
             */
            Scene.prototype.getScene = function () {
                return this.scene;
            };
            /** Gets the items.
             * @returns The items.
             */
            Scene.prototype.getItems = function () {
                return this.items;
            };
            /** Gets the count of items.
             * @returns The count.
             */
            Scene.prototype.itemCount = function () {
                return this.items.length;
            };
            /** Removes all items. */
            Scene.prototype.clearItems = function () {
                var items_copy = this.items;
                var scope = this;
                this.items.forEach(function (item) {
                    scope.removeItem(item, true);
                });
                this.items = [];
            };
            /**
             * Removes an item.
             * @param item The item to be removed.
             * @param dontRemove If not set, also remove the item from the items list.
             */
            Scene.prototype.removeItem = function (item, dontRemove) {
                dontRemove = dontRemove || false;
                // use this for item meshes
                this.itemRemovedCallbacks.fire(item);
                item.removed();
                this.scene.remove(item);
                if (!dontRemove) {
                    BP3D.Core.Utils.removeValue(this.items, item);
                }
            };
            /**
             * Creates an item and adds it to the scene.
             * @param itemType The type of the item given by an enumerator.
             * @param fileName The name of the file to load.
             * @param metadata TODO
             * @param position The initial position.
             * @param rotation The initial rotation around the y axis.
             * @param scale The initial scaling.
             * @param fixed True if fixed.
             */
            Scene.prototype.addItem = function (itemType, fileName, metadata, position, rotation, scale, fixed) {
                itemType = itemType || 1;
                var scope = this;
                var loaderCallback = function (geometry, materials) {
                    var item = new (BP3D.Items.Factory.getClass(itemType))(scope.model, metadata, geometry, new THREE.MeshFaceMaterial(materials), position, rotation, scale);
                    item.fixed = fixed || false;
                    scope.items.push(item);
                    scope.add(item);
                    item.initObject();
                    scope.itemLoadedCallbacks.fire(item);
                };
                this.itemLoadingCallbacks.fire();
                this.loader.load(fileName, loaderCallback, undefined // TODO_Ekki 
                );
            };
            return Scene;
        }());
        Model.Scene = Scene;
    })(Model = BP3D.Model || (BP3D.Model = {}));
})(BP3D || (BP3D = {}));
