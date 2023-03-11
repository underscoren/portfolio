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
            name: "ui",
            assets: {
                "music-notification": "/assets/music_notification.svg"
            }
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

/** 
 * Handles loading all the game assets
 * TODO: audio takes a while to load, attempt to load less useful audio in the background
 */
class GameAssets {
    static loaded = false;

    static async load() {
        await Assets.init({manifest});
        await Assets.loadBundle(["sprites", "ui", "audio"], progress => GameAssets.onProgress?.(progress));

        GameAssets.loaded = true;
        console.log("loaded assets");
    }

    static onProgress: undefined | ((progress: number) => unknown);
}

export {
    GameAssets
}