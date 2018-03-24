import { Car } from "./car";
import { LineCurve, Vector2 } from "three";

export class BotCar extends Car {

    public constructor() {
        super();
    }

    public getPosition(): Vector2 {
        return new Vector2(this.position.z, this.position.x);
    }

    public ajustDirection(trackSegment: LineCurve): void {
        this.isAcceleratorPressed = false;
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
}
