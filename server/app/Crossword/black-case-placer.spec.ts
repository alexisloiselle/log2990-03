import {} from "jasmine";
import { expect } from "chai";

import { GridManager } from "./grid-manager";
import { Case } from "./case"
import { BlackCasePlacer } from "./black-case-placer";

describe("Grid-Generator", () => {

    let gridManager: GridManager;
    gridManager = new GridManager;
    let blackCasePlacer: BlackCasePlacer;
    
    const height = 5;
    const width = 8;
    gridManager.generateGrid(height, width);

    let cases: Case[][];
    cases = gridManager.getCases();
    
    blackCasePlacer = new BlackCasePlacer(5, 8, cases);

    beforeEach(() => {
        
    });
    
    describe("Grid Generation", () => {
        it("Should be able to place the black cases", () => {
            expect(blackCasePlacer.placeBlackCase(cases, 3, 3)).to.equal(true);
            expect(cases[3][3].getIsBlack()).to.equal(true);
            expect(blackCasePlacer.placeBlackCase(cases, 4, 2)).to.equal(true);
            expect(cases[4][2].getIsBlack()).to.equal(true);
        });
        it("Should not be able to place this black case", () => {
            expect(blackCasePlacer.placeBlackCase(cases, 4, 4)).to.equal(false);
            expect(cases[4][4].getIsBlack()).to.equal(false);
        });
    });
});