import { easeOutExpo, Entity, lerp, Time, type ICollider } from "./util";
import { SCREEN_HEIGHT } from "./constants";
import { Texture } from "pixi.js";

class Paddle extends Entity implements ICollider {
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

class Wall extends Entity implements ICollider {
    protected _name = "Wall";

    constructor() {
        super();
        this.texture = Texture.from("wall");
    }

    get collider() {
        return this.getBounds();
    }

    onCollide = undefined;
}

class Ball extends Entity implements ICollider {
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

    onCollide(other: Entity) {
        if(other.name == "Wall") {
            this.velX *= -1;
        } else { // assume paddle
            const ballYSpeed = Math.abs(this.velY);
            
            if(this.y > other.y) // ball is above paddle, must bounce upwards
                this.velY = ballYSpeed;
            
            if(this.y < other.y) // ball is below paddle, must bounce downwards
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
            this.remove();
        }

        if((this.y + radius) < 0) { // on opponent side
            this.onBallOffscreen?.(true);
            this.remove();
        }
    }
}


class Cannon extends Entity {
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

export {
    Wall,
    Paddle,
    Ball,
    Cannon
}