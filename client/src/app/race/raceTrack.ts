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
            this.segments.push(new THREE.LineCurve(this.normalise(this.points[i], this.points[0]),
                                                   this.normalise(this.points[i + 1], this.points[0])));
        }
    }

    public normalise(vector: THREE.Vector2, origin: THREE.Vector2): THREE.Vector2 {
        return new THREE.Vector2((vector.x - origin.x), (vector.y - origin.y));
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
