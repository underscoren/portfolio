import { Container, Rectangle, Text } from "pixi.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import { PongGame } from "../Pong";
import type { IScene } from "../util";
import { MainScene } from "./MainScene";

export class EndScene extends Container implements IScene {
    
    scoreText = new Text();
    
    constructor(score: number) {
        super();

        let result = "";
        if(score == 0)
        result = "Tie!";
        if(score > 0)
        result = "You win!";
        if(score < 0)
        result = "You lose!";
        
        this.scoreText.text = `${result}\nScore: ${score}\n\nClick anywhere to play again`;
        this.scoreText.style.fill = 0xffffff;
        this.scoreText.style.fontSize = 32;
        this.scoreText.style.align = "center";
        
        this.scoreText.anchor.set(0.5);
        this.scoreText.x = SCREEN_WIDTH / 2;
        this.scoreText.y = SCREEN_HEIGHT / 2;

        this.addChild(this.scoreText);

        // make entire stage interactable
        this.interactive = true;
        this.hitArea = new Rectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

        const switchScene = () => {
            const mainScene = new MainScene();
            PongGame.changeScene(mainScene);
        }

        this.once("click", switchScene);
        this.once("tap", switchScene);
    }
    
    update() {/* noop */}
}