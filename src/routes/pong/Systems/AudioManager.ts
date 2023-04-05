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
            for (const sound of this.activeSounds) sound.speed = scale;
        });
    }

    /**
     * Plays the background music for the main game section
     * @param endCallback a callback for when the audio finishes playing
     */
    playMusic(endCallback: () => unknown) {
        this.bgAudio.play(endCallback);
        this.activeSounds.push(this.bgAudio);
    }

    /** Plays a named sound */
    playOneshot(soundName: string) {
        const sound = Assets.get(soundName) as Sound;
        sound.play();
        this.activeSounds.push(sound);
    }

    update() {
        // remove references to sounds that aren't playing anymore
        this.activeSounds = this.activeSounds.filter((s) => s.isPlaying);
    }
}
