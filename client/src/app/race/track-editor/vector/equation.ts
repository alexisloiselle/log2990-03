import * as THREE from "three";

export class Equation {
    private slope: number;
    private constant: number;

    public constructor(pointEnd: THREE.Vector2, pointStart: THREE.Vector2) {
        this.slope = this.calculateSlope(pointEnd, pointStart);
        this.constant = this.calculateConstant(pointEnd);
    }

    public calculateSlope(pointEnd: THREE.Vector2, pointStart: THREE.Vector2): number {
        return (pointEnd.y - pointStart.y) / (pointEnd.x - pointStart.x);
    }

    public calculateConstant(pointFromTheVector: THREE.Vector2): number {
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
