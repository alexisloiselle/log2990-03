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
    public trackShape: THREE.Shape;
    public holeShape: THREE.Shape;
    public width: number = 20;
    public center: THREE.Vector2;

    public constructor(name: string, description: string, type: RaceType, points: THREE.Vector2[]) {
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

    public static calculateAngleBetweenVector(vector1: THREE.Vector2, vector2: THREE.Vector2): number {
        return Math.acos(((vector1.x * vector2.x) + (vector1.y * vector2.y)) / (vector1.length() * vector2.length()));
    }

    public createTrackShape(points: THREE.Vector2[]): void {
        this.trackShape = new THREE.Shape();
        this.trackShape.moveTo(points[0].x, points[0].y);
        for (let i: number = 1; i < points.length; i++) {
            this.trackShape.lineTo(points[i].x, points[i].y);
        }
        this.trackShape.lineTo(points[0].x, points[0].y);
    }

    public createHoleShape(points: THREE.Vector2[]): void {
        this.holeShape = new THREE.Shape();
        const firstHolePoint: THREE.Vector2 = this.findHolePoint(points[points.length - 2], points[0], points[1]);
        this.holeShape.moveTo(firstHolePoint.x, firstHolePoint.y);
        for (let i: number = 1; i < points.length - 1; i++) {
            const holePoint: THREE.Vector2 = this.findHolePoint(points[i - 1], points[i], points[i + 1]);
            this.holeShape.lineTo(holePoint.x, holePoint.y);
        }
        this.holeShape.lineTo(firstHolePoint.x, firstHolePoint.y);
    }

    public findHolePoint(point1: THREE.Vector2, intersection: THREE.Vector2, point2: THREE.Vector2): THREE.Vector2 {
        const vector1: THREE.Vector2 = new THREE.Vector2((point1.x - intersection.x), (point1.y - intersection.y));
        let vector2: THREE.Vector2 = new THREE.Vector2((point2.x - intersection.x), (point2.y - intersection.y));
        const angle: number = RaceTrack.calculateAngleBetweenVector(vector1, vector2);
        vector1.normalize();
        vector1.multiplyScalar(this.width);
        vector2 = vector1.clone();
        vector1.rotateAround(new THREE.Vector2(0, 0), angle / 2);
        vector1.add(intersection);
        vector2.rotateAround(new THREE.Vector2(0, 0), -angle / 2);
        vector2.add(intersection);

        return vector1.distanceTo(this.center) < vector2.distanceTo(this.center) ? vector1 : vector2;
    }

    public findCenter(): void {
        let xCoordinate: number = 0;
        let yCoordinate: number = 0;

        for (const point of this.trackShape.getPoints()) {
            xCoordinate += point.x;
            yCoordinate += point.y;
        }

        this.center = new THREE.Vector2((xCoordinate / this.trackShape.getPoints().length),
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
