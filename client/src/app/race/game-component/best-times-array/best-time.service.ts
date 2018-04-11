import { Injectable } from "@angular/core";

import { TrackService } from "../../../track.service";
import { RaceTrack, Player } from "../../raceTrack";

const NUMBER_OF_BEST_TIMES_IN_ARRAY: number = 5;

@Injectable()
export class BestTimeService {

    public track: RaceTrack;
    public bestTimes: Array<Player>;
    private isTimeBeaten: boolean;
    private position: number;
    private isPostDone: boolean;

    public constructor(
        private trackService: TrackService
    ) {
        this.isTimeBeaten = false;
        this.isPostDone = false;
        this.position = -1;
        this.bestTimes = new Array(
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 }
        );
    }

    public get IsTimeBeaten(): boolean {
        return this.isTimeBeaten;
    }

    public get IsPostDone(): boolean {
        return this.isPostDone;
    }

    public get Position(): number {
        return this.position;
    }

    public async initialize(track: RaceTrack, time: number): Promise<void> {
        this.track = track;
        this.bestTimes = this.track.bestTimes;
        this.isTimeBeaten = this.checkTime(time);
    }

    private checkTime(time: number): boolean {
        for (let i: number = 0; i < NUMBER_OF_BEST_TIMES_IN_ARRAY; i++) {
            if (time < this.bestTimes[i].time ||
                this.bestTimes[i].time === -1
            ) {
                const name: string = this.bestTimes[i].name;
                this.bestTimes.splice(i, 0, { name: name, time: time });
                this.bestTimes.pop();
                this.position = i;

                return true;
            }
        }

        return false;
    }

    public async postNewBestTime(name: string): Promise<void> {
        const time: number = this.bestTimes[this.position].time;
        this.bestTimes[this.position] = { name: name, time: time };
        this.track.bestTimes = this.bestTimes;
        this.trackService.updateTrack(this.track);
        this.isPostDone = true;
        event.preventDefault();
    }
}
