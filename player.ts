import { Actor, Color, Engine, Keys, Vector, vec } from "excalibur";
import { Config } from "./config";


export class Player extends Actor {
    constructor() {
        super({
            pos: vec(100, 100),
            color: Color.Red,
            width: 100,
            height: 100
        })
    }
    inputPressed = false;

    onPreUpdate(engine: Engine<any>, delta: number): void {
        this.inputPressed = false;
        let dir = Vector.Zero;
        if (engine.input.keyboard.isHeld(Keys.W)) {
            dir = dir.add(Vector.Up);
            this.inputPressed = true;
        }
        if (engine.input.keyboard.isHeld(Keys.A)) {
            dir = dir.add(Vector.Left);
            this.inputPressed = true;
        }
        if (engine.input.keyboard.isHeld(Keys.S)) {
            dir = dir.add(Vector.Down);
            this.inputPressed = true;
        }
        if (engine.input.keyboard.isHeld(Keys.D)) {
            dir = dir.add(Vector.Right);
            this.inputPressed = true;
        }
        if (dir.x !== 0 && dir.y !== 0) {
            dir = dir.normalize();
        }

        this.acc = dir.scale(Config.ACCELERATION);
    }
    
    onPostUpdate(engine: Engine<any>, delta: number): void {
        this.applyDeceleration();
    }

    applyDeceleration() {
        const isOverMaxVelocity = Math.abs(this.vel.size) > Config.MAX_VELOCITY;
        if (!this.inputPressed || isOverMaxVelocity) {
            // apply deceleration in the opposite direction as motion
            this.acc = this.vel.negate().normalize().scale(Config.DECELERATION);
        }

        // velocity and acc are in opposite directions means decelerating
        const isDecelerating = this.acc.dot(this.vel) < 0;
        if (isDecelerating && Math.abs(this.vel.size) < 1) {
            this.vel.x = 0
            this.acc.x = 0
        }
    }
}