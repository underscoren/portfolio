import { PADDLE_YOFFSET } from "../constants";
import type { Ball } from "../Entities/Ball";

export class BallManager {
    static balls: Ball[] = [];

    static get closestBall() {
        if(!this.balls.length)
            return null;
        
        let closestY = Infinity;
        let closest = null;
        for(const ball of this.balls)
            if(ball.y > PADDLE_YOFFSET && ball.y < closestY) {
                closestY = ball.y;
                closest = ball;
            } 
        
        return closest;
    }
    
    static add(ball: Ball) {
        BallManager.balls.push(ball);
        ball.on("removed", () => BallManager.balls.filter(b => b == ball));
    }
}