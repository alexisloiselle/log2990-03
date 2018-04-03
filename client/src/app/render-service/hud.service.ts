import { Injectable } from "@angular/core";
import { NUMBER_OF_LAPS } from "../config";

const MILLISECONDS_IN_SECOND: number = 1000;

@Injectable()
export class HudService {

    public lapTime: number;
    public raceTime: number;
    public lap: number;

    private initialLapTime: number;
    private initialRaceTime: number;

    private isCounterStarted: boolean;

    public constructor() {
        this.isCounterStarted = false;
    }

    public initialize(): void {
        this.lapTime = 0;
        this.raceTime = 0;
        this.initialLapTime = Date.now();
        this.initialRaceTime = Date.now();
        this.lap = 1;
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
        if (this.lap <= NUMBER_OF_LAPS) {
            this.lap++;
        }
    }
}
