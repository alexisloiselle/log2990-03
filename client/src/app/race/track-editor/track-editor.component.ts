import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { TrackEditorModel } from "./canvas/track-editor-model";

import {TrackService} from "../../track.service";
import {RaceTrack, RaceType} from "../raceTrack";
import {Location} from "@angular/common";
import { CanvasComponent } from "./canvas/canvas.component";

@Component({
    selector: "app-track-editor",
    templateUrl: "./track-editor.component.html",
    styleUrls: ["./track-editor.component.css"],
    providers: [TrackService]
})

export class TrackEditorComponent implements OnInit {
    @ViewChild("canvasEditor")
    private canvasRef: CanvasComponent;
    @ViewChild("trackDescriptionInput")
    private trackDescriptionInput: ElementRef;
    @ViewChild("trackNameInput")
    private trackNameInput: ElementRef;
    @ViewChild("trackTypeInput")
    private trackTypeInput: ElementRef;

    private trackDescription: string;
    private trackType: RaceType;
    private track: RaceTrack;
    private trackName: string;

    public myTrackEditorModel: TrackEditorModel;

    public ngOnInit(): void {
        // We here initialise the canvas and get the context (ctx)
        this.canvasRef.ngOnInit();
        this.trackName = "";
        this.trackDescription = "";
        this.trackType = 0;
    }

    public constructor(public trackService: TrackService, private location: Location) {
    }

    public allConstraintPass(): boolean {
        return this.canvasRef.allConstraintPass();
    }

    public setTrackName(): void {
        this.trackName = this.trackNameInput.nativeElement.value;
        this.trackType = this.trackTypeInput.nativeElement.value;
    }

    public setTrackDescription(): void {
        this.trackDescription = this.trackDescriptionInput.nativeElement.value;
        this.trackType = this.trackTypeInput.nativeElement.value;
    }

    public inputTextNotEmpty(): boolean {
       return (this.trackName.length !== 0 && this.trackDescription.length !== 0);
    }

    public addTrack(trackName: string, trackDescription: string, trackType: RaceType, itemsOnTrack: number): void {
        this.trackName = trackName;
        this.trackDescription = trackDescription;
        this.trackType = trackType;
        this.track  = new RaceTrack(trackName, trackDescription, trackType, this.canvasRef.myTrackEditorModel.PointArray);
        this.trackService.addTrack(this.track);
    }

    public getTrack(): RaceTrack {
        this.track  = new RaceTrack(this.trackName, this.trackDescription, this.trackType, this.myTrackEditorModel.PointArray);

        return this.track;
    }

    public goBack(): void {
        this.location.back();
    }
}
