"use strict";
/// <reference path="../../lib/three.d.ts" />
/// <reference path="../../lib/jQuery.d.ts" />
/// <reference path="../core/configuration.ts" />
/// <reference path="../core/utils.ts" />
/// <reference path="../items/item.ts" />
/// <reference path="corner.ts" />
/// <reference path="half_edge.ts" />
var BP3D;
(function (BP3D) {
    var Model;
    (function (Model) {
        /** The default wall texture. */
        var defaultWallTexture = {
            url: "rooms/textures/wallmap.png",
            stretch: true,
            scale: 0
        };
        /**
         * A Wall is the basic element to create Rooms.
         *
         * Walls consists of two half edges.
         */
        var Wall = /** @class */ (function () {
            /**
             * Constructs a new wall.
             * @param start Start corner.
             * @param end End corner.
             */
            function Wall(start, end) {
                this.start = start;
                this.end = end;
                /** Front is the plane from start to end. */
                this.frontEdge = null;
                /** Back is the plane from end to start. */
                this.backEdge = null;
                /** */
                this.orphan = false;
                /** Items attached to this wall */
                this.items = [];
                /** */
                this.onItems = [];
                /** The front-side texture. */
                this.frontTexture = defaultWallTexture;
                /** The back-side texture. */
                this.backTexture = defaultWallTexture;
                /** Wall thickness. */
                this.thickness = BP3D.Core.Configuration.getNumericValue(BP3D.Core.configWallThickness);
                /** Wall height. */
                this.height = BP3D.Core.Configuration.getNumericValue(BP3D.Core.configWallHeight);
                /** Actions to be applied after movement. */
                this.moved_callbacks = $.Callbacks();
                /** Actions to be applied on removal. */
                this.deleted_callbacks = $.Callbacks();
                /** Actions to be applied explicitly. */
                this.action_callbacks = $.Callbacks();
                this.id = this.getUuid();
                this.start.attachStart(this);
                this.end.attachEnd(this);
            }
            Wall.prototype.getUuid = function () {
                return [this.start.id, this.end.id].join();
            };
            Wall.prototype.resetFrontBack = function () {
                this.frontEdge = null;
                this.backEdge = null;
                this.orphan = false;
            };
            Wall.prototype.snapToAxis = function (tolerance) {
                // order here is important, but unfortunately arbitrary
                this.start.snapToAxis(tolerance);
                this.end.snapToAxis(tolerance);
            };
            Wall.prototype.fireOnMove = function (func) {
                this.moved_callbacks.add(func);
            };
            Wall.prototype.fireOnDelete = function (func) {
                this.deleted_callbacks.add(func);
            };
            Wall.prototype.dontFireOnDelete = function (func) {
                this.deleted_callbacks.remove(func);
            };
            Wall.prototype.fireOnAction = function (func) {
                this.action_callbacks.add(func);
            };
            Wall.prototype.fireAction = function (action) {
                this.action_callbacks.fire(action);
            };
            Wall.prototype.relativeMove = function (dx, dy) {
                this.start.relativeMove(dx, dy);
                this.end.relativeMove(dx, dy);
            };
            Wall.prototype.fireMoved = function () {
                this.moved_callbacks.fire();
            };
            Wall.prototype.fireRedraw = function () {
                if (this.frontEdge) {
                    this.frontEdge.redrawCallbacks.fire();
                }
                if (this.backEdge) {
                    this.backEdge.redrawCallbacks.fire();
                }
            };
            Wall.prototype.getStart = function () {
                return this.start;
            };
            Wall.prototype.getEnd = function () {
                return this.end;
            };
            Wall.prototype.getStartX = function () {
                return this.start.getX();
            };
            Wall.prototype.getEndX = function () {
                return this.end.getX();
            };
            Wall.prototype.getStartY = function () {
                return this.start.getY();
            };
            Wall.prototype.getEndY = function () {
                return this.end.getY();
            };
            Wall.prototype.remove = function () {
                this.start.detachWall(this);
                this.end.detachWall(this);
                this.deleted_callbacks.fire(this);
            };
            Wall.prototype.setStart = function (corner) {
                this.start.detachWall(this);
                corner.attachStart(this);
                this.start = corner;
                this.fireMoved();
            };
            Wall.prototype.setEnd = function (corner) {
                this.end.detachWall(this);
                corner.attachEnd(this);
                this.end = corner;
                this.fireMoved();
            };
            Wall.prototype.distanceFrom = function (x, y) {
                return BP3D.Core.Utils.pointDistanceFromLine(x, y, this.getStartX(), this.getStartY(), this.getEndX(), this.getEndY());
            };
            /** Return the corner opposite of the one provided.
             * @param corner The given corner.
             * @returns The opposite corner.
             */
            Wall.prototype.oppositeCorner = function (corner) {
                if (this.start === corner) {
                    return this.end;
                }
                else if (this.end === corner) {
                    return this.start;
                }
                else {
                    console.log('Wall does not connect to corner');
                }
            };
            return Wall;
        }());
        Model.Wall = Wall;
    })(Model = BP3D.Model || (BP3D.Model = {}));
})(BP3D || (BP3D = {}));
