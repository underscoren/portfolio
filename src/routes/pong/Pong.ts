import { Application, Sprite, Texture, Rectangle, Text, TextStyle } from "pixi.js"
import PaddleSVGURL from "./assets/paddle.svg";
import BallSVGURL from "./assets/ball.svg";
import CannonSVGURL from "./assets/cannon.svg";

/** Clamp a value between min and max */
const clamp = (min: number, max: number, value: number) => Math.min(max, Math.max(min, value));

/** Linearly interpolates a value betweeen `a` and `b` by value `t` */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;

class PongGame {
    app: Application;

    constructor(public canvas: HTMLCanvasElement) {
        this.app = new Application({
            view: canvas,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT
        });

        this.init();
    }
    static timeScale = 1;
    mouseX = 0;
    
    score = 0;
    displayedScore = 0;

    paddleBottom = new Paddle();
    paddleTop = new Paddle();

    paddleCurve = 0.005;
    paddleSpeed = 30;

    balls: Ball[] = [];
    cannons: BallSpawner[] = [];

    debugText = new Text(`
delta: 0
Score: 0
Balls: 0
Cannons: 0
spawnerDelay: 0`);

    init() {
        // make entire stage interactable
        this.app.stage.interactive = true;
        this.app.stage.hitArea = new Rectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        
        this.app.stage.on("pointermove", ev => {
            this.mouseX = ev.global.x;
        });

        // set paddle positions
        this.paddleTop.x = SCREEN_WIDTH / 2;
        this.paddleBottom.x = SCREEN_WIDTH / 2;

        const yOffset = 40;
        this.paddleTop.y = yOffset;
        this.paddleBottom.y = SCREEN_HEIGHT - yOffset;

        // add paddle objects
        this.app.stage.addChild(this.paddleTop.sprite, this.paddleBottom.sprite);

        // setup main loop
        this.app.ticker.add(() => {
            this.update(this.app.ticker.elapsedMS);
        });

        // debug text
        this.debugText.x = 10
        this.debugText.y = 30
        const fontStyle = new TextStyle({
            fill: ["#ffffff"]
        });
        this.debugText.style = fontStyle;

        this.app.stage.addChild(this.debugText);
    }

    addScore(value: number) {
        this.score += value;
    }

    updateScore(delta: number) {
        const speed = 100;
        if(Math.abs(this.displayedScore) < Math.abs(this.score)) {
            this.displayedScore += ((this.score - this.displayedScore) / speed) * delta * PongGame.timeScale;
            
            if(Math.abs(this.score - this.displayedScore) < 0.5)
                this.displayedScore = this.score;
        }
    }

    spawnBall(x: number, y: number, velX: number, velY: number) {
        const ball = new Ball();

        ball.x = x;
        ball.y = y;
        ball.velX = velX;
        ball.velY = velY;

        this.balls.push(ball);
        this.app.stage.addChild(ball.sprite);
    }

    spawnCannon(x: number | void) {
        const offset = 100;

        const max = SCREEN_WIDTH - offset;
        const min = offset;
        
        const randomX = Math.floor(Math.random() * (max - min + 1) + min)
        const cannon = new BallSpawner(x ?? randomX);
        cannon.onSpawnedBall = () => {
            this.spawnBall(cannon.x, cannon.y - Ball.texture.height / 2, 0, -0.5);
        };

        this.cannons.push(cannon);
        this.app.stage.addChild(cannon.sprite);
    }

    spawnerDelay = 0;

    update(delta: number) {
        /** Wall width */
        const sideOffset = 80;

        // update paddles

        // move bottom paddle to mouse x and clamp to screen bounds
        this.paddleBottom.x = clamp(
            sideOffset + this.paddleBottom.width / 2,
            SCREEN_WIDTH - (sideOffset + this.paddleBottom.width / 2),
            this.mouseX
        );
        
        let paddleTargetX = SCREEN_WIDTH / 2; // if no balls default to the center
        
        // find closest ball or null
        const closestBall = this.balls.length ? this.balls.reduce((prev, ball) => prev = prev.y > ball.y ? prev : ball) : null;
        if(closestBall)
            paddleTargetX = closestBall.x; // target the ball with the closest height

        // move top paddle towards targetX
        this.paddleTop.x += ((paddleTargetX - this.paddleTop.x) / this.paddleSpeed) * delta * PongGame.timeScale;
        
        // clamp top paddle to screen bounds
        this.paddleTop.x = clamp(
            sideOffset + this.paddleTop.width / 2,
            SCREEN_WIDTH - (sideOffset + this.paddleTop.width / 2),
            this.paddleTop.x
        );

        // move all balls
        for(const ball of this.balls)
            ball.update(delta);
        
        // update all cannons
        for(const cannon of this.cannons) {
            cannon.update(delta);
            if(cannon.lifetime > BallSpawner.TOTAL_LIFETIME) {
                this.app.stage.removeChild(cannon.sprite);
                cannon.alive = false;
            }
        }

        
        // perform collision
        for(const ball of this.balls) {
            // collide with walls
            if(
                (ball.x - ball.radius) < sideOffset || // left wall
                (ball.x + ball.radius) > (SCREEN_WIDTH - sideOffset) // right wall
            )
                ball.velX *= -1; // bounce horizontally
            
            // collide with paddles
            for(const paddle of [this.paddleTop, this.paddleBottom]) {
                const paddleRect = paddle.sprite.getBounds();
                const ballRect = ball.sprite.getBounds();

                // simplify collisions to AABBs, hopefully nobody will notice :) (technically more forgiving)
                if(ballRect.intersects(paddleRect)) {
                    const ballYSpeed = Math.abs(ball.velY);
                    if(ball.y > paddle.y) // ball is above paddle, must bounce upwards
                        ball.velY = ballYSpeed;
                    if(ball.y < paddle.y) // ball is below paddle, must bounce downwards
                        ball.velY = -ballYSpeed;
                    
                    ball.velX = (ball.x - paddle.x) * this.paddleCurve; 
                }
            }

            // check if ball is off screen
            if((ball.y - ball.radius) > SCREEN_HEIGHT) { // on player side
                this.addScore(-100);
                this.app.stage.removeChild(ball.sprite)
                ball.alive = false;
            }

            if((ball.y + ball.radius) < 0) { // on opponent side
                this.addScore(100);
                this.app.stage.removeChild(ball.sprite);
                ball.alive = false;
            }

        }

        // remove old references
        this.balls = this.balls.filter(ball => ball.alive);
        this.cannons = this.cannons.filter(cannon => cannon.alive);

        this.updateScore(delta);

        if(this.balls.length == 0 && this.cannons.length == 0) {
            this.spawnerDelay += delta;
            if(this.spawnerDelay > 100) {
                this.spawnerDelay = 0;
                this.spawnCannon();
            }
        }

        this.debugText.text = `Score: ${this.score}
DisplayedScore: ${this.displayedScore.toFixed(0)}
Balls: ${this.balls.length}
Cannons: ${this.cannons.length}
spawnerDelay: ${Math.floor(this.spawnerDelay)}`
    }
}

class Paddle {
    static texture = Texture.from(PaddleSVGURL);
    
    sprite: Sprite;
    constructor () {
        this.sprite = Sprite.from(Paddle.texture);
        this.sprite.anchor.set(0.5);
    }

    /** Conveience getters / setters */

    get x() {
        return this.sprite.x;
    }

    set x(value: number) {
        this.sprite.x = value;
    }

    get y() {
        return this.sprite.y;
    }

    set y(value: number) {
        this.sprite.y = value;
    }

    get width() {
        return this.sprite.width;
    }

    get height() {
        return this.sprite.height;
    }
}


class Ball {
    static texture = Texture.from(BallSVGURL);

    sprite: Sprite;
    constructor() {
        this.sprite = Sprite.from(Ball.texture);
        this.sprite.anchor.set(0.5);
    }

    velX = 0;
    velY = 0;

    alive = true;

    update(delta: number) {
        this.x += this.velX * delta * PongGame.timeScale;
        this.y += this.velY * delta * PongGame.timeScale;
    }

    /** Conveience getters / setters */

    get x() {
        return this.sprite.x;
    }

    set x(value: number) {
        this.sprite.x = value;
    }

    get y() {
        return this.sprite.y;
    }

    set y(value: number) {
        this.sprite.y = value;
    }

    get width() {
        return this.sprite.width;
    }

    get height() {
        return this.sprite.height;
    }
    
    get radius() {
        return this.sprite.width / 2;
    }
}

class BallSpawner {
    static texture = Texture.from(CannonSVGURL);

    sprite: Sprite;
    constructor(x: number) {
        this.sprite = Sprite.from(BallSpawner.texture);
        this.sprite.anchor.set(0.5, 0);
        this.x = x;
    }

    lifetime = 0;
    spawnedBall = false;
    alive = true;

    static RISE_TIME = 500; // time for cannon to rise and spawn ball
    static FALL_TIME = 350;
    static TOTAL_LIFETIME = this.RISE_TIME + this.FALL_TIME;

    onSpawnedBall: undefined | (() => void);

    update(delta: number) {
        this.lifetime += delta * PongGame.timeScale;

        if(this.lifetime < BallSpawner.RISE_TIME) {
            this.y = lerp(
                SCREEN_HEIGHT, 
                SCREEN_HEIGHT - this.height, 
                this.lifetime / BallSpawner.RISE_TIME
            );
        }
        if (this.lifetime > BallSpawner.RISE_TIME) {
            if(!this.spawnedBall) {
                this.onSpawnedBall?.();
                this.spawnedBall = true;
            }

            this.y = lerp(
                SCREEN_HEIGHT - this.height, 
                SCREEN_HEIGHT, 
                (this.lifetime - BallSpawner.RISE_TIME) / BallSpawner.FALL_TIME
            );
        }
        
    }

    /** Conveience getters / setters */

    get x() {
        return this.sprite.x;
    }

    set x(value: number) {
        this.sprite.x = value;
    }

    get y() {
        return this.sprite.y;
    }

    set y(value: number) {
        this.sprite.y = value;
    }

    get width() {
        return this.sprite.width;
    }

    get height() {
        return this.sprite.height;
    }
}

export {
    PongGame
};