import { TrackEditorModel } from "./track-editor-model";
import { Vector2 } from "three";

import { } from "jasmine";

describe("CanvasComponent", () => {
    // tslint:disable:no-magic-numbers
    let trackEditor: TrackEditorModel;
    beforeEach(() => {
        trackEditor = new TrackEditorModel();
    });

    it ("should return false if a loop is not closed", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(0, 0));
        pointArray.push(new Vector2(15, 15));
        trackEditor.PointArray = pointArray;
        expect(trackEditor.isLoopClosed()).toBeFalsy();
    });

    it ("should return false if there is less than or equal at 2", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(0, 0));
        pointArray.push(new Vector2(0, 0));
        trackEditor.PointArray = pointArray;
        expect(trackEditor.isLoopClosed()).toBeFalsy();
    });

    it ("should not add a point if the loop is complete", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(0, 0));
        pointArray.push(new Vector2(15, 15));
        pointArray.push(new Vector2(0, 15));
        pointArray.push(new Vector2(0, 0));
        trackEditor.PointArray = pointArray;
        trackEditor.addPoint(new Vector2(2, 2));
        expect(trackEditor.getSinglePoint(4)).toEqual(new Vector2(-1, -1));
    });

    it ("should add a point if the loop is not complete", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(0, 0));
        pointArray.push(new Vector2(15, 15));
        trackEditor.PointArray = pointArray;
        const expectedVector: Vector2 = new Vector2(30, 30);
        trackEditor.addPoint(expectedVector);
        expect(trackEditor.getSinglePoint(2)).toEqual(expectedVector);
    });

    it ("should not add a point if a point is too close", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(0, 0));
        pointArray.push(new Vector2(15, 15));
        trackEditor.PointArray = pointArray;
        const expectedVector: Vector2 = new Vector2(14, 14);
        trackEditor.addPoint(expectedVector);
        expect(trackEditor.getSinglePoint(2)).toEqual(new Vector2(-1, -1));
    });

    it ("should return true if a loop is closed", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(0, 0));
        pointArray.push(new Vector2(15, 15));
        pointArray.push(new Vector2(0, 15));
        pointArray.push(new Vector2(0, 0));
        trackEditor.PointArray = pointArray;
        expect(trackEditor.isLoopClosed()).toBeTruthy();
    });

    it ("should return the vector at the given index", () => {
        const pointArray: Vector2[] = [];
        const vector: Vector2 = new Vector2(1, 1);
        pointArray.push(vector);
        trackEditor.PointArray = pointArray;
        const resultVector: Vector2 = trackEditor.getSinglePoint(0);
        expect(resultVector).toEqual(vector);
    });

    it ("should return the error vector if index is negative", () => {
        const pointArray: Vector2[] = [];
        const vector: Vector2 = new Vector2(1, 1);
        pointArray.push(vector);
        trackEditor.PointArray = pointArray;
        const resultVector: Vector2 = trackEditor.getSinglePoint(-5);
        const expectedVector: Vector2 = new Vector2(-1, -1);
        expect(resultVector).toEqual(expectedVector);
    });

    it ("should return the error vector if index is higher than the number of points", () => {
        const pointArray: Vector2[] = [];
        const vector: Vector2 = new Vector2(1, 1);
        pointArray.push(vector);
        trackEditor.PointArray = pointArray;
        const resultVector: Vector2 = trackEditor.getSinglePoint(5);
        const expectedVector: Vector2 = new Vector2(-1, -1);
        expect(resultVector).toEqual(expectedVector);
    });

    it ("should set the points for the vector at the given index", () => {
        const pointArray: Vector2[] = [];
        const vector: Vector2 = new Vector2(1, 1);
        pointArray.push(vector);
        trackEditor.PointArray = pointArray;
        const mouseCoordinates: Vector2 = new Vector2(3, 3);
        trackEditor.setPointCoordinates(0, mouseCoordinates);
        expect(trackEditor.getSinglePoint(0)).toEqual(mouseCoordinates);
    });

    it("should not change the coordinates if the index is negative", () => {
        const pointArray: Vector2[] = [];
        const vector: Vector2 = new Vector2(1, 1);
        pointArray.push(vector);
        trackEditor.PointArray = pointArray;
        const mouseCoordinates: Vector2 = new Vector2(3, 3);
        trackEditor.setPointCoordinates(-5, mouseCoordinates);
        expect(trackEditor.getSinglePoint(0)).toEqual(vector);
    });

    it("should not change the coordinates if the index is out of bound", () => {
        const pointArray: Vector2[] = [];
        const vector: Vector2 = new Vector2(1, 1);
        pointArray.push(vector);
        trackEditor.PointArray = pointArray;
        const mouseCoordinates: Vector2 = new Vector2(3, 3);
        trackEditor.setPointCoordinates(5, mouseCoordinates);
        expect(trackEditor.getSinglePoint(0)).toEqual(vector);
    });

    it("should do nothing if you remove a point and the array is empty", () => {
        trackEditor.eraseLastPoint();
        expect(trackEditor.getSinglePoint(0)).toEqual(new Vector2(-1, -1));
    });

    it("should only remove the last point in the array if there is at least a point", () => {
        const pointArray: Vector2[] = [];
        const vector1: Vector2 = new Vector2(0, 0);
        pointArray.push(vector1);
        pointArray.push(new Vector2(15, 15));
        trackEditor.PointArray = pointArray;
        trackEditor.eraseLastPoint();
        expect(trackEditor.getSinglePoint(0)).toEqual(vector1);
        expect(trackEditor.getSinglePoint(1)).toEqual(new Vector2(-1, -1));
    });

    it("should remove all the points too close to another", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(0, 0));
        pointArray.push(new Vector2(3, 3));
        pointArray.push(new Vector2(30, 30));
        pointArray.push(new Vector2(31, 31));
        trackEditor.PointArray = pointArray;
        trackEditor.removePointsTooClose();
        const expectedArray: Vector2[] = [];
        expectedArray.push(new Vector2(0, 0));
        expectedArray.push(new Vector2(30, 30));
        expect(trackEditor.PointArray).toEqual(expectedArray);
    });

    it ("should not remove points if they are not too close to each other", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(0, 0));
        pointArray.push(new Vector2(15, 15));
        pointArray.push(new Vector2(30, 30));
        trackEditor.PointArray = pointArray;
        trackEditor.removePointsTooClose();
        expect(trackEditor.PointArray).toEqual(pointArray);
    });

    it ("should close the loop", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(0, 0));
        pointArray.push(new Vector2(15, 15));
        pointArray.push(new Vector2(30, 30));
        trackEditor.PointArray = pointArray;
        trackEditor.closeLoop();
        pointArray.push(new Vector2(0, 0));
        expect(trackEditor.PointArray).toEqual(pointArray);
    });

    it ("should not close the loop if there is only one point", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(0, 0));
        trackEditor.PointArray = pointArray;
        trackEditor.closeLoop();
        expect(trackEditor.getSinglePoint(1)).toEqual(new Vector2(-1, -1));
    });

    it ("should return true if it cliked on the point", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(15, 15));
        trackEditor.PointArray = pointArray;
        expect(trackEditor.clickedOnExistingPoint(new Vector2(15, 15))).toBeTruthy();
    });

    it ("should return true if it cliked in the accepted radius", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(15, 15));
        trackEditor.PointArray = pointArray;
        expect(trackEditor.clickedOnExistingPoint(new Vector2(10, 10))).toBeTruthy();
    });

    it ("should return false if it cliked outside the accepted radius", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(15, 15));
        trackEditor.PointArray = pointArray;
        expect(trackEditor.clickedOnExistingPoint(new Vector2(45, 45))).toBeFalsy();
    });

    it ("should return true if it clicked on the first point", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(15, 15));
        trackEditor.PointArray = pointArray;
        expect(trackEditor.clickedOnFirstPoint(new Vector2(15, 15))).toBeTruthy();
    });

    it ("should return true if it clicked near the first point", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(15, 15));
        trackEditor.PointArray = pointArray;
        expect(trackEditor.clickedOnFirstPoint(new Vector2(10, 15))).toBeTruthy();
    });

    it ("should return false if it clicked on another point", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(15, 15));
        pointArray.push(new Vector2(45, 45));
        trackEditor.PointArray = pointArray;
        expect(trackEditor.clickedOnFirstPoint(new Vector2(45, 45))).toBeFalsy();
    });

    it ("should return false if it's not clicked on a point", () => {
        const pointArray: Vector2[] = [];
        pointArray.push(new Vector2(15, 15));
        trackEditor.PointArray = pointArray;
        expect(trackEditor.clickedOnFirstPoint(new Vector2(45, 45))).toBeFalsy();
    });

    it ("should return true if the two points are too close", () => {
        expect(trackEditor.isTooClose(new Vector2(0, 0), new Vector2(5, 5))).toBeTruthy();
    });

    it ("should return true if the two points are too close", () => {
        expect(trackEditor.isTooClose(new Vector2(0, 0), new Vector2(40, 40))).toBeFalsy();
    });
});
