import { Injectable } from "@angular/core";

import { TrackService } from "../../../track.service";
import { RaceTrack, Player } from "../../raceTrack";

const NUMBER_OF_BEST_TIMES_IN_ARRAY: number = 5;

@Injectable()
export class BestTimeService {

    public track: RaceTrack;
    public bestTimes: Array<Player>;
    public timeBeaten: boolean;
    private position: number;

    public constructor(
        private trackService: TrackService
    ) {
        this.timeBeaten = false;
        this.position = -1;
        this.bestTimes = new Array(
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 }
        );
    }

    public async initialize(track: RaceTrack, time: number): Promise<void> {
        this.track = track;
        this.bestTimes = this.track.bestTimes;
        this.timeBeaten = this.checkTime(time);
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
        this.bestTimes[this.position] = {name: name, time: time};
        this.track.bestTimes = this.bestTimes;
        this.trackService.updateTrack(this.track);
    }
}
