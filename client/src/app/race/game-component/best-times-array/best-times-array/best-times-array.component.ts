<<<<<<< HEAD
import { Component, OnInit } from "@angular/core";
import { BestTime } from "../../../raceTrack";

@Component({
  selector: "app-best-times-array",
  templateUrl: "./best-times-array.component.html",
  styleUrls: ["./best-times-array.component.css"]
=======
import { Component, OnInit } from '@angular/core';
import { BestTime } from '../../../raceTrack';

@Component({
  selector: 'app-best-times-array',
  templateUrl: './best-times-array.component.html',
  styleUrls: ['./best-times-array.component.css']
>>>>>>> 0bf018c60fa3da05274842924e717834dab50967
})

const NUMBER_OF_BEST_TIMES_IN_ARRAY: number = 5;

<<<<<<< HEAD
export class BestTimeComponent {

  public bestTimes: BestTime;

  constructor() {
    
  }

  }

}
=======
export class BestTime {

  public arrayBestTimes: Array<Player>;
  public title: string;

  public constructor() {
    this.title = "Top 5 des meilleurs temps";
    for (let i: number = 0; i < NUMBER_OF_BEST_TIMES_IN_ARRAY; i++) {
      this.arrayBestTimes.push({ time: 0, name: "N/a" });
    }

  }

  public updateBestTime(newPlayer: Player): void {
    for (let i: number = 0; i < NUMBER_OF_BEST_TIMES_IN_ARRAY; i++) {
      if (newPlayer.time < this.arrayBestTimes[i].time) {
        this.arrayBestTimes.splice(i, 0, newPlayer);
        this.arrayBestTimes.pop();
        break;
      }
    }
  }

}
export interface Player {
  name: string;
  time: number;
}
>>>>>>> 0bf018c60fa3da05274842924e717834dab50967
