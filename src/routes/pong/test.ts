import { Application, Sprite } from "pixi.js"
import paddleSVG from "./assets/paddle.svg"

class Game {
    static _app: Application;

    constructor(canvas: HTMLCanvasElement) {
        Game._app = new Application({
            view: canvas,
            width: 1280,
            height: 720
        });

        const paddle = Sprite.from(paddleSVG);
        paddle.anchor.set(0.5);
        paddle.x = 1280 / 2;
        paddle.y = 720 / 2;

        Game._app.stage.addChild(paddle);
    }
}

export {
    Game
}