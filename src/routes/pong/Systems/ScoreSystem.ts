import type { Text } from "pixi.js";
import { System, Time } from "../util";

const SPEED = 100;
const SCALE_MULT = 1.5;
const SCALE_MAX = 20 * 3.5;

/** Handles displaying the score on the screen, and fancy effects */
export class ScoreSystem extends System {
    displayedScore = 0;
    score = 0;
    fontSize = 20;

    constructor(public text: Text) {
        super();
    }

    addScore(score: number) {
        this.score += score;
        this.fontSize = Math.min(this.fontSize * SCALE_MULT, SCALE_MAX);
        this.text.style.fontSize = this.fontSize;
    }

    update() {
        if (Math.abs(this.score - this.displayedScore) > 0) {
            this.displayedScore +=
                ((this.score - this.displayedScore) / SPEED) * Time.deltaMSScaled;

            if (Math.abs(this.score - this.displayedScore) < 1) this.displayedScore = this.score;

            this.text.text = `Score: ${this.displayedScore.toFixed(0)}`;
        }

        if (this.fontSize > 20) {
            this.fontSize = this.fontSize * 1 - Time.deltaMSScaled / 50;
            this.text.style.fontSize = this.fontSize;
        }

        if (this.fontSize < 20) {
            this.fontSize = 20;
            this.text.style.fontSize = 20;
        }
    }
}
