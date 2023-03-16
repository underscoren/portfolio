import { Rectangle, Texture } from "pixi.js";
import { SCREEN_HEIGHT } from "../constants";
import { EntitySystem } from "../Systems/EntitySystem";
import { Entity, Time, type ICollider } from "../util";
import { Paddle } from "./Paddle";

export class Ball extends Entity implements ICollider {
    constructor(
        public velX = 0,
        public velY = 0
    ) {
        super();
        this.texture = Texture.from("ball");
        this.anchor.set(0.5);
    }

    get collider() {
        return this.getBounds();
    }

    onCollide(other: Entity & ICollider, intersection: Rectangle) {
        if(other.name == "Wall") {
            this.velX *= -1;

            // displace ball by wall intersection
            if(this.velX > 0) // left wall intersection
                this.x += intersection.width;
            else // right wall intersection
                this.x -= intersection.width;

        } else { // assume paddle
            const ballYSpeed = Math.abs(this.velY);
            
            if(this.y < SCREEN_HEIGHT / 2 ) // ball is in upper half must bounce downwards
                this.velY = ballYSpeed;
            
            if(this.y > SCREEN_HEIGHT / 2) // ball is in lower half, must bounce upwards
                this.velY = -ballYSpeed;
            
            this.velX = (this.x - other.x) * Paddle.paddleCurve;
        }

    }

    /** Called when the ball goes off screen */
    onBallOffscreen: undefined | ((top: boolean) => void);

    update() {
        this.x += this.velX * Time.deltaMSScaled;
        this.y += this.velY * Time.deltaMSScaled;

        const radius = this.width / 2;
        
        // check if ball is off screen
        if((this.y - radius) > SCREEN_HEIGHT) { // on player side
            this.onBallOffscreen?.(false);
            EntitySystem.delete(this);
        }

        if((this.y + radius) < 0) { // on opponent side
            this.onBallOffscreen?.(true);
            EntitySystem.delete(this);
        }
    }
}