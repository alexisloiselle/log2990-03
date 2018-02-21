
import { PointCoordinates} from "../pointCoordinates";
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
        console.log("EstParallele : "+this.isParallel(secondVector));
        if (!(this.isParallel(secondVector))) {
        const xIntersection: number = (secondVector.getConstant() - this.getConstant()) / (this.getSlope() - secondVector.getSlope());
        const yIntersection: number = xIntersection * this.getSlope() + this.getConstant();

        return (new PointCoordinates(xIntersection, yIntersection));

        } else {

        return (new PointCoordinates(-1, -1));
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

    public calculateVectorLenght(): number {
        return (Math.sqrt(Math.pow(this.endPoint.getX() - this.startPoint.getX(), POWER_OF_TWO) + Math.pow(this.endPoint.getY() -
        this.startPoint.getY(),                                                                            POWER_OF_TWO)));
    }

    public calculateAngle(firstVector: Vector): number {
        const oppositeVectorFromAngle: Vector = new Vector (this.endPoint, firstVector.startPoint);
        return (180 * (Math.acos(((Math.pow(this.calculateVectorLenght(), POWER_OF_TWO)) + 
                    (Math.pow(firstVector.calculateVectorLenght(), POWER_OF_TWO)) -
                    (Math.pow(oppositeVectorFromAngle.calculateVectorLenght(), POWER_OF_TWO))) / 
                    (LAW_OF_COSINUS_CONSTANT * this.calculateVectorLenght() *
                    firstVector.calculateVectorLenght()))) / Math.PI);

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

    public getSlope(): number {
        return this.equation.getSlope();
    }

    public getConstant(): number {
        return this.equation.getConstant();
    }
    public getStartPoint(): PointCoordinates {
        return this.startPoint;
    }
    public getEndPoint(): PointCoordinates {
        return this.endPoint;
    }

}
