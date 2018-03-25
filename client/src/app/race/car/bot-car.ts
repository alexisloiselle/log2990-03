import { Car } from "./car";
import { LineCurve, Vector2 } from "three";

export class BotCar extends Car {

    public getPosition(): Vector2 {
        return new Vector2(this.mesh.position.z, this.mesh.position.x);
    }

    public ajustDirection(trackSegment: LineCurve): void {
        const segmentDirection: Vector2 = new Vector2((trackSegment.v2.x - trackSegment.v1.x),
                                                      (trackSegment.v2.y - trackSegment.v1.y));
        const angle: number = this.getPositiveAngle(this.direction.x, this.direction.z) -
                              this.getPositiveAngle(segmentDirection.y, segmentDirection.x);

        if ((angle > 0 && this.isSmallestAngle(angle)) || (angle < 0 && !this.isSmallestAngle(angle))) {
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

    public getPositiveAngle(y: number, x: number): number {
        let angle: number = Math.atan2(y, x);
        if (angle < 0) {
            angle += Math.PI * 2;
        }

        return angle;
    }

    public isSmallestAngle(angle: number): boolean {
        return Math.abs(angle) < Math.PI;
    }
}
