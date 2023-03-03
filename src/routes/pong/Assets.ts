import { Assets, type ResolverManifest } from "pixi.js";



export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "sprites",
            assets: {
                "paddle": "/assets/paddle.svg",
                "ball": "/assets/ball.svg",
                "wall": "/assets/wall.svg",
                "cannon": "/assets/cannon.svg",
            }
        }
    ]
}

class GameAssets {
    static loaded = false;

    static async load() {
        await Assets.init({manifest});
        await Assets.loadBundle("sprites");

        GameAssets.loaded = true;
        console.log("loadeded assets");
    }
}

export {
    GameAssets
}