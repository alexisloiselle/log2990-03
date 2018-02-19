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

  public get SelectedTrack(): RaceTrackComponent {
    return this.selectedTrack;
  }

  public set SelectTrack(track: RaceTrackComponent) {
    this.selectedTrack = track;
  }
}
