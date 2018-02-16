import { } from "jasmine";

import { expect } from "chai";
import { GridGenerator } from "./grid-generator";

describe("grid", () => {
    it("should dunno", async () => {
        const DIMENSION: number = 10;
        expect(await GridGenerator.generateGrid(DIMENSION, DIMENSION, false)).to.be.an("array");
    });
});
