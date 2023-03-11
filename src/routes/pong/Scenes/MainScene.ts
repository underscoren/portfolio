import { Container, Rectangle, Text, TextStyle } from "pixi.js";
import { BALL_RADIUS, CANNON_RADIUS, PADDLE_YOFFSET, SCREEN_HEIGHT, SCREEN_WIDTH, WALL_WIDTH } from "../constants";
import { Ball } from "../Entities/Ball";
import { Cannon } from "../Entities/Cannon";
import { MusicNotification } from "../Entities/MusicNotification";
import { Paddle } from "../Entities/Paddle";
import { Wall } from "../Entities/Wall";
import { PongGame } from "../Pong";
import { AudioManager } from "../Systems/AudioManager";
import { BallManager } from "../Systems/BallManager";
import { CannonManager } from "../Systems/CannonManager";
import { EntitySystem } from "../Systems/EntitySystem";
import { PaddleManager } from "../Systems/PaddleManager";
import { ScoreSystem } from "../Systems/ScoreSystem";
import { Input, type IScene } from "../util";
import { EndScene } from "./EndScene";

export class MainScene extends Container implements IScene {
    entitySystem: EntitySystem;
    scoreSystem: ScoreSystem;
    paddleManager: PaddleManager;
    ballManager = new BallManager();
    cannonManager = new CannonManager();
    audioManager: AudioManager;

    paddleTop = new Paddle();
    paddleBottom = new Paddle();
    leftWall = new Wall();
    rightWall = new Wall();

    scoreText = new Text();
    musicNotification = new MusicNotification("EON - Popcorn Remix");

    spawnerDelay = 0;

    // debugText = new Text();

    constructor() {
        super();

        // setup systems
        this.entitySystem = new EntitySystem(this);
        this.scoreSystem = new ScoreSystem(this.scoreText);
        this.paddleManager = new PaddleManager(this.paddleTop, this.paddleBottom);
        this.audioManager = new AudioManager();

        this.cannonManager.onSpawnCannon = x => this.spawnCannon(x);

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
            this.entitySystem.addEntity(entity);
        
        // setup score text
        this.scoreText.text = "Score: 0";

        this.scoreText.x = WALL_WIDTH + 20;
        this.scoreText.y = 30;
        this.scoreText.style = new TextStyle({
            fill: 0xffffff,
            fontFamily: "Arial",
            fontSize: 20
        });
        this.addChild(this.scoreText);

        // play music
        this.audioManager.playMusic(() => {
            // callback when audio finishes

            // change to the end scene
            const endScene = new EndScene(this.scoreSystem.score);
            PongGame.changeScene(endScene);
            console.log("end");
        });
        this.entitySystem.addEntity(this.musicNotification);
        
        console.log("setup mainscene");

        // debug

        // this.debugText.style.fill = 0xffffff;
        // this.debugText.x = SCREEN_HEIGHT / 2;
        // this.debugText.y = SCREEN_WIDTH / 2;
        // this.addChild(this.debugText);
    }

    spawnBall(x: number, y: number, velX: number, velY: number) {
        const ball = new Ball();

        ball.x = x;
        ball.y = y;
        ball.velX = velX;
        ball.velY = velY;

        BallManager.add(ball);
        this.entitySystem.addEntity(ball);
        ball.onBallOffscreen = top => {
            // add score
            this.scoreSystem.addScore(Math.ceil((200 * (top ? 1 : -1)) / BallManager.ballCount))
            
            // if number of balls is lower than the minimum, spawn another one
            if((BallManager.ballCount - 1) < this.cannonManager.minBalls) { // this is technically called before the ball is removed, need to account for 1 fewer ball
                setTimeout(
                    () => this.spawnCannon(),
                    Math.floor(Math.random() * 1500 + 500)
                );
            }
        };

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

        this.entitySystem.addEntity(cannon);
    }

    update() {
        // update systems
        for(const system of [this.paddleManager, this.cannonManager, this.entitySystem])
            system.update();
        
        const colliders = [this.leftWall, this.rightWall, this.paddleTop, this.paddleBottom];

        // perform collision
        for(const ball of BallManager.balls)
            for(const other of colliders) {
                const intersection = ball.collider.intersection(other.collider);
                if(intersection.width > 0 && intersection.height > 0)
                    ball.onCollide(other, intersection);
            }

        // update score display
        this.scoreSystem.update();

        // debug
//         this.debugText.text = 
// `Balls: ${BallManager.ballCount}
// minBalls: ${this.cannonManager.minBalls}`
    }
}