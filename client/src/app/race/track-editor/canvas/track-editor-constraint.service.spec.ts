import { PointCoordinates } from "./point-coordinates";
import { Vector } from "../vector/vector";
import {ConstraintService} from "./track-editor-constraint.service";

/* tslint:disable:no-magic-numbers */
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
    const VECTOR_X_ABSCISSE: Vector = new Vector (new PointCoordinates (0, 0), new PointCoordinates (0, 1));
    const VECTOR_Y_ABSCISSE: Vector = new Vector (new PointCoordinates (0, 1), new PointCoordinates (1, 1));
    const FIRST_VECTOR_INTERSECTION: Vector = new Vector( new PointCoordinates(0, 0), new PointCoordinates(5, 5));
    const SECOND_VECTOR_INTERSECTION: Vector = new Vector(new PointCoordinates(0, 5), new PointCoordinates(5, 0));

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
        expect(VECTOR_PARALLEL.calculateVectorIntersection(VECTOR_INVERSE_PARALLEL).X).toBe(-1);
    });

    it("Intersection Y shouln't exist", () => {
        expect(VECTOR_PARALLEL.calculateVectorIntersection(VECTOR_INVERSE_PARALLEL).Y).toBe(-1);
    });

    it("Intersection Y should be 0", () => {
        expect(FIRSTVECTOR45DEGREE.calculateVectorIntersection(SECONDEVECTOR45DEGREE).X).toBe(0);
    });

    it("Intersection Y should be 0", () => {
        expect(FIRSTVECTOR45DEGREE.calculateVectorIntersection(SECONDEVECTOR45DEGREE).Y).toBe(0);
    });

    it("Point should be in the domain", () => {
        expect(FIRSTVECTOR45DEGREE.pointIsInCommunDomain
            (FIRSTVECTOR45DEGREE.calculateVectorIntersection(VECTOR_TEST_IS_IN_DOMAIN), VECTOR_TEST_IS_IN_DOMAIN)).toBeTruthy();
    });

    it("Point shouldn't be in the domain", () => {
        expect(VECTOR_TEST.pointIsInCommunDomain
            (VECTOR_TEST.calculateVectorIntersection(FIRSTVECTOR45DEGREE), FIRSTVECTOR45DEGREE)).toBeFalsy();
    });

    it("Shouldn't be intersecting  ", () => {
      const trackEditorConstraintService: ConstraintService = new ConstraintService;
      expect(trackEditorConstraintService.verifyIsIntersecting(SECONDEVECTOR45DEGREE, FIRSTVECTOR45DEGREE)).toBeFalsy();
    });

    it("Angle verification shouldn't pass", () => {
      const trackEditorConstraintService: ConstraintService = new ConstraintService;
      expect(trackEditorConstraintService.verifyAngle(VECTOR_TEST, VECTOR_TEST_LESS_45)).toBeFalsy();
    });

    it("Vectors Should be intersecting ", () => {
        const trackEditorConstraintService: ConstraintService = new ConstraintService;
        expect(trackEditorConstraintService.verifyIsIntersecting(FIRST_VECTOR_INTERSECTION, SECOND_VECTOR_INTERSECTION)).toBeTruthy();
    });

    it("Angle verification should pass", () => {
        const trackEditorConstraintService: ConstraintService = new ConstraintService;
        expect(trackEditorConstraintService.verifyAngle(FIRSTVECTOR45DEGREE, SECONDEVECTOR45DEGREE)).toBeTruthy();
    });

    it("Intersection Y should be 2.5", () => {
        expect(FIRST_VECTOR_INTERSECTION.calculateVectorIntersection(SECOND_VECTOR_INTERSECTION).X).toBe(2.5);
    });

    it("Intersection Y should be 2.5", () => {
        expect(FIRST_VECTOR_INTERSECTION.calculateVectorIntersection(SECOND_VECTOR_INTERSECTION).Y).toBe(2.5);
    });

});
