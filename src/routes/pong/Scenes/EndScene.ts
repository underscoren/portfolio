import { Container, Text } from "pixi.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import type { IScene } from "../util";

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
        
        this.scoreText.text = `${result}\nScore: ${score}`;
        this.scoreText.style.fill = 0xffffff;
        this.scoreText.style.fontSize = 32;
        
        this.scoreText.anchor.set(0.5);
        this.scoreText.x = SCREEN_WIDTH / 2;
        this.scoreText.y = SCREEN_HEIGHT / 2;

        this.addChild(this.scoreText);
    }
    
    update() {/* noop */}
}