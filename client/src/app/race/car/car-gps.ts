import { Object3D, Vector2, LineCurve } from "three";

/*Class that has the informations about the position of the car inside the track */
export class CarGPS {
    private trackSegments: Array<LineCurve> = [];
    private trackWidth: number;
    private currentSegmentIndex: number;
    private currentLap: number;

    public constructor( trackSegments: Array<LineCurve>, trackWidth: number) {
        this.trackSegments = trackSegments;
        this.trackWidth = trackWidth;
        this.currentSegmentIndex = 0;
        this.currentLap = 0;

    }

    public getPosition(carMesh: Object3D): Vector2 {
        return new Vector2(carMesh.position.z, carMesh.position.x);
    }
    // BAD SMELL : TOO MUCH ARGUMENTS FOR THAT FUNCTION
    public reachedJonction(carMesh: Object3D, jonctionPosition: Vector2, trackWidth: number): boolean {
        const factor: number = 0.8;

        return this.getPosition(carMesh).distanceTo(jonctionPosition) < (trackWidth * factor);
    }

    // Maintenant le carGPS devrait être capable de calculer la position des jonctions

    // Must determine the segment and the lap we're in
}
