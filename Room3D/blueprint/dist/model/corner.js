"use strict";
/// <reference path="../../lib/jQuery.d.ts" />
/// <reference path="../core/utils.ts" />
/// <reference path="floorplan.ts" />
/// <reference path="wall.ts" />
var BP3D;
(function (BP3D) {
    var Model;
    (function (Model) {
        /** */
        var cornerTolerance = 20;
        /**
         * Corners are used to define Walls.
         */
        var Corner = /** @class */ (function () {
            /** Constructs a corner.
             * @param floorplan The associated floorplan.
             * @param x X coordinate.
             * @param y Y coordinate.
             * @param id An optional unique id. If not set, created internally.
             */
            function Corner(floorplan, x, y, id) {
                this.floorplan = floorplan;
                this.x = x;
                this.y = y;
                this.id = id;
                /** Array of start walls. */
                this.wallStarts = [];
                /** Array of end walls. */
                this.wallEnds = [];
                /** Callbacks to be fired on movement. */
                this.moved_callbacks = $.Callbacks();
                /** Callbacks to be fired on removal. */
                this.deleted_callbacks = $.Callbacks();
                /** Callbacks to be fired in case of action. */
                this.action_callbacks = $.Callbacks();
                this.id = id || BP3D.Core.Utils.guid();
            }
            /** Add function to moved callbacks.
             * @param func The function to be added.
            */
            Corner.prototype.fireOnMove = function (func) {
                this.moved_callbacks.add(func);
            };
            /** Add function to deleted callbacks.
             * @param func The function to be added.
             */
            Corner.prototype.fireOnDelete = function (func) {
                this.deleted_callbacks.add(func);
            };
            /** Add function to action callbacks.
             * @param func The function to be added.
             */
            Corner.prototype.fireOnAction = function (func) {
                this.action_callbacks.add(func);
            };
            /**
             * @returns
             * @deprecated
             */
            Corner.prototype.getX = function () {
                return this.x;
            };
            /**
             * @returns
             * @deprecated
             */
            Corner.prototype.getY = function () {
                return this.y;
            };
            /**
             *
             */
            Corner.prototype.snapToAxis = function (tolerance) {
                // try to snap this corner to an axis
                var snapped = {
                    x: false,
                    y: false
                };
                var scope = this;
                this.adjacentCorners().forEach(function (corner) {
                    if (Math.abs(corner.x - scope.x) < tolerance) {
                        scope.x = corner.x;
                        snapped.x = true;
                    }
                    if (Math.abs(corner.y - scope.y) < tolerance) {
                        scope.y = corner.y;
                        snapped.y = true;
                    }
                });
                return snapped;
            };
            /** Moves corner relatively to new position.
             * @param dx The delta x.
             * @param dy The delta y.
             */
            Corner.prototype.relativeMove = function (dx, dy) {
                this.move(this.x + dx, this.y + dy);
            };
            Corner.prototype.fireAction = function (action) {
                this.action_callbacks.fire(action);
            };
            /** Remove callback. Fires the delete callbacks. */
            Corner.prototype.remove = function () {
                this.deleted_callbacks.fire(this);
            };
            /** Removes all walls. */
            Corner.prototype.removeAll = function () {
                for (var i = 0; i < this.wallStarts.length; i++) {
                    this.wallStarts[i].remove();
                }
                for (var i = 0; i < this.wallEnds.length; i++) {
                    this.wallEnds[i].remove();
                }
                this.remove();
            };
            /** Moves corner to new position.
             * @param newX The new x position.
             * @param newY The new y position.
             */
            Corner.prototype.move = function (newX, newY) {
                this.x = newX;
                this.y = newY;
                this.mergeWithIntersected();
                this.moved_callbacks.fire(this.x, this.y);
                this.wallStarts.forEach(function (wall) {
                    wall.fireMoved();
                });
                this.wallEnds.forEach(function (wall) {
                    wall.fireMoved();
                });
            };
            /** Gets the adjacent corners.
             * @returns Array of corners.
             */
            Corner.prototype.adjacentCorners = function () {
                var retArray = [];
                for (var i = 0; i < this.wallStarts.length; i++) {
                    retArray.push(this.wallStarts[i].getEnd());
                }
                for (var i = 0; i < this.wallEnds.length; i++) {
                    retArray.push(this.wallEnds[i].getStart());
                }
                return retArray;
            };
            /** Checks if a wall is connected.
             * @param wall A wall.
             * @returns True in case of connection.
             */
            Corner.prototype.isWallConnected = function (wall) {
                for (var i = 0; i < this.wallStarts.length; i++) {
                    if (this.wallStarts[i] == wall) {
                        return true;
                    }
                }
                for (var i = 0; i < this.wallEnds.length; i++) {
                    if (this.wallEnds[i] == wall) {
                        return true;
                    }
                }
                return false;
            };
            /**
             *
             */
            Corner.prototype.distanceFrom = function (x, y) {
                var distance = BP3D.Core.Utils.distance(x, y, this.x, this.y);
                //console.log('x,y ' + x + ',' + y + ' to ' + this.getX() + ',' + this.getY() + ' is ' + distance);
                return distance;
            };
            /** Gets the distance from a wall.
             * @param wall A wall.
             * @returns The distance.
             */
            Corner.prototype.distanceFromWall = function (wall) {
                return wall.distanceFrom(this.x, this.y);
            };
            /** Gets the distance from a corner.
             * @param corner A corner.
             * @returns The distance.
             */
            Corner.prototype.distanceFromCorner = function (corner) {
                return this.distanceFrom(corner.x, corner.y);
            };
            /** Detaches a wall.
             * @param wall A wall.
             */
            Corner.prototype.detachWall = function (wall) {
                BP3D.Core.Utils.removeValue(this.wallStarts, wall);
                BP3D.Core.Utils.removeValue(this.wallEnds, wall);
                if (this.wallStarts.length == 0 && this.wallEnds.length == 0) {
                    this.remove();
                }
            };
            /** Attaches a start wall.
             * @param wall A wall.
             */
            Corner.prototype.attachStart = function (wall) {
                this.wallStarts.push(wall);
            };
            /** Attaches an end wall.
             * @param wall A wall.
             */
            Corner.prototype.attachEnd = function (wall) {
                this.wallEnds.push(wall);
            };
            /** Get wall to corner.
             * @param corner A corner.
             * @return The associated wall or null.
             */
            Corner.prototype.wallTo = function (corner) {
                for (var i = 0; i < this.wallStarts.length; i++) {
                    if (this.wallStarts[i].getEnd() === corner) {
                        return this.wallStarts[i];
                    }
                }
                return null;
            };
            /** Get wall from corner.
             * @param corner A corner.
             * @return The associated wall or null.
             */
            Corner.prototype.wallFrom = function (corner) {
                for (var i = 0; i < this.wallEnds.length; i++) {
                    if (this.wallEnds[i].getStart() === corner) {
                        return this.wallEnds[i];
                    }
                }
                return null;
            };
            /** Get wall to or from corner.
             * @param corner A corner.
             * @return The associated wall or null.
             */
            Corner.prototype.wallToOrFrom = function (corner) {
                return this.wallTo(corner) || this.wallFrom(corner);
            };
            /**
             *
             */
            Corner.prototype.combineWithCorner = function (corner) {
                // update position to other corner's
                this.x = corner.x;
                this.y = corner.y;
                // absorb the other corner's wallStarts and wallEnds
                for (var i = corner.wallStarts.length - 1; i >= 0; i--) {
                    corner.wallStarts[i].setStart(this);
                }
                for (var i = corner.wallEnds.length - 1; i >= 0; i--) {
                    corner.wallEnds[i].setEnd(this);
                }
                // delete the other corner
                corner.removeAll();
                this.removeDuplicateWalls();
                this.floorplan.update();
            };
            Corner.prototype.mergeWithIntersected = function () {
                //console.log('mergeWithIntersected for object: ' + this.type);
                // check corners
                for (var i = 0; i < this.floorplan.getCorners().length; i++) {
                    var corner = this.floorplan.getCorners()[i];
                    if (this.distanceFromCorner(corner) < cornerTolerance && corner != this) {
                        this.combineWithCorner(corner);
                        return true;
                    }
                }
                // check walls
                for (var i = 0; i < this.floorplan.getWalls().length; i++) {
                    var wall = this.floorplan.getWalls()[i];
                    if (this.distanceFromWall(wall) < cornerTolerance && !this.isWallConnected(wall)) {
                        // update position to be on wall
                        var intersection = BP3D.Core.Utils.closestPointOnLine(this.x, this.y, wall.getStart().x, wall.getStart().y, wall.getEnd().x, wall.getEnd().y);
                        this.x = intersection.x;
                        this.y = intersection.y;
                        // merge this corner into wall by breaking wall into two parts
                        this.floorplan.newWall(this, wall.getEnd());
                        wall.setEnd(this);
                        this.floorplan.update();
                        return true;
                    }
                }
                return false;
            };
            /** Ensure we do not have duplicate walls (i.e. same start and end points) */
            Corner.prototype.removeDuplicateWalls = function () {
                // delete the wall between these corners, if it exists
                var wallEndpoints = {};
                var wallStartpoints = {};
                for (var i = this.wallStarts.length - 1; i >= 0; i--) {
                    if (this.wallStarts[i].getEnd() === this) {
                        // remove zero length wall 
                        this.wallStarts[i].remove();
                    }
                    else if (this.wallStarts[i].getEnd().id in wallEndpoints) {
                        // remove duplicated wall
                        this.wallStarts[i].remove();
                    }
                    else {
                        wallEndpoints[this.wallStarts[i].getEnd().id] = true;
                    }
                }
                for (var i = this.wallEnds.length - 1; i >= 0; i--) {
                    if (this.wallEnds[i].getStart() === this) {
                        // removed zero length wall 
                        this.wallEnds[i].remove();
                    }
                    else if (this.wallEnds[i].getStart().id in wallStartpoints) {
                        // removed duplicated wall
                        this.wallEnds[i].remove();
                    }
                    else {
                        wallStartpoints[this.wallEnds[i].getStart().id] = true;
                    }
                }
            };
            return Corner;
        }());
        Model.Corner = Corner;
    })(Model = BP3D.Model || (BP3D.Model = {}));
})(BP3D || (BP3D = {}));
