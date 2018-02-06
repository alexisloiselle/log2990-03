import { PointCoordinates } from "./pointCoordinates";
import { TrackEditorModel } from "./track-editor-model";

// import { equation } from "./vector/equation";
import { Vector } from "./vector/vector";

describe("TrackEditorComponent", () => {
  describe("vectorClass", () => {
    const pointStart: PointCoordinates = new PointCoordinates(2, 6);
    const pointEnd: PointCoordinates = new PointCoordinates(1, 3);
    const vectorTest: Vector = new Vector(pointStart, pointEnd);

    it("Should Create slope", () => {
      expect(vectorTest.getSlope()).toBe(3);
    });

    it("Should Create constant", () => {
      expect(vectorTest.getConstant()).toBe(0);
    });

    it("Should calculate domain MaxDomainX", () => {
      expect(vectorTest.findMaxDomain(pointStart, pointEnd).getX()).toBe(
        pointStart.getX()
      );
    });

    it("Should calculate domain MinDomainX", () => {
      expect(vectorTest.findMinDomain(pointStart, pointEnd).getX()).toBe(
        pointEnd.getX()
      );
    });

    it("Should calculate domain MaxDomainY", () => {
      expect(vectorTest.findMaxDomain(pointStart, pointEnd).getY()).toBe(
        pointStart.getY()
      );
    });

    it("Should calculate domain MinDomainY", () => {
      expect(vectorTest.findMinDomain(pointStart, pointEnd).getY()).toBe(
        pointEnd.getY()
      );
    });

    it("minDomainX should be assigned to vector at construction", () => {
      expect(vectorTest.getDomainXMin()).toBe(1);
    });

    it("minDomainY should be assigned to vector at construction", () => {
      expect(vectorTest.getDomainXmax()).toBe(2);
    });

    it("maxDomainY should be assigned to vector at construction", () => {
      expect(vectorTest.getDomainYMin()).toBe(3);
    });

    it("maxDomainY should be assigned to vector at construction", () => {
      expect(vectorTest.getDomainYmax()).toBe(6);
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
      myTrackModel2.removeDuplicatedPoints();
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
