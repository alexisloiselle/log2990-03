import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
// We need to import the pointCoordinates class
import { PointCoordinates } from "./pointCoordinates";
import { TrackEditorModel } from "./track-editor-model";
// import { Vector2 } from "three";
// import { vector } from "./vector/vector";

@Component({
    selector: "app-track-editor",
    templateUrl: "./track-editor.component.html",
    styleUrls: ["./track-editor.component.css"],
})

export class TrackEditorComponent implements OnInit {
    @ViewChild("canvas")
    private canvasRef: ElementRef;
    private ctx: any;
    // private currentPoint : number
    private mouseMovedEvent: any;  // So that each method can access the coordinates
    // at all times
    private mouseDown: boolean;    // Used for the drag and drop
    private myTrackEditorModel: TrackEditorModel;

    public ngOnInit(): void {
        // We here initialise the canvas and get the context (ctx)
        this.ctx = this.canvasRef.nativeElement.getContext("2d");
        // we set the canvas height and width attribute
        const heightCanvas: number = 800;
        const widthCanvas: number = 800;
        this.canvasRef.nativeElement.height = heightCanvas;
        this.canvasRef.nativeElement.width = widthCanvas;

        // We initialise the mouseMovedEvent
        this.mouseMovedEvent = 0;
        // We initialise the mouse down event to false
        this.mouseDown = false;
        // We instanciate the model
        this.myTrackEditorModel = new TrackEditorModel;

    }

    public canvasMouseDown(event: {}): void {
        this.mouseDown = true;
    }

    public canvasMouseUp(event: any): void {
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
        this.removeDuplicatedPoints();
    }
    public canvasMouseMoved(event: {}): void {
        this.mouseMovedEvent = event;  // We stock the mouseCoordinates inside the mouseMovedEvent variable

        if (this.mouseDown) {
            this.dragNDrop();
        } else { // On colore les points si le focus est sur l'un d'eux
            this.checkMouseFocus();
        }
    }

    public removeDuplicatedPoints(): void {
        this.myTrackEditorModel.removeDuplicatedPoints();
        this.redrawCanvas();
    }

    public canvasEraseLastPoint(): void {
        this.myTrackEditorModel.eraseLastPoint();
        this.redrawCanvas();
    }

    public drawLineOnCanvas(point1: PointCoordinates, point2: PointCoordinates): void {
        this.ctx.beginPath();
        this.ctx.moveTo(this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArrayLength() - 2).getX(),
            this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArrayLength() - 2).getY());
        this.ctx.lineTo(this.myTrackEditorModel.getSinglePoint(0).getX(),
            this.myTrackEditorModel.getSinglePoint(0).getY());
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
    }
    public drawPointOnCanvas(point: PointCoordinates, color: string, size: number): void {
        this.ctx.beginPath();
        this.ctx.arc(point.getX(), point.getY(), size, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    public canvasCloseLoop(): void {
        this.myTrackEditorModel.closeLoop();

        const point1: PointCoordinates = this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArrayLength() - 2);
        const point2: PointCoordinates = this.myTrackEditorModel.getSinglePoint(0);
        this.drawLineOnCanvas(point1, point2);
    }

    public checkMouseFocus(): void { // Checks if the focus is on a point or not
        if (this.myTrackEditorModel.getPointArrayLength() > 0) {
            for (const point of this.myTrackEditorModel.getPointArray()) {
                const ACCEPTED_RADIUS: number = 10;
                if (this.mouseMovedEvent.layerX >= point.getX() - ACCEPTED_RADIUS && this.mouseMovedEvent.layerX <=
                    point.getX() + ACCEPTED_RADIUS &&
                    this.mouseMovedEvent.layerY >= point.getY() - ACCEPTED_RADIUS && this.mouseMovedEvent.layerY <=
                    point.getY() + ACCEPTED_RADIUS) {
                    this.mouseOnPoint(point.getX(), point.getY());
                } else {
                    this.mouseNotOnPoint(point.getX(), point.getY());
                }
            }
        }
    }

    // If the focus is on the point, it becomes green
    public mouseOnPoint(x: number, y: number): void {
        const tempPoint: PointCoordinates = new PointCoordinates(x, y);
        const DEFAULT_SIZE: number = 10;
        this.drawPointOnCanvas(tempPoint, "#00FF00", DEFAULT_SIZE);
    }

    // If the focus is not on the point, it stays black
    public mouseNotOnPoint(x: number, y: number): void {
        const tempPoint: PointCoordinates = new PointCoordinates(x, y);
        const DEFAULT_SIZE: number = 9;
        this.drawPointOnCanvas(tempPoint, "black", DEFAULT_SIZE);
    }

    public clickedOnExistingPoint(x: number, y: number): boolean {
        for (const point of this.myTrackEditorModel.getPointArray()) {
            const ACCEPTED_RADIUS: number = 20;
            if (x >= point.getX() - ACCEPTED_RADIUS && x <= point.getX() + ACCEPTED_RADIUS &&
                y >= point.getY() - ACCEPTED_RADIUS && y <= point.getY() + ACCEPTED_RADIUS) {
                return true;
            }
        }

        return false;
    }

    public dragNDrop(): void {
        const mouseCoordinates: PointCoordinates = new PointCoordinates(this.mouseMovedEvent.layerX, this.mouseMovedEvent.layerY);
        // Je trouve le point sur lequel il a cliqué
        for (const point of this.myTrackEditorModel.getPointArray()) {
            const ACCEPTED_RADIUS: number = 15;
            if (this.mouseMovedEvent.layerX >= point.getX() - ACCEPTED_RADIUS &&
                this.mouseMovedEvent.layerX <= point.getX() + ACCEPTED_RADIUS &&
                this.mouseMovedEvent.layerY >= point.getY() - ACCEPTED_RADIUS &&
                this.mouseMovedEvent.layerY <= point.getY() + ACCEPTED_RADIUS) {
                this.myTrackEditorModel.setPointCoordinates(this.myTrackEditorModel.getPointArray().indexOf(point), mouseCoordinates);
            }
        }
        this.eraseCanvas();
        this.redrawCanvas();
    }

    public canvasDrawPoint(mouseCoordinates: PointCoordinates): void {
        // If I clicked on a point and the arrayLength is superior to three
        const MINIMUM_LENGTH: number = 3;
        if (this.myTrackEditorModel.getPointArrayLength() >= MINIMUM_LENGTH &&
            this.myTrackEditorModel.clickedOnFirstPoint(mouseCoordinates)) {
            this.canvasCloseLoop(); // I can close the circuit
        } else if (!this.myTrackEditorModel.clickedOnExistingPoint(mouseCoordinates)) {
            this.myTrackEditorModel.addPoint(mouseCoordinates);

            const DEFAULT_SIZE: number = 10;
            this.drawPointOnCanvas(mouseCoordinates, "#00FF00", DEFAULT_SIZE);

            if (this.myTrackEditorModel.getPointArrayLength() === 1) {
                this.ctx.beginPath();
                this.ctx.arc(mouseCoordinates.getX(), mouseCoordinates.getY(), DEFAULT_SIZE, 0, Math.PI * 2);
                const NEW_WIDTH: number = 10;
                this.ctx.lineWidth = NEW_WIDTH;
                this.ctx.strokeStyle = "blue";
                this.ctx.stroke();
                // We reset the line Width
                const RESETED_WIDTH: number = 2;
                this.ctx.lineWidth = RESETED_WIDTH;
            }
            this.canvasDrawLine();
        }
    }

    public canvasDrawLine(): void {
        if (this.myTrackEditorModel.getPointArrayLength() >= 2) {
            const point1: PointCoordinates = this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArrayLength() - 2);
            const point2: PointCoordinates = this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArrayLength() - 1);
            this.drawLineOnCanvas(point1, point2);

        }
    }

    public redrawCanvas(): void {
        this.eraseCanvas();
        // We redraw the points
        for (const i of this.myTrackEditorModel.getPointArray()) {
            this.drawPointOnCanvas(i, "black", 9);

            // We redraw the shit for the point
            if (this.myTrackEditorModel.getPointArray().indexOf(i) === 0) {
                this.ctx.beginPath();
                this.ctx.arc(i.getX(), i.getY(), 10, 0, Math.PI * 2);
                this.ctx.lineWidth = 5;
                this.ctx.strokeStyle = "blue";
                this.ctx.stroke();
                // We reset the line Width
                this.ctx.lineWidth = 2;
            } else { // We draw the lines back
                this.ctx.beginPath();
                this.ctx.moveTo(this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArray().indexOf(i) - 1).getX(),
                    this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArray().indexOf(i) - 1).getY());
                this.ctx.lineTo(i.getX(), i.getY());
                this.ctx.strokeStyle = "black";
                this.ctx.stroke();

            }
        }
    }

    public eraseCanvas(): void {
        this.ctx.clearRect(0, 0, 800, 800);
    }

}
