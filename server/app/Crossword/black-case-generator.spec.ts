// import {} from "jasmine";
// import { expect } from "chai";

// import { BlankGridCreator } from "./blank-grid-creator";
// import { Case } from "./case";
// import { BlackCaseGenerator } from "./black-case-generator";

// describe("Black-case-generator", () => {
//     const MINIMUMWORDLENGTH: number = 2;
//     const HEIGHT: number = 8;
//     const WIDTH: number = 8;
//     let blankGridCreator: BlankGridCreator;
//     blankGridCreator = new BlankGridCreator;
//     const cases: Case[][] = blankGridCreator.createGrid(HEIGHT, WIDTH);

//     const blackCaseGenerator: BlackCaseGenerator = new BlackCaseGenerator(HEIGHT, WIDTH);
//     const pourcentageBlackCases: number = 40;
//     blackCaseGenerator.generateBlackCases(cases, pourcentageBlackCases);

//     describe("Black cases generation", () => {
//         it("Each line should have at least 1 word", () => {
//             let nbWhiteCase: number = 0;
//             let respectConstraint: boolean = false;
//             for (const line of cases) {
//                 for (const block of line) {
//                     if (!block.getIsBlack()) {
//                         if (++nbWhiteCase > MINIMUMWORDLENGTH) {
//                             respectConstraint = true;
//                         }
//                     } else {
//                         nbWhiteCase = 0;
//                     }
//                 }
//             }
//             expect(respectConstraint).to.equal(true);
//         });
//     });
// });
