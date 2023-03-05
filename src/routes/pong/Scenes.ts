import { Container, Graphics, Rectangle, Text, TextStyle, type DisplayObject } from "pixi.js";
import { GameAssets } from "./Assets";
import { BALL_RADIUS, CANNON_RADIUS, PADDLE_YOFFSET, SCREEN_HEIGHT, SCREEN_WIDTH, WALL_WIDTH } from "./constants";
import { Ball, Cannon, Paddle, Wall } from "./Entities";
import { BallManager, EntitySystem, PaddleManager, ScoreSystem } from "./Systems";
import { easeOutExpo, Input, lerp, Time } from "./util";
import "@pixi/math-extras"
import { PongGame } from "./Pong";

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
        ball.onBallOffscreen = top => this.score.addScore(top ? 80 : -100);
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
            for(const other of colliders) {
                const intersection = ball.collider.intersection(other.collider);
                if(intersection.width > 0 && intersection.height > 0)
                    ball.onCollide(other, intersection);
            }
        
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

class LoadingScene extends Container implements IScene {
    
    loadingText = new Text("Loading");
    loadingBar = new Container();
    loadingBarBG = new Graphics();
    loadingBarFG = new Graphics();

    timer = 0;

    constructor() {
        super();

        const barWidth = SCREEN_WIDTH * 0.75;
        const barHeight = 45;

        this.loadingBarFG.beginFill(0x5B8FB9);
        this.loadingBarFG.drawRect(0, 0, barWidth, barHeight);
        this.loadingBarFG.endFill();
        this.loadingBarFG.scale.x = 0;

        this.loadingBarBG.lineStyle(3, 0xffffff);
        this.loadingBarBG.drawRect(0, 0, barWidth, barHeight);
        
        this.loadingBar.addChild(this.loadingBarBG);
        this.loadingBar.addChild(this.loadingBarFG);

        this.loadingBar.x = (SCREEN_WIDTH - barWidth + 10) / 2;
        this.loadingBar.y = (SCREEN_HEIGHT - barHeight + 10) / 2;
        
        this.addChild(this.loadingBar);

        this.loadingText.style = new TextStyle({
            fontFamily: "Arial",
            fill: 0xffffff,
            fontSize: 32
        })
        this.loadingText.x = SCREEN_WIDTH / 2;
        this.loadingText.y = SCREEN_HEIGHT / 2 - 50;
        this.loadingText.anchor.set(0.5);

        this.addChild(this.loadingText);

        // IIFE to perform async task
        (async () => {
            GameAssets.onProgress = progress => this.loadingBarFG.scale.x = progress
            // load assets
            await GameAssets.load();

            this.loadingText.text = "Click here to continue";
            this.timer = 0;

            this.interactive = true;
            this.hitArea = new Rectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
            this.once("click", () => {
                const mainscene = new MainScene();
                PongGame.changeScene(mainscene);
            })
        })().then(() => {
            console.log("finished load");
        });
    }

    update() {
        this.timer += Time.deltaMS;

        if(GameAssets.loaded) {
            this.loadingBar.alpha = lerp(
                this.loadingBar.alpha, 
                0, 
                easeOutExpo(Math.min(this.timer / 1300,1))
            );
            
            this.loadingText.y = lerp(
                this.loadingText.y, 
                (SCREEN_HEIGHT - this.loadingBar.height) / 2, 
                Time.deltaMS / 100
            );
        } else {
            if(this.timer > 300) {
                this.timer = 0;
                this.loadingText.text += ".";
                if(this.loadingText.text.length > 10)
                    this.loadingText.text = "Loading";
            }
        }
    }
}

export {
    MainScene,
    LoadingScene,
}