"use strict";
var Car = /** @class */ (function () {
    function Car() {
    }
    // 刹车
    Car.prototype.brake = function (light, engine) {
        light.blink();
        engine.stop();
    };
    return Car;
}());
var Light = /** @class */ (function () {
    function Light() {
    }
    Light.prototype.blink = function () {
        console.error('刹车灯闪烁...');
    };
    return Light;
}());
var Engine = /** @class */ (function () {
    function Engine() {
    }
    Engine.prototype.stop = function () {
        console.error('发动机熄火...');
    };
    return Engine;
}());
var car = new Car();
var light = new Light();
var engine = new Engine();
car.brake({ blink: light.blink }, { stop: engine.stop });
