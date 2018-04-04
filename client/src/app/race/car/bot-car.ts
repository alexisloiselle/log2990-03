import { Car } from "./car";
import { LineCurve, Vector2 } from "three";

export class BotCar extends Car {

    public MAX_SPEED: number = 65;

    public static randomAcceleration(): boolean {
        return Math.random() >= (1 / 2);
    }

    public static getPositiveAngle(vector: Vector2): number {
        let angle: number = Math.atan2(vector.y, vector.x);
        if (angle < 0) {
            angle += Math.PI * 2;
        }

        return angle;
    }

    public ajustDirection(trackSegment: LineCurve, accelerate: boolean): void {
        const segmentDirection: Vector2 = new Vector2((trackSegment.v2.x - trackSegment.v1.x),
                                                      (trackSegment.v2.y - trackSegment.v1.y));
        const angle: number = BotCar.getPositiveAngle(new Vector2(this.direction.z, this.direction.x)) -
                              BotCar.getPositiveAngle(new Vector2(segmentDirection.x, segmentDirection.y));

        if (this.speed.length() < this.MAX_SPEED) {
            this.isAcceleratorPressed = accelerate && BotCar.randomAcceleration();
        }

        if ((angle > 0 && Math.abs(angle) < Math.PI) || (angle < 0 && !(Math.abs(angle) < Math.PI))) {
            this.steerRight();
        } else {
            this.steerLeft();
        }
    }

    // public go(): void {
    //     if (this.reachedJonction(this.trackSegments[this.currentSegmentIndex[i]].v2,
    //                              this.trackWidth)) {
    //         if ((this.currentSegmentIndex[i] + 1) === this.trackSegments.length) {
    //             this.currentLap[i] += 1;
    //         }
    //         this.currentSegmentIndex[i] = (this.currentSegmentIndex[i] + 1) % (this.trackSegments.length);
    //         this.ajustDirection(this.trackSegments[this.currentSegmentIndex[i]], false);
    //         } else {
    //             this.ajustDirection(this.trackSegments[this.currentSegmentIndex[i]], true);
    //     }
    // }

    /*public stop(): void {
        this.brake = true; // or something like that
    } */
}
