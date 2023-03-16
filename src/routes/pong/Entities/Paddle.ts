import { Texture } from "pixi.js";
import { EntitySystem } from "../Systems/EntitySystem";
import { Entity, Time, type ICollider } from "../util";
import type { Power } from "./Power";
import type { Power as PowerType } from "../Systems/PowerManager";

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

    onCollide(other: Entity) {
        console.log("collision with",other);
        if(other.name == "Power") {
            EntitySystem.delete(other);

            const powerType = (other as Power).type;
            this.onPowerHit?.(powerType);
        }
    };

    onPowerHit: undefined | ((power: PowerType) => unknown);

    update() {
        if(this.scale.x > 1)
            this.scale.x -= 0.1 * (Time.deltaMSScaled / 1000);
        
        if(this.scale.x < 1)
            this.scale.x = 1;
    }
}