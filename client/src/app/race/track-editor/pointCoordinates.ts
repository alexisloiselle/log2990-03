export class PointCoordinates {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }
    public getY(): number {
        return this.y;
    }
    public setX(x: number): void {
        this.x = x;
    }
    public setY(y: number): void {
        this.y = y;
    }

    public equals(otherPoint: PointCoordinates): boolean {
        if (this.getX() === otherPoint.getX() &&
            this.getY() === otherPoint.getY()) {
            return true;
        }

        return false;
    }
}
