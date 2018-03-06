const MINIMUM_DISTANCE_BETWEEN_POINTS: number = 20;

export class PointCoordinates {
    private x: number;
    private y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public equals(otherPoint: PointCoordinates): boolean {
        return this.X === otherPoint.X && this.Y === otherPoint.Y;
    }

    public isTooClose(otherPoint: PointCoordinates): boolean {
        return (this.X >= otherPoint.X - MINIMUM_DISTANCE_BETWEEN_POINTS &&
                this.X <= otherPoint.X + MINIMUM_DISTANCE_BETWEEN_POINTS &&
                this.Y >= otherPoint.Y - MINIMUM_DISTANCE_BETWEEN_POINTS &&
                this.Y <= otherPoint.Y + MINIMUM_DISTANCE_BETWEEN_POINTS);
    }

    public getAngle(otherPoint: PointCoordinates): number {
        return Math.atan((otherPoint.Y - this.Y)/(otherPoint.X - this.X));
    }

    public getDistance(otherPoint: PointCoordinates) : number {
        return Math.sqrt(Math.pow(this.X-otherPoint.X, 2) + 
                         Math.pow(this.Y-otherPoint.Y, 2) );
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
