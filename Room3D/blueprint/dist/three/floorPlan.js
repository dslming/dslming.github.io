"use strict";
/// <reference path="../../lib/three.d.ts" />
/// <reference path="floor.ts" />
/// <reference path="edge.ts" />
var BP3D;
(function (BP3D) {
    var Three;
    (function (Three) {
        Three.Floorplan = function (scene, floorplan, controls) {
            var scope = this;
            this.scene = scene;
            this.floorplan = floorplan;
            this.controls = controls;
            this.floors = [];
            this.edges = [];
            floorplan.fireOnUpdatedRooms(redraw);
            function redraw() {
                // clear scene
                scope.floors.forEach(function (floor) {
                    floor.removeFromScene();
                });
                scope.edges.forEach(function (edge) {
                    edge.remove();
                });
                scope.floors = [];
                scope.edges = [];
                // draw floors
                scope.floorplan.getRooms().forEach(function (room) {
                    var threeFloor = new Three.Floor(scene, room);
                    scope.floors.push(threeFloor);
                    threeFloor.addToScene();
                });
                // draw edges
                scope.floorplan.wallEdges().forEach(function (edge) {
                    var threeEdge = new Three.Edge(scene, edge, scope.controls);
                    scope.edges.push(threeEdge);
                });
            }
        };
    })(Three = BP3D.Three || (BP3D.Three = {}));
})(BP3D || (BP3D = {}));
