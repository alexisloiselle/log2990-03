import { Injectable } from "@angular/core";
import { Car } from "../car/car";
import { Vector3, Matrix4, Quaternion } from "three";

@Injectable()
export class CollisionService {

    public constructor() { }

    public checkForCollision(cars: Car[]): void {
        for (let i: number = 0; i < cars.length; i++) {
            for (let j: number = i + 1; j < cars.length; j++) {
                if (this.isInCollision(cars[i], cars[j])) {
                    this.handleCollision(cars[i], cars[j]);
                }
            }
        }
    }

    public isInCollision(car1: Car, car2: Car): boolean {
        return car1.BoundingBox.intersectsBox(car2.BoundingBox);
    }

    private handleCollision(car1: Car, car2: Car): void {
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
}
