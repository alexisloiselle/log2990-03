import { PointCoordinates } from "./point-coordinates";
import { TrackEditorModel } from "./track-editor-model";

const WIDTH_OF_CANVAS: number = 500;
const HEIGHT_OF_CANVAS: number = 500;
const STANDARD_SIZE_CIRCLE: number = 10;
const LINE_WIDTH: number = 5;

export class DrawingOnCanvas {
    private ctx: CanvasRenderingContext2D;

    public constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public drawFirstPointOnCanvas(point: PointCoordinates, color: string, size: number): void {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, STANDARD_SIZE_CIRCLE, 0, Math.PI * 2);
        this.ctx.lineWidth = LINE_WIDTH;
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.lineWidth = 2;
    }

    public drawPointOnCanvas(point: PointCoordinates, color: string, size: number): void {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    public redrawCanvas(trackEditorModel: TrackEditorModel, noIntersection: boolean[], angleOk: boolean[], lengthOk: boolean[]): void {
        this.eraseCanvas();
        this.redrawLines(trackEditorModel, noIntersection, lengthOk);
        this.redrawPoints(trackEditorModel, angleOk);
    }

    public redrawLines(trackEditorModel: TrackEditorModel, noIntersection: boolean[], lengthOk: boolean[]): void {
        for (const i of trackEditorModel.PointArray) {
            if (trackEditorModel.PointArray.indexOf(i) !== 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(trackEditorModel.getSinglePoint(trackEditorModel.PointArray.indexOf(i) - 1).x,
                                trackEditorModel.getSinglePoint(trackEditorModel.PointArray.indexOf(i) - 1).y);
                this.ctx.lineTo(i.x, i.y);
                this.ctx.strokeStyle = noIntersection[trackEditorModel.PointArray.indexOf(i) - 1]
                    && lengthOk[trackEditorModel.PointArray.indexOf(i) - 1] ?
                    "black" : "red";
                this.ctx.stroke();
            }
        }
    }

    public redrawPoints(trackEditorModel: TrackEditorModel, angleOk: boolean[]): void {
        for (const point of trackEditorModel.PointArray) {
            if (trackEditorModel.PointArray.indexOf(point) - 1 >= 0 &&
                trackEditorModel.PointArray.indexOf(point) - 1 < angleOk.length) {
                if (angleOk[trackEditorModel.PointArray.indexOf(point) - 1]) {
                    this.drawPointOnCanvas(point, "black", STANDARD_SIZE_CIRCLE);
                } else {
                    this.drawPointOnCanvas(point, "red", STANDARD_SIZE_CIRCLE);
                }
            } else {
                this.drawPointOnCanvas(point, "black", STANDARD_SIZE_CIRCLE);
            }
            if (trackEditorModel.PointArray.indexOf(point) === 0) {
                this.drawFirstPointOnCanvas(point, "black", STANDARD_SIZE_CIRCLE);
            }
        }
    }

    public eraseCanvas(): void {
        this.ctx.clearRect(0, 0, WIDTH_OF_CANVAS, HEIGHT_OF_CANVAS);
    }
}
