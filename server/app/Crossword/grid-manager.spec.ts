import {} from "jasmine";

import { expect } from "chai";
import { GridManager } from "./grid-manager";

describe("grid", () => {
    const gridMan: GridManager = new GridManager("easy");
    it("should dunno", () => {
        expect(gridMan).to.be.an("array");
    });
});
