import { pointCoordinates} from "../pointCoordinates";

export class domain {
    private xMin: number;
    private yMin: number;
    private xMax: number;
    private yMax: number;
    
    constructor(xMin : number, yMin : number, xMax:number, yMax: number){
        this.xMin=xMin;
        this.yMin=yMin;
        this.xMax=xMax;
        this.yMax=yMax;
    }
    findMinDomain(coordinatesNewPoint: pointCoordinates, coordinatesLastPointInArray: pointCoordinates) : pointCoordinates {
        let minX : number = 0;
        let minY : number = 0;
        if(coordinatesNewPoint.getX() < coordinatesLastPointInArray.getX()){
            minX = coordinatesNewPoint.getX();
        }
        else {
            minX =  coordinatesLastPointInArray.getX();
        }
        if(coordinatesNewPoint.getY() < coordinatesLastPointInArray.getY()){
            minY = coordinatesNewPoint.getY();
        }
        else {
            minY =  coordinatesLastPointInArray.getY();
        }
    
      return(  new pointCoordinates (minX,minY));
    }
    findMaxDomain(coordinatesNewPoint: pointCoordinates, coordinatesLastPointInArray: pointCoordinates) : pointCoordinates {
        let maxX : number = 0;
        let maxY : number = 0;
        if(coordinatesNewPoint.getX()> coordinatesLastPointInArray.getX()){
            maxX = coordinatesNewPoint.getX();
        }
        else {
            maxX =  coordinatesLastPointInArray.getX();
        }
        if(coordinatesNewPoint.getY()> coordinatesLastPointInArray.getY()){
            maxY = coordinatesNewPoint.getY();
        }
        else {
            maxY =  coordinatesLastPointInArray.getY();
        }
      return(  new pointCoordinates (maxX,maxY));
    }
    getXMin(){
        return this.xMin;
    }
    getYMin(){
        return this.yMin;
    }
    getXMax(){
        return this.xMax;
    }
    getYMax(){
        return this.yMax;
    }

    setXMin(xMin : number){
        this.xMin=xMin;
    }
    setXMax(xMax : number){
        this.xMax=xMax;
    }
    setYMin(yMin : number){
        this.yMin=yMin;
    }
    setYMax(yMax : number){
        this.yMax=yMax;
    }
}