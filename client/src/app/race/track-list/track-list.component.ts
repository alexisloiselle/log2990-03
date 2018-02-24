import { Component, OnInit } from "@angular/core";
import {RaceTrack} from "../raceTrack";
import {TrackService} from "../../track.service";

@Component({
    selector: "app-track-list",
    templateUrl: "./track-list.component.html",
    styleUrls: ["./track-list.component.css"]
})

export class TrackListComponent implements OnInit {
    public tracks: RaceTrack[];
    private selectedTrack: RaceTrack;

    public constructor(private trackService: TrackService) {
    }

    public ngOnInit(): void {
    }

    public get SelectedTrack(): RaceTrack {
        return this.selectedTrack;
    }

    public set SelectTrack(track: RaceTrack) {
        this.selectedTrack = track;
    }
    public getTracks(){
        this.trackService.getTracks().then(data => this.tracks = data);
    }
    public selectTrack(index: number): string {
        this.selectedTrack = this.tracks[index];
        return this.selectedTrack.id;
    }
}
