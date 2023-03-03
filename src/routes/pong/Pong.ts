import { Application } from "pixi.js"
import { Time } from "./util";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import { MainScene, type IScene } from "./Scenes";
import { GameAssets } from "./Assets";

class PongGame {
    static app: Application;
    static currentScene: IScene;

    constructor(public canvas: HTMLCanvasElement) {
        PongGame.app = new Application({
            view: canvas,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT
        });
        
        console.log("setup application");
        
        // setup main loop
        PongGame.app.ticker.add(() => {
            Time.deltaMS = PongGame.app.ticker.deltaMS;
            PongGame.currentScene?.update();
        });

        // IIFE to perform async task
        (async () => {
            // load assets
            await GameAssets.load();


            // set initial scene
            const mainScene = new MainScene();
            PongGame.changeScene(mainScene);
        })().then(() => {
            console.log("finished init");
        });
    }

    static async changeScene(scene: IScene) {
        if(PongGame.currentScene) {
            PongGame.app.stage.removeChild(PongGame.currentScene);
            PongGame.currentScene.destroy();
        }

        PongGame.currentScene = scene;
        PongGame.app.stage.addChild(scene);
    }
}

export {
    PongGame
};