import { Component, OnInit } from "@angular/core";
import { BestTime } from "../../../raceTrack";

@Component({
  selector: "app-best-times-array",
  templateUrl: "./best-times-array.component.html",
  styleUrls: ["./best-times-array.component.css"]
})

const NUMBER_OF_BEST_TIMES_IN_ARRAY: number = 5;

export class BestTimeComponent {

  public bestTimes: BestTime;

  constructor() {

  }

  }

}
