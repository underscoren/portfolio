import { Assets, type ResolverManifest } from "pixi.js";


export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "sprites",
            assets: {
                "paddle": "/assets/img/paddle.svg",
                "ball": "/assets/img/ball.svg",
                "wall": "/assets/img/wall.svg",
                "cannon": "/assets/img/cannon.svg",
                "shot": "/assets/img/shot.svg",
                "power": "/assets/img/power.svg",
            },
        },
        {
            name: "ui",
            assets: {
                "music-notification": "/assets/img/music_notification.svg"
            }
        },
        {
            name: "audio",
            assets: {
                "game-audio": "/assets/mus/popcorn.mp3",
                "menu-audio": "/assets/mus/sadgarden.mp3"
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