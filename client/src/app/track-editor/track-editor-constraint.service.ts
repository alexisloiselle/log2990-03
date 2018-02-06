import { Injectable } from '@angular/core';
// import { TrackEditorComponent } from "./track-editor.component";
import {Vector} from "./vector/vector";
import { PointCoordinates } from "./pointCoordinates";

const MIN_ANGLE_IN_RADIAN: number = (45 / 180) * Math.PI;
@Injectable()
export class TrackEditorConstraintService {

    private verifyAngle(firstVector: Vector, secondVector: Vector): boolean {
        if (firstVector.calculateAngle(secondVector) < MIN_ANGLE_IN_RADIAN) {
            return false;
        }

        return true;
    }

    private verifyIsIntersecting(firstVector: Vector, secondVector: Vector): boolean {
        if (!(firstVector.isParallel(secondVector))) {
            const intersectionPoint: PointCoordinates = firstVector.calculateVectorIntersection(secondVector);
            if (!firstVector.pointIsInCommunDomain(intersectionPoint, secondVector)) {
                return false;

            }

            return true;

        }

        return false;
    }

<<<<<<< HEAD
=======

>>>>>>> track-editor
    public allConstraintPass(firstVector: Vector, secondVector: Vector): boolean {
    if (this.verifyAngle(firstVector, secondVector) && this.verifyIsIntersecting(firstVector, secondVector)){
        return true;
    }

    return false;

    }
}
