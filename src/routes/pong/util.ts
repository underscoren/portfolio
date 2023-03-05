import { Rectangle, Sprite } from "pixi.js";

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

    /** A marker for the game to delete this object during the game loop */
    private _alive = true;

    get alive() {
        return this._alive;
    }

    /** Called once every ticker update */
    update() {/* noop */};

    /** Mark entity for deletion */
    remove() {
        this._alive = false;
    }
}

/** Class to hold timing related data */
class Time {
    /** Time elapsed since the last update */
    static deltaMS = 0;
    
    /** Multiplier for elapsed time */
    static timeScale = 1;
    
    /** deltaMS scaled to the current timeScale */
    static get deltaMSScaled() {
        return Time.deltaMS * Time.timeScale;
    }
}

/** Abstract container for high-level game functionality */
abstract class System {
    update() {/* noop */};
}

class Input {
    static mouseX = 0;
}

export interface ICollider {
    collider: Rectangle;

    /** Called when entity collides with another in the scene */
    onCollide: undefined | ((other: Entity & ICollider, intersection: Rectangle) => void);
}

/** Clamp a value between min and max */
export const clamp = (min: number, max: number, value: number) => Math.min(max, Math.max(min, value));

/** Linearly interpolates a value betweeen `a` and `b` by value `t` */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Exponential easing function */
export const easeOutExpo = (x: number) => x == 1 ? 1 : 1 - Math.pow(2, -10 * x);

export {
    Entity,
    System,
    Time,
    Input
}