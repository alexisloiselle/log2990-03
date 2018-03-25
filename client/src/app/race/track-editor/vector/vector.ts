import * as THREE from "three";
import { Domain } from "./domain";
import { Equation } from "./equation";

const POWER_OF_TWO: number = 2;
const LAW_OF_COSINUS_CONSTANT: number = 2;

export class Vector {
    private domain: Domain;
    private equation: Equation;
    private startPoint: THREE.Vector2;
    private endPoint: THREE.Vector2;

    public constructor(coordinatesNewPoint: THREE.Vector2, coordinatesLastPointInArray: THREE.Vector2) {
        this.domain = new Domain(coordinatesNewPoint, coordinatesLastPointInArray);
        this.equation = new Equation(coordinatesNewPoint, coordinatesLastPointInArray);
        this.startPoint = coordinatesLastPointInArray;
        this.endPoint = coordinatesNewPoint;
    }

    public calculateVectorIntersection(vector: Vector): THREE.Vector2 {
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

            return (new THREE.Vector2(xIntersection, yIntersection));
        }

        return (new THREE.Vector2(-1, -1));
    }

    public isParallel(vector: Vector): boolean {
        return this.Slope === vector.Slope;
    }

    public pointIsInCommunDomain(intersectionPoint: THREE.Vector2, secondVector: Vector): boolean {
        return !(intersectionPoint.x <= this.domain.XMin || intersectionPoint.x <= secondVector.domain.XMin ||
            intersectionPoint.x >= this.domain.XMax || intersectionPoint.x >= secondVector.domain.XMax ||
            intersectionPoint.y <= this.domain.YMin || intersectionPoint.y <= secondVector.domain.YMin ||
            intersectionPoint.y >= this.domain.YMax || intersectionPoint.y >= secondVector.domain.YMax);
    }

    public calculateVectorLenght(): number {
        return (Math.sqrt(Math.pow(this.endPoint.x - this.startPoint.x, POWER_OF_TWO) +
            Math.pow(this.endPoint.y - this.startPoint.y, POWER_OF_TWO)));
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

    public get StartPoint(): THREE.Vector2 {
        return this.startPoint;
    }

    public get EndPoint(): THREE.Vector2 {
        return this.endPoint;
    }
}
