import type { Sound } from "@pixi/sound";
import { Assets } from "pixi.js";
import { System, Time } from "../util";

export class AudioManager extends System {
    bgAudio: Sound;
    menuAudio: Sound;

    activeSounds: Sound[] = [];

    constructor() {
        super();
        this.bgAudio = Assets.get("game-audio");
        this.menuAudio = Assets.get("menu-audio");
        Time.addTimescaleEventListener(() => {
            const scale = Time.timeScale;
            for(const sound of this.activeSounds)
                sound.speed = scale;
        });
    }

    playMusic() {
        this.bgAudio.play();
        this.activeSounds.push(this.bgAudio);
    }

    playOneshot(soundName: string) {
        const sound = Assets.get(soundName) as Sound;
        sound.play();
        this.activeSounds.push(sound);
    }

    update() {
        // remove references to sounds that aren't playing anymore
        this.activeSounds = this.activeSounds.filter(s => s.isPlaying);
    }
}