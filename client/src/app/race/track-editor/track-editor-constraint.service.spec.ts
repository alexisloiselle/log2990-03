/* tslint:disable:no-magic-numbers */
// import { TestBed, inject } from "@angular/core/testing";

// import { TrackEditorConstraintService } from "./track-editor-constraint.service";
import { PointCoordinates } from "./pointCoordinates";
import { Vector } from "./vector/vector";
import {TrackEditorConstraintService} from "./track-editor-constraint.service";

describe("Track-Editor-Constraint", () => {

    const FORTY_FIVE_DEGREE: number = 45;
    const POINT_START: PointCoordinates = new PointCoordinates(2, 6);
    const POINT_END: PointCoordinates = new PointCoordinates(1, 3);
    const POINT_LESS_45: PointCoordinates = new PointCoordinates(1, 2);
    const FIRSTVECTOR45DEGREE: Vector = new Vector(new PointCoordinates(5, 2), new PointCoordinates(0, 0));
    const SECONDEVECTOR45DEGREE: Vector = new Vector(new PointCoordinates(0, 0), new PointCoordinates(3, 7));
    const VECTOR_TEST_IS_IN_DOMAIN: Vector = new Vector(new PointCoordinates(0, 4), new PointCoordinates(3, 0));
    const VECTOR_TEST: Vector = new Vector(POINT_START, POINT_LESS_45);
    const VECTOR_TEST_LESS_45: Vector = new Vector(POINT_LESS_45, POINT_END);
    const VECTOR_PARALLEL: Vector = new Vector(POINT_START, POINT_END);
    const VECTOR_INVERSE_PARALLEL: Vector = new Vector(POINT_END, POINT_START);
    const VECTOR_X_ABSCISSE : Vector =new Vector (new PointCoordinates (0,0), new PointCoordinates (0,1));
    const VECTOR_Y_ABSCISSE : Vector = new Vector (new PointCoordinates (0,1), new PointCoordinates (1,1));
    const FIRST_VECTOR_INTERSECTION: Vector = new Vector( new PointCoordinates(0, 0), new PointCoordinates(5, 5));
    const SECOND_VECTOR_INTERSECTION: Vector = new Vector(new PointCoordinates(0, 5), new PointCoordinates(5, 0));

    // let pointArray: PointCoordinates[];
    // pointArray.push(POINT_START);
    // pointArray.push(POINT_END);
    // pointArray.push(POINT_LESS_45);

    it("Angle should be less than 45 degree", () => {
        expect(VECTOR_TEST.calculateAngle(VECTOR_TEST_LESS_45).toFixed(3)).toBeLessThan(FORTY_FIVE_DEGREE);
    });

    it("Angle should be 0 degree", () => {
        expect(VECTOR_PARALLEL.calculateAngle(VECTOR_INVERSE_PARALLEL)).toBe(0);
    });

    it("Angle should be 45 degree", () => {
        expect(FIRSTVECTOR45DEGREE.calculateAngle(SECONDEVECTOR45DEGREE)).toBe(FORTY_FIVE_DEGREE);
    });

    it("Angle should be 90 degree", () => {
        expect(VECTOR_X_ABSCISSE.calculateAngle(VECTOR_Y_ABSCISSE)).toBeGreaterThan(45);
    });

    it("Vector shouldn't be parallel", () => {
        expect(VECTOR_TEST.isParallel(VECTOR_TEST_LESS_45)).toBeFalsy();
    });

    it("Vector should be parallel", () => {
        expect(VECTOR_PARALLEL.isParallel(VECTOR_INVERSE_PARALLEL)).toBeTruthy();
    });

    

    it("Intersection X shouln't exist", () => {
        expect(VECTOR_PARALLEL.calculateVectorIntersection(VECTOR_INVERSE_PARALLEL).getX()).toBe(-1);
    });

    it("Intersection Y shouln't exist", () => {
        expect(VECTOR_PARALLEL.calculateVectorIntersection(VECTOR_INVERSE_PARALLEL).getY()).toBe(-1);
    });

    it("Intersection Y should be 0", () => {
        expect(FIRSTVECTOR45DEGREE.calculateVectorIntersection(SECONDEVECTOR45DEGREE).getX()).toBe(0);
    });

    it("Intersection Y should be 0", () => {
        expect(FIRSTVECTOR45DEGREE.calculateVectorIntersection(SECONDEVECTOR45DEGREE).getY()).toBe(0);
    });

    it("XMin commun domain should be 0", () => {
        expect(VECTOR_TEST.calculateCommunDomain(FIRSTVECTOR45DEGREE).getXMin()).toBe(0);
    });

    it("YMin commun domain should be 0", () => {
        expect(VECTOR_TEST.calculateCommunDomain(FIRSTVECTOR45DEGREE).getYMin()).toBe(0);
    });

    it("XMax commun domain should be 5", () => {
        expect(VECTOR_TEST.calculateCommunDomain(FIRSTVECTOR45DEGREE).getXMax()).toBe(5);
    });

    it("YMax commun domain should be 6", () => {
        expect(VECTOR_TEST.calculateCommunDomain(FIRSTVECTOR45DEGREE).getYMax()).toBe(6);
    });

    it("Point should be in the domain", () => {
        expect(FIRSTVECTOR45DEGREE.pointIsInCommunDomain
            (FIRSTVECTOR45DEGREE.calculateVectorIntersection(VECTOR_TEST_IS_IN_DOMAIN), VECTOR_TEST_IS_IN_DOMAIN)).toBeTruthy();
    });

    it("Point shouldn't be in the domain", () => {
        expect(VECTOR_TEST.pointIsInCommunDomain
            (VECTOR_TEST.calculateVectorIntersection(FIRSTVECTOR45DEGREE), FIRSTVECTOR45DEGREE)).toBeFalsy();
    });

    // it("All constraint should pass because no intersection and angle ok", () => {
    //   const trackEditorConstraintService: TrackEditorConstraintService = new TrackEditorConstraintService;
    //   expect(trackEditorConstraintService.allConstraintPass(pointArray)).toBeTruthy();
    // });

    it("Shouldn't be intersecting  ", () => {
      const trackEditorConstraintService: TrackEditorConstraintService = new TrackEditorConstraintService;
      expect(trackEditorConstraintService.verifyIsIntersecting(SECONDEVECTOR45DEGREE, FIRSTVECTOR45DEGREE)).toBeFalsy();
    });

    it("Angle verification shouldn't pass", () => {
      const trackEditorConstraintService: TrackEditorConstraintService = new TrackEditorConstraintService;
      expect(trackEditorConstraintService.verifyAngle(VECTOR_TEST, VECTOR_TEST_LESS_45)).toBeFalsy();
    });

    // it("All constraint shouldn't pass because vector parallel", () => {
    //     const trackEditorConstraintService: TrackEditorConstraintService = new TrackEditorConstraintService;
    //     expect(trackEditorConstraintService.allConstraintPass(pointArray)).toBeFalsy();
    //   });

    // it("All constraint shouldn't pass because there's an intersection", () => {
    //     const trackEditorConstraintService: TrackEditorConstraintService = new TrackEditorConstraintService;
    //     expect(trackEditorConstraintService.allConstraintPass(pointArray)).toBeFalsy();
    // });

    it("Vectors Should be intersecting ", () => {
        const trackEditorConstraintService: TrackEditorConstraintService = new TrackEditorConstraintService;
        expect(trackEditorConstraintService.verifyIsIntersecting(FIRST_VECTOR_INTERSECTION, SECOND_VECTOR_INTERSECTION)).toBeTruthy();
    });

    it("Angle verification should pass", () => {
        const trackEditorConstraintService: TrackEditorConstraintService = new TrackEditorConstraintService;
        expect(trackEditorConstraintService.verifyAngle(FIRSTVECTOR45DEGREE, SECONDEVECTOR45DEGREE)).toBeTruthy();
    });

    it("Intersection Y should be 2.5", () => {
        expect(FIRST_VECTOR_INTERSECTION.calculateVectorIntersection(SECOND_VECTOR_INTERSECTION).getX()).toBe(2.5);
    });

    it("Intersection Y should be 2.5", () => {
        expect(FIRST_VECTOR_INTERSECTION.calculateVectorIntersection(SECOND_VECTOR_INTERSECTION).getY()).toBe(2.5);
    });

});
