
<<<<<<< HEAD
<<<<<<< HEAD
import { PointCoordinates } from "./pointCoordinates";
import { TrackEditorModel } from "./track-editor-model";
=======
import { pointCoordinates } from "./pointCoordinates";
>>>>>>> a5781d27561c61998d3b732403291cc995672615
=======
import { pointCoordinates } from "./pointCoordinates";
>>>>>>> track-editor
// import { equation } from "./vector/equation";
import { Vector } from "./vector/vector";

describe("TrackEditorComponent", () => {

  describe("vectorClass", () => {

    const pointStart: pointCoordinates = new pointCoordinates(2, 6);
    const pointEnd: pointCoordinates = new pointCoordinates (1, 3);
    const vectorTest: Vector = new Vector(pointStart, pointEnd);

    it("Should Create slope", () => {
      expect(vectorTest.getSlope()).toBe(3);
    });

    it("Should Create constant", () => {
      expect(vectorTest.getConstant()).toBe(0);
    });

    it("Should calculate domain MaxDomainX", () => {
      expect(vectorTest.findMaxDomain(pointStart, pointEnd).getX()).toBe(pointStart.getX());
    });

    it("Should calculate domain MinDomainX", () => {
      expect(vectorTest.findMinDomain(pointStart, pointEnd).getX()).toBe(pointEnd.getX());
    });

    it("Should calculate domain MaxDomainY", () => {
      expect(vectorTest.findMaxDomain(pointStart, pointEnd).getY()).toBe(pointStart.getY());
    });

    it("Should calculate domain MinDomainY", () => {
      expect(vectorTest.findMinDomain(pointStart, pointEnd).getY()).toBe(pointEnd.getY());
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
<<<<<<< HEAD
<<<<<<< HEAD

=======
  /*
>>>>>>> a5781d27561c61998d3b732403291cc995672615
=======
  /*
>>>>>>> track-editor
  describe("trackEditor", () => {
    const myTrackModel1: TrackEditorModel = new TrackEditorModel;
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

<<<<<<< HEAD
    it("Should Remove a point.", () => {
      myTrackModel1.eraseLastPoint();
      expect(myTrackModel1.getPointArrayLength()).toBe(0);
    });
<<<<<<< HEAD

    const myTrackModel2: TrackEditorModel = new TrackEditorModel;
   

    it("Should remove a duplicated point.", () => {
      myTrackModel2.addPoint(point1);
      myTrackModel2.addPoint(point2);
      myTrackModel2.addPoint(point3);
      myTrackModel2.addPoint(point3);
      myTrackModel2.addPoint(point4);
      myTrackModel2.addPoint(point5);
      myTrackModel2.removeDuplicatedPoints();
      console.log(myTrackModel2.getPointArray());
      expect(myTrackModel2.getPointArrayLength()).toBe(5);
    });


    // myTrackmodel.addPoint(point1);
    // myTrackmodel.addPoint(point2);
    // myTrackmodel.addPoint(point3);
    // myTrackmodel.addPoint(point3);
    // myTrackmodel.addPoint(point4);
    // myTrackmodel.addPoint(point5);
    // it("Should remove the duplicated point 3.", () => {
    //   myTrackmodel.removeDuplicatedPoints();
    //   expect(myTrackmodel.getPointArrayLength()).toBe(5);
    // });
=======
=======
<<<<<<< HEAD
    // it("Should create an empty pointCoordinates array.", () =>{
    //   expect(myTrackEditor.getPointArray()).toBeDefined();
    // });

    
   // myTrackEditor.canvasDrawPoint()

  });

=======
    it("Should create an empty pointCoordinates array.", () =>{
      expect(myTrackEditor.getPointArray()).toBeDefined();
    });
>>>>>>> track-editor
    myTrackEditor.canvasDrawPoint()
>>>>>>> a5781d27561c61998d3b732403291cc995672615

  });
  */
<<<<<<< HEAD
=======
>>>>>>> track-editor
>>>>>>> track-editor
});
