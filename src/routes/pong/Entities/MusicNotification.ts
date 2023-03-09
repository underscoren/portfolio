import { Text, TextMetrics, TextStyle, Texture } from "pixi.js";
import { SCREEN_WIDTH } from "../constants";
import { easeOutBack, Entity, lerp, Time } from "../util";

const RISE_TIME = 550;
const STAY_TIME = 3000;
const FALL_TIME = 350;

const STAY_TIME_CUMUL = RISE_TIME + STAY_TIME;
const FALL_TIME_CUMUL = RISE_TIME + STAY_TIME + FALL_TIME;

export class MusicNotification extends Entity {
    constructor(contents: string) {
        super();
        this.texture = Texture.from("music-notification");

        this.y = 45;
        this.x = SCREEN_WIDTH;
        
        const LEFT_OFFSET = 65;

        this.text.anchor.set(0,0.5);
        this.text.x = LEFT_OFFSET;
        this.text.y = this.height / 2;
        
        this.text.text = contents;
        this.targetWidth = TextMetrics.measureText(contents, this.style).width + LEFT_OFFSET + 30;
        
        this.addChild(this.text);
    }

    private lifetime = 0;
    private text = new Text();
    private style = new TextStyle({fontFamily: "Arial", fontSize: 24});
    private targetWidth = 0;
    
    update() {
        this.lifetime += Time.deltaMS;

        if(this.lifetime <= RISE_TIME) {
            this.x = SCREEN_WIDTH - lerp(
                0,
                this.targetWidth,
                easeOutBack(this.lifetime / RISE_TIME)
            )
        }

        if(this.lifetime > RISE_TIME && this.lifetime <= STAY_TIME_CUMUL) {
            this.x = SCREEN_WIDTH - this.targetWidth;
        }

        if(this.lifetime > STAY_TIME_CUMUL && this.lifetime <= FALL_TIME_CUMUL) {
            this.x = SCREEN_WIDTH - lerp(
                this.targetWidth,
                0,
                (this.lifetime - STAY_TIME_CUMUL) / FALL_TIME
            )
        }

        if(this.lifetime > FALL_TIME_CUMUL)
            this.remove();
    }
}