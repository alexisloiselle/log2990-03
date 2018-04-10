import { Component, OnInit } from "@angular/core";
import { BestTime, Player } from "../../raceTrack";

const NUMBER_OF_BEST_TIMES_IN_ARRAY: number = 5;

@Component({
    selector: "app-best-times-array",
    templateUrl: "./best-times-array.component.html",
    styleUrls: ["./best-times-array.component.css"]
})
export class BestTimeComponent implements OnInit {

    public bestTimes: BestTime;

    public constructor() { }

    public ngOnInit(): void { }

    public updateBestTime(newPlayer: Player): void {
        for (let i: number = 0; i < NUMBER_OF_BEST_TIMES_IN_ARRAY; i++) {
            if (newPlayer.time < this.bestTimes.arrayBestTimes[i].time) {
                this.bestTimes.arrayBestTimes.splice(i, 0, newPlayer);
                this.bestTimes.arrayBestTimes.pop();
                break;
            }
        }
    }
}
