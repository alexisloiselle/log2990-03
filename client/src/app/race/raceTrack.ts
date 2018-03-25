import * as THREE from "three";

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
    public points: THREE.Vector2[] = [];
    public segments: THREE.LineCurve[] = [];
    public width: number = 20;
    public center: THREE.Vector2;

    public constructor(name: string, description: string, type: RaceType, points: THREE.Vector2[]) {
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
            this.segments.push(new THREE.LineCurve(this.points[i], this.points[i + 1]));
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
