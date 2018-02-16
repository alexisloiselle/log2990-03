import {} from "jasmine";
import { expect } from "chai";

import { BlackCasePlacer } from "./black-case-placer";
import { BlankGridCreator } from "./blank-grid-creator";
import { Case } from "./case";

describe("Black-case-placer", () => {

    const HEIGHT: number = 5;
    const WIDTH: number = 8;
    let blankGridCreator: BlankGridCreator;
    blankGridCreator = new BlankGridCreator;
    const cases: Case[][] = blankGridCreator.createGrid(HEIGHT, WIDTH);

    let blackCasePlacer: BlackCasePlacer;
    blackCasePlacer = new BlackCasePlacer();

    const FIRST_POSITION_LINE: number = 3;
    const FIRST_POSITION_COLUMN: number = 3;

    const SECOND_POSITION_LINE: number = 4;
    const SECOND_POSITION_COLUMN: number = 2;

    const THIRD_POSITION_LINE: number = 4;
    const THIRD_POSITION_COLUMN: number = 4;

    describe("Black case placement", () => {
        it("Should be able to place the black cases", () => {
            expect(blackCasePlacer.placeBlackCase(cases, FIRST_POSITION_LINE, FIRST_POSITION_COLUMN)).to.equal(true);
            expect(cases[FIRST_POSITION_LINE][FIRST_POSITION_COLUMN].IsBlack).to.equal(true);
            expect(blackCasePlacer.placeBlackCase(cases, SECOND_POSITION_LINE, SECOND_POSITION_COLUMN)).to.equal(true);
            expect(cases[SECOND_POSITION_LINE][SECOND_POSITION_COLUMN].IsBlack).to.equal(true);
        });
        it("Should not be able to place this black case", () => {
            expect(blackCasePlacer.placeBlackCase(cases, THIRD_POSITION_LINE, THIRD_POSITION_COLUMN)).to.equal(false);
            expect(cases[THIRD_POSITION_LINE][THIRD_POSITION_COLUMN].IsBlack).to.equal(false);
        });
    });
});
