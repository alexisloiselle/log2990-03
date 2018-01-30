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
        it("Should be able to place the black cases", () => {
            expect(gridManager.placeBlackCase(cases, 3, 3)).to.equal(true);
            expect(cases[3][3].getIsBlack()).to.equal(true);
            expect(gridManager.placeBlackCase(cases, 4, 2)).to.equal(true);
            expect(cases[4][2].getIsBlack()).to.equal(true);
        });
        it("Should not be able to place this black case", () => {
            expect(gridManager.placeBlackCase(cases, 4, 4)).to.equal(false);
            expect(cases[4][4].getIsBlack()).to.equal(false);
        });
    });
});
