import { Container, Rectangle, Text, TextStyle, type DisplayObject } from "pixi.js";
import { BALL_RADIUS, CANNON_RADIUS, PADDLE_YOFFSET, SCREEN_HEIGHT, SCREEN_WIDTH, WALL_WIDTH } from "./constants";
import { Ball, Cannon, Paddle, Wall } from "./Entities";
import { BallManager, EntitySystem, PaddleManager, ScoreSystem } from "./Systems";
import { Input, Time } from "./util";

export interface IScene extends DisplayObject {
    /** Called once every frame */
    update: () => unknown;
}

class MainScene extends Container implements IScene {
    entity: EntitySystem;
    score: ScoreSystem;
    paddleManager: PaddleManager;
    ballManager = new BallManager();

    paddleTop = new Paddle();
    paddleBottom = new Paddle();
    leftWall = new Wall();
    rightWall = new Wall();
    scoreText = new Text();

    spawnerDelay = 0;

    constructor() {
        super();

        // setup systems
        this.entity = new EntitySystem(this);
        this.score = new ScoreSystem(this.scoreText);
        this.paddleManager = new PaddleManager(this.paddleTop, this.paddleBottom);

        // make entire stage interactable
        this.interactive = true;
        this.hitArea = new Rectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        
        this.on("pointermove", ev => {
            Input.mouseX = ev.global.x;
        });

        // set paddle positions
        this.paddleTop.x = this.paddleBottom.x = SCREEN_WIDTH / 2;
        
        this.paddleTop.y = PADDLE_YOFFSET;
        this.paddleBottom.y = SCREEN_HEIGHT - PADDLE_YOFFSET;

        // set wall positions
        this.rightWall.x = SCREEN_WIDTH - WALL_WIDTH;

        // add entities
        for(const entity of [this.paddleTop, this.paddleBottom, this.leftWall, this.rightWall]) 
            this.entity.addEntity(entity);
        
        // setup score text
        this.scoreText.text = "Score: 0";

        this.scoreText.x = WALL_WIDTH + 20;
        this.scoreText.y = 30;
        this.scoreText.style = new TextStyle({
            fill: 0xffffff,
            fontFamily: "Arial",
            fontSize: 20
        })
        this.addChild(this.scoreText);
        
        console.log("setup mainscene");
    }

    spawnBall(x: number, y: number, velX: number, velY: number) {
        const ball = new Ball();

        ball.x = x;
        ball.y = y;
        ball.velX = velX;
        ball.velY = velY;

        BallManager.add(ball);
        this.entity.addEntity(ball);
        ball.onBallOffscreen = top => this.score.addScore(top ? 80 : -100)
        console.log("spawning ball");
    }

    spawnCannon(x: number | void) {
        const offset = WALL_WIDTH + CANNON_RADIUS * 3;

        const max = SCREEN_WIDTH - offset;
        const min = offset;
        
        const cannon = new Cannon();
        cannon.x = x ?? Math.floor(Math.random() * (max - min + 1) + min);

        cannon.onSpawnBall = () => 
            this.spawnBall(cannon.x, cannon.y - BALL_RADIUS, 0, -0.5);

        this.entity.addEntity(cannon);
    }

    update() {
        // handle paddles
        this.paddleManager.update();
        
        // update entites
        this.entity.update();
        
        const colliders = [this.leftWall, this.rightWall, this.paddleTop, this.paddleBottom];

        // perform collision
        for(const ball of BallManager.balls)
            for(const other of colliders)
                if(ball.collider.intersects(other.collider))
                    ball.onCollide(other);
        
        // test: spawn some balls
        this.spawnerDelay += Time.deltaMSScaled;
        if(this.spawnerDelay > 5000) {
            this.spawnerDelay = 0;
            this.spawnCannon();
        }

        // update score display
        this.score.update();
    }
}

export {
    MainScene
}