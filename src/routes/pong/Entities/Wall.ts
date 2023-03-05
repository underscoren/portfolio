import { Texture } from "pixi.js";
import { Entity, type ICollider } from "../util";

export class Wall extends Entity implements ICollider {
    protected _name = "Wall";

    constructor() {
        super();
        this.texture = Texture.from("wall");
    }

    get collider() {
        return this.getBounds();
    }

    onCollide = undefined;
}