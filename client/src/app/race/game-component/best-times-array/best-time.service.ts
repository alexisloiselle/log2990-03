import { Injectable } from "@angular/core";

import { TrackService } from "../../../track.service";
import { RaceTrack, Player } from "../../raceTrack";
import { RenderService } from "../../../render-service/render.service";
import { Router } from "@angular/router";

const NUMBER_OF_BEST_TIMES_IN_ARRAY: number = 5;

@Injectable()
export class BestTimeService {

    private track: RaceTrack;
    private isTimeBeaten: boolean;
    private position: number;
    private isPostDone: boolean;

    public constructor(
        private trackService: TrackService,
        private renderService: RenderService,
        private router: Router
    ) {
        this.isTimeBeaten = false;
        this.isPostDone = false;
        this.position = -1;
    }

    public get BestTimesArray(): Array<Player> {
        return this.track.bestTimes.map((player: Player) => {
            return player;
        });
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
        this.isTimeBeaten = this.checkTime(time);
    }

    private checkTime(time: number): boolean {
        for (let i: number = 0; i < NUMBER_OF_BEST_TIMES_IN_ARRAY; i++) {
            if (time < this.track.bestTimes[i].time ||
                this.track.bestTimes[i].time === -1
            ) {
                this.track.bestTimes.splice(i, 0, { name: "Type your name above", time: time });
                this.track.bestTimes.pop();
                this.position = i;

                return true;
            }
        }

        return false;
    }

    public async postNewBestTime(name: string): Promise<void> {
        this.track.bestTimes[this.position] = { name: name, time: this.track.bestTimes[this.position].time };
        this.trackService.updateTrack(this.track);
        this.isPostDone = true;
        event.preventDefault();
    }

    public async replayTrack(): Promise<void> {
        await this.renderService.loadTrack(this.track);
        this.router.navigateByUrl("/car-game");
    }
}
