import type { Cannon } from "../Entities/Cannon";
import { System, Time } from "../util";

enum EventType {
    SPAWN,
    SET_MIN,
    WAVE
}

/** a timestamp and event type (and optionally some data) */
type CannonEvent = [number, EventType.SPAWN | EventType.WAVE] | [number, EventType.SET_MIN, number];

export class CannonManager extends System {
    cannons: Cannon[] = [];
    
    events: CannonEvent[] = [
        [100, EventType.SPAWN],
        [100, EventType.SET_MIN, 1],
        [12600, EventType.SPAWN],
        [13100, EventType.SPAWN],
        [13600, EventType.SPAWN],
        [14000, EventType.SPAWN],
        [14200, EventType.SET_MIN, 4],
        [42000, EventType.WAVE],
        [65000, EventType.SET_MIN, 9],
        [100000, EventType.SET_MIN, 15],
        [103000, EventType.WAVE],
        [105000, EventType.WAVE],
        [144000, EventType.SET_MIN, 9],
        [150000, EventType.SPAWN],
        [151000, EventType.SPAWN],
        [152000, EventType.SPAWN],
        [170000, EventType.SPAWN],
        [171000, EventType.SPAWN],
        [172000, EventType.SPAWN],
    ]

    totalTime = 0;
    totalTimeUnscaled = 0;
    minBalls = 0;

    update() {
        this.totalTime += Time.deltaMSScaled;
        this.totalTimeUnscaled += Time.deltaMS;

        
    }
}