import { Injectable } from "@angular/core";
import { Vector } from "../vector/vector";
import { PointCoordinates } from "./point-coordinates";

const MIN_ANGLE_IN_DEGREE: number = 45;
const DEFAULT_TRACK_WIDTH: number = 60;

@Injectable()
export class ConstraintService {

    public createArrayVector(arrayPointCoordinates: PointCoordinates[]): Vector[] {
        const arrayVector: Vector[] = [];

        for (let i: number = 0; i < arrayPointCoordinates.length - 1; i++) {
            const newVector: Vector = new Vector(arrayPointCoordinates[i], arrayPointCoordinates[i + 1]);
            arrayVector.push(newVector);
        }

        return arrayVector;
    }

    public verifyAngle(firstVector: Vector, secondVector: Vector): boolean {
        return firstVector.calculateAngle(secondVector) >= MIN_ANGLE_IN_DEGREE;
    }

    public verifyIsIntersecting(firstVector: Vector, secondVector: Vector): boolean {
        return (!firstVector.isParallel(secondVector))
            && firstVector.pointIsInCommunDomain(firstVector.calculateVectorIntersection(secondVector), secondVector);

    }

    public verifyLength(segment: Vector, width: number): boolean {
        return (segment.calculateVectorLenght() >= width * 2);
    }

    public isLoopClosed(myPointArray: PointCoordinates[]): boolean {
        return (myPointArray.length > 2 &&
            myPointArray[0].X === myPointArray[myPointArray.length - 1].X &&
            myPointArray[0].Y === myPointArray[myPointArray.length - 1].Y);
    }

    public angleBooleanArray(myPointArray: PointCoordinates[]): boolean[] {
        const vectors: Vector[] = this.createArrayVector(myPointArray);
        const myBooleanArray: boolean[] = [];

        for (let i: number = 0; i < vectors.length - 1; i++) {
            myBooleanArray.push(this.verifyAngle(vectors[i], vectors[i + 1]));
        }
        if (this.isLoopClosed(myPointArray)) {
            myBooleanArray.push(this.verifyAngle(vectors[vectors.length - 1], vectors[0]));
        }

        return myBooleanArray;
    }

    public intersectionBooleanArray(myPointArray: PointCoordinates[]): boolean[] {
        const myVector: Vector[] = this.createArrayVector(myPointArray);
        const myBooleanArray: boolean[] = myPointArray.map(() => {
            return true;
        });

        for (let i: number = 0; i < myVector.length; i++) {
            for (let j: number = i + 2; j < myVector.length; j++) {
                if (!(i === 0 && j === myVector.length - 1 && this.isLoopClosed(myPointArray)) &&
                    this.verifyIsIntersecting(myVector[i], myVector[j])) {
                    myBooleanArray[i] = myBooleanArray[j] = false;
                }
            }
        }

        return myBooleanArray;
    }

    public lengthBooleanArray(myPointArray: PointCoordinates[]): boolean[] {
        const vectors: Vector[] = this.createArrayVector(myPointArray);
        const myBooleanArray: boolean[] = [];

        for (const vector of vectors) {
            myBooleanArray.push(this.verifyLength(vector, DEFAULT_TRACK_WIDTH));
        }

        return myBooleanArray;
    }
}
