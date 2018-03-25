import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { DrawingOnCanvas } from "./drawing-on-canvas";
import { TrackEditorModel } from "./track-editor-model";
import { ConstraintService } from "./track-editor-constraint.service";
import * as THREE from "three";

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
    private mouseCoordinates: THREE.Vector2;
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
        this.mouseCoordinates = new THREE.Vector2(0, 0);
    }

    public constructor(
        private constraintService: ConstraintService
    ) { }

    public mouseUp(event: MouseEvent): void {
        this.isMouseDown = false;
        const mouseCoordinates: THREE.Vector2 = new THREE.Vector2(event.offsetX, event.offsetY);
        if (event.button === LEFT_CLICK && !this.myTrackEditorModel.isLoopClosed()) {
            this.drawPoint(mouseCoordinates);
        } else if (event.button === RIGHT_CLICK) {
            this.eraseLastPoint();
        }

        this.removePointsTooClose();
    }

    public mouseDown(event: MouseEvent): void {
        this.isMouseDown = true;
    }

    public mouseMoved(event: MouseEvent): void {
        this.mouseCoordinates.x = event.offsetX;
        this.mouseCoordinates.y = event.offsetY;

        if (this.isMouseDown) {
            this.dragAndDrop();
        } else {
            this.checkMouseFocus();
        }
    }

    public drawPoint(mouseCoordinates: THREE.Vector2): void {
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
        if (this.myTrackEditorModel.getPointArrayLength() > 0) {
            for (const point of this.myTrackEditorModel.PointArray) {
                const ACCEPTED_RADIUS: number = 10;
                if (this.mouseCoordinates.distanceTo(point) <= ACCEPTED_RADIUS) {
                    this.mouseOnPoint(point);
                    break;
                } else {
                    this.redrawCanvas();
                }
            }
        }
    }

    public dragAndDrop(): void {
        for (const point of this.myTrackEditorModel.PointArray) {
            const ACCEPTED_RADIUS: number = 15;
            if (this.mouseCoordinates.distanceTo(point) <= ACCEPTED_RADIUS) {
                this.myTrackEditorModel.setPointCoordinates(
                    this.myTrackEditorModel.PointArray.indexOf(point),
                    this.mouseCoordinates
                );
            }
        }
        this.redrawCanvas();
    }

    public mouseOnPoint(point: THREE.Vector2): void {
        this.drawingOnCanvas.drawPointOnCanvas(point, GREEN, STANDARD_SIZE_CIRCLE);
    }

    /*Bad smell, too much arguments*/
    public redrawCanvas(): void {
        const noIntersection: boolean[] = this.constraintService.intersectionBooleanArray(this.myTrackEditorModel.PointArray);
        const angleOk: boolean[] = this.constraintService.angleBooleanArray(this.myTrackEditorModel.PointArray);
        const lengthOk: boolean[] = this.constraintService.lengthBooleanArray(this.myTrackEditorModel.PointArray);

        this.drawingOnCanvas.redrawCanvas(this.myTrackEditorModel, noIntersection, angleOk, lengthOk);
    }

    /*Bad smell, too much arguments*/
    public allConstraintPass(): boolean {
        let constraintRespected: boolean = this.myTrackEditorModel.isLoopClosed();

        if (constraintRespected) {
            for (const angleConstraint of this.constraintService.angleBooleanArray(this.myTrackEditorModel.PointArray)) {
                constraintRespected = constraintRespected && angleConstraint;
            }
            for (const intersectionConstraint of this.constraintService.intersectionBooleanArray(this.myTrackEditorModel.PointArray)) {
                constraintRespected = constraintRespected && intersectionConstraint;
            }
            for (const lengthConstraint of this.constraintService.lengthBooleanArray(this.myTrackEditorModel.PointArray)) {
                constraintRespected = constraintRespected && lengthConstraint;
            }
        }

        return constraintRespected;
    }

}
