
import { PointCoordinates } from "./pointCoordinates";
// import { equation } from "./vector/equation";
import { Vector } from "./vector/vector";
import { TrackEditorComponent} from "./track-editor.component";

describe("TrackEditorComponent", () => {

  describe("vectorClass", () => {

    const pointStart: PointCoordinates = new PointCoordinates(2, 6);
    const pointEnd: PointCoordinates = new PointCoordinates (1, 3);
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
  
  describe("trackEditor", () => {
    let myTrackEditor :TrackEditorComponent = new TrackEditorComponent;

    // it("Should create an empty pointCoordinates array.", () =>{
    //   expect(myTrackEditor.getPointArray()).toBeDefined();
    // });

    
   // myTrackEditor.canvasDrawPoint()

  });

});
