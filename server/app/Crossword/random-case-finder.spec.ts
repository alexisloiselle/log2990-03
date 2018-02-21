// import {} from "jasmine";
// import { expect } from "chai";

// import { BlankGridCreator } from "./blank-grid-creator";
// import { RandomCaseFinder } from "./random-case-finder";
// import { Case } from "./case";

// describe("Random Case Generator", () => {

//     let blankGridManager: BlankGridCreator;
//     blankGridManager = new BlankGridCreator;

//     const height: number = 3;
//     const width: number = 8;
//     const grid: Case[][] = blankGridManager.createGrid(height, width);
//     const possibleCasesArrayManager: RandomCaseFinder = new RandomCaseFinder(grid.length, grid[0].length);

//     describe("Find a random case", () => {
//         it("Should return a position in the grid", () => {
//             const numberOfCaseMinusOne: number = 23;
//             for (let i: number = 0; i < numberOfCaseMinusOne; i++) {
//                 const resultedPosition: [number, number] = possibleCasesArrayManager.findRandomCase();
//                 expect(resultedPosition[0]).not.to.be.below(0);
//                 expect(resultedPosition[0]).to.be.below(height);
//                 expect(resultedPosition[1]).not.to.be.below(0);
//                 expect(resultedPosition[1]).to.be.below(width);
//                 expect(possibleCasesArrayManager.isUnusedCasesEmpty()).to.be.equal(false);
//             }
//             possibleCasesArrayManager.findRandomCase();
//             expect(possibleCasesArrayManager.isUnusedCasesEmpty()).to.be.equal(true);
//         });
//     });
// });
