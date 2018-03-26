import * as THREE from "three";

export class Domain {
    private xMin: number;
    private yMin: number;
    private xMax: number;
    private yMax: number;

    public constructor(firstPoint: THREE.Vector2, secondPoint: THREE.Vector2) {
        this.xMin = Math.min(firstPoint.x, secondPoint.x);
        this.yMin = Math.min(firstPoint.y, secondPoint.y);
        this.xMax = Math.max(firstPoint.x, secondPoint.x);
        this.yMax = Math.max(firstPoint.y, secondPoint.y);
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
