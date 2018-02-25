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
    public realTracks: RaceTrack[];
    private selectedTrack: RaceTrack;
    public nom: string;
    public error: string;

    public constructor(private trackService: TrackService) {
    }

    public ngOnInit(): void {
        this.realTracks = [];
        this.getTracks();
        this.error = undefined;
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
            var id = this.tracks[0][i]._id;
            this.realTracks.push(temp1);
            this.realTracks[i].id = id;
        }
    }

    public selectTrack(index: number): string {
        this.selectedTrack = this.tracks[index];
        return this.selectedTrack.id;
    }

    public onSelectTrack(track: RaceTrack): void {
        this.selectedTrack = track;
    }

    public deleteTrack(track: RaceTrack): void {
        this.trackService.deleteTrack(track.id).then(isOk => this.onSuccess(isOk))
    }
    public onSuccess(isOk: boolean){
        if (isOk)
        {
            alert("Track deleted !");
        }
        else
        {    
            this.error = "Une erreur s'est produite lors de la supression de track";
        }
        this.ngOnInit();
    }
}
