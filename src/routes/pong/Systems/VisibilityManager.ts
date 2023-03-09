import { System } from "../util";

/** 
 * A helper system used to handle "pausing" updates when tab loses visibility.
 * Tabs that are in the background will not receive `requestAnimationFrame()` 
 * calls, so the next update will have a very large delta, causing moving
 * objects to move vast distances (i.e. out of bounds) when tabbing back in.
 */
export class VisibilityManager extends System {
    static wasTabbedOut = false;
    static onTabbedOut: undefined | (() => unknown);
    static get isHidden() {
        return document.hidden;
    }

    constructor() {
        super();

        document.addEventListener("visibilitychange", () => {
            if(document.hidden) {
                VisibilityManager.wasTabbedOut = true;
                VisibilityManager.onTabbedOut?.();
            }
        });
    }


    /** !!! Make sure to only call this after all other updates were processed !!! */
    update() {
        if(VisibilityManager.wasTabbedOut)
            VisibilityManager.wasTabbedOut = false; // reset after update
    }
}