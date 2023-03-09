import { Application } from "pixi.js"
import { Time, type IScene } from "./util";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import { LoadingScene } from "./Scenes/LoadingScene";
import "@pixi/sound"
import { VisibilityManager } from "./Systems/VisibilityManager";

class PongGame {
    static app: Application;
    static currentScene: IScene;
    static globals = {
        audio: {
            enable: false,
            volume: 0.5,
        }
    }

    visibilityManager = new VisibilityManager();

    constructor(public canvas: HTMLCanvasElement) {
        PongGame.app = new Application({
            view: canvas,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            background: 0x03001C
        });

        // setup main loop
        PongGame.app.ticker.add(() => {
            Time.deltaMS = VisibilityManager.wasTabbedOut ? 1/PongGame.app.ticker.minFPS : PongGame.app.ticker.deltaMS;
            PongGame.currentScene?.update();

            this.visibilityManager.update();
        });

        const loadScene = new LoadingScene();
        PongGame.changeScene(loadScene);

        console.log("init success");
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