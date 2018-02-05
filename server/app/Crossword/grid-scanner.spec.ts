import {} from "jasmine";
import { expect } from "chai";

import { GridScanner } from "./grid-scanner";
import { Case } from "./case";
import { BlankGridCreator } from "./blank-grid-creator";
import { Word } from "./word";

describe("Grid Scanner", () => {
    const blankGridCreator: BlankGridCreator = new BlankGridCreator();
    const dimension: number = 8;
    const grid: Case[][] = blankGridCreator.createGrid(dimension, dimension);

    // Black Case setup
    const line0: number = 0;
    const column0: number = 0;
    grid[line0][column0].setIsBlack(true);

    const column1: number = 1;
    grid[line0][column1].setIsBlack(true);

    const column5: number = 5;
    grid[line0][column5].setIsBlack(true);

    const line1: number = 1;
    grid[line1][column0].setIsBlack(true);

    const line2: number = 2;
    grid[line2][column0].setIsBlack(true);

    grid[line2][column1].setIsBlack(true);

    const column2: number = 2;
    grid[line2][column2].setIsBlack(true);

    const column3: number = 3;
    grid[line2][column3].setIsBlack(true);

    const column4: number = 4;
    grid[line2][column4].setIsBlack(true);

    const line3: number = 3;
    grid[line3][column5].setIsBlack(true);

    const column7: number = 7;
    grid[line3][column7].setIsBlack(true);

    const line4: number = 4;
    grid[line4][column0].setIsBlack(true);
    grid[line4][column1].setIsBlack(true);
    grid[line4][column3].setIsBlack(true);

    const line5: number = 5;
    const column6: number = 6;
    grid[line5][column6].setIsBlack(true);
    grid[line5][column7].setIsBlack(true);

    const line6: number = 6;
    grid[line6][column4].setIsBlack(true);

    const line7: number = 7;
    grid[line7][column2].setIsBlack(true);
    grid[line7][column6].setIsBlack(true);
    grid[line7][column7].setIsBlack(true);

    // Horizontal words
    const positionOfFirstLetter: number = 0;
    grid[line0][column2].setHorizontalPositionInWord(positionOfFirstLetter);
    const threeLetters: number = 3;
    grid[line0][column2].setHorizontalWordLength(threeLetters);

    grid[line0][column6].setHorizontalPositionInWord(positionOfFirstLetter);
    const twoLetters: number = 2;
    grid[line0][column6].setHorizontalWordLength(twoLetters);

    grid[line1][column1].setHorizontalPositionInWord(positionOfFirstLetter);
    const sevenLetters: number = 7;
    grid[line1][column1].setHorizontalWordLength(sevenLetters);

    grid[line2][column5].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[line2][column5].setHorizontalWordLength(threeLetters);

    grid[line3][column0].setHorizontalPositionInWord(positionOfFirstLetter);
    const fiveLetters: number = 5;
    grid[line3][column0].setHorizontalWordLength(fiveLetters);

    grid[line3][column6].setHorizontalPositionInWord(positionOfFirstLetter);
    const oneLetter: number = 1;
    grid[line3][column6].setHorizontalWordLength(oneLetter);

    grid[line4][column2].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[line4][column2].setHorizontalWordLength(oneLetter);

    grid[line4][column4].setHorizontalPositionInWord(positionOfFirstLetter);
    const fourLetters: number = 4;
    grid[line4][column4].setHorizontalWordLength(fourLetters);

    grid[line5][column0].setHorizontalPositionInWord(positionOfFirstLetter);
    const sixLetters: number = 6;
    grid[line5][column0].setHorizontalWordLength(sixLetters);

    grid[line6][column0].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[line6][column0].setHorizontalWordLength(fourLetters);

    grid[line6][column5].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[line6][column5].setHorizontalWordLength(threeLetters);

    grid[line7][column0].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[line7][column0].setHorizontalWordLength(twoLetters);

    grid[line7][column3].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[line7][column3].setHorizontalWordLength(threeLetters);

    // Vertical words
    grid[line0][column3].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line0][column3].setVerticalWordLength(oneLetter);

    grid[line0][column5].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line0][column5].setVerticalWordLength(threeLetters);

    grid[line1][column1].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line1][column1].setVerticalWordLength(oneLetter);

    grid[line1][column3].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line1][column3].setVerticalWordLength(oneLetter);

    grid[line1][column5].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line1][column5].setVerticalWordLength(threeLetters);

    grid[line2][column1].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line2][column1].setVerticalWordLength(twoLetters);

    grid[line2][column3].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line2][column3].setVerticalWordLength(fourLetters);

    grid[line3][column0].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line3][column0].setVerticalWordLength(twoLetters);

    grid[line3][column3].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line3][column3].setVerticalWordLength(oneLetter);

    grid[line3][column5].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line3][column5].setVerticalWordLength(threeLetters);

    grid[line4][column0].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line4][column0].setVerticalWordLength(twoLetters);

    grid[line4][column3].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line4][column3].setVerticalWordLength(threeLetters);

    grid[line4][column7].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line4][column7].setVerticalWordLength(oneLetter);

    grid[line5][column1].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line5][column1].setVerticalWordLength(twoLetters);

    grid[line5][column4].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line5][column4].setVerticalWordLength(fourLetters);

    grid[line6][column0].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line6][column0].setVerticalWordLength(fiveLetters);

    grid[line6][column6].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line6][column6].setVerticalWordLength(oneLetter);

    grid[line7][column0].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line7][column0].setVerticalWordLength(threeLetters);

    grid[line7][column4].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line7][column4].setVerticalWordLength(oneLetter);

    grid[line7][column6].setVerticalPositionInWord(positionOfFirstLetter);
    grid[line7][column6].setVerticalWordLength(oneLetter);

    describe("Find Words", () => {
        const gridScanner: GridScanner = new GridScanner();
        const words: Word[] = gridScanner.findWords(grid);
        it("Should have the right number of words", () => {
            const expectedNumberOfWords: number = 17;
            expect(words.length).to.be.equal(expectedNumberOfWords);
        });
    });

});
