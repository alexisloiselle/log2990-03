import { PointCoordinates} from "../point-coordinates";
import { Domain } from "./domain";
import { Equation} from "./equation";

const POWER_OF_TWO: number = 2;
const LAW_OF_COSINUS_CONSTANT: number = 2;

export class Vector {
    private domain: Domain;
    private equation: Equation;
    private startPoint: PointCoordinates;
    private endPoint: PointCoordinates;

    public constructor(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates) {
        this.domain = this.createDomain(coordinatesNewPoint, coordinatesLastPointInArray) ;
        this.equation = this.createEquation(coordinatesNewPoint, coordinatesLastPointInArray);
        this.startPoint = coordinatesLastPointInArray;
        this.endPoint = coordinatesNewPoint;
    }

    private createDomain(domainMin: PointCoordinates, domainMax: PointCoordinates): Domain {
        return(new Domain(domainMin, domainMax));
    }

    private createEquation(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates): Equation {
        return(new Equation(coordinatesNewPoint, coordinatesLastPointInArray));
    }

    // Potential to remove
    public createArrayVector(arrayPointCoordinates: PointCoordinates[]): Vector[] { // to test
        const arrayVector: Vector[] = [];
        for (let i: number = 0 ; i < arrayPointCoordinates.length - 1 ; i++ ) {
            const newVector: Vector = new Vector(arrayPointCoordinates[i], arrayPointCoordinates[i + 1]);
            arrayVector.push(newVector);
        }

        return arrayVector;
    }

    public calculateVectorIntersection(secondVector: Vector): PointCoordinates {
        // Calculer point d'intersection
        let xIntersection: number = 0;
        let yIntersection: number = 0;
        if (!(this.isParallel(secondVector))) {
          if (this.equation.Slope === Infinity || this.equation.Slope === -Infinity) {
            xIntersection = this.domain.XMin;
            yIntersection = (secondVector.equation.Slope * xIntersection) + secondVector.equation.Constant;
          } else if (secondVector.equation.Slope === Infinity || secondVector.equation.Slope === -Infinity) {
            xIntersection = secondVector.domain.XMin;
            yIntersection = (this.equation.Slope * xIntersection) + this.equation.Constant;
          } else {
            xIntersection = (secondVector.equation.Constant - this.equation.Constant) / (this.equation.Slope - secondVector.equation.Slope);
            yIntersection = xIntersection * this.equation.Slope + this.equation.Constant;
          }

          return (new PointCoordinates(xIntersection, yIntersection));
        } else {
            return (new PointCoordinates(-1, -1));
        }
    }

    public isParallel(secondVector: Vector): boolean {
        return (this.Slope === secondVector.Slope);
    }

    public calculateCommunDomain(secondVector: Vector): Domain {
        let xMinCommun: number, xMaxCommun: number, yMinCommun: number, yMaxCommun: number;

        xMinCommun = (this.domain.XMin < secondVector.domain.XMin) ? this.domain.XMin :
            secondVector.domain.XMin;

        yMinCommun = (this.domain.YMin < secondVector.domain.YMin) ? this.domain.YMin :
            secondVector.domain.YMin;

        xMaxCommun = (this.domain.XMax > secondVector.domain.XMax) ? this.domain.XMax :
            secondVector.domain.XMax;

        yMaxCommun = (this.domain.YMax > secondVector.domain.YMax) ? this.domain.YMax :
            secondVector.domain.YMax;

        const pointMinCommun: PointCoordinates = new PointCoordinates(xMinCommun, yMinCommun);
        const pointMaxCommun: PointCoordinates = new PointCoordinates(xMaxCommun, yMaxCommun);

        return(new Domain(pointMinCommun, pointMaxCommun));
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

    public calculateAngle(firstVector: Vector): number {
        const oppositeVectorFromAngle: Vector = new Vector (this.endPoint, firstVector.startPoint);
        const straightAngle: number = 180;

        return (Math.acos(((Math.pow(this.calculateVectorLenght(), POWER_OF_TWO)) +
                Math.pow(firstVector.calculateVectorLenght(), POWER_OF_TWO) -
                Math.pow(oppositeVectorFromAngle.calculateVectorLenght(), POWER_OF_TWO)) /
                (LAW_OF_COSINUS_CONSTANT * this.calculateVectorLenght() *
                firstVector.calculateVectorLenght()))) * straightAngle / Math.PI;

    }

    public findMinDomain(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates): PointCoordinates {
        return this.domain.findMinDomain(coordinatesNewPoint, coordinatesLastPointInArray);
    }

    public findMaxDomain(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates): PointCoordinates {
       return this.domain.findMaxDomain(coordinatesNewPoint, coordinatesLastPointInArray);
    }

    public calculateSlope(pointEnd: PointCoordinates, pointStart: PointCoordinates): number {
        return this.calculateSlope(pointEnd, pointStart);
    }

    public calculateConstant(pointFromTheVector: PointCoordinates): number {
        return this.calculateConstant(pointFromTheVector);
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
