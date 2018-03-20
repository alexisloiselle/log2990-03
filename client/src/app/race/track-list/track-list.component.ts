import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RaceTrack } from "../raceTrack";
import { TrackService } from "../../track.service";
import { PointCoordinates } from "../track-editor/canvas/point-coordinates";
import { CanvasComponent } from "../track-editor/canvas/canvas.component";

@Component({
    selector: "app-track-list",
    templateUrl: "./track-list.component.html",
    styleUrls: ["./track-list.component.css"]
})

export class TrackListComponent implements OnInit {
    @ViewChild("trackEditor") private trackEditor: CanvasComponent;
    @ViewChild("trackDescriptionInput") private trackDescriptionInput: ElementRef;
    @ViewChild("trackNameInput") private trackNameInput: ElementRef;
    @ViewChild("trackTypeInput") private trackTypeInput: ElementRef;

    public parsedTracks: RaceTrack[];
    private selectedTrack: RaceTrack;

    public constructor(private trackService: TrackService) {
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

    public onSelectTrack(track: RaceTrack): void {
        this.selectedTrack = track;
        const newPointArray: PointCoordinates[] = [];

        for (const point of track.points) {
            newPointArray.push(new PointCoordinates(point.X, point.Y));
        }
        this.trackEditor.myTrackEditorModel.PointArray = newPointArray;
        this.trackEditor.redrawCanvas();
    }

    public constraintPass(): boolean {
        return this.trackEditor.allConstraintPass();
    }

    public async updateMyTrack(selectedTrack: RaceTrack): Promise<void> {
        const updatedTrack: RaceTrack = selectedTrack;
        this.updateTrackParams(updatedTrack);
        await this.trackService.updateTrack(updatedTrack);
        await this.ngOnInit();
    }

    private updateTrackParams(updatedTrack: RaceTrack): void {
        updatedTrack.points = this.trackEditor.myTrackEditorModel.PointArray;
        updatedTrack.name = this.trackNameInput.nativeElement.value;
        updatedTrack.description = this.trackDescriptionInput.nativeElement.value;
        updatedTrack.type = this.trackTypeInput.nativeElement.value;
    }

    public async deleteTrack(track: RaceTrack): Promise<void> {
        await this.trackService.deleteTrack(track.id);
        await this.ngOnInit();
    }
}
