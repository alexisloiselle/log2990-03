import {} from "jasmine";
import { expect } from "chai";

import { GridManager } from "./grid-manager";
import { Case } from "./case"

describe("Grid-Generator", () => {

    var gridGenerator: GridManager;
    gridGenerator = new GridManager;
    
    let cases: Case[][];
    cases = gridGenerator.generateGrid(8,5); 

    beforeEach(() => {
        
    });

    describe("Constructor", () => {
        it("should exist and have words", () => {
            expect(cases.length).to.equal(8);
        });
        it("should exist and have words", () => {
            expect(cases[0].length).to.equal(5);
        });
    });
});
