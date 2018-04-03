import { Object3D, Vector2 } from "three";

/*Class that has the informations about the position of the car inside the track */
export class CarGPS {
    
    public constructor() {
    }

    public getPosition(carMesh: Object3D): Vector2 {
        return new Vector2(carMesh.position.z, carMesh.position.x);
    }
    // BAD SMELL : TOO MUCH ARGUMENTS FOR THAT FUNCTION
    public reachedJonction(carMesh: Object3D, jonctionPosition: Vector2, trackWidth: number): boolean {
        const factor: number = 0.8;

        return this.getPosition(carMesh).distanceTo(jonctionPosition) < (trackWidth * factor);
    }

    // Must determine the segment and the lap we're in
}
