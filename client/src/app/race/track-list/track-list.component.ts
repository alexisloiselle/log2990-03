import { Component, OnInit } from "@angular/core";
import {RaceTrack} from "../raceTrack";
import {TrackService} from "../../track.service";

@Component({
    selector: "app-track-list",
    templateUrl: "./track-list.component.html",
    styleUrls: ["./track-list.component.css"]
})

export class TrackListComponent implements OnInit {
    public tracks: any[];
    public realTracks: any[];
    private selectedTrack: RaceTrack;
    public nom: string;

    public constructor(private trackService: TrackService) {
    }

    public ngOnInit(): void {
        this.realTracks = [];
        this.getTracks();
        this.nom = "kathou";
    }

    public get SelectedTrack(): RaceTrack {
        return this.selectedTrack;
    }

    public set SelectTrack(track: RaceTrack) {
        this.selectedTrack = track;
    }
    public async getTracks() {
        const tempTracks = await this.trackService.getTracks();
        this.tracks = [];
        for ( const id in tempTracks)
        {
            if (tempTracks != null) {
                this.tracks.push(tempTracks[id]);
            }
        }

        for(let i = 0; i<this.tracks[0].length; i++) {
            var temp1 = JSON.parse(this.tracks[0][i].track);
            this.realTracks.push(temp1);
        }
    }

    public selectTrack(index: number): string {
        this.selectedTrack = this.tracks[index];
        return this.selectedTrack.id;
    }

    public onSelectTrack(track: RaceTrack): void {
        this.selectedTrack = track;
    }

    public loadSelectedTrackOnEditor(): void {
        
    }
}
