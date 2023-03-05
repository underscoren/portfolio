import { Texture } from "pixi.js";
import { SCREEN_HEIGHT } from "../constants";
import { easeOutExpo, Entity, lerp, Time } from "../util";

export class Cannon extends Entity {
    constructor() {
        super();
        this.texture = Texture.from("cannon");
    }

    lifetime = 0;
    spawnedBall = false;

    static RISE_TIME = 500; // time for cannon to rise and spawn ball
    static FALL_TIME = 350;
    static TOTAL_LIFETIME = this.RISE_TIME + this.FALL_TIME;

    onSpawnBall: undefined | (() => void);

    update() {
        this.lifetime += Time.deltaMSScaled;

        if(this.lifetime < Cannon.RISE_TIME) {
            this.y = lerp(
                SCREEN_HEIGHT, 
                SCREEN_HEIGHT - this.height, 
                this.lifetime / Cannon.RISE_TIME
            );
        }
        
        if (this.lifetime > Cannon.RISE_TIME) {
            if(!this.spawnedBall) {
                this.onSpawnBall?.();
                this.spawnedBall = true;
            }

            this.y = lerp(
                SCREEN_HEIGHT - this.height, 
                SCREEN_HEIGHT, 
                easeOutExpo((this.lifetime - Cannon.RISE_TIME) / Cannon.FALL_TIME)
            );
        }

        if(this.lifetime > Cannon.TOTAL_LIFETIME)
            this.remove();
    }
}