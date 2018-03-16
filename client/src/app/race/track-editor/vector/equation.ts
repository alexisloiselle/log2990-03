import { PointCoordinates} from "../canvas/point-coordinates";

export class Equation {
    private slope: number;
    private constant: number;

    public constructor(pointEnd: PointCoordinates, pointStart: PointCoordinates) {
        this.slope = this.calculateSlope(pointEnd, pointStart);
        this.constant = this.calculateConstant(pointEnd);
    }

    public calculateSlope(pointEnd: PointCoordinates, pointStart: PointCoordinates): number {
        return (pointEnd.y - pointStart.y) / (pointEnd.x - pointStart.x);
    }

    public calculateConstant(pointFromTheVector: PointCoordinates): number {
        return pointFromTheVector.y - this.slope * pointFromTheVector.x;
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
