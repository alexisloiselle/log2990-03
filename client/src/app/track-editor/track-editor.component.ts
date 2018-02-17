import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
// We need to import the pointCoordinates class
import { PointCoordinates } from "./pointCoordinates";
import { TrackEditorModel } from "./track-editor-model";
import { TrackEditorConstraintService } from "./track-editor-constraint.service";

const STANDARD_SIZE_CIRCLE: number = 10;
const WIDTH_OF_CANVAS: number = 800;
const HEIGHT_OF_CANVAS: number = 800;

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
    private mouseMovedEvent: KeyboardEvent;  // So that each method can access the coordinates
    // at all times
    private mouseDown: boolean;    // Used for the drag and drop
    private myTrackEditorModel: TrackEditorModel;

    public ngOnInit(): void {
        // We here initialise the canvas and get the context (ctx)
        this.ctx = this.canvasRef.nativeElement.getContext("2d");
        // we set the canvas height and width attribute
        this.canvasRef.nativeElement.height = HEIGHT_OF_CANVAS;
        this.canvasRef.nativeElement.width = WIDTH_OF_CANVAS;

        // We initialise the mouseMovedEvent
        this.mouseMovedEvent = 0;
        // We initialise the mouse down event to false
        this.mouseDown = false;
        // We instanciate the model
        this.myTrackEditorModel = new TrackEditorModel();
    }

    public constructor(private trackEditorConstraintService: TrackEditorConstraintService) { }

    public canvasMouseDown(event: {}): void {
        this.mouseDown = true;
    }

    public canvasMouseUp(event: KeyboardEvent): void {
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
    public canvasMouseMoved(event: {}): void {
        this.mouseMovedEvent = event;  // We stock the mouseCoordinates inside the mouseMovedEvent variable

        if (this.mouseDown) {
            this.dragNDrop();
        } else { // We color the points if the focus is on one of them
            this.checkMouseFocus();
        }
    }

    public removePointsTooClose(): void {
        this.myTrackEditorModel.removePointsTooClose();
        this.redrawCanvas();
    }

    public canvasEraseLastPoint(): void {
        this.myTrackEditorModel.eraseLastPoint();
        this.redrawCanvas();
    }

    public drawFirstPointOnCanvas(point: PointCoordinates, color: string, size: number): void {
        this.ctx.beginPath();
        this.ctx.arc(point.getX(), point.getY(), STANDARD_SIZE_CIRCLE, 0, Math.PI * 2);
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(point.getX(), point.getY(), size, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        // We reset the line Width
        this.ctx.lineWidth = 2;
    }

    public drawPointOnCanvas(point: PointCoordinates, color: string, size: number): void {
        this.ctx.beginPath();
        this.ctx.arc(point.getX(), point.getY(), size, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
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
    // As soon as the loop is closed, we verify if all the constraints pass
    public canvasCloseLoop(): void {
        this.myTrackEditorModel.closeLoop();
        this.redrawCanvas();
    }

    public allConstraintPass(): boolean {
      return this.myTrackEditorModel.allConstraintPass(
        this.trackEditorConstraintService.angleBooleanArray(this.myTrackEditorModel.getPointArray()),
        this.trackEditorConstraintService.intersectionBooleanArray(this.myTrackEditorModel.getPointArray()));
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
                    break;
                } else {
                    this.mouseNotOnPoint(point.getX(), point.getY());
                }
            }
        }
    }

    // If the focus is on the point, it becomes green
    public mouseOnPoint(x: number, y: number): void {
        const tempPoint: PointCoordinates = new PointCoordinates(x, y);
        this.drawPointOnCanvas(tempPoint, "#00FF00", STANDARD_SIZE_CIRCLE);
    }

    // If the focus is not on the point, it stays black
    public mouseNotOnPoint(x: number, y: number): void {
        this.redrawCanvas();
    }

    public dragNDrop(): void {
        const mouseCoordinates: PointCoordinates = new PointCoordinates(this.mouseMovedEvent.layerX, this.mouseMovedEvent.layerY);
        // We identify the point on wich the user clicked
        for (const point of this.myTrackEditorModel.getPointArray()) {
            const ACCEPTED_RADIUS: number = 15;
            if (this.mouseMovedEvent.layerX >= point.getX() - ACCEPTED_RADIUS &&
                this.mouseMovedEvent.layerX <= point.getX() + ACCEPTED_RADIUS &&
                this.mouseMovedEvent.layerY >= point.getY() - ACCEPTED_RADIUS &&
                this.mouseMovedEvent.layerY <= point.getY() + ACCEPTED_RADIUS) {
                this.myTrackEditorModel.setPointCoordinates(this.myTrackEditorModel.getPointArray().indexOf(point), mouseCoordinates);
            }
        }
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
            this.redrawCanvas();
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
        this.redrawLinesOnCanvas();
        this.redrawPointsOnCanvas();
    }
    // A FAIRE
    public redrawLinesOnCanvas(): void {
      const intersectionBooleanArray: boolean[] =
       this.trackEditorConstraintService.intersectionBooleanArray(this.myTrackEditorModel.getPointArray());
      for (const i of this.myTrackEditorModel.getPointArray()) {
        if (this.myTrackEditorModel.getPointArray().indexOf(i) !== 0) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArray().indexOf(i) - 1).getX(),
                          this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArray().indexOf(i) - 1).getY());
          this.ctx.lineTo(i.getX(), i.getY());
          if (intersectionBooleanArray[this.myTrackEditorModel.getPointArray().indexOf(i) - 1]) {
            this.ctx.strokeStyle = "black";
          } else {
            this.ctx.strokeStyle = "red";
          }
          this.ctx.stroke();
        }
      }
    }

    public redrawPointsOnCanvas(): void {
      const angleBooleanArray: boolean[] =  this.trackEditorConstraintService.angleBooleanArray(this.myTrackEditorModel.getPointArray());
      for (const i of this.myTrackEditorModel.getPointArray()) {
          if (this.myTrackEditorModel.getPointArray().indexOf(i) - 1 >= 0 &&
              this.myTrackEditorModel.getPointArray().indexOf(i) - 1 < angleBooleanArray.length) {
              if (angleBooleanArray[this.myTrackEditorModel.getPointArray().indexOf(i) - 1]) {
                this.drawPointOnCanvas(i, "black", STANDARD_SIZE_CIRCLE);
              } else {
                this.drawPointOnCanvas(i, "red", STANDARD_SIZE_CIRCLE);
              }
          } else {
            this.drawPointOnCanvas(i, "black", STANDARD_SIZE_CIRCLE);
          }
          // We redraw the first point
          if (this.myTrackEditorModel.getPointArray().indexOf(i) === 0) {
              this.drawFirstPointOnCanvas(i, "black", STANDARD_SIZE_CIRCLE);
          }
        }
    }

    public eraseCanvas(): void {
        this.ctx.clearRect(0, 0, WIDTH_OF_CANVAS, HEIGHT_OF_CANVAS);
    }

}
