import type { Text } from "pixi.js";
import { System, Time } from "../util";

export class ScoreSystem extends System {
    static speed = 100;
    static scaleMult = 1.5;
    static scaleMax = 20 * 3.5;

    displayedScore = 0;
    score = 0;
    fontSize = 20;

    constructor(public text: Text) {
        super();
    }

    addScore(score: number) {
        this.score += score;
        this.fontSize = Math.min(this.fontSize * ScoreSystem.scaleMult, ScoreSystem.scaleMax)
        this.text.style.fontSize = this.fontSize;
    }

    update() {
        if(Math.abs(this.score - this.displayedScore) > 0) {
            this.displayedScore += ((this.score - this.displayedScore) / ScoreSystem.speed) * Time.deltaMSScaled;
            
            if(Math.abs(this.score - this.displayedScore) < 1)
                this.displayedScore = this.score;
            
            this.text.text = `Score: ${this.displayedScore.toFixed(0)}`;
        }

        if(this.fontSize > 20) {
            this.fontSize = (this.fontSize * 1-(Time.deltaMSScaled / 50))
            this.text.style.fontSize = this.fontSize;
        }
        
        if(this.fontSize < 20) {
            this.fontSize = 20;
            this.text.style.fontSize = 20;
        }

    }
}