import { TrackEditorModel } from "./track-editor-model";
import { Vector2 } from "three";

import { } from "jasmine";

describe("CanvasComponent", () => {
    // tslint:disable:no-magic-numbers
    const trackEditor: TrackEditorModel = new TrackEditorModel();

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
});
