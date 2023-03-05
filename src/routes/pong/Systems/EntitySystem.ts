import type { Container } from "pixi.js";
import { Entity, System } from "../util";

/** 
 * System responsible for managing game entities and removing
 * them from the scene
 */
export class EntitySystem extends System {
    private _entities: Entity[] = [];

    constructor(private _rootStage: Container) {
        super();
    }

    /** Adds an entity to the system and root container */
    addEntity(entity: Entity, container = this._rootStage) {
        this._entities.push(entity);
        container.addChild(entity);
    }

    update() {
        // update all entities
        for(const entity of this._entities)
            entity.update();
        
        // remove all entites marked for deletion
        for(const entity of this._entities) 
            if(!entity.alive)
                entity.parent.removeChild(entity);
        
        // remove references to deleted entites
        this._entities = this._entities.filter(e => e.alive);
    }
}