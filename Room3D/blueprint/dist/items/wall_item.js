"use strict";
/// <reference path="../../lib/three.d.ts" />
/// <reference path="../core/utils.ts" />
/// <reference path="../model/half_edge.ts" />
/// <reference path="../model/model.ts" />
/// <reference path="item.ts" />
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
         * A Wall Item is an entity to be placed related to a wall.
         */
        var WallItem = /** @class */ (function (_super) {
            __extends(WallItem, _super);
            function WallItem(model, metadata, geometry, material, position, rotation, scale) {
                var _this = _super.call(this, model, metadata, geometry, material, position, rotation, scale) || this;
                /** The currently applied wall edge. */
                _this.currentWallEdge = null;
                /* TODO:
                   This caused a huge headache.
                   HalfEdges get destroyed/created every time floorplan is edited.
                   This item should store a reference to a wall and front/back,
                   and grab its edge reference dynamically whenever it needs it.
                 */
                /** used for finding rotations */
                _this.refVec = new THREE.Vector2(0, 1.0);
                /** */
                _this.wallOffsetScalar = 0;
                /** */
                _this.sizeX = 0;
                /** */
                _this.sizeY = 0;
                /** */
                _this.addToWall = false;
                /** */
                _this.boundToFloor = false;
                /** */
                _this.frontVisible = false;
                /** */
                _this.backVisible = false;
                _this.allowRotate = false;
                return _this;
            }
            ;
            /** Get the closet wall edge.
             * @returns The wall edge.
             */
            WallItem.prototype.closestWallEdge = function () {
                var wallEdges = this.model.floorplan.wallEdges();
                var wallEdge = null;
                var minDistance = null;
                var itemX = this.position.x;
                var itemZ = this.position.z;
                wallEdges.forEach(function (edge) {
                    var distance = edge.distanceTo(itemX, itemZ);
                    if (minDistance === null || distance < minDistance) {
                        minDistance = distance;
                        wallEdge = edge;
                    }
                });
                return wallEdge;
            };
            /** */
            WallItem.prototype.removed = function () {
                if (this.currentWallEdge != null && this.addToWall) {
                    BP3D.Core.Utils.removeValue(this.currentWallEdge.wall.items, this);
                    this.redrawWall();
                }
            };
            /** */
            WallItem.prototype.redrawWall = function () {
                if (this.addToWall) {
                    this.currentWallEdge.wall.fireRedraw();
                }
            };
            /** */
            WallItem.prototype.updateEdgeVisibility = function (visible, front) {
                if (front) {
                    this.frontVisible = visible;
                }
                else {
                    this.backVisible = visible;
                }
                this.visible = (this.frontVisible || this.backVisible);
            };
            /** */
            WallItem.prototype.updateSize = function () {
                this.wallOffsetScalar = (this.geometry.boundingBox.max.z - this.geometry.boundingBox.min.z) * this.scale.z / 2.0;
                this.sizeX = (this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x) * this.scale.x;
                this.sizeY = (this.geometry.boundingBox.max.y - this.geometry.boundingBox.min.y) * this.scale.y;
            };
            /** */
            WallItem.prototype.resized = function () {
                if (this.boundToFloor) {
                    this.position.y = 0.5 * (this.geometry.boundingBox.max.y - this.geometry.boundingBox.min.y) * this.scale.y + 0.01;
                }
                this.updateSize();
                this.redrawWall();
            };
            /** */
            WallItem.prototype.placeInRoom = function () {
                var closestWallEdge = this.closestWallEdge();
                this.changeWallEdge(closestWallEdge);
                this.updateSize();
                if (!this.position_set) {
                    // position not set
                    var center = closestWallEdge.interiorCenter();
                    var newPos = new THREE.Vector3(center.x, closestWallEdge.wall.height / 2.0, center.y);
                    this.boundMove(newPos);
                    this.position.copy(newPos);
                    this.redrawWall();
                }
            };
            ;
            /** */
            WallItem.prototype.moveToPosition = function (vec3, intersection) {
                this.changeWallEdge(intersection.object.edge);
                this.boundMove(vec3);
                this.position.copy(vec3);
                this.redrawWall();
            };
            /** */
            WallItem.prototype.getWallOffset = function () {
                return this.wallOffsetScalar;
            };
            /** */
            WallItem.prototype.changeWallEdge = function (wallEdge) {
                if (this.currentWallEdge != null) {
                    if (this.addToWall) {
                        BP3D.Core.Utils.removeValue(this.currentWallEdge.wall.items, this);
                        this.redrawWall();
                    }
                    else {
                        BP3D.Core.Utils.removeValue(this.currentWallEdge.wall.onItems, this);
                    }
                }
                // handle subscription to wall being removed
                if (this.currentWallEdge != null) {
                    this.currentWallEdge.wall.dontFireOnDelete(this.remove.bind(this));
                }
                wallEdge.wall.fireOnDelete(this.remove.bind(this));
                // find angle between wall normals
                var normal2 = new THREE.Vector2();
                var normal3 = wallEdge.plane.geometry.faces[0].normal;
                normal2.x = normal3.x;
                normal2.y = normal3.z;
                var angle = BP3D.Core.Utils.angle(this.refVec.x, this.refVec.y, normal2.x, normal2.y);
                this.rotation.y = angle;
                // update currentWall
                this.currentWallEdge = wallEdge;
                if (this.addToWall) {
                    wallEdge.wall.items.push(this);
                    this.redrawWall();
                }
                else {
                    wallEdge.wall.onItems.push(this);
                }
            };
            /** Returns an array of planes to use other than the ground plane
             * for passing intersection to clickPressed and clickDragged */
            WallItem.prototype.customIntersectionPlanes = function () {
                return this.model.floorplan.wallEdgePlanes();
            };
            /** takes the move vec3, and makes sure object stays bounded on plane */
            WallItem.prototype.boundMove = function (vec3) {
                var tolerance = 1;
                var edge = this.currentWallEdge;
                vec3.applyMatrix4(edge.interiorTransform);
                if (vec3.x < this.sizeX / 2.0 + tolerance) {
                    vec3.x = this.sizeX / 2.0 + tolerance;
                }
                else if (vec3.x > (edge.interiorDistance() - this.sizeX / 2.0 - tolerance)) {
                    vec3.x = edge.interiorDistance() - this.sizeX / 2.0 - tolerance;
                }
                if (this.boundToFloor) {
                    vec3.y = 0.5 * (this.geometry.boundingBox.max.y - this.geometry.boundingBox.min.y) * this.scale.y + 0.01;
                }
                else {
                    if (vec3.y < this.sizeY / 2.0 + tolerance) {
                        vec3.y = this.sizeY / 2.0 + tolerance;
                    }
                    else if (vec3.y > edge.height - this.sizeY / 2.0 - tolerance) {
                        vec3.y = edge.height - this.sizeY / 2.0 - tolerance;
                    }
                }
                vec3.z = this.getWallOffset();
                vec3.applyMatrix4(edge.invInteriorTransform);
            };
            return WallItem;
        }(Items.Item));
        Items.WallItem = WallItem;
    })(Items = BP3D.Items || (BP3D.Items = {}));
})(BP3D || (BP3D = {}));
