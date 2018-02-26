import { PointCoordinates } from "../point-coordinates";
import { Domain } from "./domain";
import { Equation } from "./equation";

const POWER_OF_TWO: number = 2;
const LAW_OF_COSINUS_CONSTANT: number = 2;

export class Vector {
    private domain: Domain;
    private equation: Equation;
    private startPoint: PointCoordinates;
    private endPoint: PointCoordinates;

    public constructor(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates) {
        this.domain = new Domain(coordinatesNewPoint, coordinatesLastPointInArray);
        this.equation = new Equation(coordinatesNewPoint, coordinatesLastPointInArray);
        this.startPoint = coordinatesLastPointInArray;
        this.endPoint = coordinatesNewPoint;
    }

    public calculateVectorIntersection(vector: Vector): PointCoordinates {
        let xIntersection: number;
        let yIntersection: number;

        if (!(this.isParallel(vector))) {
            if (this.equation.Slope === Infinity || this.equation.Slope === -Infinity) {
                xIntersection = this.domain.XMin;
                yIntersection = (vector.equation.Slope * xIntersection) + vector.equation.Constant;
            } else if (vector.equation.Slope === Infinity || vector.equation.Slope === -Infinity) {
                xIntersection = vector.domain.XMin;
                yIntersection = (this.equation.Slope * xIntersection) + this.equation.Constant;
            } else {
                xIntersection = (vector.equation.Constant - this.equation.Constant) / (this.equation.Slope - vector.equation.Slope);
                yIntersection = xIntersection * this.equation.Slope + this.equation.Constant;
            }

            return (new PointCoordinates(xIntersection, yIntersection));
        }

        return (new PointCoordinates(-1, -1));
    }

    public isParallel(vector: Vector): boolean {
        return this.Slope === vector.Slope;
    }

    public pointIsInCommunDomain(intersectionPoint: PointCoordinates, secondVector: Vector): boolean {
        return !(intersectionPoint.X <= this.domain.XMin || intersectionPoint.X <= secondVector.domain.XMin ||
            intersectionPoint.X >= this.domain.XMax || intersectionPoint.X >= secondVector.domain.XMax ||
            intersectionPoint.Y <= this.domain.YMin || intersectionPoint.Y <= secondVector.domain.YMin ||
            intersectionPoint.Y >= this.domain.YMax || intersectionPoint.Y >= secondVector.domain.YMax);
    }

    public calculateVectorLenght(): number {
        return (Math.sqrt(Math.pow(this.endPoint.X - this.startPoint.X, POWER_OF_TWO) +
            Math.pow(this.endPoint.Y - this.startPoint.Y, POWER_OF_TWO)));
    }

    public calculateAngle(vector: Vector): number {
        const oppositeVectorFromAngle: Vector = new Vector(this.endPoint, vector.startPoint);
        const straightAngle: number = 180;

        return (Math.acos(((Math.pow(this.calculateVectorLenght(), POWER_OF_TWO)) +
            Math.pow(vector.calculateVectorLenght(), POWER_OF_TWO) -
            Math.pow(oppositeVectorFromAngle.calculateVectorLenght(), POWER_OF_TWO)) /
            (LAW_OF_COSINUS_CONSTANT * this.calculateVectorLenght() *
            vector.calculateVectorLenght()))) * straightAngle / Math.PI;
    }

    public get Domain(): Domain {
        return this.domain;
    }

    public get DomainXMin(): number {
        return this.domain.XMin;
    }

    public get DomainXmax(): number {
        return this.domain.XMax;
    }

    public get DomainYMin(): number {
        return this.domain.YMin;
    }

    public get DomainYmax(): number {
        return this.domain.YMax;
    }

    public get Slope(): number {
        return this.equation.Slope;
    }

    public get Constant(): number {
        return this.equation.Constant;
    }

    public get StartPoint(): PointCoordinates {
        return this.startPoint;
    }

    public get EndPoint(): PointCoordinates {
        return this.endPoint;
    }
}
