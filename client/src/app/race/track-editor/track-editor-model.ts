import { PointCoordinates } from "./point-coordinates";

/*Classe qui s'occuppe de manipuler le tableau de points.
C'est notre modèle.*/

export class TrackEditorModel {
    private pointArray: PointCoordinates[];

    public constructor() {
        this.pointArray = [];
    }

    public get PointArray(): PointCoordinates[] {
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
            this.pointArray[index].X = mouseCoordinates.X;
            this.pointArray[index].Y = mouseCoordinates.Y;
        }
    }

    public addPoint(point: PointCoordinates): void {
        if (!this.loopIsClosed()) {
            this.pointArray.push(point);
            this.removePointsTooClose();
        }
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
        if (this.pointArray.length > MINIMUM_ARRAY_LENGTH) {
            // We begin with the first point because the first point when
            // the loop is not closed and with the first point when the
            // loop is not closed
            for (let i: number = this.loopIsClosed() ? 1 : 0; i < this.pointArray.length - 1; i++) {
                for (let j: number = i + 1; j < this.pointArray.length; j++) {
                    if (this.pointArray[i].isTooClose(this.pointArray[j])) {
                        this.pointArray.splice(this.pointArray.indexOf(this.pointArray[j]), 1);
                    }
                }
            }
        }
    }

    public loopIsClosed(): boolean {
        const MINIMUM_ARRAY_LENGTH: number = 3;

        return (this.pointArray.length >= MINIMUM_ARRAY_LENGTH &&
            (this.pointArray[this.pointArray.length - 1]).equals(this.pointArray[0]));
    }

    public closeLoop(): void {
        if (this.getPointArrayLength() >= 2) {
            const point: PointCoordinates = new PointCoordinates(this.pointArray[0].X, this.pointArray[0].Y);
            this.pointArray.push(point);
        }
    }

    public clickedOnExistingPoint(mouseCoordinates: PointCoordinates): boolean {
        for (const point of this.pointArray) {
            const ACCEPTED_RADIUS: number = 20;
            if (mouseCoordinates.X >= point.X - ACCEPTED_RADIUS && mouseCoordinates.X <= point.X + ACCEPTED_RADIUS &&
                mouseCoordinates.Y >= point.Y - ACCEPTED_RADIUS && mouseCoordinates.Y <= point.Y + ACCEPTED_RADIUS) {
                return true;
            }
        }

        return false;
    }

    public clickedOnFirstPoint(mouseCoordinates: PointCoordinates): boolean {
        const ACCEPTED_RADIUS: number = 10;

        return (mouseCoordinates.X <= this.pointArray[0].X + ACCEPTED_RADIUS && mouseCoordinates.X >=
            this.pointArray[0].X - ACCEPTED_RADIUS) &&
            (mouseCoordinates.Y <= this.pointArray[0].Y + ACCEPTED_RADIUS && mouseCoordinates.Y >=
            this.pointArray[0].Y - ACCEPTED_RADIUS);
    }

    public allConstraintPass(angleConstraints: boolean[], intersectionConstraints: boolean[], lengthConstraints: boolean[]): boolean {
        let constraintRespected: boolean = this.loopIsClosed();

        if (constraintRespected) {
            for (const angleConstraint of angleConstraints) {
                constraintRespected = constraintRespected && angleConstraint;
            }
            for (const intersectionConstraint of intersectionConstraints) {
                constraintRespected = constraintRespected && intersectionConstraint;
            }
            for (const lengthConstraint of lengthConstraints) {
                constraintRespected = constraintRespected && lengthConstraint;
            }
        }

        return constraintRespected;
    }
}
