import { Texture } from "pixi.js";
import { SCREEN_HEIGHT } from "../constants";
import { EntitySystem } from "../Systems/EntitySystem";
import { clamp, Entity, Time, type ICollider } from "../util";

const ENDY = SCREEN_HEIGHT / 2;
const ENDY_OFFSET = 30;

export class Shot extends Entity implements ICollider {
    constructor() {
        super();
        this.texture = Texture.from("shot");
        this.anchor.set(0.5);
        this.alpha = 0.8;
    }

    velY = -0.25;

    update() {
        this.y += this.velY * Time.deltaMSScaled;

        if(this.y < (ENDY + ENDY_OFFSET))
            this.alpha = clamp(0, 1, (this.y - ENDY) / ENDY_OFFSET);

        if(this.y < ENDY)
            EntitySystem.delete(this);
    }

    get collider() {
        return this.getBounds();
    }

    onCollide = undefined;
}