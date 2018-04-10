import { Component, OnInit } from "@angular/core";
import { BestTime } from "../../../raceTrack";

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
}
