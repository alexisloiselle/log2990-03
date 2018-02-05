import {} from "jasmine";
import { expect } from "chai";

import { BlankGridCreator } from "./blank-grid-creator";
import { Case } from "./case";
import { BlackCasePlacer } from "./black-case-placer";

describe("Black-case-placer", () => {

    const height = 5;
    const width = 8;
    let blankGridCreator: BlankGridCreator;
    blankGridCreator = new BlankGridCreator;
    let cases: Case[][] = blankGridCreator.createGrid(height, width);

    let blackCasePlacer: BlackCasePlacer;
    blackCasePlacer = new BlackCasePlacer();
    
    beforeEach(() => {

    });

    describe("Black case placement", () => {
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
