import "@pixi/math-extras"
import { Container, Graphics, Rectangle, Text, TextStyle } from "pixi.js";
import { GameAssets } from "../Assets";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import { PongGame } from "../Pong";
import { easeOutExpo, lerp, Time, type IScene } from "../util";
import { MainScene } from "./MainScene";

export class LoadingScene extends Container implements IScene {

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

        const lineWidth = 5;
        const lineOffset = Math.floor(lineWidth/2);
        this.loadingBarBG.lineStyle(lineWidth, 0xffffff);
        this.loadingBarBG.drawRect(-lineOffset, -lineOffset, barWidth+lineOffset, barHeight+lineOffset);

        this.loadingBar.addChild(this.loadingBarFG);
        this.loadingBar.addChild(this.loadingBarBG);

        this.loadingBar.x = (SCREEN_WIDTH - this.loadingBar.width) / 2;
        this.loadingBar.y = (SCREEN_HEIGHT - this.loadingBar.height) / 2;

        this.addChild(this.loadingBar);

        this.loadingText.style = new TextStyle({
            fontFamily: "Arial",
            fill: 0xffffff,
            fontSize: 32
        });

        this.loadingText.x = SCREEN_WIDTH / 2;
        this.loadingText.y = SCREEN_HEIGHT / 2 - 50;
        this.loadingText.anchor.set(0.5);

        this.addChild(this.loadingText);
        this.cursor = "wait";


        // IIFE to perform async task
        (async () => {
            GameAssets.onProgress = progress => this.loadingBarFG.scale.x = progress
            // load assets
            await GameAssets.load();

            this.loadingText.text = "Click here to continue\n(Audio Warning!)";
            this.timer = 0;

            this.interactive = true;
            this.hitArea = new Rectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
            this.cursor = "pointer";
            this.once("click", () => {
                const mainscene = new MainScene();
                PongGame.changeScene(mainscene);
            });
        })().then(() => {
            console.log("finished load");
        });

        this.once("destroyed", () => { // manually destroy graphics objects
            console.log("Loading scene destroyed");
            this.loadingBarBG.destroy();
            this.loadingBarFG.destroy();
        });
    }

    update() {
        this.timer += Time.deltaMS;

        if(GameAssets.loaded) {
            this.loadingBar.alpha = lerp(
                this.loadingBar.alpha,
                0,
                easeOutExpo(Math.min(this.timer / 30000, 1))
            );

            this.loadingText.y = lerp(
                this.loadingText.y,
                (SCREEN_HEIGHT - this.loadingBar.height) / 2,
                Time.deltaMS / 1000
            );
        } else {
            if(this.timer > 350) {
                this.timer = 0;
                this.loadingText.text += ".";
                if(this.loadingText.text.length > 10)
                    this.loadingText.text = "Loading";
            }
        }
    }
}