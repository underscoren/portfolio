import { Texture } from "pixi.js";
import { Entity } from "../util";

export class MusicIndicator extends Entity {
    constructor() {
        super();
        this.texture = Texture.from("music-indicator");
    }
}