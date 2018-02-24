import { Injectable } from "@angular/core";
import { Vector } from "./vector/vector";
import { PointCoordinates } from "./point-coordinates";

const MIN_ANGLE_IN_DEGREE: number = 45;
@Injectable()
export class TrackEditorConstraintService {

    public createArrayVector(arrayPointCoordinates: PointCoordinates[]): Vector[] { // a tester
        const arrayVector: Vector[] = []; // mis const a cause de tslint
        for (let i: number = 0; i < arrayPointCoordinates.length - 1; i++) { // 2 pour ne pas lire la derniere case du array
            const newVector: Vector = new Vector(arrayPointCoordinates[i], arrayPointCoordinates[i + 1]);
            arrayVector.push(newVector);
        }

        return arrayVector;
    }

    public verifyAngle(firstVector: Vector, secondVector: Vector): boolean {
        return firstVector.calculateAngle(secondVector) >= MIN_ANGLE_IN_DEGREE;
    }

    public verifyIsIntersecting(firstVector: Vector, secondVector: Vector): boolean {
        const intersectionPoint: PointCoordinates = firstVector.calculateVectorIntersection(secondVector);

        return (!firstVector.isParallel(secondVector))
            && firstVector.pointIsInCommunDomain(intersectionPoint, secondVector);

    }
    public loopIsClosed(myPointArray: PointCoordinates[]): boolean {
        return (myPointArray.length >= 3 &&
            myPointArray[0].X === myPointArray[myPointArray.length - 1].X &&
            myPointArray[0].Y === myPointArray[myPointArray.length - 1].Y);
    }

    public angleBooleanArray(myPointArray: PointCoordinates[]): boolean[] {
        const myVector: Vector[] = this.createArrayVector(myPointArray);
        const myBooleanArray: boolean[] = [];

        for (let i: number = 0; i < myVector.length - 1; i++) {
            myBooleanArray.push(this.verifyAngle(myVector[i], myVector[i + 1]));
        }
        if (this.loopIsClosed(myPointArray)) {
            myBooleanArray.push(this.verifyAngle(myVector[myVector.length - 1], myVector[0]));
        }

        return myBooleanArray;
    }

    public intersectionBooleanArray(myPointArray: PointCoordinates[]): boolean[] {
        const myVector: Vector[] = this.createArrayVector(myPointArray);
        const myBooleanArray: boolean[] = [];
        // Initialisation of the boolean array
        for (let i: number = 0; i < myVector.length; i++) {
            myBooleanArray.push(true);
        }

        for (let i: number = 0; i < myVector.length; i++) {
            // j = i+2 and not i+1 because two consecutive vectors obviously intersect each other
            for (let j: number = i + 2; j < myVector.length; j++) {
                if (!(i === 0 && j === myVector.length - 1 && this.loopIsClosed(myPointArray))) {
                    if (this.verifyIsIntersecting(myVector[i], myVector[j])) {
                        myBooleanArray[i] = false;
                        myBooleanArray[j] = false;
                    }
                }
            }
        }

        return myBooleanArray;
    }
}
