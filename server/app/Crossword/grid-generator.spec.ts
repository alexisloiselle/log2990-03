import { } from "jasmine";

import { expect } from "chai";
import { Grid } from "./grid";
import { GridGenerator } from "./grid-generator";

describe("grid", () => {
    it("should generate a grid", async () => {
        const DIMENSION: number = 10;
        const grid: Grid = await GridGenerator.generateGrid(DIMENSION, DIMENSION, "easy");
        expect(grid).to.be.an("Object");

        for (const row of grid.Cases) {
            for (const position of row) {
                if (position.IsBlack) {
                    process.stdout.write("#");
                } else {
                    process.stdout.write(position.RightLetter);
                }
            }
            process.stdout.write("\n");
        }
    });
});
