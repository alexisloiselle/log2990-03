const MINIMUM_DISTANCE_BETWEEN_POINTS: number = 20;

export class PointCoordinates {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getDistance(otherPoint: PointCoordinates): number {
        return Math.sqrt(Math.pow(otherPoint.x - this.x, 2) + Math.pow(otherPoint.y - this.y, 2));
    }

    public equals(otherPoint: PointCoordinates): boolean {
        return this.x === otherPoint.x && this.y === otherPoint.y;
    }

    public isTooClose(otherPoint: PointCoordinates): boolean {
        return (this.getDistance(otherPoint) <= MINIMUM_DISTANCE_BETWEEN_POINTS );
    }
}
