import {} from "jasmine";
import { expect } from "chai";

import { BlankGridCreator } from "./blank-grid-creator";
import { Case } from "./case";
import { BlackCasePlacer } from "./black-case-placer";

describe("Black-case-placer", () => {

    const height: number = 5;
    const width: number = 8;
    let blankGridCreator: BlankGridCreator;
    blankGridCreator = new BlankGridCreator;
    const cases: Case[][] = blankGridCreator.createGrid(height, width);

    let blackCasePlacer: BlackCasePlacer;
    blackCasePlacer = new BlackCasePlacer();

    const firstPositionLine: number = 3;
    const firstPositionColumn: number = 3;

    const secondPositionLine: number = 4;
    const secondPositionColumn: number = 2;

    const thirdPositionLine: number = 4;
    const thirdPositionColumn: number = 4;

    describe("Black case placement", () => {
        it("Should be able to place the black cases", () => {
            expect(blackCasePlacer.placeBlackCase(cases, firstPositionLine, firstPositionColumn)).to.equal(true);
            expect(cases[firstPositionLine][firstPositionColumn].getIsBlack()).to.equal(true);
            expect(blackCasePlacer.placeBlackCase(cases, secondPositionLine, secondPositionColumn)).to.equal(true);
            expect(cases[secondPositionLine][secondPositionColumn].getIsBlack()).to.equal(true);
        });
        it("Should not be able to place this black case", () => {
            expect(blackCasePlacer.placeBlackCase(cases, thirdPositionLine, thirdPositionColumn)).to.equal(false);
            expect(cases[thirdPositionLine][thirdPositionColumn].getIsBlack()).to.equal(false);
        });
    });
});
