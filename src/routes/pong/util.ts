import { DisplayObject, Rectangle, Sprite } from "pixi.js";

/** 
 * Abstract game entity class. Used to consolidate common
 * behaviour of all entities (update call, texture, lifetime management) 
 */
abstract class Entity extends Sprite {
    protected _name: string | undefined;
    
    /** Entity name. Defaults to name of class (warning: default will not be usable if code is minified) */
    get name() {
        return this._name ?? this.constructor.name;
    }

    /** A marker for the game to delete this object during at the end of the game loop */
    markedForDeletion = false;

    /** Called once every ticker update */
    update() {/* noop */};
}

/** Holds timing related data */
class Time {
    /** Time elapsed since the last update */
    static deltaMS = 0;
    
    private static _timeScale = 1;
    /** Multiplier for elapsed time */
    static get timeScale() {
        return Time._timeScale;
    };

    static set timeScale(value: number) {
        this._timeScale = value;
        this._listeners.forEach(l => l()); // call each timescale change event listener
    }

    private static _listeners: (() => unknown)[] = [];
    /** Add event listener for timescale change event */
    static addTimescaleEventListener(listener: () => unknown) {
        Time._listeners.push(listener);
    }

    /** Remove event listener for timescale change event */
    static removeTimescaleEventListener(listener: () => unknown) {
        Time._listeners = Time._listeners.filter(l => l != listener);
    }
    
    /** `deltaMS` scaled to the current `timeScale` */
    static get deltaMSScaled() {
        return Time.deltaMS * Time._timeScale;
    }
}

/** Abstract container for high-level game functionality */
abstract class System {
    update() {/* noop */};
}

/** Mostly just a convenient holder, may be useful later */
class Input {
    static mouseX = 0;
}

/** An interface for entities that perform AABB collisions */
export interface ICollider {
    collider: Rectangle;

    /** Called when entity collides with another in the scene */
    onCollide: undefined | ((other: Entity & ICollider, intersection: Rectangle) => void);
}

/** An interface for game scenes (which are just containers) */
export interface IScene extends DisplayObject {
    /** Called once every frame */
    update: () => unknown;
}

/** Clamp a value between min and max */
export const clamp = (min: number, max: number, value: number) => Math.min(max, Math.max(min, value));

/** Linearly interpolates a value betweeen `a` and `b` by value `t` */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Exponential easing function */
export const easeOutExpo = (x: number) => x == 1 ? 1 : 1 - Math.pow(2, -10 * x);

/** Bounce-back ease out function */
export const easeOutBack = (x: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

export {
    Entity,
    System,
    Time,
    Input
}