import { SCREEN_WIDTH, WALL_WIDTH } from "../constants";
import { Paddle } from "../Entities/Paddle";
import { clamp, Input, System, Time } from "../util";
import { BallManager } from "./BallManager";

/** Handles moving both the player and AI paddle */
export class PaddleManager extends System {
    constructor(private paddleTop: Paddle, private paddleBottom: Paddle) {
        super();
    }

    update() {
        // move bottom paddle to mouse x and clamp to screen bounds
        this.paddleBottom.x = clamp(
            WALL_WIDTH + this.paddleBottom.width / 2,
            SCREEN_WIDTH - (WALL_WIDTH + this.paddleBottom.width / 2),
            Input.mouseX
        );

        const closestBall = BallManager.closestBall;

        // target the closest ball or default to middle of the screen
        const paddleTargetX = closestBall ? closestBall.x : SCREEN_WIDTH / 2;

        // move top paddle towards targetX
        this.paddleTop.x +=
            ((paddleTargetX - this.paddleTop.x) / Paddle.paddleSpeed) * Time.deltaMSScaled;

        // clamp top paddle to screen bounds
        this.paddleTop.x = clamp(
            WALL_WIDTH + this.paddleTop.width / 2,
            SCREEN_WIDTH - (WALL_WIDTH + this.paddleTop.width / 2),
            this.paddleTop.x
        );
    }
}
