import { Vector2 } from "three";

export class PointCoordinates extends Vector2 {

    public constructor(x: number, y: number) {
        super(x, y);
    }

    public getDistance(otherPoint: PointCoordinates): number {
        return Math.sqrt(Math.pow(otherPoint.x - this.x, 2) + Math.pow(otherPoint.y - this.y, 2));
    }

    public equals(otherPoint: PointCoordinates): boolean {
        return this.x === otherPoint.x && this.y === otherPoint.y;
    }
}
