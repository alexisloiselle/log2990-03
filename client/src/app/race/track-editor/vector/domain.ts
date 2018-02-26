import { PointCoordinates } from "../point-coordinates";

export class Domain {
    private xMin: number;
    private yMin: number;
    private xMax: number;
    private yMax: number;

    public constructor(firstPoint: PointCoordinates, secondPoint: PointCoordinates) {
        this.xMin = Math.min(firstPoint.X, secondPoint.X);
        this.yMin = Math.min(firstPoint.Y, secondPoint.Y);
        this.xMax = Math.max(firstPoint.X, secondPoint.X);
        this.yMax = Math.max(firstPoint.Y, secondPoint.Y);
    }

    public get XMin(): number {
        return this.xMin;
    }

    public set XMin(xMin: number) {
        this.xMin = xMin;
    }

    public get YMin(): number {
        return this.yMin;
    }

    public set YMin(yMin: number) {
        this.yMin = yMin;
    }

    public get XMax(): number {
        return this.xMax;
    }

    public set XMax(xMax: number) {
        this.xMax = xMax;
    }

    public get YMax(): number {
        return this.yMax;
    }

    public set YMax(yMax: number) {
        this.yMax = yMax;
    }
}
