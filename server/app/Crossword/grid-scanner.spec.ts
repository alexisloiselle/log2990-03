import {} from "jasmine";
import { expect } from "chai";

import { BlankGridCreator } from "./blank-grid-creator";
import { Case } from "./case";
import { GridScanner } from "./grid-scanner";
import { Word } from "./word";

describe("Grid Scanner", () => {
    const blankGridCreator: BlankGridCreator = new BlankGridCreator();
    const DIMENSION: number = 8;
    const grid: Case[][] = blankGridCreator.createGrid(DIMENSION, DIMENSION);

    // Black Case setup
    const line0: number = 0;
    const column0: number = 0;
    grid[line0][column0].IsBlack = true;

    const column1: number = 1;
    grid[line0][column1].IsBlack = true;

    const column5: number = 5;
    grid[line0][column5].IsBlack = true;

    const line1: number = 1;
    grid[line1][column0].IsBlack = true;

    const line2: number = 2;
    grid[line2][column0].IsBlack = true;

    grid[line2][column1].IsBlack = true;

    const column2: number = 2;
    grid[line2][column2].IsBlack = true;

    const column3: number = 3;
    grid[line2][column3].IsBlack = true;

    const column4: number = 4;
    grid[line2][column4].IsBlack = true;

    const line3: number = 3;
    grid[line3][column5].IsBlack = true;

    const column7: number = 7;
    grid[line3][column7].IsBlack = true;

    const line4: number = 4;
    grid[line4][column0].IsBlack = true;
    grid[line4][column1].IsBlack = true;
    grid[line4][column3].IsBlack = true;

    const line5: number = 5;
    const column6: number = 6;
    grid[line5][column6].IsBlack = true;
    grid[line5][column7].IsBlack = true;

    const line6: number = 6;
    grid[line6][column4].IsBlack = true;

    const line7: number = 7;
    grid[line7][column2].IsBlack = true;
    grid[line7][column6].IsBlack = true;
    grid[line7][column7].IsBlack = true;

    // Horizontal words
    const positionOfFirstLetter: number = 0;
    grid[line0][column2].HorizontalPositionInWord = (positionOfFirstLetter);
    const threeLetters: number = 3;
    grid[line0][column2].HorizontalWordLength = (threeLetters);

    grid[line0][column6].HorizontalPositionInWord = (positionOfFirstLetter);
    const twoLetters: number = 2;
    grid[line0][column6].HorizontalWordLength = (twoLetters);

    grid[line1][column1].HorizontalPositionInWord = (positionOfFirstLetter);
    const sevenLetters: number = 7;
    grid[line1][column1].HorizontalWordLength = (sevenLetters);

    grid[line2][column5].HorizontalPositionInWord = (positionOfFirstLetter);
    grid[line2][column5].HorizontalWordLength = (threeLetters);

    grid[line3][column0].HorizontalPositionInWord = (positionOfFirstLetter);
    const fiveLetters: number = 5;
    grid[line3][column0].HorizontalWordLength = (fiveLetters);

    grid[line3][column6].HorizontalPositionInWord = (positionOfFirstLetter);
    const oneLetter: number = 1;
    grid[line3][column6].HorizontalWordLength = (oneLetter);

    grid[line4][column2].HorizontalPositionInWord = (positionOfFirstLetter);
    grid[line4][column2].HorizontalWordLength = (oneLetter);

    grid[line4][column4].HorizontalPositionInWord = (positionOfFirstLetter);
    const fourLetters: number = 4;
    grid[line4][column4].HorizontalWordLength = (fourLetters);

    grid[line5][column0].HorizontalPositionInWord = (positionOfFirstLetter);
    const sixLetters: number = 6;
    grid[line5][column0].HorizontalWordLength = (sixLetters);

    grid[line6][column0].HorizontalPositionInWord = (positionOfFirstLetter);
    grid[line6][column0].HorizontalWordLength = (fourLetters);

    grid[line6][column5].HorizontalPositionInWord = (positionOfFirstLetter);
    grid[line6][column5].HorizontalWordLength = (threeLetters);

    grid[line7][column0].HorizontalPositionInWord = (positionOfFirstLetter);
    grid[line7][column0].HorizontalWordLength = (twoLetters);

    grid[line7][column3].HorizontalPositionInWord = (positionOfFirstLetter);
    grid[line7][column3].HorizontalWordLength = (threeLetters);

    // Vertical words
    grid[line0][column3].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line0][column3].VerticalWordLength = (oneLetter);

    grid[line0][column5].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line0][column5].VerticalWordLength = (threeLetters);

    grid[line1][column1].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line1][column1].VerticalWordLength = (oneLetter);

    grid[line1][column3].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line1][column3].VerticalWordLength = (oneLetter);

    grid[line1][column5].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line1][column5].VerticalWordLength = (threeLetters);

    grid[line2][column1].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line2][column1].VerticalWordLength = (twoLetters);

    grid[line2][column3].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line2][column3].VerticalWordLength = (fourLetters);

    grid[line3][column0].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line3][column0].VerticalWordLength = (twoLetters);

    grid[line3][column3].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line3][column3].VerticalWordLength = (oneLetter);

    grid[line3][column5].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line3][column5].VerticalWordLength = (threeLetters);

    grid[line4][column0].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line4][column0].VerticalWordLength = (twoLetters);

    grid[line4][column3].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line4][column3].VerticalWordLength = (threeLetters);

    grid[line4][column7].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line4][column7].VerticalWordLength = (oneLetter);

    grid[line5][column1].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line5][column1].VerticalWordLength = (twoLetters);

    grid[line5][column4].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line5][column4].VerticalWordLength = (fourLetters);

    grid[line6][column0].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line6][column0].VerticalWordLength = (fiveLetters);

    grid[line6][column6].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line6][column6].VerticalWordLength = (oneLetter);

    grid[line7][column0].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line7][column0].VerticalWordLength = (threeLetters);

    grid[line7][column4].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line7][column4].VerticalWordLength = (oneLetter);

    grid[line7][column6].VerticalPositionInWord = (positionOfFirstLetter);
    grid[line7][column6].VerticalWordLength = (oneLetter);

    describe("Find Words", () => {
        const words: Word[] = GridScanner.findWords(grid);
        it("Should have the right number of words", () => {
            const expectedNumberOfWords: number = 17;
            expect(words.length).to.be.equal(expectedNumberOfWords);
        });
    });

});
