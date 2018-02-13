import { Component, OnInit } from "@angular/core";
import {RaceTrackComponent} from "../race-track/race-track.component";

@Component({
  selector: "app-track-list",
  templateUrl: "./track-list.component.html",
  styleUrls: ["./track-list.component.css"]
})

export class TrackListComponent implements OnInit {
  public tracks: RaceTrackComponent[];
  private selectedTrack: RaceTrackComponent;

  public constructor() {
   }
  public ngOnInit(): void {
  }
  public getSelectedTrack(): RaceTrackComponent {
    return this.selectedTrack;
  }
  public setSelectTrack(track: RaceTrackComponent): void {
    this.selectedTrack = track;
  }
}
