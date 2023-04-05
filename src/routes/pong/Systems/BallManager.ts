import { PADDLE_YOFFSET } from "../constants";
import type { Ball } from "../Entities/Ball";

/**
 * A class to keep track of all the balls on the screen,
 * and the closest ball to the AI
 */
export class BallManager {
    static balls: Ball[] = [];

    static get closestBall() {
        if (!this.balls.length) return null;

        let closestY = Infinity;
        let closest = null;
        for (const ball of this.balls)
            if (ball.y > PADDLE_YOFFSET && ball.y < closestY) {
                closestY = ball.y;
                closest = ball;
            }

        return closest;
    }

    static get ballCount() {
        return this.balls.length;
    }

    static add(ball: Ball) {
        this.balls.push(ball);
        ball.on("removed", () => (this.balls = this.balls.filter((b) => b != ball)));
    }
}
