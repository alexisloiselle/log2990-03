import { Car } from "./car";
import { LineCurve, Vector2 } from "three";

export class BotCar extends Car {

    public constructor() {
        super();
    }

    public getPosition(): Vector2 {
        return new Vector2(this.mesh.position.x, this.mesh.position.y);
    }

    public isDirectionOnSegment(trackSegment: LineCurve): boolean {
        const segmentDirection: Vector2 = new Vector2((trackSegment.v2.x - trackSegment.v1.x),
                                                      (trackSegment.v2.y - trackSegment.v1.y));
        const lowerLimit: number = 0.5;
        const upperLimit: number = 5.9;

        return  (Math.abs(Math.atan2(this.direction.x, this.direction.z) -
                          Math.atan2(segmentDirection.y, segmentDirection.x)) <  lowerLimit) ||
                (Math.abs(Math.atan2(this.direction.x, this.direction.z) -
                          Math.atan2(segmentDirection.y, segmentDirection.x)) >  upperLimit);
    }

    public changeSegment(newTrackSegment: LineCurve): void {
        const segmentDirection: Vector2 = new Vector2((newTrackSegment.v2.x - newTrackSegment.v1.x),
                                                      (newTrackSegment.v2.y - newTrackSegment.v1.y));

        if (Math.abs(Math.atan2(this.direction.x, this.direction.z) - Math.atan2(segmentDirection.y, segmentDirection.x)) >
            Math.abs(Math.atan2(segmentDirection.y, segmentDirection.x) - Math.atan2(this.direction.x, this.direction.z))) {
            this.changeSegmentRight();
        } else {
            this.changeSegmentLeft();
        }
    }

    public ajustDirection(trackSegment: LineCurve): void {
        const segmentDirection: Vector2 = new Vector2((trackSegment.v2.x - trackSegment.v1.x),
                                                      (trackSegment.v2.y - trackSegment.v1.y));
        if (Math.atan2(this.direction.x, this.direction.z) > Math.atan2(segmentDirection.y, segmentDirection.x)) {
            this.turnRight();
        } else {
            this.turnLeft();
        }
    }

    public turnLeft(): void {
        this.isAcceleratorPressed = true;
        this.steerLeft();
    }

    public turnRight(): void {
        this.isAcceleratorPressed = true;
        this.steerRight();
    }

    public changeSegmentLeft(): void {
        this.isAcceleratorPressed = false;
        this.steerLeft();
    }

    public changeSegmentRight(): void {
        this.isAcceleratorPressed = false;
        this.steerRight();
    }
}
