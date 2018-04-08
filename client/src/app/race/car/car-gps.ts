import { Object3D, Vector2, LineCurve } from "three";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

export class CarGPS {
    private trackSegments: Array<LineCurve> = [];
    private trackWidth: number;
    private _currentSegmentIndex: number;
    private _currentLap: number;
    private _incrementLapSub: Subject<{}>;

    public constructor(trackSegments: Array<LineCurve>, trackWidth: number) {
        this.trackSegments = trackSegments;
        this.trackWidth = trackWidth;
        this._currentSegmentIndex = 0;
        this._currentLap = 1;
        this._incrementLapSub = new Subject();
    }

    public getPosition(carMesh: Object3D): Vector2 {
        return new Vector2(carMesh.position.z, carMesh.position.x);
    }

    public reachedJonction(carMesh: Object3D): boolean {
        const factor: number = 0.8;
        const reachedJonction: boolean =
            this.getPosition(carMesh).distanceTo(this.currentJunctionPosition) < (this.trackWidth * factor);

        if (reachedJonction) {
            if ((this._currentSegmentIndex + 1) === this.trackSegments.length) {
                this._currentLap++;
                this._incrementLapSub.next({});
            }
            this._currentSegmentIndex = (this._currentSegmentIndex + 1) % (this.trackSegments.length);
        }

        return reachedJonction;
    }

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

    public get IncrementLapSub(): Observable<{}> {
        return this._incrementLapSub.asObservable();
    }
}
