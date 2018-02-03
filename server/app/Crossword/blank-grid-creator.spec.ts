import {} from "jasmine";
import { expect } from "chai";

import { BlankGridCreator } from "./blank-grid-creator";
import { Case } from "./case";

describe("Blank Grid Generator", () => {

    let blankGridManager: BlankGridCreator;
    blankGridManager = new BlankGridCreator;

    const height = 5;
    const width = 8;

    let cases: Case[][] = blankGridManager.createGrid(height, width);

    beforeEach(() => {

    });

    describe("Create Grid", () => {
        it("Should have the right width", () => {
            expect(cases.length).to.equal(height);
        });
        it("Should have the right height", () => {
            expect(cases[0].length).to.equal(width);
        });
    });
});
