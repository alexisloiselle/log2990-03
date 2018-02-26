import { Component, OnInit, ViewChild } from "@angular/core";
import {RaceTrack} from "../raceTrack";
import {TrackService} from "../../track.service";
import {Location} from "@angular/common";
import {PointCoordinates} from "../track-editor/point-coordinates";
import {TrackEditorComponent} from "../track-editor/track-editor.component";

@Component({
    selector: "app-track-list",
    templateUrl: "./track-list.component.html",
    styleUrls: ["./track-list.component.css"]
})

/* tslint:disable no-any */
export class TrackListComponent implements OnInit {
    @ViewChild("trackEditor")
    private trackEditor: TrackEditorComponent;
    public tracks: any[];
    public realTracks: RaceTrack[];
    private selectedTrack: RaceTrack;
    public nom: string;
    public error: string;
    

    public constructor(private trackService: TrackService, private location: Location) {
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

    public async getTracks(): Promise<void> {
        const tempTracks: RaceTrack[] = await this.trackService.getTracks();
        this.tracks = [];
        
        for (const id in tempTracks) {
            if (tempTracks != null) {
                this.tracks.push(tempTracks[id]);
            }
        }

        for (let i: number = 0; i < this.tracks[0].length; i++) {
            this.realTracks.push(JSON.parse(this.tracks[0][i].track));
            this.realTracks[i].id = this.tracks[0][i]._id;
        }
    }

    public selectTrack(index: number): string {
        this.selectedTrack = this.tracks[index];

        return this.selectedTrack.id;
    }

    public onSelectTrack(track: RaceTrack): void {
        this.selectedTrack = track;
        let newPointArray: PointCoordinates[] = [];

        for(let i = 0; i<track.points.length; i++) {
            let tempPoint:PointCoordinates = new PointCoordinates(track.points[i].x, track.points[i].y);
            newPointArray.push(tempPoint);
        }
        this.trackEditor.myTrackEditorModel.PointArray = newPointArray;
        this.trackEditor.redrawCanvas();
    }
    public constraintPass(): boolean {
        return this.trackEditor.allConstraintPass();
    }
    
    public updateMyTrack(selectedTrack :RaceTrack):void {
        console.log("track-list");
        this.trackService.updateTrack(this.trackEditor., selectedTrack);
        this.ngOnInit();
    }

    public deleteTrack(track: RaceTrack): void {
        this.trackService.deleteTrack(track.id).then((isOk) => this.onSuccess(isOk));
    }

    public onSuccess(isOk: boolean): void {
        if (isOk) {
            alert("Track deleted !");
        } else {
            this.error = "Une erreur s'est produite lors de la supression de track";
        }
        this.ngOnInit();
    }

    public goBack(): void {
        this.location.back();
    }
}
