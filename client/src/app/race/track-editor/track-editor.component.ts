import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
// We need to import the pointCoordinates class
import { PointCoordinates } from "./point-coordinates";
import { TrackEditorModel } from "./track-editor-model";
import { TrackEditorConstraintService } from "./track-editor-constraint.service";
import { DrawingOnCanvas } from "./drawing-on-canvas";
import {RaceType} from "../race-track/race-track.component"

const STANDARD_SIZE_CIRCLE: number = 10;
const WIDTH_OF_CANVAS: number = 500;
const HEIGHT_OF_CANVAS: number = 500;

@Component({
    selector: "app-track-editor",
    templateUrl: "./track-editor.component.html",
    styleUrls: ["./track-editor.component.css"],
    providers: [TrackEditorConstraintService]
})

export class TrackEditorComponent implements OnInit {
    @ViewChild("canvas")
    private canvasRef: ElementRef;
    private ctx: CanvasRenderingContext2D;
    // private currentPoint : number
    private mouseMovedEvent: MouseEvent;  // So that each method can access the coordinates
    // at all times
    private mouseDown: boolean;    // Used for the drag and drop
    private myTrackEditorModel: TrackEditorModel;
    private drawingOnCanvas: DrawingOnCanvas;
    private trackName: string;
    private trackDescription: string;
    private trackType: RaceType;

    public ngOnInit(): void {
        // We here initialise the canvas and get the context (ctx)
        this.ctx = this.canvasRef.nativeElement.getContext("2d");
        // we set the canvas height and width attribute
        this.canvasRef.nativeElement.height = HEIGHT_OF_CANVAS;
        this.canvasRef.nativeElement.width = WIDTH_OF_CANVAS;

        // We initialise the mouse down event to false
        this.mouseDown = false;
        // We instanciate the model
        this.myTrackEditorModel = new TrackEditorModel();
        this.drawingOnCanvas = new DrawingOnCanvas(this.ctx);
        this.trackName= "";
        this.trackDescription == "";
    }

    public constructor(private trackEditorConstraintService: TrackEditorConstraintService) {

    }

    public canvasMouseDown(event: {}): void {
        this.mouseDown = true;
    }

    public canvasMouseUp(event: MouseEvent): void {
        const leftClick: number = 0;
        const rightClick: number = 2;
        this.mouseDown = false;
        const mouseCoordinates: PointCoordinates = new PointCoordinates(event.layerX, event.layerY);
        // If it's a left click and the loop is not closed
        if (event.button === leftClick && !this.myTrackEditorModel.loopIsClosed()) {
            this.canvasDrawPoint(mouseCoordinates);
        } else if (event.button === rightClick) { // If it's a right click
            this.canvasEraseLastPoint();
        }

        // The points can be absorbed if you do a drag and
        // drop. We make sure the array doesn't contain any duplicated
        // points with this function.
        this.removePointsTooClose();
    }
    public canvasMouseMoved(event: MouseEvent): void {
        this.mouseMovedEvent = event;  // We stock the mouseCoordinates inside the mouseMovedEvent variable

        if (this.mouseDown) {
            this.dragNDrop();
        } else { // We color the points if the focus is on one of them
            this.checkMouseFocus();
        }
    }

    public canvasDrawPoint(mouseCoordinates: PointCoordinates): void {
      // If I clicked on a point and the arrayLength is superior to three
      const MINIMUM_LENGTH: number = 3;
      if (this.myTrackEditorModel.getPointArrayLength() >= MINIMUM_LENGTH &&
          this.myTrackEditorModel.clickedOnFirstPoint(mouseCoordinates)) {
          this.canvasCloseLoop(); // I can close the circuit
      } else if (!this.myTrackEditorModel.clickedOnExistingPoint(mouseCoordinates)) {
          this.myTrackEditorModel.addPoint(mouseCoordinates);
          this.drawingOnCanvas.redrawCanvas(
            this.myTrackEditorModel,
            this.trackEditorConstraintService.intersectionBooleanArray(this.myTrackEditorModel.getPointArray()),
            this.trackEditorConstraintService.angleBooleanArray(this.myTrackEditorModel.getPointArray()));
      }
  }

    public canvasEraseLastPoint(): void {
      this.myTrackEditorModel.eraseLastPoint();

      this.drawingOnCanvas.redrawCanvas(
        this.myTrackEditorModel,
        this.trackEditorConstraintService.intersectionBooleanArray(this.myTrackEditorModel.getPointArray()),
        this.trackEditorConstraintService.angleBooleanArray(this.myTrackEditorModel.getPointArray()));
    }

    public removePointsTooClose(): void {
        this.myTrackEditorModel.removePointsTooClose();

        this.drawingOnCanvas.redrawCanvas(
          this.myTrackEditorModel,
          this.trackEditorConstraintService.intersectionBooleanArray(this.myTrackEditorModel.getPointArray()),
          this.trackEditorConstraintService.angleBooleanArray(this.myTrackEditorModel.getPointArray()));
    }

    // As soon as the loop is closed, we verify if all the constraints pass
    public canvasCloseLoop(): void {
        this.myTrackEditorModel.closeLoop();

        this.drawingOnCanvas.redrawCanvas(
          this.myTrackEditorModel,
          this.trackEditorConstraintService.intersectionBooleanArray(this.myTrackEditorModel.getPointArray()),
          this.trackEditorConstraintService.angleBooleanArray(this.myTrackEditorModel.getPointArray()));
    }

    public checkMouseFocus(): void { // Checks if the focus is on a point or not
        if (this.myTrackEditorModel.getPointArrayLength() > 0) {
            for (const point of this.myTrackEditorModel.getPointArray()) {
                const ACCEPTED_RADIUS: number = 10;
                if (this.mouseMovedEvent.layerX >= point.X - ACCEPTED_RADIUS && this.mouseMovedEvent.layerX <=
                    point.X + ACCEPTED_RADIUS &&
                    this.mouseMovedEvent.layerY >= point.Y - ACCEPTED_RADIUS && this.mouseMovedEvent.layerY <=
                    point.Y + ACCEPTED_RADIUS) {
                    this.mouseOnPoint(point.X, point.Y);
                    break;
                } else {
                    this.mouseNotOnPoint(point.X, point.Y);
                }
            }
        }
    }

    public dragNDrop(): void {
      const mouseCoordinates: PointCoordinates = new PointCoordinates(this.mouseMovedEvent.layerX, this.mouseMovedEvent.layerY);
      // We identify the point on wich the user clicked
      for (const point of this.myTrackEditorModel.getPointArray()) {
          const ACCEPTED_RADIUS: number = 15;
          if (this.mouseMovedEvent.layerX >= point.X - ACCEPTED_RADIUS &&
              this.mouseMovedEvent.layerX <= point.X + ACCEPTED_RADIUS &&
              this.mouseMovedEvent.layerY >= point.Y - ACCEPTED_RADIUS &&
              this.mouseMovedEvent.layerY <= point.Y + ACCEPTED_RADIUS) {
              this.myTrackEditorModel.setPointCoordinates(this.myTrackEditorModel.getPointArray().indexOf(point), mouseCoordinates);
          }
      }
      this.drawingOnCanvas.redrawCanvas(
        this.myTrackEditorModel,
        this.trackEditorConstraintService.intersectionBooleanArray(this.myTrackEditorModel.getPointArray()),
        this.trackEditorConstraintService.angleBooleanArray(this.myTrackEditorModel.getPointArray()));
  }

    // If the focus is on the point, it becomes green
    public mouseOnPoint(x: number, y: number): void {
        const tempPoint: PointCoordinates = new PointCoordinates(x, y);
        this.drawingOnCanvas.drawPointOnCanvas(tempPoint, "#00FF00", STANDARD_SIZE_CIRCLE);
    }

    // If the focus is not on the point, it stays black
    public mouseNotOnPoint(x: number, y: number): void {
      this.drawingOnCanvas.redrawCanvas(
        this.myTrackEditorModel,
        this.trackEditorConstraintService.intersectionBooleanArray(this.myTrackEditorModel.getPointArray()),
        this.trackEditorConstraintService.angleBooleanArray(this.myTrackEditorModel.getPointArray()));
    }
    public allConstraintPass(): boolean {
      return this.myTrackEditorModel.allConstraintPass(
        this.trackEditorConstraintService.angleBooleanArray(this.myTrackEditorModel.getPointArray()),
        this.trackEditorConstraintService.intersectionBooleanArray(this.myTrackEditorModel.getPointArray()));
    }
    public get name(): string {
        return this.name;
    }
    public get description(): string {
        return this.description;
    }
    public set name(name: string) {
        this.name = name;
    }
    public set description(description: string) {
        this.description = description;
    }
    public inputTextNotEmpty(): boolean {
        console.log(this.trackName.length !== 0 && this.trackDescription.length !== 0);
       return (this.trackName.length !== 0 && this.trackDescription.length !== 0);
    }
    public addTrack(trackName: string, trackDescription: string, trackType: RaceType): void {
        this.trackName = trackName;
        this.trackDescription = trackDescription;
        this.trackType= trackType;
    }
}
