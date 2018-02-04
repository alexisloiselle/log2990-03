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

    public createArrayVector(arrayPointCoordinates: PointCoordinates[]): Vector[] { // a tester
        const arrayVector: Vector[] = []; // mis const a cause de tslint
        for (let i: number = 0 ; i < arrayPointCoordinates.length - 2 ; i++ ) { // 2 pour ne pas lire la derniere case du array
            const newVector: Vector = new Vector(arrayPointCoordinates[i], arrayPointCoordinates[i + 1]);
            arrayVector.push(newVector);
        }

        return arrayVector;
    }

    calculateVectorIntersection(secondVector: Vector): PointCoordinates {

        // Calculer point d<intersection
        const xIntersection = (secondVector.getConstant() - this.getConstant())/(this.getSlope()-secondVector.getSlope()); // Peut etre faire 3 fonctions 1. Calculer Point d<intersection 2. Calculer domaine commun au 2 vector 3.Verification
        const yIntersection = xIntersection * this.getSlope() + this.getConstant();
        return (new PointCoordinates(xIntersection,yIntersection));
    
    }

    calculateCommunDomain(secondVector: Vector): Domain {
        let xMinCommun: number, xMaxCommun: number, yMinCommun: number, yMaxCommun: number;
        
        
        if(this.domain.getXMin() < secondVector.domain.getXMin()){
            xMinCommun = secondVector.domain.getXMin();
        } else xMinCommun = this.domain.getXMin();

        if(this.domain.getYMin() < secondVector.domain.getYMin()){
            yMinCommun = secondVector.domain.getYMin();
        } else yMinCommun = this.domain.getYMin();

        if(this.domain.getXMax() < secondVector.domain.getXMax()){
            xMaxCommun = secondVector.domain.getXMax();
        } else xMaxCommun = this.domain.getXMax();

        if(this.domain.getYMax() < secondVector.domain.getYMax()){
            yMaxCommun = secondVector.domain.getYMax();
        } else yMaxCommun = this.domain.getYMax();
             
        const pointMinCommun = new PointCoordinates(xMinCommun,yMinCommun);
        const pointMaxCommun = new PointCoordinates(xMaxCommun,yMaxCommun);
        return(new Domain(pointMinCommun,pointMaxCommun));
    }

    public pointIsInDomain(intersectionPoint: PointCoordinates, secondVector: Vector): boolean {
       let communDomain = this.calculateCommunDomain(secondVector);
       if( communDomain.getXMin() > intersectionPoint.getX() || communDomain.getXMax() < intersectionPoint.getX()){
            return false;
       } 
       if(communDomain.getYMin() > intersectionPoint.getY() || communDomain.getYMax() < intersectionPoint.getY()){
           return false;
       }

       return true;
    }

    public calculateAngle(secondVector: Vector): number {
       if (secondVector.vector.angle() > this.vector.angle()) {
            return(secondVector.vector.angle() - this.vector.angle());
       }

       return(this.vector.angle() - secondVector.vector.angle());
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
