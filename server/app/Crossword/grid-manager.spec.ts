import {} from "jasmine";

import { expect } from "chai";
import { GridManager } from "./grid-manager";

describe("grid", () => {
    it("should dunno", () => {
        const gridMan: GridManager = new GridManager("easy");
        expect(gridMan.getGrid()).to.be.an("array");
    });
});
