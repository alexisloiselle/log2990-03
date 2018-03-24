import { Car } from "./car";
import { LineCurve, Vector2 } from "three";

export class BotCar extends Car {

    public constructor() {
        super();
    }

    public getPosition(): Vector2 {
        return new Vector2(this.position.x, this.position.y);
    }

    public ajustDirection(trackSegment: LineCurve): void {
        const segmentDirection: Vector2 = new Vector2((trackSegment.v2.x - trackSegment.v1.x),
                                                      (trackSegment.v2.y - trackSegment.v1.y));

        if (Math.atan2(this.direction.y, this.direction.x) > Math.atan2(segmentDirection.y, segmentDirection.x)) {
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
