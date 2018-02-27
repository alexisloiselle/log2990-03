import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { DrawingOnCanvas } from "./drawing-on-canvas";
import { TrackEditorModel } from "./track-editor-model";
import { PointCoordinates } from "./point-coordinates";
import { TrackEditorConstraintService } from "./track-editor-constraint.service";

const HEIGHT_OF_CANVAS: number = 500;
const WIDTH_OF_CANVAS: number = 500;
const STANDARD_SIZE_CIRCLE: number = 10;

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.css"],
  providers: [TrackEditorConstraintService]
})
export class CanvasComponent implements OnInit {
    @ViewChild("canvas")
    private canvasRef: ElementRef;

    private ctx: CanvasRenderingContext2D;
    private mouseMovedEvent: MouseEvent;  // So that each method can access the coordinates
    // at all times
    private mouseDown: boolean;    // Used for the drag and drop
    private drawingOnCanvas: DrawingOnCanvas;

    public myTrackEditorModel: TrackEditorModel;

    public ngOnInit(): void {
        // We here initialise the canvas and get the context (ctx)
        this.ctx = this.canvasRef.nativeElement.getContext("2d");
        this.canvasRef.nativeElement.height = HEIGHT_OF_CANVAS;
        this.canvasRef.nativeElement.width = WIDTH_OF_CANVAS;
        this.mouseDown = false;
        this.myTrackEditorModel = new TrackEditorModel();
        this.drawingOnCanvas = new DrawingOnCanvas(this.ctx);
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
        const mouseCoordinates: PointCoordinates = new PointCoordinates(event.offsetX, event.offsetY);
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
            this.redrawCanvas();
        }
    }

    public canvasEraseLastPoint(): void {
        this.myTrackEditorModel.eraseLastPoint();
        this.redrawCanvas();
    }

    public removePointsTooClose(): void {
        this.myTrackEditorModel.removePointsTooClose();
        this.redrawCanvas();
    }

    public canvasCloseLoop(): void {
        this.myTrackEditorModel.closeLoop();
        this.redrawCanvas();
    }

    public checkMouseFocus(): void { // Checks if the focus is on a point or not
        if (this.myTrackEditorModel.getPointArrayLength() > 0) {
            for (const point of this.myTrackEditorModel.PointArray) {
                const ACCEPTED_RADIUS: number = 10;
                if (this.mouseMovedEvent.offsetX >= point.X - ACCEPTED_RADIUS && this.mouseMovedEvent.offsetX <=
                    point.X + ACCEPTED_RADIUS &&
                    this.mouseMovedEvent.offsetY >= point.Y - ACCEPTED_RADIUS && this.mouseMovedEvent.offsetY <=
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
        const mouseCoordinates: PointCoordinates = new PointCoordinates(this.mouseMovedEvent.offsetX, this.mouseMovedEvent.offsetY);
        // We identify the point on wich the user clicked
        for (const point of this.myTrackEditorModel.PointArray) {
            const ACCEPTED_RADIUS: number = 15;
            if (this.mouseMovedEvent.offsetX >= point.X - ACCEPTED_RADIUS &&
                this.mouseMovedEvent.offsetX <= point.X + ACCEPTED_RADIUS &&
                this.mouseMovedEvent.offsetY >= point.Y - ACCEPTED_RADIUS &&
                this.mouseMovedEvent.offsetY <= point.Y + ACCEPTED_RADIUS) {
                this.myTrackEditorModel.setPointCoordinates(this.myTrackEditorModel.PointArray.indexOf(point), mouseCoordinates);
            }
        }
        this.redrawCanvas();
    }

    // If the focus is on the point, it becomes green
    public mouseOnPoint(x: number, y: number): void {
        const tempPoint: PointCoordinates = new PointCoordinates(x, y);
        this.drawingOnCanvas.drawPointOnCanvas(tempPoint, "#00FF00", STANDARD_SIZE_CIRCLE);
    }

    // If the focus is not on the point, it stays black
    public mouseNotOnPoint(x: number, y: number): void {
        this.redrawCanvas();
    }

    public redrawCanvas(): void {
        this.drawingOnCanvas.redrawCanvas(
            this.myTrackEditorModel,
            this.trackEditorConstraintService.intersectionBooleanArray(this.myTrackEditorModel.PointArray),
            this.trackEditorConstraintService.angleBooleanArray(this.myTrackEditorModel.PointArray),
            this.trackEditorConstraintService.lengthBooleanArray(this.myTrackEditorModel.PointArray));
    }

    public allConstraintPass(): boolean {
        return this.myTrackEditorModel.allConstraintPass(
            this.trackEditorConstraintService.angleBooleanArray(this.myTrackEditorModel.PointArray),
            this.trackEditorConstraintService.intersectionBooleanArray(this.myTrackEditorModel.PointArray),
            this.trackEditorConstraintService.lengthBooleanArray(this.myTrackEditorModel.PointArray));
    }

}