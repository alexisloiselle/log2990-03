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
    }

    public eraseLastPoint(): void {
        if (this.pointArray.length >= 1) {
            this.pointArray.splice(this.pointArray.length - 1);
        }
    }

    // On enlève les points potentiellement dupliqués par le drag and drop
    public removeDuplicatedPoints(): void {
        if (this.pointArray.length > 2) {
          // On commence à partir du deuxième point, car de toute façon le point
          // d'origine aura le dernier point qui se superposera à lui.
          for (let i: number = 1; i < this.pointArray.length - 1; i++) {
            for (let j: number = i + 1; j < this.pointArray.length; j++) {
              if (this.pointArray[i].getX() === this.pointArray[j].getX() &&
                  this.pointArray[i].getY() === this.pointArray[j].getY()) {
                  this.pointArray.splice(this.pointArray.indexOf(this.pointArray[j]), 1);
                }
            }
          }
        }
      }

    public loopIsClosed(): boolean {
        if (this.pointArray.length >= 3) {
            if (this.pointArray[this.pointArray.length - 1].getX() === this.pointArray[0].getX() &&
               this.pointArray[this.pointArray.length - 1].getY() === this.pointArray[0].getY()) {
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
            if (mouseCoordinates.getX() >= point.getX() - 20 && mouseCoordinates.getX() <= point.getX() + 20 &&
                mouseCoordinates.getY() >= point.getY() - 20 && mouseCoordinates.getY() <= point.getY() + 20) {
                  return true;
              }
          }

        return false;
    }

    public clickedOnFirstPoint(mouseCoordinates: PointCoordinates): boolean {
        if ((mouseCoordinates.getX() <= this.pointArray[0].getX() + 10 && mouseCoordinates.getX() >= this.pointArray[0].getX() - 10) &&
           (mouseCoordinates.getY() <= this.pointArray[0].getY() + 10 && mouseCoordinates.getY() >= this.pointArray[0].getY() - 10) ) {
            return true;
        }

        return false;
    }
}
