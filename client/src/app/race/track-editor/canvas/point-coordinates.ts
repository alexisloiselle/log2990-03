import { Vector2 } from "three";

const MINIMUM_DISTANCE_BETWEEN_POINTS: number = 20;

export class PointCoordinates extends Vector2 {

    public constructor(x: number, y: number) {
        super(x, y);
    }

    public isTooClose(otherPoint: PointCoordinates): boolean {
        return (this.getDistance(otherPoint) <= MINIMUM_DISTANCE_BETWEEN_POINTS);
    }

    public getAngle(otherPoint: PointCoordinates): number {
        return Math.atan((otherPoint.y - this.y) / (otherPoint.x - this.x));
    }

    public getDistance(otherPoint: PointCoordinates): number {
        return Math.sqrt(Math.pow(this.x - otherPoint.x, 2) +
            Math.pow(this.y - otherPoint.y, 2));
    }
}
