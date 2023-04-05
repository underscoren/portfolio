import { Texture } from "pixi.js";
import { SCREEN_HEIGHT } from "../constants";
import { EntitySystem } from "../Systems/EntitySystem";
import { easeOutExpo, Entity, lerp, Time } from "../util";

const RISE_TIME = 500; // time for cannon to rise and spawn ball
const FALL_TIME = 350;
const TOTAL_LIFETIME = RISE_TIME + FALL_TIME;

export class Cannon extends Entity {
    constructor() {
        super();
        this.texture = Texture.from("cannon");
        this.anchor.set(0.5, 0);
        this.y = SCREEN_HEIGHT;
    }

    lifetime = 0;
    spawnedBall = false;

    onSpawnBall: undefined | (() => void);

    update() {
        this.lifetime += Time.deltaMSScaled;

        if (this.lifetime > 0 && this.lifetime <= RISE_TIME) {
            this.y = lerp(SCREEN_HEIGHT, SCREEN_HEIGHT - this.height, this.lifetime / RISE_TIME);
        }

        if (this.lifetime > RISE_TIME) {
            if (!this.spawnedBall) {
                this.onSpawnBall?.();
                this.spawnedBall = true;
            }

            this.y = lerp(
                SCREEN_HEIGHT - this.height,
                SCREEN_HEIGHT,
                easeOutExpo((this.lifetime - RISE_TIME) / FALL_TIME)
            );
        }

        if (this.lifetime > TOTAL_LIFETIME) EntitySystem.delete(this);
    }
}
