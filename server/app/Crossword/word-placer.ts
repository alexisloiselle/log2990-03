import { Case } from "./case";
import { Word } from "./word";
import { Lexicon } from "../lexicon/lexicon";

export class WordPlacer {

    public lexicon: Lexicon;

    constructor() {
        this.lexicon = new Lexicon("app/englishWords.txt");
    }

    public identifyConstraint(grid: Case[][]): void {
        const minimumWordLength: number = 2;
        for (let i: number = 0; i < grid.length; i++) {
            for (let j: number = 0; j < grid[0].length; j++) {
                if (grid[i][j].getHorizontalWordLength() > minimumWordLength && grid[i][j].getVerticalWordLength() > minimumWordLength) {
                    grid[i][j].setConstraint(true);
                }
            }
        }
    }

    public fitWord(grid: Case[][], wordsInGrid: Word[], pos: number): boolean {
        const sameLengthWords: string[] = this.lexicon.getWordsByLength(wordsInGrid[pos].getLength());
        for (let i: number = 0; i < sameLengthWords.length; i++) {
            if (this.placeWord(grid, wordsInGrid[pos], sameLengthWords[i])) {
                if (pos + 1 === wordsInGrid.length || this.fitWord(grid, wordsInGrid, pos + 1)) {
                    return true;
                } else {
                    this.removeWord(grid, wordsInGrid[pos]);
                }
            }
        }

        return false;
    }

    private placeWord(grid: Case[][], gridWord: Word, wordToAdd: string): boolean {
        if (gridWord.getLength() === wordToAdd.length) {
            let line: number = gridWord.getLine();
            let column: number = gridWord.getColumn();
             // Make sure the word respects the constraints
            for (let i: number = 0; i < wordToAdd.length; i++) {
                if (grid[line][column].getIsAConstraint() && grid[line][column].getRightLetter() !== ""
                && grid[line][column].getRightLetter() !== wordToAdd[i]) {
                    return false;
                }
                if (gridWord.getIsHorizontal()) {
                    column++;
                } else {
                    line++;
                }
            }
            line = gridWord.getLine();
            column = gridWord.getColumn();
            // If so, we place it
            for (let i: number = 0; i < wordToAdd.length; i++) {
                grid[line][column].setRightLetter(wordToAdd[i]);
                if (gridWord.getIsHorizontal()) {
                    column++;
                } else {
                    line++;
                }
            }

            return true;
        }

        return false;
    }

    private removeWord(grid: Case[][], word: Word): void {
        const line: number = word.getLine();
        const column: number = word.getColumn();
        if (word.getIsHorizontal()) {
            for (let i: number = 0; i < word.getLength(); i++) {
                if (grid[line][column + i].getIsAConstraint()) {
                    if ((grid[line][column + i].getVerticalPositionInWord() !== 0 &&
                        grid[line - 1][column + i].getRightLetter() !== "") ||
                        (grid[line][column + i].getVerticalPositionInWord() !== grid[line][column + i].getVerticalWordLength() - 1 &&
                        grid[line + 1][column + i].getRightLetter() !== "")) {
                        continue;
                    }
                }
                grid[line][column + i].setRightLetter("");
            }
        } else {
            for (let i: number = 0; i < word.getLength(); i++) {
                if (grid[line + i][column].getIsAConstraint()) {
                    if ((grid[line + i][column].getHorizontalPositionInWord() !== 0 &&
                    grid[line + i][column - 1].getRightLetter() !== "") ||
                    (grid[line + i][column].getHorizontalPositionInWord() !== grid[line + i][column].getHorizontalWordLength() - 1 &&
                    grid[line + i][column + 1].getRightLetter() !== "")) {
                        continue;
                    }
                }
                grid[line + i][column].setRightLetter("");
            }
        }
    }

}
