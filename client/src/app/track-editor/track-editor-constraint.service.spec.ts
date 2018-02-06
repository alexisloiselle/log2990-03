// import { TestBed, inject } from "@angular/core/testing";

// import { TrackEditorConstraintService } from "./track-editor-constraint.service";
import { PointCoordinates } from "./pointCoordinates";
import { Vector } from "./vector/vector";
import {TrackEditorConstraintService} from "./track-editor-constraint.service"

describe("Track-Editor-Constraint", () => {

    const FORTY_FIVE_DEGREE_IN_RADIAN: number = (Math.PI * 45) / 180;
    const POINT_START: PointCoordinates = new PointCoordinates(2, 6);
    const POINT_END: PointCoordinates = new PointCoordinates(1, 3);
    const POINT_LESS_45: PointCoordinates = new PointCoordinates(1, 2);
    const FIRSTVECTOR45DEGREE: Vector = new Vector(new PointCoordinates(0, 0), new PointCoordinates(5, 2));
    const SECONDEVECTOR45DEGREE: Vector = new Vector(new PointCoordinates(0, 0), new PointCoordinates(3, 7));
    const VECTOR_TEST_IS_IN_DOMAIN: Vector = new Vector(new PointCoordinates(0, 4), new PointCoordinates(3, 0));
    const VECTOR_TEST: Vector = new Vector(POINT_START, POINT_END);
    const VECTOR_TEST_LESS_45: Vector = new Vector(POINT_START, POINT_LESS_45);
    const VECTOR_PARALLEL: Vector = new Vector(POINT_START, POINT_END);
    const VECTOR_INVERSE_PARALLEL: Vector = new Vector(POINT_END, POINT_START);

    

    it("Angle should be less than 45 degree", () => {
        expect(VECTOR_TEST.calculateAngle(VECTOR_TEST_LESS_45).toFixed(3)).toBeLessThan(FORTY_FIVE_DEGREE_IN_RADIAN);
    });
//   const POINT_INVERSE_PARALLEL: PointCoordinates = new PointCoordinates(1,3);
//   const POINT_PARALLEL: PointCoordinates = new PointCoordinates(2, 6);

    it("Angle shoul be 45 degree", () => {
        expect(FIRSTVECTOR45DEGREE.calculateAngle(SECONDEVECTOR45DEGREE)).toBe(FORTY_FIVE_DEGREE_IN_RADIAN);
    });

    it("Angle should be greater than 45 degree", () => {
        expect(VECTOR_TEST.isParallel(VECTOR_INVERSE_PARALLEL)).toBeTruthy();
    });

    it("Vector shouldn't be parallel", () => {
        expect(VECTOR_TEST.isParallel(VECTOR_TEST_LESS_45)).toBeFalsy();
    });

    it("Vector should be parallel", () => {
        expect(VECTOR_TEST.isParallel(VECTOR_PARALLEL)).toBeTruthy();
    });

    it("Vector should be parallel", () => {
        expect(VECTOR_TEST.isParallel(VECTOR_INVERSE_PARALLEL)).toBeTruthy();
    });

    it("Intersection X shouln't exist", () => {
        expect(VECTOR_TEST.calculateVectorIntersection(VECTOR_PARALLEL).getX()).toBeNaN();
    });

    it("Intersection Y shouln't exist", () => {
        expect(VECTOR_TEST.calculateVectorIntersection(VECTOR_PARALLEL).getY()).toBeNaN();
    });

    it("Intersection Y should be 0", () => {
        expect(FIRSTVECTOR45DEGREE.calculateVectorIntersection(SECONDEVECTOR45DEGREE).getY()).toBe(0);
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
        expect(FIRSTVECTOR45DEGREE.pointIsInCommunDomain(FIRSTVECTOR45DEGREE.calculateVectorIntersection(VECTOR_TEST_IS_IN_DOMAIN), VECTOR_TEST_IS_IN_DOMAIN)).toBeTruthy();
    });

    it("Point shouldn't be in the domain", () => {
        expect(VECTOR_TEST.pointIsInCommunDomain(VECTOR_TEST.calculateVectorIntersection(FIRSTVECTOR45DEGREE), FIRSTVECTOR45DEGREE)).toBeFalsy();
    });

    it("All constraint shouldn't pass", () => {
      let trackEditorConstraintService = new TrackEditorConstraintService;
      expect(trackEditorConstraintService.allConstraintPass(VECTOR_TEST,FIRSTVECTOR45DEGREE)).toBeFalsy();
    });

    it("YOLO", () => {
      
    });
});
