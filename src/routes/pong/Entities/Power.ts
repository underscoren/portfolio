import { Entity, Time, type ICollider } from "../util";
import type { Power as PowerType } from "../Systems/PowerManager";
import { Texture } from "pixi.js";
import { SCREEN_HEIGHT } from "../constants";
import { EntitySystem } from "../Systems/EntitySystem";

export class Power extends Entity implements ICollider {
    constructor(public type: PowerType) {
        super();
        this.texture = Texture.from("power");
        this.anchor.set(0.5);
    }

    get collider() {
        return this.getBounds();
    }

    onCollide = undefined;

    _name = "Power";

    velY = 0.3;

    update() {
        this.y += this.velY * Time.deltaMSScaled;

        if (this.y > SCREEN_HEIGHT + 100 || this.y < -100) EntitySystem.delete(this);
    }
}
