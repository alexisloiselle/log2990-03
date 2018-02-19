/* tslint:disable:no-magic-numbers */
import { PointCoordinates } from "./pointCoordinates";
// import { equation } from "./vector/equation";
import { Vector } from "./vector/vector";
// import { TrackEditorComponent} from "./track-editor.component";
import { TrackEditorModel } from "./track-editor-model";

describe("TrackEditorComponent", () => {
    describe("vectorClass", () => {
        const pointStart: PointCoordinates = new PointCoordinates(2, 6);
        const pointEnd: PointCoordinates = new PointCoordinates(1, 3);
        const vectorTest: Vector = new Vector(pointStart, pointEnd);

        it("Should Create slope", () => {
            const EXPECTED_SLOPE: number = 3;
            expect(vectorTest.Slope).toBe(EXPECTED_SLOPE);
        });

        it("Should Create constant", () => {
            const EXPECTED_CONSTANT: number = 0;
            expect(vectorTest.Constant).toBe(EXPECTED_CONSTANT);
        });

        it("Should calculate domain MaxDomainX", () => {
            expect(vectorTest.findMaxDomain(pointStart, pointEnd).X).toBe(pointStart.X);
        });

        it("Should calculate domain MinDomainX", () => {
            expect(vectorTest.findMinDomain(pointStart, pointEnd).X).toBe(pointEnd.X);
        });

        it("Should calculate domain MaxDomainY", () => {
            expect(vectorTest.findMaxDomain(pointStart, pointEnd).Y).toBe(pointStart.Y);
        });

        it("Should calculate domain MinDomainY", () => {
            expect(vectorTest.findMinDomain(pointStart, pointEnd).Y).toBe(pointEnd.Y);
        });

        it("minDomainX should be assigned to vector at construction", () => {
            const EXPECTED_DOMAIN_X_MIN: number = 1;
            expect(vectorTest.DomainXMin).toBe(EXPECTED_DOMAIN_X_MIN);
        });

        it("minDomainY should be assigned to vector at construction", () => {
            const EXPECTED_DOMAIN_X_MAX: number = 2;
            expect(vectorTest.DomainXmax).toBe(EXPECTED_DOMAIN_X_MAX);
        });

        it("maxDomainY should be assigned to vector at construction", () => {
            const EXPECTED_DOMAIN_Y_MIN: number = 3;
            expect(vectorTest.DomainYMin).toBe(EXPECTED_DOMAIN_Y_MIN);
        });

        it("maxDomainY should be assigned to vector at construction", () => {
            const EXPECTED_DOMAIN_Y_MAX: number = 6;
            expect(vectorTest.DomainYmax).toBe(EXPECTED_DOMAIN_Y_MAX);
        });
    });

    describe("trackEditor", () => {
        const myTrackModel1: TrackEditorModel = new TrackEditorModel();
        const point1: PointCoordinates = new PointCoordinates(30, 30);
        const point2: PointCoordinates = new PointCoordinates(20, 20);
        const point3: PointCoordinates = new PointCoordinates(100, 55);
        const point4: PointCoordinates = new PointCoordinates(45, 70);
        const point5: PointCoordinates = new PointCoordinates(120, 120);
        // const point6: PointCoordinates = new PointCoordinates(30, 30);
        // const point7: PointCoordinates = new PointCoordinates(30, 30);
        // const point8: PointCoordinates = new PointCoordinates(30, 30);
        // const point9: PointCoordinates = new PointCoordinates(30, 30);
        // const point10: PointCoordinates = new PointCoordinates(30, 30);
        // const point11: PointCoordinates = new PointCoordinates(30, 30);

        it("Should add a point.", () => {
            myTrackModel1.addPoint(point1);
            expect(myTrackModel1.getPointArrayLength()).toBe(1);
        });

        const myTrackModel2: TrackEditorModel = new TrackEditorModel();

        it("Should remove a duplicated point.", () => {
            myTrackModel2.addPoint(point1);
            myTrackModel2.addPoint(point2);
            myTrackModel2.addPoint(point3);
            myTrackModel2.addPoint(point3);
            myTrackModel2.addPoint(point4);
            myTrackModel2.addPoint(point5);
            myTrackModel2.addPoint(point5);
            myTrackModel2.removePointsTooClose();
            expect(myTrackModel2.getPointArrayLength()).toBe(5);
        });

        const myTrackModel3: TrackEditorModel = new TrackEditorModel();

        it("The loop should be closed.", () => {
            myTrackModel3.addPoint(point1);
            myTrackModel3.addPoint(point2);
            myTrackModel3.addPoint(point3);
            myTrackModel3.addPoint(point4);
            myTrackModel3.addPoint(point5);
            myTrackModel3.addPoint(point1);
            expect(myTrackModel3.loopIsClosed()).toBe(true);
        });

        it("Should erase the last point", () => {
            myTrackModel3.eraseLastPoint();
            myTrackModel3.eraseLastPoint();
            expect(myTrackModel3.getPointArrayLength()).toBe(4);
        });
    });
});
