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
            },
        },
        {
            name: "audio",
            assets: {
                "game-audio": "/assets/popcorn.mp3",
                "menu-audio": "/assets/sadgarden.mp3"
            }
        }
    ]
}

class GameAssets {
    static loaded = false;

    static async load() {
        await Assets.init({manifest});
        await Assets.loadBundle(["sprites", "audio"], progress => GameAssets.onProgress?.(progress));

        GameAssets.loaded = true;
        console.log("loadeded assets");
    }

    static onProgress: undefined | ((progress: number) => unknown);
}

export {
    GameAssets
}