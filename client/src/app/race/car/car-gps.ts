import { Object3D, Vector2, LineCurve } from "three";

/*Class that has the informations about the position of the car inside the track */
export class CarGPS {
    private trackSegments: Array<LineCurve> = [];
    private trackWidth: number;
    private _currentSegmentIndex: number;
    private _currentLap: number;

    public constructor( trackSegments: Array<LineCurve>, trackWidth: number) {
        this.trackSegments = trackSegments;
        this.trackWidth = trackWidth;
        this._currentSegmentIndex = 0;
        this._currentLap = 0;

    }

    public getPosition(carMesh: Object3D): Vector2 {
        return new Vector2(carMesh.position.z, carMesh.position.x);
    }

    // FUNCTION NOW SMELLS LESS BAD
    public reachedJonction(carMesh: Object3D): boolean {
        const factor: number = 0.8;
        const reachedJonction: boolean =  this.getPosition(carMesh).distanceTo(this.currentJunctionPosition) < (this.trackWidth * factor);

        if (reachedJonction) {
            if ((this._currentSegmentIndex + 1) === this.trackSegments.length) {
                this._currentLap += 1;
            }
            this._currentSegmentIndex = (this._currentSegmentIndex + 1) % (this.trackSegments.length);
            console.log("Current segment :" + this._currentSegmentIndex);
            console.log("Current lap :" + this._currentLap);
        }

        return reachedJonction;
    }

    // Maintenant le carGPS devrait être capable de calculer la position des jonctions
    public get currentJunctionPosition(): Vector2 {
        return this.trackSegments[this._currentSegmentIndex].v2;
    }
    public get currentSegmentIndex(): number {
        return this._currentSegmentIndex;
    }

    public get currentSegment(): LineCurve {
        return this.trackSegments[this.currentSegmentIndex];
    }

    public get currentLap(): number {
        return this._currentLap;
    }
}
