import { pointCoordinates } from "./pointCoordinates";
import { TrackEditorComponent } from "./track-editor.component";
//import { equation } from "./vector/equation";
import { vector } from "./vector/vector";

describe("TrackEditorComponent", () => {
  
  describe("vectorClass", () => {

    let pointStart : pointCoordinates = new pointCoordinates(2,6);
    let pointEnd :pointCoordinates = new pointCoordinates (1,3);
    let vectorTest : vector = new vector(pointStart,pointEnd);

    it("Should Create slope", () => {
      expect(vectorTest.getSlope()).toBe(3);
    });

    it("Should Create constant", () => {
      expect(vectorTest.getConstant()).toBe(0);
    });

    it("Should calculate domain MaxDomainX", () => {
      expect(vectorTest.findMaxDomain(pointStart,pointEnd).getX()).toBe(pointStart.getX());
    });

    it("Should calculate domain MinDomainX", () => {
      expect(vectorTest.findMinDomain(pointStart,pointEnd).getX()).toBe(pointEnd.getX());
    });

    it("Should calculate domain MaxDomainY", () => {
      expect(vectorTest.findMaxDomain(pointStart,pointEnd).getY()).toBe(pointStart.getY());
    });

    it("Should calculate domain MinDomainY", () => {
      expect(vectorTest.findMinDomain(pointStart,pointEnd).getY()).toBe(pointEnd.getY());
    });

    

    // it("minDomainX should be assigned to vector at construction", () =>{
    //   expect(vectorTest.getDomainXMin()).toBe(1);
    // });

    // it("minDomainY should be assigned to vector at construction", () =>{
    //   expect(vectorTest.getDomainYMin()).toBe(3);
    // });

    // it("minDomainX should be assigned to vector at construction", () =>{
    //   expect(vectorTest.getDomainXMax()).toBe(2);
    // });

    // it("minDomainX should be assigned to vector at construction", () =>{
    //   expect(vectorTest.getDomainYMax()).toBe(6);
    // });

    


  });
  
  describe("trackEditor", () => {
    let myTrackEditor :TrackEditorComponent = new TrackEditorComponent;

    it("Should create an empty pointCoordinates array.", () =>{
      expect(myTrackEditor.getPointArray()).toBeDefined();
    });

    
    myTrackEditor.canvasDrawPoint()

  });
});
