import {} from "jasmine";
import { expect } from "chai";

import { GridManager } from "./grid-manager";
import { Case } from "./case"

describe("Grid-Generator", () => {

    var gridGenerator: GridManager;
    gridGenerator = new GridManager;
    
    let cases: Case[][];
    const width = 8;
    const height = 5;
    cases = gridGenerator.generateGrid(width,height); 

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
