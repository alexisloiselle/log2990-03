import { Car } from "./car";
import { LineCurve, Vector2 } from "three";

export class BotCar extends Car {

    public MAX_SPEED: number = 65;

    public getPosition(): Vector2 {
        return new Vector2(this.mesh.position.z, this.mesh.position.x);
    }

    public ajustDirection(trackSegment: LineCurve, accelerate: boolean): void {
        const segmentDirection: Vector2 = new Vector2((trackSegment.v2.x - trackSegment.v1.x),
                                                      (trackSegment.v2.y - trackSegment.v1.y));
        const angle: number = this.getPositiveAngle(new Vector2(this.direction.z, this.direction.x)) -
                              this.getPositiveAngle(new Vector2(segmentDirection.x, segmentDirection.y));

        if (this.speed.length() < this.MAX_SPEED) {
            this.isAcceleratorPressed = accelerate && this.randomAcceleration();
        }

        if ((angle > 0 && Math.abs(angle) < Math.PI) || (angle < 0 && !(Math.abs(angle) < Math.PI))) {
            this.steerRight();
        } else {
            this.steerLeft();
        }
    }

    public randomAcceleration(): boolean {
        return Math.random() >= (1 / 2);
    }

    public getPositiveAngle(vector: Vector2): number {
        let angle: number = Math.atan2(vector.y, vector.x);
        if (angle < 0) {
            angle += Math.PI * 2;
        }

        return angle;
    }
}
