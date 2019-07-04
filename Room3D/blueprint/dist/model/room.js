"use strict";
/// <reference path="../../lib/three.d.ts" />
/// <reference path="../../lib/jQuery.d.ts" />
/// <reference path="../core/utils.ts" />
/// <reference path="corner.ts" />
/// <reference path="floorplan.ts" />
/// <reference path="half_edge.ts" />
/*
TODO
var Vec2 = require('vec2')
var segseg = require('segseg')
var Polygon = require('polygon')
*/
var BP3D;
(function (BP3D) {
    var Model;
    (function (Model) {
        /** Default texture to be used if nothing is provided. */
        var defaultRoomTexture = {
            url: "rooms/textures/hardwood.png",
            scale: 400
        };
        /**
         * A Room is the combination of a Floorplan with a floor plane.
         */
        var Room = /** @class */ (function () {
            /**
             *  ordered CCW
             */
            function Room(floorplan, corners) {
                this.floorplan = floorplan;
                this.corners = corners;
                /** */
                this.interiorCorners = [];
                /** */
                this.edgePointer = null;
                /** floor plane for intersection testing */
                this.floorPlane = null;
                /** */
                this.customTexture = false;
                /** */
                this.floorChangeCallbacks = $.Callbacks();
                this.updateWalls();
                this.updateInteriorCorners();
                this.generatePlane();
            }
            Room.prototype.getUuid = function () {
                var cornerUuids = BP3D.Core.Utils.map(this.corners, function (c) {
                    return c.id;
                });
                cornerUuids.sort();
                return cornerUuids.join();
            };
            Room.prototype.fireOnFloorChange = function (callback) {
                this.floorChangeCallbacks.add(callback);
            };
            Room.prototype.getTexture = function () {
                var uuid = this.getUuid();
                var tex = this.floorplan.getFloorTexture(uuid);
                return tex || defaultRoomTexture;
            };
            /**
             * textureStretch always true, just an argument for consistency with walls
             */
            Room.prototype.setTexture = function (textureUrl, textureStretch, textureScale) {
                var uuid = this.getUuid();
                this.floorplan.setFloorTexture(uuid, textureUrl, textureScale);
                this.floorChangeCallbacks.fire();
            };
            Room.prototype.generatePlane = function () {
                var points = [];
                this.interiorCorners.forEach(function (corner) {
                    points.push(new THREE.Vector2(corner.x, corner.y));
                });
                var shape = new THREE.Shape(points);
                var geometry = new THREE.ShapeGeometry(shape);
                this.floorPlane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide
                }));
                this.floorPlane.visible = false;
                this.floorPlane.rotation.set(Math.PI / 2, 0, 0);
                this.floorPlane.room = this; // js monkey patch
            };
            Room.prototype.cycleIndex = function (index) {
                if (index < 0) {
                    return index += this.corners.length;
                }
                else {
                    return index % this.corners.length;
                }
            };
            Room.prototype.updateInteriorCorners = function () {
                var edge = this.edgePointer;
                while (true) {
                    this.interiorCorners.push(edge.interiorStart());
                    edge.generatePlane();
                    if (edge.next === this.edgePointer) {
                        break;
                    }
                    else {
                        edge = edge.next;
                    }
                }
            };
            /**
             * Populates each wall's half edge relating to this room
             * this creates a fancy doubly connected edge list (DCEL)
             */
            Room.prototype.updateWalls = function () {
                var prevEdge = null;
                var firstEdge = null;
                for (var i = 0; i < this.corners.length; i++) {
                    var firstCorner = this.corners[i];
                    var secondCorner = this.corners[(i + 1) % this.corners.length];
                    // find if wall is heading in that direction
                    var wallTo = firstCorner.wallTo(secondCorner);
                    var wallFrom = firstCorner.wallFrom(secondCorner);
                    if (wallTo) {
                        var edge = new Model.HalfEdge(this, wallTo, true);
                    }
                    else if (wallFrom) {
                        var edge = new Model.HalfEdge(this, wallFrom, false);
                    }
                    else {
                        // something horrible has happened
                        console.log("corners arent connected by a wall, uh oh");
                    }
                    if (i == 0) {
                        firstEdge = edge;
                    }
                    else {
                        edge.prev = prevEdge;
                        prevEdge.next = edge;
                        if (i + 1 == this.corners.length) {
                            firstEdge.prev = edge;
                            edge.next = firstEdge;
                        }
                    }
                    prevEdge = edge;
                }
                // hold on to an edge reference
                this.edgePointer = firstEdge;
            };
            return Room;
        }());
        Model.Room = Room;
    })(Model = BP3D.Model || (BP3D.Model = {}));
})(BP3D || (BP3D = {}));
