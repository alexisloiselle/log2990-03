import { Case } from "./case";

const MINIMUMWORDLENGTH: number = 2;

export class BlackCasePlacer {
    public getColum(grid: Case[][], pos: number): Case[] {
        const column: Case[] = [];
        for (const line of grid) {
            column.push(line[pos]);
        }

        return column;
    }

    public placeBlackCase(grid: Case[][], line: number, column: number): boolean {
        // We place a black case if the column and line still have at least a word and
        //  if we don't create 1 or 2 char words
        if (this.tableHas1Word(this.getColum(grid, column), line) && this.tableHas1Word(grid[line], column)
        && this.doesntCreateShortWords(grid, line, column)) {
            this.updateCases(grid, line, column);

            return true;
        }

        return false;
    }

    private updateCases(grid: Case[][], line: number, column: number): void {
        // Update newly created word cases info
        let newWordLength: number = grid[line][column].getHorizontalWordLength() - grid[line][column].getHorizontalPositionInWord() - 1;
        for (let i: number = 1; i <= grid[line][column].getHorizontalPositionInWord(); i++) {
            grid[line][column - i].setHorizontalWordLength(grid[line][column].getHorizontalPositionInWord());
        }
        for (let i: number = 0; i < newWordLength; i++) {
            grid[line][column + i + 1].setHorizontalPositionInWord(i);
            grid[line][column + i + 1].setHorizontalWordLength(newWordLength);
        }

        newWordLength = grid[line][column].getVerticalWordLength() - grid[line][column].getVerticalPositionInWord() - 1;
        for (let j: number = 1; j <= grid[line][column].getVerticalPositionInWord(); j++) {
            grid[line - j][column].setVerticalWordLength(grid[line][column].getVerticalPositionInWord());
        }
        for (let j: number = 0; j < newWordLength; j++) {
            grid[line + j + 1][column].setVerticalPositionInWord(j);
            grid[line + j + 1][column].setVerticalWordLength(newWordLength);
        }

        // Update the new black case info
        grid[line][column].setIsBlack(true);
        grid[line][column].setHorizontalPositionInWord(0);
        grid[line][column].setHorizontalWordLength(0);
        grid[line][column].setVerticalPositionInWord(0);
        grid[line][column].setVerticalWordLength(0);
    }

    private doesntCreateShortWords(grid: Case[][], line: number, column: number): boolean {
        // Tells if placing a black case at this position will create too short words
        if (this.leftWordTooShort(grid, line, column) || this.rightWordTooShort(grid, line, column)
        || this.upperWordTooShort(grid, line, column) || this.lowerWordTooShort(grid, line, column)) {
            return false;
        }

        return true;
    }

    private leftWordTooShort(grid: Case[][], line: number, column: number): boolean {
        // Tells if the word formed at the left of the black case will be too short
        const leftWordLength: number = grid[line][column].getHorizontalPositionInWord();
        if (leftWordLength === 1 || leftWordLength === MINIMUMWORDLENGTH) {
            for (let i: number = 1; i <= leftWordLength; i++) {
                if (grid[line][column - i].getVerticalWordLength() < MINIMUMWORDLENGTH + 1) {
                    return true;
                }
            }
        }

        return false;
    }

    private rightWordTooShort(grid: Case[][], line: number, column: number): boolean {
        // Tells if the word formed at the right of the black case will be too short
        const rightWordLength: number = grid[line][column].getHorizontalWordLength() - grid[line][column].getHorizontalPositionInWord() - 1;
        if (rightWordLength === 1 || rightWordLength === MINIMUMWORDLENGTH) {
            for (let i: number = 1; i <= rightWordLength; i++) {
                if (grid[line][column + i].getVerticalWordLength() < MINIMUMWORDLENGTH + 1) {
                    return true;
                }
            }
        }

        return false;
    }

    private upperWordTooShort(grid: Case[][], line: number, column: number): boolean {
        // Tells if the word formed above the black case will be too short
        const upperWordLength: number = grid[line][column].getVerticalPositionInWord();
        if (upperWordLength === 1 || upperWordLength === MINIMUMWORDLENGTH) {
            for (let i: number = 1; i <= upperWordLength; i++) {
                if (grid[line - i][column].getHorizontalWordLength() < MINIMUMWORDLENGTH + 1) {
                    return true;
                }
            }
        }

        return false;
    }

    private lowerWordTooShort(grid: Case[][], line: number, column: number): boolean {
        // Tells if the word formed under the black case will be too short
        const lowerWordLength: number = grid[line][column].getVerticalWordLength() - grid[line][column].getVerticalPositionInWord() - 1;
        if (lowerWordLength === 1 || lowerWordLength === MINIMUMWORDLENGTH) {
            for (let i: number = 1; i <= lowerWordLength; i++) {
                if (grid[line + i][column].getHorizontalWordLength() < MINIMUMWORDLENGTH + 1) {
                    return true;
                }
            }
        }

        return false;
    }

    private tableHas1Word(table: Case[], position: number): boolean {
        // Tells if the table will still have at least one word after you set the case at pos black
        let nbWhiteCase: number = 0;

        // Looping on the table to make sure there's at least one word of more than 2 char
        for (let i: number = 0; i < table.length; i++) {
            if (!table[i].getIsBlack() && i !== position) {
                if (++nbWhiteCase > MINIMUMWORDLENGTH) {
                    return true;
                }
            } else {
                nbWhiteCase = 0;
            }
        }

        return false;
    }
}
