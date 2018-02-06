import { Injectable } from "@angular/core";
// import { TrackEditorComponent } from "./track-editor.component";
import { Vector } from "./vector/vector";
import { PointCoordinates } from "./pointCoordinates";

const MIN_ANGLE_IN_RADIAN: number = (45 / 180) * Math.PI;
@Injectable()
export class TrackEditorConstraintService {

    public verifyAngle(firstVector: Vector, secondVector: Vector): boolean {
        return firstVector.calculateAngle(secondVector) >= MIN_ANGLE_IN_RADIAN;
    }

    public verifyIsIntersecting(firstVector: Vector, secondVector: Vector): boolean {
        const intersectionPoint: PointCoordinates = firstVector.calculateVectorIntersection(secondVector);
        return !(firstVector.isParallel(secondVector))
            && firstVector.pointIsInCommunDomain(intersectionPoint, secondVector);
    }

    public allConstraintPass(firstVector: Vector, secondVector: Vector): boolean {
        return this.verifyAngle(firstVector, secondVector) 
            && !this.verifyIsIntersecting(firstVector, secondVector);

    }
}
