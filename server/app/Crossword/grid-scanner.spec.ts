import {} from "jasmine";
import { expect } from "chai";

import { BlankGridCreator } from "./blank-grid-creator";
import { Case } from "./case";
import { GridScanner } from "./grid-scanner";
import { Word } from "./word";

/* tslint:disable:no-magic-numbers */
describe("Grid Scanner", () => {
    const DIMENSION: number = 8;
    const grid: Case[][] = BlankGridCreator.createGrid(DIMENSION, DIMENSION);

    // Black Case setup
    grid[0][0].IsBlack = true;
    grid[0][1].IsBlack = true;
    grid[0][5].IsBlack = true;
    grid[1][0].IsBlack = true;
    grid[2][0].IsBlack = true;
    grid[2][1].IsBlack = true;
    grid[2][2].IsBlack = true;
    grid[2][3].IsBlack = true;
    grid[2][4].IsBlack = true;
    grid[3][5].IsBlack = true;
    grid[3][7].IsBlack = true;
    grid[4][0].IsBlack = true;
    grid[4][1].IsBlack = true;
    grid[4][3].IsBlack = true;
    grid[5][6].IsBlack = true;
    grid[5][7].IsBlack = true;
    grid[6][4].IsBlack = true;
    grid[7][2].IsBlack = true;
    grid[7][6].IsBlack = true;
    grid[7][7].IsBlack = true;

    // Horizontal words
    grid[0][2].HorizontalPositionInWord = 0;
    grid[0][2].HorizontalWordLength = 3;
    grid[0][6].HorizontalPositionInWord = 0;
    grid[0][6].HorizontalWordLength = 2;
    grid[1][1].HorizontalPositionInWord = 0;
    grid[1][1].HorizontalWordLength = 7;
    grid[2][5].HorizontalPositionInWord = 0;
    grid[2][5].HorizontalWordLength = 3;
    grid[3][0].HorizontalPositionInWord = 0;
    grid[3][0].HorizontalWordLength = 5;
    grid[3][6].HorizontalPositionInWord = 0;
    grid[3][6].HorizontalWordLength = 1;
    grid[4][2].HorizontalPositionInWord = 0;
    grid[4][2].HorizontalWordLength = 1;
    grid[4][4].HorizontalPositionInWord = 0;
    grid[4][4].HorizontalWordLength = 4;
    grid[5][0].HorizontalPositionInWord = 0;
    grid[5][0].HorizontalWordLength = 6;
    grid[6][0].HorizontalPositionInWord = 0;
    grid[6][0].HorizontalWordLength = 4;
    grid[6][5].HorizontalPositionInWord = 0;
    grid[6][5].HorizontalWordLength = 3;
    grid[7][0].HorizontalPositionInWord = 0;
    grid[7][0].HorizontalWordLength = 2;
    grid[7][3].HorizontalPositionInWord = 0;
    grid[7][3].HorizontalWordLength = 3;

    // Vertical words
    grid[0][3].VerticalPositionInWord = 0;
    grid[0][3].VerticalWordLength = 1;
    grid[0][5].VerticalPositionInWord = 0;
    grid[0][5].VerticalWordLength = 3;
    grid[1][1].VerticalPositionInWord = 0;
    grid[1][1].VerticalWordLength = 1;
    grid[1][3].VerticalPositionInWord = 0;
    grid[1][3].VerticalWordLength = 1;
    grid[1][5].VerticalPositionInWord = 0;
    grid[1][5].VerticalWordLength = 3;
    grid[2][1].VerticalPositionInWord = 0;
    grid[2][1].VerticalWordLength = 2;
    grid[2][3].VerticalPositionInWord = 0;
    grid[2][3].VerticalWordLength = 4;
    grid[3][0].VerticalPositionInWord = 0;
    grid[3][0].VerticalWordLength = 2;
    grid[3][3].VerticalPositionInWord = 0;
    grid[3][3].VerticalWordLength = 1;
    grid[3][5].VerticalPositionInWord = 0;
    grid[3][5].VerticalWordLength = 3;
    grid[4][0].VerticalPositionInWord = 0;
    grid[4][0].VerticalWordLength = 2;
    grid[4][3].VerticalPositionInWord = 0;
    grid[4][3].VerticalWordLength = 3;
    grid[4][7].VerticalPositionInWord = 0;
    grid[4][7].VerticalWordLength = 1;
    grid[5][1].VerticalPositionInWord = 0;
    grid[5][1].VerticalWordLength = 2;
    grid[5][4].VerticalPositionInWord = 0;
    grid[5][4].VerticalWordLength = 4;
    grid[6][0].VerticalPositionInWord = 0;
    grid[6][0].VerticalWordLength = 5;
    grid[6][6].VerticalPositionInWord = 0;
    grid[6][6].VerticalWordLength = 1;
    grid[7][0].VerticalPositionInWord = 0;
    grid[7][0].VerticalWordLength = 3;
    grid[7][4].VerticalPositionInWord = 0;
    grid[7][4].VerticalWordLength = 1;
    grid[7][6].VerticalPositionInWord = 0;
    grid[7][6].VerticalWordLength = 1;

    describe("Find Words", () => {
        const words: Word[] = GridScanner.findWords(grid);
        it("Should have the right number of words", () => {
            const expectedNumberOfWords: number = 17;
            expect(words.length).to.be.equal(expectedNumberOfWords);
        });
    });

});
