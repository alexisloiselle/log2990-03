import { Component, OnInit } from "@angular/core";
import { RaceTrack } from "../../raceTrack";
import { TrackService } from "../../../track.service";

@Component({
    selector: "app-track-list-game",
    templateUrl: "./track-list-game.component.html",
    styleUrls: ["./track-list-game.component.css"]
})

export class TrackListGameComponent implements OnInit {

    public parsedTracks: RaceTrack[];
    private selectedTrack: RaceTrack;

    public constructor(
        private trackService: TrackService
    ) {
        this.parsedTracks = [];
    }

    public async ngOnInit(): Promise<void> {
        await this.getTracks();
    }

    public set SelectedTrack(track: RaceTrack) {
        this.selectedTrack = track;
    }

    public get SelectedTrack(): RaceTrack {
        return this.selectedTrack;
    }

    public async getTracks(): Promise<void> {
        this.parsedTracks = await this.trackService.getTracks();
    }

    public async deleteTrack(track: RaceTrack): Promise<void> {
        await this.trackService.deleteTrack(track.id);
        await this.ngOnInit();
    }

    public async playTrack(selectedTrack: RaceTrack): Promise<void> {
        location.replace("/car-game/" + selectedTrack.id);
    }
}
