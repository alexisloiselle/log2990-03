import {} from "jasmine";
import { expect } from "chai";

import { GridManager } from "./grid-manager";
import { Case } from "./case"

describe("Grid-Generator", () => {

    var gridGenerator: GridManager;
    gridGenerator = new GridManager;
    
    const width = 8;
    const height = 5;
    gridGenerator.generateGrid(width,height);

    let cases: Case[][];
    cases = gridGenerator.getCases();

    beforeEach(() => {
        
    });

    describe("Grid Generation", () => {
        it("Should have the right width", () => {
            expect(cases.length).to.equal(width);
        });
        it("Should have the right height", () => {
            expect(cases[0].length).to.equal(height);
        });
    });
});
