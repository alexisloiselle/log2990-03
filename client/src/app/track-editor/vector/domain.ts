import { PointCoordinates} from "../pointCoordinates";

export class Domain {
    private xMin: number;
    private yMin: number;
    private xMax: number;
    private yMax: number;

    public constructor(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates) {
        this.xMin = this.findMinDomain(coordinatesNewPoint, coordinatesLastPointInArray).getX();
        this.yMin = this.findMinDomain(coordinatesNewPoint, coordinatesLastPointInArray).getY();
        this.xMax = this.findMaxDomain(coordinatesNewPoint, coordinatesLastPointInArray).getX();
        this.yMax = this.findMaxDomain(coordinatesNewPoint, coordinatesLastPointInArray).getY();
    }

    public findMinDomain(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates): PointCoordinates {
        let minX: number = 0;
        let minY: number = 0;
        if (coordinatesNewPoint.getX() < coordinatesLastPointInArray.getX()) {
            minX = coordinatesNewPoint.getX();
        } else {
            minX =  coordinatesLastPointInArray.getX();
        }
        if (coordinatesNewPoint.getY() < coordinatesLastPointInArray.getY()) {
            minY = coordinatesNewPoint.getY();
        } else {
            minY =  coordinatesLastPointInArray.getY();
        }

        return(new PointCoordinates (minX, minY));
    }
    public findMaxDomain(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates): PointCoordinates {
        let maxX: number = 0;
        let maxY: number = 0;
        if (coordinatesNewPoint.getX() > coordinatesLastPointInArray.getX()){
            maxX = coordinatesNewPoint.getX();
        } else {
            maxX =  coordinatesLastPointInArray.getX();
        }
        if (coordinatesNewPoint.getY() > coordinatesLastPointInArray.getY()){
            maxY = coordinatesNewPoint.getY();
        } else {
            maxY =  coordinatesLastPointInArray.getY();
        }

        return(  new PointCoordinates (maxX, maxY));
    }
    public getXMin(): number {
        return this.xMin;
    }
    public getYMin(): number {
        return this.yMin;
    }
    public getXMax(): number {
        return this.xMax;
    }
    public getYMax(): number {
        return this.yMax;
    }

    public setXMin(xMin: number): void {
        this.xMin = xMin;
    }
    public setXMax(xMax: number): void {
        this.xMax = xMax;
    }
    public setYMin(yMin: number): void {
        this.yMin = yMin;
    }
    public setYMax(yMax: number): void {
        this.yMax = yMax;
    }
}
