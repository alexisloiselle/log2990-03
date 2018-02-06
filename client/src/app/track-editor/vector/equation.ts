import { PointCoordinates} from "../pointCoordinates";

export class Equation {
    private slope: number;
    private constant: number;

    public constructor(pointEnd: PointCoordinates, pointStart: PointCoordinates) {
        this.slope = this.calculateSlope(pointEnd, pointStart);
        this.constant = this.calculateConstant(pointEnd);
    }
    public calculateSlope(pointEnd: PointCoordinates, pointStart: PointCoordinates): number {
        return((pointEnd.getY() - pointStart.getY()) / (pointEnd.getX() - pointStart.getX()));
    }

    public calculateConstant(pointFromTheVector: PointCoordinates): number {
        return (pointFromTheVector.getY() - this.slope * pointFromTheVector.getX());
    }

    public getSlope(): number {
        return this.slope;
    }
    public getConstant(): number {
        return this.constant;
    }

    public setSlope(slope: number ): void {
        this.slope = slope;
    }
    public setConstant( constant: number): void {
        this.constant = constant;
    }
}
