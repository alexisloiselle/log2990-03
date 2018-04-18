import { Injectable } from "@angular/core";
import { Car } from "../car/car";
import { LineCurve, Vector2, Vector3, Matrix4, Quaternion } from "three";
import { SoundsService } from "../../render-service/sounds.service";
import { CAR_COLLISION_SOUND,
         WALL_COLLISION_SOUND } from "../../config";

const MIN_SPEED: number = 20;

@Injectable()
export class CollisionService {

    public constructor(private soundsService: SoundsService) { }

    public checkForCollision(cars: Car[], trackSegments: LineCurve[], trackWidth: number): void {
        for (let i: number = 0; i < cars.length; i++) {
            for (let j: number = i + 1; j < cars.length; j++) {
                if (cars[i] !== cars[j] && this.isInCollision(cars[i], cars[j])) {
                    this.handleCarCollision(cars[i], cars[j]);
                }
            }
            this.manageTrackCollision(cars[i], trackSegments, trackWidth);
        }
    }

    public isInCollision(car1: Car, car2: Car): boolean {
        return car1.BoundingBox.intersectsBox(car2.BoundingBox);
    }

    private handleCarCollision(car1: Car, car2: Car): void {
        this.soundsService.playSound(CAR_COLLISION_SOUND);
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

    public isOnTrackLimit(distance: number, trackWidth: number): boolean {
        const incertitude: number = 0.2;

        return distance > trackWidth / 2 - incertitude && distance < trackWidth / 2 + incertitude;
    }

    public manageTrackCollision(car: Car, trackSegments: LineCurve[], trackWidth: number): void {
        let index: number = -1;
        let smallestDistance: number = Infinity;
        let distance: number;

        for (let i: number = 0; i < trackSegments.length; i++) {
            distance = this.distanceToSegment(car.carGPS.getPosition(car.mesh), trackSegments[i]);
            if (distance < smallestDistance) {
                smallestDistance = distance;
                index = i;
            }
        }
        if (index !== -1 && this.isBetweenPoints(car.carGPS.getPosition(car.mesh), trackSegments[index])) {
            if (this.isOnTrackLimit(smallestDistance, trackWidth)) {
                this.handleTrackCollision(car, trackSegments[index], false);
            }
        } else {
            smallestDistance = Infinity;
            for (let i: number = 0; i < trackSegments.length; i++) {
                distance = car.carGPS.getPosition(car.mesh).distanceTo(trackSegments[i].v1);
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    index = i;
                }
            }
            if (this.isOnTrackLimit(smallestDistance, trackWidth)) {
                this.handleTrackCollision(car, trackSegments[index], true);
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

    public isBetweenPoints(point: Vector2, trackSegment: LineCurve): boolean {
        const e1: Vector2 = new Vector2(trackSegment.v2.x - trackSegment.v1.x, trackSegment.v2.y - trackSegment.v1.y);
        const e2: Vector2 = new Vector2(point.x - trackSegment.v1.x, point.y - trackSegment.v1.y);
        const val: number = e1.x * e2.x + e1.y * e2.y;

        return (val > 0 && val < Math.pow(e1.x, 2) + Math.pow(e1.y, 2));
    }

    private handleTrackCollision(car: Car, trackSegment: LineCurve, isCorner: boolean): void {
        this.soundsService.playSound(WALL_COLLISION_SOUND);
        const segmentDirection: Vector2 = new Vector2((trackSegment.v2.x - trackSegment.v1.x),
                                                      (trackSegment.v2.y - trackSegment.v1.y));
        const angle: number = this.getPositiveAngle(new Vector2(car.direction.z, car.direction.x)) -
                              this.getPositiveAngle(new Vector2(segmentDirection.x, segmentDirection.y));
        if (isCorner) {
            if ((angle > 0 && Math.abs(angle) < Math.PI) || (angle < 0 && !(Math.abs(angle) < Math.PI))) {
                car.mesh.rotateY(-Math.PI / 2);
            } else {
                car.mesh.rotateY(Math.PI / 2);
            }
        } else {
            car.mesh.rotateY(this.findRotationAngle(angle));
        }
        car.speed = car.speed.normalize().multiplyScalar(Math.max(MIN_SPEED, car.speed.length() / 2));
    }

    public getPositiveAngle(vector: Vector2): number {
        let angle: number = Math.atan2(vector.y, vector.x);
        if (angle < 0) {
            angle += Math.PI * 2;
        }

        return angle;
    }

    public findRotationAngle(angle: number): number {
        let sign: number = (angle > 0 && Math.abs(angle) < Math.PI) || (angle < 0 && !(Math.abs(angle) < Math.PI)) ?
                            -1 : 1;
        let newAngle: number = Math.abs(angle);
        if (newAngle > Math.PI) {
            newAngle = Math.PI * 2 - newAngle;
        }
        if (newAngle > Math.PI / 2) {
            newAngle = Math.PI - newAngle;
            sign *= -1;
        }
        // tslint:disable-next-line:no-magic-numbers
        if (newAngle < Math.PI / 8) {
            newAngle *= 2;
        }

        return sign * newAngle * 2;
    }
}
