import { Vector2 } from "three";
import { PointCoordinates} from "../pointCoordinates";
import { Domain } from "./domain";
import { Equation} from "./equation";

export class Vector {
    private vector: Vector2;
    private domain: Domain;
    private equation: Equation;

    public constructor(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates) {
        this.vector = this.createNewVector(coordinatesNewPoint, coordinatesLastPointInArray);
        this.domain = this.createDomain(coordinatesNewPoint, coordinatesLastPointInArray) ;
        this.equation = this.createEquation(coordinatesNewPoint, coordinatesLastPointInArray);
    }

    private createNewVector(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates): Vector2 {
        return( new Vector2(coordinatesNewPoint.getX() - coordinatesLastPointInArray.getX(),
                            coordinatesNewPoint.getY() - coordinatesLastPointInArray.getY()));

      }

    private createDomain(domainMin: PointCoordinates, domainMax: PointCoordinates): Domain {
        return(new Domain(domainMin, domainMax));
    }

    private createEquation(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates): Equation {
        return(new Equation(coordinatesNewPoint, coordinatesLastPointInArray));
    }

    // POSSIBLEMENT À ENLEVER
    public createArrayVector(arrayPointCoordinates: PointCoordinates[]): Vector[] { // a tester
        const arrayVector: Vector[] = []; // mis const a cause de tslint
        for (let i: number = 0 ; i < arrayPointCoordinates.length - 1 ; i++ ) { // 2 pour ne pas lire la derniere case du array
            const newVector: Vector = new Vector(arrayPointCoordinates[i], arrayPointCoordinates[i + 1]);
            arrayVector.push(newVector);
        }

        return arrayVector;
    }

    public calculateVectorIntersection(secondVector: Vector): PointCoordinates {

        // Calculer point d'intersection

        if (!(this.isParallel(secondVector))) {
        const xIntersection: number = (secondVector.getConstant() - this.getConstant()) / (this.getSlope() - secondVector.getSlope());
        const yIntersection: number = xIntersection * this.getSlope() + this.getConstant();

        return (new PointCoordinates(xIntersection, yIntersection));

        } else {

        return (new PointCoordinates(NaN, NaN));
        }
    }

    public isParallel(secondVector: Vector): boolean {
        if ((this.getSlope() === secondVector.getSlope())) {
            return true;
        } else {

        return false;
        }
    }

    public calculateCommunDomain(secondVector: Vector): Domain {
        let xMinCommun: number, xMaxCommun: number, yMinCommun: number, yMaxCommun: number;

        xMinCommun = (this.domain.getXMin() < secondVector.domain.getXMin()) ? this.domain.getXMin() :
                    secondVector.domain.getXMin();

        yMinCommun = (this.domain.getYMin() < secondVector.domain.getYMin()) ? this.domain.getYMin() :
        secondVector.domain.getYMin();

        xMaxCommun = (this.domain.getXMax() > secondVector.domain.getXMax()) ? this.domain.getXMax() :
        secondVector.domain.getXMax();

        yMaxCommun = (this.domain.getYMax() > secondVector.domain.getYMax()) ? this.domain.getYMax() :
        secondVector.domain.getYMax();

        const pointMinCommun: PointCoordinates = new PointCoordinates(xMinCommun, yMinCommun);
        const pointMaxCommun: PointCoordinates = new PointCoordinates(xMaxCommun, yMaxCommun);

        return(new Domain(pointMinCommun, pointMaxCommun));
    }

    public pointIsInCommunDomain(intersectionPoint: PointCoordinates, secondVector: Vector): boolean {
        if (intersectionPoint.getX() <= this.domain.getXMin() || intersectionPoint.getX() <= secondVector.domain.getXMin() ||
            intersectionPoint.getX() >= this.domain.getXMax() || intersectionPoint.getX() >= secondVector.domain.getXMax() ||
            intersectionPoint.getY() <= this.domain.getYMin() || intersectionPoint.getY() <= secondVector.domain.getYMin() ||
            intersectionPoint.getY() >= this.domain.getYMax() || intersectionPoint.getY() >= secondVector.domain.getYMax() ) {
                return false;

        } else {

            return true;
        }

    }

    public calculateAngle(secondVector: Vector): number {
    if (!(this.isParallel(secondVector))) {
       if (secondVector.vector.angle() > this.vector.angle()) {
        let angleRadian = secondVector.vector.angle() - this.vector.angle();
        let  angleDegree = angleRadian*180/ Math.PI;
        console.log(angleDegree);
            return(angleDegree);
        } else {

          let angleRadian = this.vector.angle() - secondVector.vector.angle();
          let angleDegree = angleRadian*180/ Math.PI;
          console.log(angleDegree);
          return(angleDegree);
        }
        }

    return (NaN);

    }

    public findMinDomain(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates): PointCoordinates {
        return (this.domain.findMinDomain(coordinatesNewPoint, coordinatesLastPointInArray));
    }

    public findMaxDomain(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates): PointCoordinates {
       return( this.domain.findMaxDomain(coordinatesNewPoint, coordinatesLastPointInArray));
    }

    public calculateSlope(pointEnd: PointCoordinates, pointStart: PointCoordinates): number {
        return(this.calculateSlope(pointEnd , pointStart));
    }

    public calculateConstant(pointFromTheVector: PointCoordinates): number {
        return(this.calculateConstant(pointFromTheVector));
    }

    public getDomainXMin(): number {
        return this.domain.getXMin();
    }
    public getDomainXmax(): number {
        return this.domain.getXMax();
    }

    public getDomainYMin(): number {
        return this.domain.getYMin();
    }
    public getDomainYmax(): number {
        return this.domain.getYMax();
    }

    public getVector(): Vector2 {
        return this.vector;
    }

    public getSlope(): number {
        return this.equation.getSlope();
    }

    public getConstant(): number {
        return this.equation.getConstant();
    }

}
