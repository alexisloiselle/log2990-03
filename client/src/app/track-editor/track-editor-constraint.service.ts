import { Injectable } from '@angular/core';
import { TrackEditorComponent } from "./track-editor.component";
import {Vector} from "./vector/vector";
import { PointCoordinates } from './pointCoordinates';
@Injectable()
export class TrackEditorConstraintService {

    private verifyAngle(firstVector: Vector, secondVector: Vector): boolean {
        if(firstVector.calculateAngle(secondVector) < Math.radian(45)){
            return false;
        }
        return true;
    }

  

    private verifyIsIntersecting(firstVector: Vector, secondVector: Vector){
        if(!(firstVector.isParallel(secondVector))) {
            const intersectionPoint = firstVector.calculateVectorIntersection(secondVector);
            if (!firstVector.pointIsInCommunDomain(intersectionPoint, secondVector)){
                return false;

            }
            return true;

        }
        return false;
        
    } 
    
    public allConstraintPass(firstVector: Vector, secondVector: Vector): boolean {
    if(this.verifyAngle(firstVector,secondVector) && this.verifyIsIntersecting(firstVector,secondVector)){
        return true;
    }
    return false;

    }
}
