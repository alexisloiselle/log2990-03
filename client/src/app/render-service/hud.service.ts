import { Injectable } from "@angular/core";

const MILLISECONDS_IN_SECOND: number = 1000;

@Injectable()
export class HudService {

    private lapTime: number;
    private raceTime: number;

    private initialLapTime: number;
    private initialRaceTime: number;

    private isCounterStarted: boolean;

    public constructor() {
        this.isCounterStarted = false;
    }

    public get LapTime(): number {
        return this.lapTime;
    }

    public get RaceTime(): number {
        return this.raceTime;
    }

    public initialize(): void {
        this.lapTime = 0;
        this.raceTime = 0;
        this.initialLapTime = Date.now();
        this.initialRaceTime = Date.now();
        this.isCounterStarted = true;
    }

    public update(): void {
        if (!this.isCounterStarted) { return; }
        this.lapTime = (Date.now() - this.initialLapTime) / MILLISECONDS_IN_SECOND;
        this.raceTime = (Date.now() - this.initialRaceTime) / MILLISECONDS_IN_SECOND;
    }

    public finishLap(): void {
        this.lapTime = 0;
        this.initialLapTime = Date.now();
    }
}
