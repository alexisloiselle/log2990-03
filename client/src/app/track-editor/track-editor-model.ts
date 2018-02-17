import { PointCoordinates } from "./pointCoordinates";


/*Classe qui s'occuppe de manipuler le tableau de points.
C'est notre modèle.*/

export class TrackEditorModel {
    private pointArray: PointCoordinates[] = [];

    public getPointArray(): PointCoordinates[] {
        return this.pointArray;
    }

    public getPointArrayLength(): number {
        return this.pointArray.length;
    }

    public getSinglePoint(index: number): PointCoordinates {
        if (index >= 0 && index < this.pointArray.length) {
            return this.pointArray[index];
        }

        return new PointCoordinates(-1, -1);
    }

    public setPointCoordinates(index: number, mouseCoordinates: PointCoordinates): void {
        if (index >= 0 && index < this.pointArray.length) {
            this.pointArray[index].setX(mouseCoordinates.getX());
            this.pointArray[index].setY(mouseCoordinates.getY());
        }
    }

    public addPoint(point: PointCoordinates): void {
        this.pointArray.push(point);
        this.removePointsTooClose();
    }

    public eraseLastPoint(): void {
        if (this.pointArray.length >= 1) {
            this.pointArray.splice(this.pointArray.length - 1);
        }
    }

    // We remove the points potentially duplicated by the drag N drop and
    // the points that are too close to each other
    public removePointsTooClose(): void {
        const MINIMUM_ARRAY_LENGTH: number = 2;
        const MINIMUM_RADIUS: number = 20;
        if (this.pointArray.length > MINIMUM_ARRAY_LENGTH) {
            // We begin with the first point because the first point will
            // have the last point on it when the loop is closed
            for (let i: number = 1; i < this.pointArray.length - 1; i++) {
                for (let j: number = i + 1; j < this.pointArray.length; j++) {
                    if (this.pointArray[j].getX() >= this.pointArray[i].getX() - MINIMUM_RADIUS &&
                        this.pointArray[j].getX() <= this.pointArray[i].getX() + MINIMUM_RADIUS &&
                        this.pointArray[j].getY() >= this.pointArray[i].getY() - MINIMUM_RADIUS &&
                        this.pointArray[j].getY() <= this.pointArray[i].getY() + MINIMUM_RADIUS) {
                        this.pointArray.splice(this.pointArray.indexOf(this.pointArray[j]), 1);
                    }
                }
            }
        }
    }

    public loopIsClosed(): boolean {
        const MINIMUM_ARRAY_LENGTH: number = 3;
        if (this.pointArray.length >= MINIMUM_ARRAY_LENGTH) {
            if (this.pointArray[this.pointArray.length - 1].equals(this.pointArray[0])) {
                return true;
            }
        }

        return false;
    }

    public closeLoop(): void {
      if (this.getPointArrayLength() >= 2) {
        const point: PointCoordinates = new PointCoordinates(this.pointArray[0].getX(), this.pointArray[0].getY());
        this.pointArray.push(point);
      }
    }

    public clickedOnExistingPoint(mouseCoordinates: PointCoordinates): boolean {
        for (const point of this.pointArray) {
            const ACCEPTED_RADIUS: number = 20;
            if (mouseCoordinates.getX() >= point.getX() - ACCEPTED_RADIUS && mouseCoordinates.getX() <= point.getX() + ACCEPTED_RADIUS &&
                mouseCoordinates.getY() >= point.getY() - ACCEPTED_RADIUS && mouseCoordinates.getY() <= point.getY() + ACCEPTED_RADIUS) {
                return true;
            }
        }

        return false;
    }

    public clickedOnFirstPoint(mouseCoordinates: PointCoordinates): boolean {
        const ACCEPTED_RADIUS: number = 10;
        if ((mouseCoordinates.getX() <= this.pointArray[0].getX() + ACCEPTED_RADIUS && mouseCoordinates.getX() >=
            this.pointArray[0].getX() - ACCEPTED_RADIUS) &&
            (mouseCoordinates.getY() <= this.pointArray[0].getY() + ACCEPTED_RADIUS && mouseCoordinates.getY() >=
            this.pointArray[0].getY() - ACCEPTED_RADIUS)) {
            return true;
        }

        return false;
    }

    public allConstraintPass(angleConstraintsBoolean: boolean[], intersectionConstraintsBoolean: boolean[]): boolean {
      if (!this.loopIsClosed()) {
        return false;
      }
      for (const angleConstraint of angleConstraintsBoolean) {
        if (!angleConstraint) {
          return false;
        }
      }
      for (const intersectionConstraint of intersectionConstraintsBoolean) {
        if (!intersectionConstraint) {
          return false;
        }
      }

      return true;
    }
}
