import {} from "jasmine";

import { expect } from "chai";
import { GridManager } from "./grid-manager";

describe("grid", () => {
    it("should dunno", () => {
        expect(GridManager.generateGrid("easy")).to.be.an("array");
    });
});
