import { CANNON_RADIUS, SCREEN_WIDTH, WALL_WIDTH } from "../constants";
import type { Cannon } from "../Entities/Cannon";
import { System, Time } from "../util";

enum EventType {
    SPAWN,
    SET_MIN,
    WAVE
}

/** A timestamp, event type, and optionally some data */
type CannonEvent = [number, EventType.SPAWN | EventType.WAVE] | [number, EventType.SET_MIN, number];

/** Handles spawning a screen-wide wave of cannons */
class CannonWave extends System {
    onSpawnCannon: undefined | ((x: number) => unknown);

    totalTime = 0;
    cannonX = WALL_WIDTH + CANNON_RADIUS * 3;
    stopX = SCREEN_WIDTH - (WALL_WIDTH + CANNON_RADIUS * 5);
    stopped = false;

    update() {
        if (this.stopped) return;

        this.totalTime += Time.deltaMSScaled;
        if (this.totalTime >= 150) {
            this.totalTime = 0;
            this.onSpawnCannon?.(this.cannonX);

            this.cannonX += CANNON_RADIUS * 2 + 10;
            if (this.cannonX >= this.stopX) this.stopped = true;
        }
    }
}

/**
 * Handles when cannons spawn, and the types of spawning events
 */
export class CannonManager extends System {
    cannons: Cannon[] = [];

    /** Events that occur during gameplay, and their time (in ms) */
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
        [172000, EventType.SPAWN]
    ];

    totalTime = 0;
    totalTimeUnscaled = 0;
    minBalls = 0;

    waves: CannonWave[] = [];

    /** Called when a cannon is to be spawned */
    onSpawnCannon: undefined | ((x: number | void) => unknown);

    /** Creates a CannonWave class to spawn a screen-wide wave of cannons */
    setupCannonWave() {
        const wave = new CannonWave();
        wave.onSpawnCannon = (x) => this.onSpawnCannon?.(x);
        this.waves.push(wave);
    }

    update() {
        this.totalTime += Time.deltaMSScaled;
        this.totalTimeUnscaled += Time.deltaMS; // TODO: could be useful?

        const eventTimes = this.events.map((e) => e[0]);

        let i = 0;
        while (i < eventTimes.length) {
            const eventTime = eventTimes[i];

            if (eventTime > this.totalTime) break;

            i++;
        }

        const occurredEvents = this.events.slice(0, i);
        this.events = this.events.slice(i);

        for (const event of occurredEvents) {
            const [_, type, data] = event;

            switch (type) {
                case EventType.SPAWN:
                    this.onSpawnCannon?.();
                    break;
                case EventType.WAVE:
                    this.setupCannonWave();
                    break;
                case EventType.SET_MIN:
                    this.minBalls = data;
                    break;
            }
        }

        // update all wave spawners
        for (const wave of this.waves) wave.update();

        // filter old wave spawner references
        this.waves = this.waves.filter((w) => !w.stopped);
    }
}
