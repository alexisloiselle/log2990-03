import {} from "jasmine";
import { expect } from "chai";

import { BlankGridCreator } from "./blank-grid-creator";
import { Case } from "./case";

describe("Blank Grid Generator", () => {

    let blankGridManager: BlankGridCreator;
    blankGridManager = new BlankGridCreator;

    const HEIGHT: number = 5;
    const WIDTH: number = 8;

    const cases: Case[][] = blankGridManager.createGrid(HEIGHT, WIDTH);

    describe("Create Grid", () => {
        it("Should have the right width", () => {
            expect(cases.length).to.equal(HEIGHT);
        });
        it("Should have the right height", () => {
            expect(cases[0].length).to.equal(WIDTH);
        });
    });
});
