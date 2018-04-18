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
        trackEditor.addPoint(new Vector2(0, 0));
        trackEditor.addPoint(new Vector2(15, 15));
        expect(trackEditor.isLoopClosed()).toBeFalsy();
    });

    it ("should return false if there is less than or equal at 2", () => {
        trackEditor.addPoint(new Vector2(0, 0));
        trackEditor.addPoint(new Vector2(0, 0));
        expect(trackEditor.isLoopClosed()).toBeFalsy();
    });

    it ("should return true if a loop is closed", () => {
        trackEditor.addPoint(new Vector2(0, 0));
        trackEditor.addPoint(new Vector2(15, 15));
        trackEditor.addPoint(new Vector2(0, 15));
        trackEditor.addPoint(new Vector2(0, 0));
        expect(trackEditor.isLoopClosed()).toBeTruthy();
    });

    it ("should return the vector at the given index", () => {
        const vector: Vector2 = new Vector2(1, 1);
        trackEditor.addPoint(vector);
        const resultVector: Vector2 = trackEditor.getSinglePoint(0);
        expect(resultVector).toEqual(vector);
    });

    it ("should return the error vector if index is negative", () => {
        const vector: Vector2 = new Vector2(1, 1);
        trackEditor.addPoint(vector);
        const resultVector: Vector2 = trackEditor.getSinglePoint(-5);
        const expectedVector: Vector2 = new Vector2(-1, -1);
        expect(resultVector).toEqual(expectedVector);
    });

    it ("should return the error vector if index is higher than the number of points", () => {
        const vector: Vector2 = new Vector2(1, 1);
        trackEditor.addPoint(vector);
        const resultVector: Vector2 = trackEditor.getSinglePoint(5);
        const expectedVector: Vector2 = new Vector2(-1, -1);
        expect(resultVector).toEqual(expectedVector);
    });

    it ("should set the points for the vector at the given index", () => {
        const vector: Vector2 = new Vector2(1, 1);
        trackEditor.addPoint(vector);
        const mouseCoordinates: Vector2 = new Vector2(3, 3);
        trackEditor.setPointCoordinates(0, mouseCoordinates);
        expect(trackEditor.getSinglePoint(0)).toEqual(mouseCoordinates);
    });

    it("should not change the coordinates if the index is negative", () => {
        const vector: Vector2 = new Vector2(1, 1);
        trackEditor.addPoint(vector);
        const mouseCoordinates: Vector2 = new Vector2(3, 3);
        trackEditor.setPointCoordinates(-5, mouseCoordinates);
        expect(trackEditor.getSinglePoint(0)).toEqual(vector);
    });

    it("should not change the coordinates if the index is out of bound", () => {
        const vector: Vector2 = new Vector2(1, 1);
        trackEditor.addPoint(vector);
        const mouseCoordinates: Vector2 = new Vector2(3, 3);
        trackEditor.setPointCoordinates(5, mouseCoordinates);
        expect(trackEditor.getSinglePoint(0)).toEqual(vector);
    });
});
