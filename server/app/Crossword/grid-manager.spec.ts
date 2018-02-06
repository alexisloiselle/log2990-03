import {} from "jasmine";
// import { expect } from "chai";

import { GridManager } from "./grid-manager";

describe("Grid-manager", () => {
    const height: number = 6;
    const width: number = 6;
    const gridManager: GridManager = new GridManager;

    describe("Grid management", () => {
        it("Should be able to generate a grid", () => {
            gridManager.generateGrid(height, width, "easy");
        });
    });
});
