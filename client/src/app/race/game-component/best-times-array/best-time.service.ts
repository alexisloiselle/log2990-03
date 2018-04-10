import { Injectable } from "@angular/core";

import { TrackService } from "../../../track.service";
import { RaceTrack, BestTime } from "../../raceTrack";

const NUMBER_OF_BEST_TIMES_IN_ARRAY: number = 5;

@Injectable()
export class BestTimeService {

    public track: RaceTrack;
    public bestTimes: BestTime;
    public timeBeaten: boolean;
    private position: number;

    public constructor(
        private trackService: TrackService
    ) {
        this.timeBeaten = false;
        this.position = -1;
        this.bestTimes = new BestTime([
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 }
        ]);
    }

    public async initialize(track: RaceTrack, time: number): Promise<void> {
        console.log(`ID de la traque: ${track.id}`);
        this.track = await this.trackService.getTrack(track.id);
        this.bestTimes = this.track.bestTimes;
        this.timeBeaten = this.checkTime(time);
    }

    private checkTime(time: number): boolean {
        for (let i: number = 0; i < NUMBER_OF_BEST_TIMES_IN_ARRAY; i++) {
            if (time < this.bestTimes.arrayBestTimes[i].time ||
                this.bestTimes.arrayBestTimes[i].time === -1
            ) {
                const name: string = this.bestTimes.arrayBestTimes[i].name;
                this.bestTimes.arrayBestTimes.splice(i, 0, { name: name, time: time });
                this.bestTimes.arrayBestTimes.pop();
                this.position = i;

                return true;
            }
        }

        return false;
    }

    public async postNewBestTime(name: string): Promise<void> {
        const time: number = this.bestTimes.arrayBestTimes[this.position].time;
        this.bestTimes.arrayBestTimes[this.position] = {name: name, time: time};
        this.track.bestTimes = this.bestTimes;
        this.trackService.updateTrack(this.track);
    }
}
