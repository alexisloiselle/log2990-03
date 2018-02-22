import { PointCoordinates } from "./point-coordinates";
import { TrackEditorModel } from "./track-editor-model";

const WIDTH_OF_CANVAS: number = 800;
const HEIGHT_OF_CANVAS: number = 800;
const STANDARD_SIZE_CIRCLE: number = 10;

export class DrawingOnCanvas {
    private ctx: CanvasRenderingContext2D;

    public constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public drawFirstPointOnCanvas(point: PointCoordinates, color: string, size: number): void {
        this.ctx.beginPath();
        this.ctx.arc(point.X, point.Y, STANDARD_SIZE_CIRCLE, 0, Math.PI * 2);
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(point.X, point.Y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        // We reset the line Width
        this.ctx.lineWidth = 2;
    }

    public drawPointOnCanvas(point: PointCoordinates, color: string, size: number): void {
        this.ctx.beginPath();
        this.ctx.arc(point.X, point.Y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    public redrawCanvas(myTrackEditorModel: TrackEditorModel, intersectionBooleanArray: boolean[], angleBooleanArray: boolean[]): void {
        this.eraseCanvas();
        this.redrawLinesOnCanvas(myTrackEditorModel, intersectionBooleanArray);
        this.redrawPointsOnCanvas(myTrackEditorModel, angleBooleanArray);
    }

    public redrawLinesOnCanvas(myTrackEditorModel: TrackEditorModel, intersectionBooleanArray: boolean[]): void {
        for (const i of myTrackEditorModel.PointArray) {
            if (myTrackEditorModel.PointArray.indexOf(i) !== 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(myTrackEditorModel.getSinglePoint(myTrackEditorModel.PointArray.indexOf(i) - 1).X,
                                myTrackEditorModel.getSinglePoint(myTrackEditorModel.PointArray.indexOf(i) - 1).Y);
                this.ctx.lineTo(i.X, i.Y);
                this.ctx.strokeStyle = intersectionBooleanArray[myTrackEditorModel.PointArray.indexOf(i) - 1] ?
                    "black" : "red";
                this.ctx.stroke();
            }
        }
    }

    public redrawPointsOnCanvas(myTrackEditorModel: TrackEditorModel, angleBooleanArray: boolean[]): void {
        for (const i of myTrackEditorModel.PointArray) {
            if (myTrackEditorModel.PointArray.indexOf(i) - 1 >= 0 &&
                myTrackEditorModel.PointArray.indexOf(i) - 1 < angleBooleanArray.length) {
                if (angleBooleanArray[myTrackEditorModel.PointArray.indexOf(i) - 1]) {
                    this.drawPointOnCanvas(i, "black", STANDARD_SIZE_CIRCLE);
                } else {
                    this.drawPointOnCanvas(i, "red", STANDARD_SIZE_CIRCLE);
                }
            } else {
                this.drawPointOnCanvas(i, "black", STANDARD_SIZE_CIRCLE);
            }
            // We redraw the first point
            if (myTrackEditorModel.PointArray.indexOf(i) === 0) {
                this.drawFirstPointOnCanvas(i, "black", STANDARD_SIZE_CIRCLE);
            }
        }
    }

    public eraseCanvas(): void {
        this.ctx.clearRect(0, 0, WIDTH_OF_CANVAS, HEIGHT_OF_CANVAS);
    }
}
