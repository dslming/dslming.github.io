
interface LightStopInerface {
    blink(): void
}

interface EngineStopInterface {
    stop(): void
}

class Car {
    constructor() {}

    // 刹车
    brake(light: LightStopInerface, engine: EngineStopInterface) {
        light.blink()
        engine.stop()
    }
}

class Light implements LightStopInerface{
    constructor() {}

    blink() {
        console.error('刹车灯闪烁...')
    }
}

class Engine implements EngineStopInterface{
    constructor() {}

    stop() {
        console.error('发动机熄火...')
    }
}

let car = new Car()
let light = new Light()
let engine = new Engine()
car.brake({blink: light.blink}, {stop: engine.stop})