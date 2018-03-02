import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RaceTrack } from "../raceTrack";
import { TrackService } from "../../track.service";
import { PointCoordinates } from "../track-editor/canvas/point-coordinates";
import { CanvasComponent } from "../track-editor/canvas/canvas.component";

@Component({
    selector: "app-track-list",
    templateUrl: "./track-list.component.html",
    styleUrls: ["./track-list.component.css"],
    providers: [TrackService]
})

export class TrackListComponent implements OnInit {
    @ViewChild("trackEditor")
    private trackEditor: CanvasComponent;
    @ViewChild("trackDescriptionInput")
    private trackDescriptionInput: ElementRef;
    @ViewChild("trackNameInput")
    private trackNameInput: ElementRef;
    @ViewChild("trackTypeInput")
    private trackTypeInput: ElementRef;
    // tslint:disable-next-line:no-any
    public unparsedTracks: any[];
    public parsedTracks: RaceTrack[];
    private selectedTrack: RaceTrack;
    public nom: string;
    public error: string;

    public constructor(private trackService: TrackService) {

    }

    public async ngOnInit(): Promise<void> {
        this.parsedTracks = [];
        await this.getTracks();
        this.error = undefined;
    }

    public set SelectedTrack(track: RaceTrack) {
        this.selectedTrack = track;
    }

    public get SelectedTrack(): RaceTrack {
        return this.selectedTrack;
    }

    public async getTracks(): Promise<void> {
        const tempTracks: RaceTrack[] = await this.trackService.getTracks();
        this.unparsedTracks = [];

        for (const id in tempTracks) {
            if (tempTracks != null) {
                this.unparsedTracks.push(tempTracks[id]);
            }
        }
        for (let i: number = 0; i < this.unparsedTracks[0].length; i++) {
            this.parsedTracks.push(JSON.parse(this.unparsedTracks[0][i].track));
            this.parsedTracks[i].id = this.unparsedTracks[0][i]._id;
        }
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
        updatedTrack.points = this.trackEditor.myTrackEditorModel.PointArray;
        updatedTrack.name = this.trackNameInput.nativeElement.value;
        updatedTrack.description = this.trackDescriptionInput.nativeElement.value;
        updatedTrack.type = this.trackTypeInput.nativeElement.value;
        await this.trackService.updateTrack(selectedTrack.id, updatedTrack);
        await this.ngOnInit();
    }

    public async deleteTrack(track: RaceTrack): Promise<void> {
        await this.trackService.deleteTrack(track.id).then(async (isOk) => this.onSuccess(isOk));
    }

    public async onSuccess(isOk: boolean): Promise<void> {
        if (isOk) {
            alert("Track deleted !");
        } else {
            this.error = "Une erreur s'est produite lors de la supression de track";
        }
        await this.ngOnInit();
    }
}
