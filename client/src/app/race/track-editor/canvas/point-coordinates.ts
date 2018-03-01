const MINIMUM_DISTANCE_BETWEEN_POINTS: number = 20;

export class PointCoordinates {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getDistance(otherPoint: PointCoordinates): number {
        // tslint:disable-next-line:no-magic-numbers
        return Math.sqrt(Math.pow(otherPoint.x - this.x, 2) + Math.pow(otherPoint.y - this.y, 2));
    }

    public equals(otherPoint: PointCoordinates): boolean {
        return this.X === otherPoint.X && this.Y === otherPoint.Y;
    }

    public isTooClose(otherPoint: PointCoordinates): boolean {
        return (this.getDistance(otherPoint) <= MINIMUM_DISTANCE_BETWEEN_POINTS );
    }

    public get X(): number {
        return this.x;
    }

    public set X(x: number) {
        this.x = x;
    }

    public get Y(): number {
        return this.y;
    }

    public set Y(y: number) {
        this.y = y;
    }
}
