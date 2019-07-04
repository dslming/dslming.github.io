"use strict";
/// <reference path="../../lib/three.d.ts" />
/// <reference path="../core/utils.ts" />
/// <reference path="../model/model.ts" />
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
        /**
         * An Item is an abstract entity for all things placed in the scene,
         * e.g. at walls or on the floor.
         */
        var Item = /** @class */ (function (_super) {
            __extends(Item, _super);
            /** Constructs an item.
             * @param model TODO
             * @param metadata TODO
             * @param geometry TODO
             * @param material TODO
             * @param position TODO
             * @param rotation TODO
             * @param scale TODO
             */
            function Item(model, metadata, geometry, material, position, rotation, scale) {
                var _this = _super.call(this) || this;
                _this.model = model;
                _this.metadata = metadata;
                /** */
                _this.errorGlow = new THREE.Mesh();
                /** */
                _this.hover = false;
                /** */
                _this.selected = false;
                /** */
                _this.highlighted = false;
                /** */
                _this.error = false;
                /** */
                _this.emissiveColor = 0x444444;
                /** */
                _this.errorColor = 0xff0000;
                /** Does this object affect other floor items */
                _this.obstructFloorMoves = true;
                /** Show rotate option in context menu */
                _this.allowRotate = true;
                /** */
                _this.fixed = false;
                /** dragging */
                _this.dragOffset = new THREE.Vector3();
                /** */
                _this.getHeight = function () {
                    return this.halfSize.y * 2.0;
                };
                /** */
                _this.getWidth = function () {
                    return this.halfSize.x * 2.0;
                };
                /** */
                _this.getDepth = function () {
                    return this.halfSize.z * 2.0;
                };
                /** */
                _this.initObject = function () {
                    this.placeInRoom();
                    // select and stuff
                    this.scene.needsUpdate = true;
                };
                _this.scene = _this.model.scene;
                _this.geometry = geometry;
                _this.material = material;
                _this.errorColor = 0xff0000;
                _this.resizable = metadata.resizable;
                _this.castShadow = true;
                _this.receiveShadow = false;
                _this.geometry = geometry;
                _this.material = material;
                if (position) {
                    _this.position.copy(position);
                    _this.position_set = true;
                }
                else {
                    _this.position_set = false;
                }
                // center in its boundingbox
                _this.geometry.computeBoundingBox();
                _this.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-0.5 * (_this.geometry.boundingBox.max.x + _this.geometry.boundingBox.min.x), -0.5 * (_this.geometry.boundingBox.max.y + _this.geometry.boundingBox.min.y), -0.5 * (_this.geometry.boundingBox.max.z + _this.geometry.boundingBox.min.z)));
                _this.geometry.computeBoundingBox();
                _this.halfSize = _this.objectHalfSize();
                if (rotation) {
                    _this.rotation.y = rotation;
                }
                if (scale != null) {
                    _this.setScale(scale.x, scale.y, scale.z);
                }
                return _this;
            }
            ;
            /** */
            Item.prototype.remove = function () {
                this.scene.removeItem(this);
            };
            ;
            /** */
            Item.prototype.resize = function (height, width, depth) {
                var x = width / this.getWidth();
                var y = height / this.getHeight();
                var z = depth / this.getDepth();
                this.setScale(x, y, z);
            };
            /** */
            Item.prototype.setScale = function (x, y, z) {
                var scaleVec = new THREE.Vector3(x, y, z);
                this.halfSize.multiply(scaleVec);
                scaleVec.multiply(this.scale);
                this.scale.set(scaleVec.x, scaleVec.y, scaleVec.z);
                this.resized();
                this.scene.needsUpdate = true;
            };
            ;
            /** */
            Item.prototype.setFixed = function (fixed) {
                this.fixed = fixed;
            };
            /** */
            Item.prototype.removed = function () {
            };
            /** on is a bool */
            Item.prototype.updateHighlight = function () {
                var on = this.hover || this.selected;
                this.highlighted = on;
                var hex = on ? this.emissiveColor : 0x000000;
                this.material.materials.forEach(function (material) {
                    // TODO_Ekki emissive doesn't exist anymore?
                    material.emissive.setHex(hex);
                });
            };
            /** */
            Item.prototype.mouseOver = function () {
                this.hover = true;
                this.updateHighlight();
            };
            ;
            /** */
            Item.prototype.mouseOff = function () {
                this.hover = false;
                this.updateHighlight();
            };
            ;
            /** */
            Item.prototype.setSelected = function () {
                this.selected = true;
                this.updateHighlight();
            };
            ;
            /** */
            Item.prototype.setUnselected = function () {
                this.selected = false;
                this.updateHighlight();
            };
            ;
            /** intersection has attributes point (vec3) and object (THREE.Mesh) */
            Item.prototype.clickPressed = function (intersection) {
                this.dragOffset.copy(intersection.point).sub(this.position);
            };
            ;
            /** */
            Item.prototype.clickDragged = function (intersection) {
                if (intersection) {
                    this.moveToPosition(intersection.point.sub(this.dragOffset), intersection);
                }
            };
            ;
            /** */
            Item.prototype.rotate = function (intersection) {
                if (intersection) {
                    var angle = BP3D.Core.Utils.angle(0, 1, intersection.point.x - this.position.x, intersection.point.z - this.position.z);
                    var snapTolerance = Math.PI / 16.0;
                    // snap to intervals near Math.PI/2
                    for (var i = -4; i <= 4; i++) {
                        if (Math.abs(angle - (i * (Math.PI / 2))) < snapTolerance) {
                            angle = i * (Math.PI / 2);
                            break;
                        }
                    }
                    this.rotation.y = angle;
                }
            };
            /** */
            Item.prototype.moveToPosition = function (vec3, intersection) {
                this.position.copy(vec3);
            };
            /** */
            Item.prototype.clickReleased = function () {
                if (this.error) {
                    this.hideError();
                }
            };
            ;
            /**
             * Returns an array of planes to use other than the ground plane
             * for passing intersection to clickPressed and clickDragged
             */
            Item.prototype.customIntersectionPlanes = function () {
                return [];
            };
            /**
             * returns the 2d corners of the bounding polygon
             *
             * offset is Vector3 (used for getting corners of object at a new position)
             *
             * TODO: handle rotated objects better!
             */
            Item.prototype.getCorners = function (xDim, yDim, position) {
                position = position || this.position;
                var halfSize = this.halfSize.clone();
                var c1 = new THREE.Vector3(-halfSize.x, 0, -halfSize.z);
                var c2 = new THREE.Vector3(halfSize.x, 0, -halfSize.z);
                var c3 = new THREE.Vector3(halfSize.x, 0, halfSize.z);
                var c4 = new THREE.Vector3(-halfSize.x, 0, halfSize.z);
                var transform = new THREE.Matrix4();
                //console.log(this.rotation.y);
                transform.makeRotationY(this.rotation.y); //  + Math.PI/2)
                c1.applyMatrix4(transform);
                c2.applyMatrix4(transform);
                c3.applyMatrix4(transform);
                c4.applyMatrix4(transform);
                c1.add(position);
                c2.add(position);
                c3.add(position);
                c4.add(position);
                //halfSize.applyMatrix4(transform);
                //var min = position.clone().sub(halfSize);
                //var max = position.clone().add(halfSize);
                var corners = [
                    { x: c1.x, y: c1.z },
                    { x: c2.x, y: c2.z },
                    { x: c3.x, y: c3.z },
                    { x: c4.x, y: c4.z }
                ];
                return corners;
            };
            /** */
            Item.prototype.showError = function (vec3) {
                vec3 = vec3 || this.position;
                if (!this.error) {
                    this.error = true;
                    this.errorGlow = this.createGlow(this.errorColor, 0.8, true);
                    this.scene.add(this.errorGlow);
                }
                this.errorGlow.position.copy(vec3);
            };
            /** */
            Item.prototype.hideError = function () {
                if (this.error) {
                    this.error = false;
                    this.scene.remove(this.errorGlow);
                }
            };
            /** */
            Item.prototype.objectHalfSize = function () {
                var objectBox = new THREE.Box3();
                objectBox.setFromObject(this);
                return objectBox.max.clone().sub(objectBox.min).divideScalar(2);
            };
            /** */
            Item.prototype.createGlow = function (color, opacity, ignoreDepth) {
                ignoreDepth = ignoreDepth || false;
                opacity = opacity || 0.2;
                var glowMaterial = new THREE.MeshBasicMaterial({
                    color: color,
                    blending: THREE.AdditiveBlending,
                    opacity: 0.2,
                    transparent: true,
                    depthTest: !ignoreDepth
                });
                var glow = new THREE.Mesh(this.geometry.clone(), glowMaterial);
                glow.position.copy(this.position);
                glow.rotation.copy(this.rotation);
                glow.scale.copy(this.scale);
                return glow;
            };
            ;
            return Item;
        }(THREE.Mesh));
        Items.Item = Item;
    })(Items = BP3D.Items || (BP3D.Items = {}));
})(BP3D || (BP3D = {}));
