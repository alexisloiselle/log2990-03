import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { DrawingOnCanvas } from "./drawing-on-canvas";
import { TrackEditorModel } from "./track-editor-model";
import { PointCoordinates } from "./point-coordinates";
import { ConstraintService } from "./track-editor-constraint.service";

const HEIGHT_OF_CANVAS: number = 500;
const WIDTH_OF_CANVAS: number = 500;
const STANDARD_SIZE_CIRCLE: number = 10;
const LEFT_CLICK: number = 0;
const RIGHT_CLICK: number = 2;
const GREEN: string = "#00FF00";

@Component({
    selector: "app-canvas",
    templateUrl: "./canvas.component.html",
    styleUrls: ["./canvas.component.css"],
    providers: [ConstraintService]
})
export class CanvasComponent implements OnInit {
    @ViewChild("canvas")
    private canvasRef: ElementRef;

    private context: CanvasRenderingContext2D;
    private mouseMovedEvent: MouseEvent;
    private isMouseDown: boolean;
    private drawingOnCanvas: DrawingOnCanvas;

    public myTrackEditorModel: TrackEditorModel;

    public ngOnInit(): void {
        this.context = this.canvasRef.nativeElement.getContext("2d");
        this.canvasRef.nativeElement.height = HEIGHT_OF_CANVAS;
        this.canvasRef.nativeElement.width = WIDTH_OF_CANVAS;
        this.isMouseDown = false;
        this.myTrackEditorModel = new TrackEditorModel();
        this.drawingOnCanvas = new DrawingOnCanvas(this.context);
    }

    public constructor(
        private constraintService: ConstraintService
    ) {
    }

    public mouseUp(event: MouseEvent): void {
        this.isMouseDown = false;
        const mouseCoordinates: PointCoordinates = new PointCoordinates(event.offsetX, event.offsetY);
        if (event.button === LEFT_CLICK && !this.myTrackEditorModel.isLoopClosed()) {
            this.drawPoint(mouseCoordinates);
        } else if (event.button === RIGHT_CLICK) {
            this.eraseLastPoint();
        }

        this.removePointsTooClose();
    }

    public mouseMoved(event: MouseEvent): void {
        this.mouseMovedEvent = event;

        if (this.isMouseDown) {
            this.dragAndDrop();
        } else {
            this.checkMouseFocus();
        }
    }

    public mouseDown(event: MouseEvent): void {
        this.isMouseDown = true;
    }

    public drawPoint(mouseCoordinates: PointCoordinates): void {
        const MINIMUM_LENGTH: number = 3;
        if (this.myTrackEditorModel.getPointArrayLength() >= MINIMUM_LENGTH &&
            this.myTrackEditorModel.clickedOnFirstPoint(mouseCoordinates)) {
            this.closeLoop();
        } else if (!this.myTrackEditorModel.clickedOnExistingPoint(mouseCoordinates)) {
            this.myTrackEditorModel.addPoint(mouseCoordinates);
            this.redrawCanvas();
        }
    }

    public eraseLastPoint(): void {
        this.myTrackEditorModel.eraseLastPoint();
        this.redrawCanvas();
    }

    public removePointsTooClose(): void {
        this.myTrackEditorModel.removePointsTooClose();
        this.redrawCanvas();
    }

    public closeLoop(): void {
        this.myTrackEditorModel.closeLoop();
        this.redrawCanvas();
    }

    public checkMouseFocus(): void {
        const mouseCoordinates: PointCoordinates = new PointCoordinates(
            this.mouseMovedEvent.offsetX,
            this.mouseMovedEvent.offsetY
        );

        if (this.myTrackEditorModel.getPointArrayLength() > 0) {
            for (const point of this.myTrackEditorModel.PointArray) {
                const ACCEPTED_RADIUS: number = 10;
                if (mouseCoordinates.getDistance(point) <= ACCEPTED_RADIUS) {
                    this.mouseOnPoint(point);
                    break;
                } else {
                    this.mouseNotOnPoint();
                }
            }
        }
    }

    public dragAndDrop(): void {
        const mouseCoordinates: PointCoordinates = new PointCoordinates(
            this.mouseMovedEvent.offsetX,
            this.mouseMovedEvent.offsetY
        );

        for (const point of this.myTrackEditorModel.PointArray) {
            const ACCEPTED_RADIUS: number = 15;
            if (mouseCoordinates.getDistance(point) <= ACCEPTED_RADIUS) {
                this.myTrackEditorModel.setPointCoordinates(
                    this.myTrackEditorModel.PointArray.indexOf(point),
                    mouseCoordinates
                );
            }
        }
        this.redrawCanvas();
    }

    public mouseOnPoint(point: PointCoordinates): void {
        this.drawingOnCanvas.drawPointOnCanvas(point, GREEN, STANDARD_SIZE_CIRCLE);
    }

    public mouseNotOnPoint(): void {
        this.redrawCanvas();
    }

    public redrawCanvas(): void {
        this.drawingOnCanvas.redrawCanvas(
            this.myTrackEditorModel,
            this.constraintService.intersectionBooleanArray(this.myTrackEditorModel.PointArray),
            this.constraintService.angleBooleanArray(this.myTrackEditorModel.PointArray),
            this.constraintService.lengthBooleanArray(this.myTrackEditorModel.PointArray));
    }

    public allConstraintPass(): boolean {
        return this.myTrackEditorModel.allConstraintPass(
            this.constraintService.angleBooleanArray(this.myTrackEditorModel.PointArray),
            this.constraintService.intersectionBooleanArray(this.myTrackEditorModel.PointArray),
            this.constraintService.lengthBooleanArray(this.myTrackEditorModel.PointArray));
    }

}
