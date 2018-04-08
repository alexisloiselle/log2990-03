import { Injectable } from "@angular/core";
import { Car } from "../car/car";
import { LineCurve, Vector2, Vector3, Matrix4, Quaternion } from "three";
import { delay } from "q";

@Injectable()
export class CollisionService {

    public constructor() { }

    public checkForCollision(cars: Car[], trackSegments: LineCurve[], trackWidth: number): void {
        for (let i: number = 0; i < cars.length; i++) {
            for (let j: number = i + 1; j < cars.length; j++) {
                if (cars[i] !== cars[j] && this.isInCollision(cars[i], cars[j])) {
                    this.handleCollision(cars[i], cars[j]);
                }
            }
            this.manageTrackCollision(cars[i], trackSegments, trackWidth);
        }
    }

    public isInCollision(car1: Car, car2: Car): boolean {
        return car1.BoundingBox.intersectsBox(car2.BoundingBox);
    }

    private handleCarCollision(car1: Car, car2: Car): void {
        const initialVelocity1: Vector3 = car1.speed;
        const initialVelocity2: Vector3 = car2.speed;

        const rotationMatrix1: Matrix4 = new Matrix4();
        const rotationMatrix2: Matrix4 = new Matrix4();
        rotationMatrix1.extractRotation(car1.mesh.matrix);
        rotationMatrix2.extractRotation(car2.mesh.matrix);

        const rotationQuaternion1: Quaternion = new Quaternion();
        const rotationQuaternion2: Quaternion = new Quaternion();
        rotationQuaternion1.setFromRotationMatrix(rotationMatrix1);
        rotationQuaternion2.setFromRotationMatrix(rotationMatrix2);

        initialVelocity1.applyMatrix4(rotationMatrix1);
        initialVelocity2.applyMatrix4(rotationMatrix2);

        const finalVelocity1: Vector3 = initialVelocity2.multiplyScalar(car2.mass * 2 / (car1.mass + car2.mass));
        const finalVelocity2: Vector3 = initialVelocity1.multiplyScalar(car1.mass * 2 / (car1.mass + car2.mass));

        finalVelocity1.applyQuaternion(rotationQuaternion1.inverse());
        finalVelocity2.applyQuaternion(rotationQuaternion2.inverse());

        car1.speed = finalVelocity1;
        car2.speed = finalVelocity2;
    }

    public manageTrackCollision(car: Car, trackSegments: LineCurve[], trackWidth: number): void {
        let segmentIndex: number = -1;
        let smallestDistance: number = Infinity;
        let distance: number;

        for (let i: number = 0; i < trackSegments.length; i++) {
            distance = this.distanceToSegment(car.getPosition(), trackSegments[i]);
            if (distance < smallestDistance && this.isBetweenPoints(car.getPosition(), trackSegments[i])) {
                smallestDistance = distance;
                segmentIndex = i;
            }
        }

        if (smallestDistance >= trackWidth / 2 && segmentIndex !== -1) {
            this.handleTrackCollision(car, trackSegments[segmentIndex]);
            delay(2000);
        } else if (segmentIndex === -1) {
            for (let i: number = 0; i < trackSegments.length; i++) {
                distance = this.distanceToCorner(car.getPosition(), trackSegments[i].v1);
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    segmentIndex = i;
                }
            }

            if (smallestDistance >= trackWidth / 2 && segmentIndex !== -1) {
                this.handleCornerCollision(car, trackSegments[segmentIndex]);
                delay(2000);
            }
        }
    }

    public distanceToSegment(carPosition: Vector2, trackSegment: LineCurve): number {
        const deltaY: number = trackSegment.v2.y - trackSegment.v1.y;
        const deltaX: number = trackSegment.v2.x - trackSegment.v1.x;

        return Math.abs(deltaY * carPosition.x - deltaX * carPosition.y
                        + trackSegment.v2.x * trackSegment.v1.y
                        - trackSegment.v2.y * trackSegment.v1.x) /
               Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2));
    }

    public distanceToCorner(carPosition: Vector2, cornerPosition: Vector2): number {
        return Math.abs(Math.sqrt(Math.pow((carPosition.x - cornerPosition.x), 2) +
                                  Math.pow((carPosition.y - cornerPosition.y), 2)));
    }

    /*public isBetweenPoints(carPosition: Vector2, trackSegment: LineCurve): boolean {
        return carPosition.x > Math.min(trackSegment.v2.x, trackSegment.v1.x) &&
               carPosition.x < Math.max(trackSegment.v2.x, trackSegment.v1.x) &&
               carPosition.y < Math.max(trackSegment.v2.y, trackSegment.v1.y) &&
               carPosition.y > Math.min(trackSegment.v2.y, trackSegment.v1.y);
    }*/

    public isBetweenPoints(p: Vector2, trackSegment: LineCurve): boolean {
        const e1: Vector2 = new Vector2(trackSegment.v2.x - trackSegment.v1.x, trackSegment.v2.y - trackSegment.v1.y);
        const recArea: number = Math.pow(e1.x, 2) + Math.pow(e1.y, 2);
        const e2: Vector2 = new Vector2(p.x - trackSegment.v1.x, p.y - trackSegment.v1.y);
        const val: number = e1.x * e2.x + e1.y * e2.y;

        return (val > 0 && val < recArea);
    }

    public getPositiveAngle(vector: Vector2): number {
        let angle: number = Math.atan2(vector.y, vector.x);
        if (angle < 0) {
            angle += Math.PI * 2;
        }

        return angle;
    }

    private handleTrackCollision(car: Car, trackSegment: LineCurve): void {
        const segmentDirection: Vector2 = new Vector2((trackSegment.v2.x - trackSegment.v1.x),
                                                      (trackSegment.v2.y - trackSegment.v1.y));
        const angle: number = this.getPositiveAngle(new Vector2(car.direction.z, car.direction.x)) -
                              this.getPositiveAngle(new Vector2(segmentDirection.x, segmentDirection.y));

        car.mesh.rotateY(this.findRotationAngle(angle));
        const finalVelocity: Vector3 = car.speed.normalize();
        finalVelocity.multiplyScalar(Math.min(15, car.speed.length()));
        car.speed = finalVelocity;
    }

    private handleCornerCollision(car: Car, trackSegment: LineCurve): void {
        const segmentDirection: Vector2 = new Vector2((trackSegment.v2.x - trackSegment.v1.x),
                                                      (trackSegment.v2.y - trackSegment.v1.y));
        const angle: number = this.getPositiveAngle(new Vector2(car.direction.z, car.direction.x)) -
                              this.getPositiveAngle(new Vector2(segmentDirection.x, segmentDirection.y));

        if ((angle > 0 && Math.abs(angle) < Math.PI) || (angle < 0 && !(Math.abs(angle) < Math.PI))) {
            car.mesh.rotateY(-1.5);
        } else {
            car.mesh.rotateY(1.5);
        }

        const finalVelocity: Vector3 = car.speed.normalize();
        finalVelocity.multiplyScalar(Math.min(15, car.speed.length()));
        car.speed = finalVelocity;
    }

    public findRotationAngle(angle: number): number {
        let sign: number = (angle > 0 && Math.abs(angle) < Math.PI)
                            || (angle < 0 && !(Math.abs(angle) < Math.PI)) ?
                            -1 : 1;
        let newAngle: number = Math.abs(angle);
        if (newAngle > Math.PI) {
            newAngle = Math.PI * 2 - newAngle;
        }
        if (newAngle > Math.PI / 2) {
            newAngle = Math.PI - newAngle;
            sign *= -1;
        }

        return sign * newAngle * 2;
    }
}
