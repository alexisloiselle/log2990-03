import { Case } from "./case";
import { Word, Direction } from "./word";
import { Lexicon } from "../lexicon/lexicon";

export class WordPlacer {

    private lexicon: Lexicon;

    constructor() {
        this.lexicon = new Lexicon("app/englishWords.txt");
    }

    public identifyConstraint(grid: Case[][]): void {
        // Set isAConstraint attribute to true for all the cases that are part of 2 words
        const minimumWordLength: number = 2;
        for (const line of grid) {
            for (const position of line) {
                if (position.getHorizontalWordLength() > minimumWordLength && position.getVerticalWordLength() > minimumWordLength) {
                    position.setIsAConstraint(true);
                }
            }
        }
    }

    public fitWord(grid: Case[][], wordsInGrid: Word[], pos: number): boolean {
        // Recursive algo to place words in all the slot in the grid
        const sameLengthWords: string[] = this.lexicon.getWordsByLength(wordsInGrid[pos].getLength());
        for (const word of sameLengthWords) {
            if (this.placeWord(grid, wordsInGrid[pos], word)) {
                if (pos + 1 === wordsInGrid.length || this.fitWord(grid, wordsInGrid, pos + 1)) {
                    return true;
                } else {
                    this.removeWord(grid, wordsInGrid[pos]);
                }
            }
        }

        return false;
    }

    public placeWord(grid: Case[][], gridWord: Word, wordToAdd: string): boolean {
        // Places the word in the grid if all constraints are compliant
        if (gridWord.getLength() === wordToAdd.length) {
            let line: number = gridWord.getLine();
            let column: number = gridWord.getColumn();
             // Make sure the word respects the constraints
            for (const char of wordToAdd) {
                if (grid[line][column].getIsAConstraint() && grid[line][column].getRightLetter() !== ""
                && grid[line][column].getRightLetter() !== char) {
                    return false;
                }
                if (gridWord.getOrientation() === Direction.Horizontal) {
                    column++;
                } else if (gridWord.getOrientation() === Direction.Vertical) {
                    line++;
                }
            }
            line = gridWord.getLine();
            column = gridWord.getColumn();
            // If so, we place it
            for (const char of wordToAdd) {
                grid[line][column].setRightLetter(char);
                if (gridWord.getOrientation() === Direction.Horizontal) {
                    column++;
                } else if (gridWord.getOrientation() === Direction.Vertical) {
                    line++;
                }
            }

            return true;
        }

        return false;
    }

    public removeWord(grid: Case[][], word: Word): void {
        // Removes all the chars of the word that arent part of a word in the other orientation from the grid
        const line: number = word.getLine();
        const column: number = word.getColumn();
        if (word.getOrientation() === Direction.Horizontal) {
            for (let i: number = 0; i < word.getLength(); i++) {
                if (this.charPartOfVerticalWord(grid, line, column + i)) {
                    continue;
                }
                grid[line][column + i].setRightLetter("");
            }
        } else if (word.getOrientation() === Direction.Vertical) {
            for (let i: number = 0; i < word.getLength(); i++) {
                if (this.charPartOfHorizontalWord(grid, line + i, column)) {
                    continue;
                }
                grid[line + i][column].setRightLetter("");
            }
        }
    }

    private charPartOfVerticalWord(grid: Case[][], line: number, column: number): boolean {
        // Tells if the char at this position is part of a vertical word
        return (grid[line][column].getIsAConstraint()
        && ((grid[line][column].getVerticalPositionInWord() !== 0
            && grid[line - 1][column].getRightLetter() !== "")
        || (grid[line][column].getVerticalPositionInWord() !== grid[line][column].getVerticalWordLength() - 1
            && grid[line + 1][column].getRightLetter() !== "")));
    }

    private charPartOfHorizontalWord(grid: Case[][], line: number, column: number): boolean {
        // Tells if the char at this position is part of a horizontal word
        return (grid[line][column].getIsAConstraint()
        && ((grid[line][column].getHorizontalPositionInWord() !== 0
            && grid[line][column - 1].getRightLetter() !== "")
        || (grid[line][column].getHorizontalPositionInWord() !== grid[line][column].getHorizontalWordLength() - 1
            && grid[line][column + 1].getRightLetter() !== "")));
    }

}
