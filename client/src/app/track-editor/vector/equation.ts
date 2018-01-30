import { pointCoordinates} from "../pointCoordinates";


export class equation {
    private slope: number;
    private constant: number;
    
    constructor(slope : number, constant : number) {
        this.slope=slope;
        this.constant=constant;
    }
    calculateSlope(pointEnd : pointCoordinates, pointStart:pointCoordinates){
        return((pointEnd.getY()-pointStart.getY())/(pointEnd.getX()-pointStart.getX()));
    }

    calculateConstant(pointFromTheVector : pointCoordinates){
        return (pointFromTheVector.getY()-this.slope*pointFromTheVector.getX());
    }

    getSlope(){
        return this.slope;
    }
    getConstant(){
        return this.constant;
    }
    
    setSlope(slope : number ){
        this.slope = slope;
    }
    setConstant( constant : number){
        this.constant = constant;
    }
}