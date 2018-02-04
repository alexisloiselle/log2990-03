import { Injectable } from '@angular/core';
import { TrackEditorComponent } from "./track-editor.component";
import {Vector} from "./vector/vector";
import { PointCoordinates } from './pointCoordinates';
@Injectable()
export class TrackEditorConstraintService {

    verifyAngle(firstVector: Vector, secondVector: Vector): boolean {
        if(firstVector.calculateAngle(secondVector)< Math.radian(45)){
            return false;
        }
        return true;
    }

    calculateVectorIntersection(firstVector: Vector, secondVector: Vector): PointCoordinates {

        // Calculer point d<intersection
        const xIntersection = (secondVector.getConstant() - firstVector.getConstant())/(firstVector.getSlope()-secondVector.getSlope()); // Peut etre faire 3 fonctions 1. Calculer Point d<intersection 2. Calculer domaine commun au 2 vector 3.Verification
        const yIntersection = xIntersection * firstVector.getSlope() + firstVector.getConstant();
        return (new PointCoordinates(xIntersection,yIntersection));
    
    }

}
