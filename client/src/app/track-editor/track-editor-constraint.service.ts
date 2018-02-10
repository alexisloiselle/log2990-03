import { Injectable } from "@angular/core";
// import { TrackEditorComponent } from "./track-editor.component";
import { Vector } from "./vector/vector";
import { PointCoordinates } from "./pointCoordinates";

const MIN_ANGLE_IN_DEGREE: number = 45;
@Injectable()
export class TrackEditorConstraintService {

  public createArrayVector(arrayPointCoordinates: PointCoordinates[]): Vector[] { // a tester
    const arrayVector: Vector[] = []; // mis const a cause de tslint
    for (let i: number = 0 ; i < arrayPointCoordinates.length - 1 ; i++ ) { // 2 pour ne pas lire la derniere case du array
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

      return ((!(firstVector.isParallel(secondVector)))
          && firstVector.pointIsInCommunDomain(intersectionPoint, secondVector));

  }

  public allConstraintPass(myPointArray: PointCoordinates[]): void {
    const myVector: Vector[] = this.createArrayVector(myPointArray);
    const myBooleanArray: boolean[] = [];

    for (let i = 0; i < myVector.length - 1 ; i++) {
      if (this.verifyAngle(myVector[i], myVector[i + 1])) {
        myBooleanArray.push(true);
      } else {
        myBooleanArray.push(false);
      }
    }

    console.log(myBooleanArray);
    // return this.verifyAngle(firstVector, secondVector)
    //    && !this.verifyIsIntersecting(firstVector, secondVector);

  }
}
