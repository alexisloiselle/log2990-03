import { Vector2 } from "three";
import { pointCoordinates} from "../pointCoordinates";
import { domain } from "./domain";
import { equation} from "./equation";



export class vector {
    private vector: Vector2;
    private domain: domain;
    private equation : equation;
    
    constructor(coordinatesNewPoint : pointCoordinates, coordinatesLastPointInArray:pointCoordinates){ //as bon conceptuellement que domainX soit un pointCoordonner
        this.vector = this.createNewVector(coordinatesNewPoint,coordinatesLastPointInArray);
        this.domain = this.createDomain(coordinatesNewPoint,coordinatesLastPointInArray) ;
        this.equation = this.createEquation(coordinatesNewPoint,coordinatesLastPointInArray);
    }
    
    private createNewVector ( coordinatesNewPoint: pointCoordinates, coordinatesLastPointInArray: pointCoordinates){
        return( new Vector2(coordinatesNewPoint.getX()-coordinatesLastPointInArray.getX(),coordinatesNewPoint.getY()-coordinatesLastPointInArray.getY()));
        
      }

    private createDomain (domainMin: pointCoordinates, domainMax: pointCoordinates){
        return(new domain(domainMin.getX(),domainMin.getY(),domainMax.getX(),domainMax.getY()));
    }

    private createEquation(coordinatesNewPoint: pointCoordinates, coordinatesLastPointInArray: pointCoordinates){
        return(new equation(this.calculateSlope(coordinatesNewPoint,coordinatesLastPointInArray),this.calculateConstant(coordinatesNewPoint)));
    }


    findMinDomain(coordinatesNewPoint: pointCoordinates, coordinatesLastPointInArray: pointCoordinates) : pointCoordinates {
        return (this.domain.findMinDomain(coordinatesNewPoint,coordinatesLastPointInArray));
    }

    findMaxDomain(coordinatesNewPoint: pointCoordinates, coordinatesLastPointInArray: pointCoordinates) : pointCoordinates {
       return( this.domain.findMaxDomain(coordinatesNewPoint,coordinatesLastPointInArray));
    }
    
    calculateSlope(pointEnd : pointCoordinates, pointStart:pointCoordinates): number{
        return(this.calculateSlope(pointEnd ,pointStart));
    }

    calculateConstant(pointFromTheVector : pointCoordinates): number{
        return(this.calculateConstant(pointFromTheVector));
    }

    getDomainXMin(){
        return this.domain.getXMin;
    }
    getDomainXmax(){
        return this.domain.getXMax;
    }
  
    getDomainYMin(){
        return this.domain.getYMin;
    }
    getDomainYmax(){
        return this.domain.getYMax;
    }

    getVector(){
        return this.vector;
    }
}