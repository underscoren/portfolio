import type { Container, Text } from "pixi.js";
import { PADDLE_YOFFSET, SCREEN_WIDTH, WALL_WIDTH } from "./constants";
import { Paddle, type Ball } from "./Entities";
import { clamp, Input, System, Time, type Entity } from "./util";

/** 
 * System responsible for managing game entities and removing
 * them from the scene
 */
class EntitySystem extends System {
    private _entities: Entity[] = [];

    constructor(private _rootStage: Container) {
        super();
    }

    /** Adds an entity to the system and root container */
    addEntity(entity: Entity, container = this._rootStage) {
        this._entities.push(entity);
        container.addChild(entity);
    }

    update() {
        // update all entities
        for(const entity of this._entities)
            entity.update();
        
        // remove all entites marked for deletion
        for(const entity of this._entities) 
            if(!entity.alive)
                entity.parent.removeChild(entity);
        
        // remove references to deleted entites
        this._entities = this._entities.filter(e => e.alive);
    }
}

class ScoreSystem extends System {
    static speed = 100;
    static scaleMult = 1.5;
    static scaleMax = 20 * 3.5;

    displayedScore = 0;
    score = 0;
    fontSize = 20;

    constructor(public text: Text) {
        super();
    }

    addScore(score: number) {
        this.score += score;
        this.fontSize = Math.min(this.fontSize * ScoreSystem.scaleMult, ScoreSystem.scaleMax)
        this.text.style.fontSize = this.fontSize;
    }

    update() {
        if(Math.abs(this.score - this.displayedScore) > 0) {
            this.displayedScore += ((this.score - this.displayedScore) / ScoreSystem.speed) * Time.deltaMSScaled;
            
            if(Math.abs(this.score - this.displayedScore) < 1)
                this.displayedScore = this.score;
            
            this.text.text = `Score: ${this.displayedScore.toFixed(0)}`;
        }

        if(this.fontSize > 20) {
            this.fontSize = (this.fontSize * 1-(Time.deltaMSScaled / 50))
            this.text.style.fontSize = this.fontSize;
        }
        
        if(this.fontSize < 20) {
            this.fontSize = 20;
            this.text.style.fontSize = 20;
        }

    }
}

class BallManager {
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

class PaddleManager extends System {
    constructor(
        private paddleTop: Paddle,
        private paddleBottom: Paddle,
    ) {
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
        this.paddleTop.x += ((paddleTargetX - this.paddleTop.x) / Paddle.paddleSpeed) * Time.deltaMSScaled;
        
        // clamp top paddle to screen bounds
        this.paddleTop.x = clamp(
            WALL_WIDTH + this.paddleTop.width / 2,
            SCREEN_WIDTH - (WALL_WIDTH + this.paddleTop.width / 2),
            this.paddleTop.x
        );
    }
}

export {
    System,
    EntitySystem,
    ScoreSystem,
    BallManager,
    PaddleManager,
}