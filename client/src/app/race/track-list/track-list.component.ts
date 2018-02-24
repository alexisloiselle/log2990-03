import { Component, OnInit } from "@angular/core";
import {RaceTrack} from "../raceTrack";

@Component({
    selector: "app-track-list",
    templateUrl: "./track-list.component.html",
    styleUrls: ["./track-list.component.css"]
})

export class TrackListComponent implements OnInit {
    public tracks: RaceTrack[];
    private selectedTrack: RaceTrack;

    public constructor() {
    }

    public ngOnInit(): void {
    }

    public get SelectedTrack(): RaceTrack {
        return this.selectedTrack;
    }

    public set SelectTrack(track: RaceTrack) {
        this.selectedTrack = track;
    }
}
