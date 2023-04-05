import { Shot } from "../Entities/Shot";
import { System, Time } from "../util";
import type { Power as PowerEntity } from "../Entities/Power";

/** The type of power */
export enum Power {
    Ammo,
    Wide,
    Slow
}

/** A power and timestamp */
type PowerEvent = [number, Power];

const SLOW_POWER_TIME = 10_000;

export class PowerManager extends System {
    shots: Shot[] = [];
    ammo = 0;
    powers: PowerEntity[] = [];

    events: PowerEvent[] = [
        [35000, Power.Ammo],
        [65000, Power.Wide],
        [80000, Power.Slow],
        [90000, Power.Ammo],
        [95000, Power.Wide],
        [98000, Power.Slow],
        [120000, Power.Ammo],
        [136000, Power.Slow],
        [150000, Power.Wide],
        [153000, Power.Ammo],
        [156000, Power.Ammo],
        [159000, Power.Slow],
        [162000, Power.Ammo],
        [215000, Power.Ammo]
    ];

    fireShot(paddleX: number, paddleY: number, paddleScale: number) {
        const shot = new Shot();
        shot.x = paddleX;
        shot.y = paddleY;
        shot.scale.x = paddleScale;
        this.shots.push(shot);

        shot.on("removed", () => {
            this.shots = this.shots.filter((s) => s != shot);
        });

        return shot;
    }

    onSpawnPower: undefined | ((type: Power) => unknown);
    onResetTimescale: undefined | (() => unknown);

    addPower(power: PowerEntity) {
        this.powers.push(power);

        power.on("removed", () => {
            this.powers = this.powers.filter((p) => p != power);
        });
    }

    totalTime = 0;
    slowTimeTimer = 0;
    update() {
        this.totalTime += Time.deltaMSScaled;

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
            const [_, type] = event;
            this.onSpawnPower?.(type);
        }

        if (Time.timeScale != 1) this.slowTimeTimer += Time.deltaMS;

        if (this.slowTimeTimer > SLOW_POWER_TIME) {
            this.slowTimeTimer = 0;
            this.onResetTimescale?.();
        }
    }
}
