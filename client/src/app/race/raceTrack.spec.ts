import { RaceTrack } from "./raceTrack";
import { Vector2 } from "three";

/* tslint:disable:no-magic-numbers */
describe("RaceTrack", () => {
    it("CalculateAngleBetweenVector should return the right angle", () => {
        const vector1: Vector2 = new Vector2(3, 4);
        const vector2: Vector2 = new Vector2(4, 3);
        expect(vector1.length()).toBe(5);
        expect(RaceTrack.calculateAngleBetweenVector(vector1, vector2)).toBe(0.283794109208328);
    });
});
