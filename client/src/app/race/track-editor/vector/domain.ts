import { PointCoordinates} from "../point-coordinates";

export class Domain {
    private xMin: number;
    private yMin: number;
    private xMax: number;
    private yMax: number;

    public constructor(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates) {
        this.xMin = this.findMinDomain(coordinatesNewPoint, coordinatesLastPointInArray).X;
        this.yMin = this.findMinDomain(coordinatesNewPoint, coordinatesLastPointInArray).Y;
        this.xMax = this.findMaxDomain(coordinatesNewPoint, coordinatesLastPointInArray).X;
        this.yMax = this.findMaxDomain(coordinatesNewPoint, coordinatesLastPointInArray).Y;

    }
    public findMinDomain(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates): PointCoordinates {
        let minX: number = 0;
        let minY: number = 0;

        minX = (coordinatesNewPoint.X < coordinatesLastPointInArray.X) ? coordinatesNewPoint.X :
                coordinatesLastPointInArray.X;

        minY = (coordinatesNewPoint.Y < coordinatesLastPointInArray.Y) ? coordinatesNewPoint.Y :
                coordinatesLastPointInArray.Y;

        return(new PointCoordinates (minX, minY));
    }
    public findMaxDomain(coordinatesNewPoint: PointCoordinates, coordinatesLastPointInArray: PointCoordinates): PointCoordinates {
        let maxX: number = 0;
        let maxY: number = 0;

        maxX = (coordinatesNewPoint.X > coordinatesLastPointInArray.X) ? coordinatesNewPoint.X :
        coordinatesLastPointInArray.X;

        maxY = (coordinatesNewPoint.Y > coordinatesLastPointInArray.Y) ? coordinatesNewPoint.Y :
         coordinatesLastPointInArray.Y;

        return(  new PointCoordinates (maxX, maxY));
    }

    public get XMin(): number {
        return this.xMin;
    }

    public set XMin(xMin: number) {
        this.xMin = xMin;
    }

    public get YMin(): number {
        return this.yMin;
    }

    public set YMin(yMin: number) {
        this.yMin = yMin;
    }

    public get XMax(): number {
        return this.xMax;
    }

    public set XMax(xMax: number) {
        this.xMax = xMax;
    }

    public get YMax(): number {
        return this.yMax;
    }

    public set YMax(yMax: number) {
        this.yMax = yMax;
    }
}
