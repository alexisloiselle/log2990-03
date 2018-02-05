import {} from "jasmine";
import { expect } from "chai";

import { GridScanner } from "./grid-scanner";
import { Case } from "./case";
import { BlankGridCreator } from "./blank-grid-creator";
import { Word } from "./word";

describe("Grid Scanner", () => {
    const blankGridCreator: BlankGridCreator = new BlankGridCreator();
    const dimension: number = 8;
    let grid: Case[][] = blankGridCreator.createGrid(dimension, dimension);

    //Black Case setup
    grid[0][0].setIsBlack(true);
    grid[0][1].setIsBlack(true);
    grid[0][5].setIsBlack(true);
    grid[1][0].setIsBlack(true);
    grid[2][0].setIsBlack(true);
    grid[2][1].setIsBlack(true);
    grid[2][2].setIsBlack(true);
    grid[2][3].setIsBlack(true);
    grid[2][4].setIsBlack(true);
    grid[3][5].setIsBlack(true);
    grid[3][7].setIsBlack(true);
    grid[4][0].setIsBlack(true);
    grid[4][1].setIsBlack(true);
    grid[4][3].setIsBlack(true);
    grid[5][6].setIsBlack(true);
    grid[5][7].setIsBlack(true);
    grid[6][4].setIsBlack(true);
    grid[7][2].setIsBlack(true);
    grid[7][6].setIsBlack(true);
    grid[7][7].setIsBlack(true);
    
    const positionOfFirstLetter: number = 0;
    //Horizontal words
    grid[0][2].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[0][2].setHorizontalWordLength(3);
    grid[0][6].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[0][6].setHorizontalWordLength(2);
    grid[1][1].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[1][1].setHorizontalWordLength(7);
    grid[2][5].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[2][5].setHorizontalWordLength(3);
    grid[3][0].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[3][0].setHorizontalWordLength(5);
    grid[3][6].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[3][6].setHorizontalWordLength(1);
    grid[4][2].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[4][2].setHorizontalWordLength(1);
    grid[4][4].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[4][4].setHorizontalWordLength(4);
    grid[5][0].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[5][0].setHorizontalWordLength(6);
    grid[6][0].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[6][0].setHorizontalWordLength(4);
    grid[6][5].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[6][5].setHorizontalWordLength(3);
    grid[7][0].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[7][0].setHorizontalWordLength(2);
    grid[7][3].setHorizontalPositionInWord(positionOfFirstLetter);
    grid[7][3].setHorizontalWordLength(3);

    //Vertical words
    grid[0][3].setVerticalPositionInWord(positionOfFirstLetter);
    grid[0][3].setVerticalWordLength(1);
    grid[0][5].setVerticalPositionInWord(positionOfFirstLetter);
    grid[0][5].setVerticalWordLength(3);
    grid[1][1].setVerticalPositionInWord(positionOfFirstLetter);
    grid[1][1].setVerticalWordLength(1);
    grid[1][3].setVerticalPositionInWord(positionOfFirstLetter);
    grid[1][3].setVerticalWordLength(1);
    grid[1][5].setVerticalPositionInWord(positionOfFirstLetter);
    grid[1][5].setVerticalWordLength(3);
    grid[2][1].setVerticalPositionInWord(positionOfFirstLetter);
    grid[2][1].setVerticalWordLength(2);
    grid[2][3].setVerticalPositionInWord(positionOfFirstLetter);
    grid[2][3].setVerticalWordLength(4);
    grid[3][0].setVerticalPositionInWord(positionOfFirstLetter);
    grid[3][0].setVerticalWordLength(2);
    grid[3][3].setVerticalPositionInWord(positionOfFirstLetter);
    grid[3][3].setVerticalWordLength(1);
    grid[3][5].setVerticalPositionInWord(positionOfFirstLetter);
    grid[3][5].setVerticalWordLength(3);
    grid[4][0].setVerticalPositionInWord(positionOfFirstLetter);
    grid[4][0].setVerticalWordLength(2);
    grid[4][3].setVerticalPositionInWord(positionOfFirstLetter);
    grid[4][3].setVerticalWordLength(3);
    grid[4][7].setVerticalPositionInWord(positionOfFirstLetter);
    grid[4][7].setVerticalWordLength(1);
    grid[5][1].setVerticalPositionInWord(positionOfFirstLetter);
    grid[5][1].setVerticalWordLength(2);
    grid[5][4].setVerticalPositionInWord(positionOfFirstLetter);
    grid[5][4].setVerticalWordLength(4);
    grid[6][0].setVerticalPositionInWord(positionOfFirstLetter);
    grid[6][0].setVerticalWordLength(5);
    grid[6][6].setVerticalPositionInWord(positionOfFirstLetter);
    grid[6][6].setVerticalWordLength(1);
    grid[7][0].setVerticalPositionInWord(positionOfFirstLetter);
    grid[7][0].setVerticalWordLength(3);
    grid[7][4].setVerticalPositionInWord(positionOfFirstLetter);
    grid[7][4].setVerticalWordLength(1);
    grid[7][6].setVerticalPositionInWord(positionOfFirstLetter);
    grid[7][6].setVerticalWordLength(1);

    describe("Find Words", () => {
        let gridScanner: GridScanner = new GridScanner();
        let words: Word[] = gridScanner.findWords(grid);
        for(let i: number = 0; i < words.length; i++){
            console.log(words[i].getLine());
            console.log(words[i].getColumn());
            console.log(words[i].getIsHorizontal());
            console.log(words[i].getLength())
        }
        it("Should have the right number of words", () => {
            expect(words.length).to.be.equal(17);
        });
    });

});