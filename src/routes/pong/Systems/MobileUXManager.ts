import { System } from "../util";

export class MobileUXManager extends System {

    constructor(
        public fullscreenElement: HTMLElement
    ) {
        super();
    }

    /** Request fullscreen and set screen rotation appropriately */
    async fullscreenAndRotate() {
        try {
            await this.fullscreenElement.requestFullscreen({navigationUI: "hide"});
            
            screen.orientation.lock("landscape");

            this.fullscreenElement.addEventListener("fullscreenchange", () => {
                if(!document.fullscreenElement)
                    screen.orientation.unlock();
            });

            return true;
        } catch(err) {
            return false;
        }
    }
}