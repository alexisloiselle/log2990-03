import * as THREE from "three";

export class RaceTrack {

    public id: string;
    public name: string;
    public description: string;
    public type: RaceType;
    public points: THREE.Vector2[] = [];
    public segments: THREE.LineCurve[] = [];
    public width: number = 20;
    private bestTimes: BestTime;

    public constructor(name: string, description: string, type: RaceType, points: THREE.Vector2[]) {
        this.name = name;
        this.bestTimes = new BestTime;
        this.description = description;
        this.type = type;
        for (const point of points) {
            this.points.push(point);
        }
        this.findSegments();
    }

    public findSegments(): void {
        for (let i: number = 0; i < this.points.length - 1; i++) {
            this.segments.push(new THREE.LineCurve(this.normalize(this.points[i], this.points[0]),
                                                   this.normalize(this.points[i + 1], this.points[0])));
        }
    }

    public normalize(vector: THREE.Vector2, origin: THREE.Vector2): THREE.Vector2 {
        return new THREE.Vector2((vector.x - origin.x), (vector.y - origin.y));
    }
}

export class BestTime {

    public arrayBestTimes: Array<Player>;
    public title: string;

    public constructor() {
        this.title = "Top 5 des meilleurs temps";
        for (let i: number = 0; i < NUMBER_OF_BEST_TIMES_IN_ARRAY; i++) {
            this.arrayBestTimes.push({time: 0, name: "N/a" });
        }

    }

    public updateBestTime(newPlayer: Player): void {
        for (let i: number = 0; i < NUMBER_OF_BEST_TIMES_IN_ARRAY; i++) {
            if (newPlayer.time < this.arrayBestTimes[i].time) {
                this.arrayBestTimes.splice(i, 0, newPlayer);
                this.arrayBestTimes.pop();
                break;
            }
        }
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
