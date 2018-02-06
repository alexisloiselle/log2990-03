import {} from "jasmine";
// import { expect } from "chai";

import { BlankGridCreator } from "./blank-grid-creator";
import { Case } from "./case";
import { BlackCaseGenerator } from "./black-case-generator";

describe("Black-case-generator", () => {

    const HEIGHT: number = 8;
    const WIDTH: number = 8;
    let blankGridCreator: BlankGridCreator;
    blankGridCreator = new BlankGridCreator;
    const cases: Case[][] = blankGridCreator.createGrid(HEIGHT, WIDTH);

    const blackCaseGenerator: BlackCaseGenerator = new BlackCaseGenerator(HEIGHT, WIDTH);

    describe("Black cases generation", () => {
        it("Should be able to generate a grid with black cases", () => {
            const pourcentageBlackCases: number = 50;
            blackCaseGenerator.generateBlackCases(cases, pourcentageBlackCases);
        });
    });
});
