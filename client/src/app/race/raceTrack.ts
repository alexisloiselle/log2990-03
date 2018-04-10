import * as THREE from "three";

export class RaceTrack {

    public id: string;
    public name: string;
    public description: string;
    public type: RaceType;
    public points: THREE.Vector2[] = [];
    public segments: THREE.LineCurve[] = [];
    public width: number = 20;
    public bestTimes: Array<Player>;

    public constructor(
        name: string,
        description: string,
        type: RaceType,
        points: THREE.Vector2[],
        bestTimes: Array<Player> = new Array(
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 }
        )
    ) {
        this.name = name;
        this.bestTimes = bestTimes;
        this.description = description;
        this.type = type;
        for (const point of points) {
            this.points.push(point);
        }
        this.findSegments();
    }

    public findSegments(): void {
        for (let i: number = 0; i < this.points.length - 1; i++) {
            this.segments.push(new THREE.LineCurve(
                this.normalize(this.points[i], this.points[0]),
                this.normalize(this.points[i + 1], this.points[0])
            ));
        }
    }

    public normalize(vector: THREE.Vector2, origin: THREE.Vector2): THREE.Vector2 {
        return new THREE.Vector2((vector.x - origin.x), (vector.y - origin.y));
    }
}

export interface Player {
    name: string;
    time: number;
}
export enum RaceType {
    Amateur,
    Professional
}
