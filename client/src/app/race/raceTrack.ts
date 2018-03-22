import { PointCoordinates } from "./track-editor/canvas/point-coordinates";
import { Shape, Vector2 } from "three";

export class RaceTrack {

    public id: string;
    public name: string;
    public description: string;
    public lapNumber: number;
    public type: RaceType;
    public ratings: number[] = [];
    public timesPlayed: number = 0;
    public times: TrackTime[] = [];
    public bestTime: TrackTime;
    public points: PointCoordinates[] = [];
    public trackShape: Shape;
    public holeShape: Shape;
    public width: number = 20;
    public center: Vector2;

    public constructor(name: string, description: string, type: RaceType, points: PointCoordinates[]) {
        this.name = name;
        this.description = description;
        this.type = type;
        for (const point of points) {
            this.points.push(point);
        }
        this.createTrackShape(this.points);
        this.findCenter();
        this.createHoleShape(this.points);
    }

    public createTrackShape(points: Vector2[]): void {
        this.trackShape = new Shape();
        this.trackShape.moveTo(points[0].x, points[0].y);
        for (let i: number = 1; i < points.length; i++) {
            this.trackShape.lineTo(points[i].x, points[i].y);
        }
        this.trackShape.lineTo(points[0].x, points[0].y);
    }

    public createHoleShape(points: Vector2[]): void {
        this.holeShape = new Shape();
        const firstHolePoint: Vector2 = this.findHolePoint(points[points.length - 1], points[0], points[1]);
        this.holeShape.moveTo(firstHolePoint.x, firstHolePoint.y);
        for (let i: number = 1; i < points.length - 1; i++) {
            const holePoint: Vector2 = this.findHolePoint(points[i - 1], points[i], points[i + 1]);
            this.holeShape.lineTo(holePoint.x, holePoint.y);
        }
        this.holeShape.lineTo(firstHolePoint.x, firstHolePoint.y);
    }

    public calculateAngleBetweenVector(vector1: Vector2, vector2: Vector2): number {
        let angle: number = Math.atan2(vector1.y, vector1.x) - Math.atan2(vector2.y, vector2.x);
        /*if (angle < 0) {
            angle += Math.PI * 2;
        }*/

        return angle;
    }

    public findHolePoint(point1: Vector2, intersection: Vector2, point2: Vector2): Vector2 {
        const vector1: Vector2 = new Vector2((point1.x - intersection.x), (point1.y - intersection.y));
        let vector2: Vector2 = new Vector2((point2.x - intersection.x), (point2.y - intersection.y));
        const angle: number = this.calculateAngleBetweenVector(vector1, vector2);
        vector1.normalize();
        vector1.multiplyScalar(this.width);
        vector2 = vector1.clone();
        vector1.rotateAround(intersection, angle / 2);
        vector2.rotateAround(intersection, -angle / 2);

        return vector1.distanceTo(this.center) < vector2.distanceTo(this.center) ? vector1.add(intersection) :
                                                                                   vector2.add(intersection);
    }

    public findCenter(): void {
        let xCoordinate: number = 0;
        let yCoordinate: number = 0;

        for (const point of this.trackShape.getPoints()) {
            xCoordinate += point.x;
            yCoordinate += point.y;
        }

        this.center = new Vector2((xCoordinate / this.trackShape.getPoints().length),
                                  (yCoordinate / this.trackShape.getPoints().length));
    }
}

export class TrackTime {
    public constructor(
        public time: number,
        public name: string,
    ) {}
}

export enum RaceType {
    Amateur,
    Professional
}
