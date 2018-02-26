import { PointCoordinates} from "../point-coordinates";

export class Equation {
    private slope: number;
    private constant: number;

    public constructor(pointEnd: PointCoordinates, pointStart: PointCoordinates) {
        this.slope = this.calculateSlope(pointEnd, pointStart);
        this.constant = this.calculateConstant(pointEnd);
    }

    public calculateSlope(pointEnd: PointCoordinates, pointStart: PointCoordinates): number {
        return (pointEnd.Y - pointStart.Y) / (pointEnd.X - pointStart.X);
    }

    public calculateConstant(pointFromTheVector: PointCoordinates): number {
        return pointFromTheVector.Y - this.slope * pointFromTheVector.X;
    }

    public get Slope(): number {
        return this.slope;
    }

    public set Slope(slope: number ) {
        this.slope = slope;
    }

    public get Constant(): number {
        return this.constant;
    }

    public set Constant(constant: number) {
        this.constant = constant;
    }
}
