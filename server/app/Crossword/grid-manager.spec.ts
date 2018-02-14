import {} from "jasmine";

import { expect } from "chai";
import { GridManager } from "./grid-manager";

describe("grid", () => {
    it("should dunno", async () => {
        expect(await GridManager.generateGrid("easy")).to.be.an("array");
    });
});
