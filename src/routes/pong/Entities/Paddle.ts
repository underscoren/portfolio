import { Texture } from "pixi.js";
import { Entity, type ICollider } from "../util";

export class Paddle extends Entity implements ICollider {
    /** The multiplier for x velocity when ball collides with paddle */
    static paddleCurve = 0.005;
    static paddleSpeed = 80;
    
    constructor() {
        super();
        this.texture = Texture.from("paddle");
        this.anchor.set(0.5);
    }

    get collider() {
        return this.getBounds();
    }

    onCollide = undefined;
}