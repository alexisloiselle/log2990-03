import {} from "jasmine";
import { expect } from "chai";

import { GridManager } from "./grid-manager";
import { Case } from "./case"

describe("Grid-Generator", () => {

    let gridManager: GridManager;
    gridManager = new GridManager;
    
    const height = 5;
    const width = 8;
    gridManager.generateGrid(height, width);

    let cases: Case[][];
    cases = gridManager.getCases();

    beforeEach(() => {
        
    });
    
    describe("Grid Generation", () => {
        it("Should have the right width", () => {
            expect(cases.length).to.equal(height);
        });
        it("Should have the right height", () => {
            expect(cases[0].length).to.equal(width);
        });
    });
});
