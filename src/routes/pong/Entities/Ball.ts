import { Point, Rectangle, Texture } from "pixi.js";
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
            
            if(this.y > other.y) // ball is above paddle, must bounce upwards
                this.velY = ballYSpeed;
            
            if(this.y < other.y) // ball is below paddle, must bounce downwards
                this.velY = -ballYSpeed;
            
            this.velX = (this.x - other.x) * Paddle.paddleCurve;
            
            // displace ball by intersected distance to prevent glitching inside objects (this assumes single-object intersection)
    
            const otherCollider = other.collider;
            const otherMiddle = new Point(
                otherCollider.x + otherCollider.width / 2,
                otherCollider.y - otherCollider.height / 2
            )
            // ball coordinates are already in the middle
    
            const intersectionVector = new Point(this.x, this.y).subtract(otherMiddle);
            let angle = Math.atan(intersectionVector.y / intersectionVector.x); // angle of intersection
            angle -= Math.PI / 4; // "rotate" angle by pi/4 to create four "quarants" on each diagonal like so: X (imagine that's a graph)
    
            if (angle <= (Math.PI / 2)) { // from above
                this.y += intersection.height;
            } else if(angle > (Math.PI / 2) && angle <= Math.PI) { // from right
                this.x += intersection.width;
            } else if(angle > Math.PI && angle <= (3 * Math.PI / 2)) { // from below
                this.y -= intersection.height;
            } else { // from left
                this.x -= intersection.width;
            }
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