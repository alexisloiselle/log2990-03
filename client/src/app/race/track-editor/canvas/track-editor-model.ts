import * as THREE from "three";

const MINIMUM_DISTANCE_BETWEEN_POINTS: number = 20;
const MINIMUM_ARRAY_LENGTH: number = 2;

export class TrackEditorModel {
    private pointArray: THREE.Vector2[];

    public constructor() {
        this.pointArray = [];
    }

    public get PointArray(): THREE.Vector2[] {
        return this.pointArray;
    }

    public set PointArray(otherPointArray: THREE.Vector2[]) {
        this.pointArray = otherPointArray;
    }

    public getPointArrayLength(): number {
        return this.pointArray.length;
    }

    public getSinglePoint(index: number): THREE.Vector2 {
        if (index >= 0 && index < this.pointArray.length) {
            return this.pointArray[index];
        }

        return new THREE.Vector2(-1, -1);
    }

    public setPointCoordinates(index: number, mouseCoordinates: THREE.Vector2): void {
        if (index >= 0 && index < this.pointArray.length) {
            this.pointArray[index].x = mouseCoordinates.x;
            this.pointArray[index].y = mouseCoordinates.y;
        }
    }

    public addPoint(point: THREE.Vector2): void {
        if (!this.isLoopClosed()) {
            this.pointArray.push(point);
            this.removePointsTooClose();
        }
    }

    public eraseLastPoint(): void {
        if (this.pointArray.length >= 1) {
            this.pointArray.splice(this.pointArray.length - 1);
        }
    }

    public removePointsTooClose(): void {
        if (this.pointArray.length > MINIMUM_ARRAY_LENGTH) {
            for (let i: number = this.isLoopClosed() ? 1 : 0; i < this.pointArray.length - 1; i++) {
                for (let j: number = i + 1; j < this.pointArray.length; j++) {
                    if (this.isTooClose(this.pointArray[i], this.pointArray[j])) {
                        this.pointArray.splice(this.pointArray.indexOf(this.pointArray[j]), 1);
                    }
                }
            }
        }
    }

    public isLoopClosed(): boolean {
        return (this.pointArray.length > MINIMUM_ARRAY_LENGTH &&
            (this.pointArray[this.pointArray.length - 1]).equals(this.pointArray[0]));
    }

    public closeLoop(): void {
        if (this.getPointArrayLength() > 1) {
            const point: THREE.Vector2 = new THREE.Vector2(this.pointArray[0].x, this.pointArray[0].y);
            this.pointArray.push(point);
        }
    }

    public isClickedOnExistingPoint(mouseCoordinates: THREE.Vector2): boolean {
        const ACCEPTED_RADIUS: number = 20;
        for (const point of this.pointArray) {
            if (point.distanceTo(mouseCoordinates) <= ACCEPTED_RADIUS) {
                return true;
            }
        }

        return false;
    }

    public isClickedOnFirstPoint(mouseCoordinates: THREE.Vector2): boolean {
        const ACCEPTED_RADIUS: number = 10;

        return this.pointArray[0].distanceTo(mouseCoordinates) <= ACCEPTED_RADIUS;
    }

    public isTooClose(firstPoint: THREE.Vector2, secondPoint: THREE.Vector2): boolean {
        return (firstPoint.distanceTo(secondPoint) <= MINIMUM_DISTANCE_BETWEEN_POINTS );
    }
}
