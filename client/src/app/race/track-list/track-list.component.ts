import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RaceTrack } from "../raceTrack";
import { TrackService } from "../../track.service";
import { CanvasComponent } from "../track-editor/canvas/canvas.component";
import * as THREE from "three";
import { RenderService } from "../../render-service/render.service";
import { Router } from "@angular/router";

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

    public constructor(private trackService: TrackService, private renderService: RenderService,
                       private router: Router) {
        this.parsedTracks = [];
    }

    public async ngOnInit(): Promise<void> {
        await this.getTracks();
    }

    public set SelectedTrack(track: RaceTrack) {
        this.selectedTrack = track;
        // Observable pour quand sa change envoyer la track au Best-time-component
    }

    public get SelectedTrack(): RaceTrack {
        return this.selectedTrack;
    }

    public async getTracks(): Promise<void> {
        this.parsedTracks = await this.trackService.getTracks();
    }

    public onSelectTrack(track: RaceTrack): void {
        this.selectedTrack = track;
        const newPointArray: THREE.Vector2[] = [];

        for (const point of track.points) {
            newPointArray.push(new THREE.Vector2(point.x, point.y));
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
    public async playTrack(selectedTrack: RaceTrack): Promise<void> {
        this.renderService.loadTrack(selectedTrack);
        this.router.navigateByUrl("/car-game");
    }
    public playDefaultTrack(): void {
        this.router.navigateByUrl("/car-game");
    }
}
