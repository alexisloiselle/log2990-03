import { Vector2 } from "three";
import { pointCoordinates} from "../pointCoordinates";
import { Domain } from "./domain";
import { Equation} from "./equation";

export class Vector {
    private vector: Vector2;
    private domain: Domain;
    private equation: Equation;

    public constructor(coordinatesNewPoint: pointCoordinates, coordinatesLastPointInArray: pointCoordinates) {
        this.vector = this.createNewVector(coordinatesNewPoint, coordinatesLastPointInArray);
        this.domain = this.createDomain(coordinatesNewPoint, coordinatesLastPointInArray) ;
        this.equation = this.createEquation(coordinatesNewPoint, coordinatesLastPointInArray);
    }

    private createNewVector(coordinatesNewPoint: pointCoordinates, coordinatesLastPointInArray: pointCoordinates): Vector2 {
        return( new Vector2(coordinatesNewPoint.getX() - coordinatesLastPointInArray.getX(),
                            coordinatesNewPoint.getY() - coordinatesLastPointInArray.getY()));

      }

    private createDomain(domainMin: pointCoordinates, domainMax: pointCoordinates): Domain {
        return(new Domain(domainMin, domainMax));
    }

    private createEquation(coordinatesNewPoint: pointCoordinates, coordinatesLastPointInArray: pointCoordinates): Equation {
        return(new Equation(coordinatesNewPoint, coordinatesLastPointInArray));
    }

    public findMinDomain(coordinatesNewPoint: pointCoordinates, coordinatesLastPointInArray: pointCoordinates): pointCoordinates {
        return (this.domain.findMinDomain(coordinatesNewPoint, coordinatesLastPointInArray));
    }

    public findMaxDomain(coordinatesNewPoint: pointCoordinates, coordinatesLastPointInArray: pointCoordinates): pointCoordinates {
       return( this.domain.findMaxDomain(coordinatesNewPoint, coordinatesLastPointInArray));
    }

    public calculateSlope(pointEnd: pointCoordinates, pointStart: pointCoordinates): number {
        return(this.calculateSlope(pointEnd , pointStart));
    }

    public calculateConstant(pointFromTheVector: pointCoordinates): number {
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
