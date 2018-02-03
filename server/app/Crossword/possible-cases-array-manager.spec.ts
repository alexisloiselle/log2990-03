import {} from "jasmine";
import { expect } from "chai";

import { BlankGridCreator } from "./blank-grid-creator";
import { PossibleCasesArrayManager } from "./possible-cases-array-manager";
import { Case } from "./case";

describe("Possible-Cases-Array-Manager", () => {

    let blankGridManager: BlankGridCreator;
    blankGridManager = new BlankGridCreator;

    const height: number = 3;
    const width: number = 8;
    const grid: Case[][] = blankGridManager.createGrid(height, width);
    const possibleCasesArrayManager: PossibleCasesArrayManager = new PossibleCasesArrayManager(grid.length, grid[0].length);

    describe("Find case by position", () => {
        it("Should find the right position in the array", () => {
            const position: [number, number] = [2, 3];
            const expectedIndex: number = 19;
            expect(possibleCasesArrayManager.findCaseByPosition(position)).to.equal(expectedIndex);
        });
    });

    describe("Find a random case", () => {
        it("Should return a position in the grid", () => {
            for (let i: number = 0; i < 23; i++) {
                const resultedPosition: [number, number] = possibleCasesArrayManager.findRandomCase();
                expect(resultedPosition[0]).not.to.be.below(0);
                expect(resultedPosition[0]).to.be.below(height);
                expect(resultedPosition[1]).not.to.be.below(0);
                expect(resultedPosition[1]).to.be.below(width);
                expect(possibleCasesArrayManager.isArrayEmpty()).to.be.equal(false);
            }
            possibleCasesArrayManager.findRandomCase();
            expect(possibleCasesArrayManager.isArrayEmpty()).to.be.equal(true);
        });
    });
});