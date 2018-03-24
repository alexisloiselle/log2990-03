import { PointCoordinates } from "./track-editor/canvas/point-coordinates";
import { LineCurve, Vector2 } from "three";

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
    public segments: LineCurve[] = [];
    public width: number = 20;

    public constructor(name: string, description: string, type: RaceType, points: PointCoordinates[]) {
        this.name = name;
        this.description = description;
        this.type = type;
        for (const point of points) {
            this.points.push(point);
        }
        this.findSegments();
    }

    public findSegments(): void {
        for (let i: number = 0; i < this.points.length - 1; i++) {
            this.segments.push(new LineCurve(this.points[i] as Vector2, this.points[i + 1] as Vector2));
        }
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
