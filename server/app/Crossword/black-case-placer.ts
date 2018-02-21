import { Case } from "./case";

const MINIMUMWORDLENGTH: number = 2;

export class BlackCasePlacer {
    public static getColum(grid: Case[][], pos: number): Case[] {
        const column: Case[] = [];
        for (const line of grid) {
            column.push(line[pos]);
        }

        return column;
    }

    public static placeBlackCase(grid: Case[][], line: number, column: number): boolean {
        // We place a black case if the column and line still have at least a word and
        //  if we don't create 1 or 2 char words
        if (this.tableHas1Word(this.getColum(grid, column), line) && this.tableHas1Word(grid[line], column)
            && this.doesntCreateShortWords(grid, line, column)) {
            this.updateCases(grid, line, column);

            return true;
        }

        return false;
    }

    private static updateCases(grid: Case[][], line: number, column: number): void {
        // Update newly created word cases info
        let newWordLength: number = grid[line][column].HorizontalWordLength - grid[line][column].HorizontalPositionInWord - 1;
        for (let i: number = 1; i <= grid[line][column].HorizontalPositionInWord; i++) {
            grid[line][column - i].HorizontalWordLength = grid[line][column].HorizontalPositionInWord;
        }
        for (let i: number = 0; i < newWordLength; i++) {
            grid[line][column + i + 1].HorizontalPositionInWord = i;
            grid[line][column + i + 1].HorizontalWordLength = newWordLength;
        }

        newWordLength = grid[line][column].VerticalWordLength - grid[line][column].VerticalPositionInWord - 1;
        for (let j: number = 1; j <= grid[line][column].VerticalPositionInWord; j++) {
            grid[line - j][column].VerticalWordLength = grid[line][column].VerticalPositionInWord;
        }
        for (let j: number = 0; j < newWordLength; j++) {
            grid[line + j + 1][column].VerticalPositionInWord = j;
            grid[line + j + 1][column].VerticalWordLength = newWordLength;
        }

        // Update the new black case info
        grid[line][column].IsBlack = true;
        grid[line][column].HorizontalPositionInWord = 0;
        grid[line][column].HorizontalWordLength = 0;
        grid[line][column].VerticalPositionInWord = 0;
        grid[line][column].VerticalWordLength = 0;
    }

    private static doesntCreateShortWords(grid: Case[][], line: number, column: number): boolean {
        // Tells if placing a black case at this position will create too short words
        if (this.leftWordTooShort(grid, line, column) || this.rightWordTooShort(grid, line, column)
            || this.upperWordTooShort(grid, line, column) || this.lowerWordTooShort(grid, line, column)) {
            return false;
        }

        return true;
    }

    private static leftWordTooShort(grid: Case[][], line: number, column: number): boolean {
        // Tells if the word formed at the left of the black case will be too short
        const leftWordLength: number = grid[line][column].HorizontalPositionInWord;
        if (leftWordLength === 1 || leftWordLength === MINIMUMWORDLENGTH) {
            for (let i: number = 1; i <= leftWordLength; i++) {
                if (grid[line][column - i].VerticalWordLength < MINIMUMWORDLENGTH + 1) {
                    return true;
                }
            }
        }

        return false;
    }

    private static rightWordTooShort(grid: Case[][], line: number, column: number): boolean {
        // Tells if the word formed at the right of the black case will be too short
        const rightWordLength: number = grid[line][column].HorizontalWordLength - grid[line][column].HorizontalPositionInWord - 1;
        if (rightWordLength === 1 || rightWordLength === MINIMUMWORDLENGTH) {
            for (let i: number = 1; i <= rightWordLength; i++) {
                if (grid[line][column + i].VerticalWordLength < MINIMUMWORDLENGTH + 1) {
                    return true;
                }
            }
        }

        return false;
    }

    private static upperWordTooShort(grid: Case[][], line: number, column: number): boolean {
        // Tells if the word formed above the black case will be too short
        const upperWordLength: number = grid[line][column].VerticalPositionInWord;
        if (upperWordLength === 1 || upperWordLength === MINIMUMWORDLENGTH) {
            for (let i: number = 1; i <= upperWordLength; i++) {
                if (grid[line - i][column].HorizontalWordLength < MINIMUMWORDLENGTH + 1) {
                    return true;
                }
            }
        }

        return false;
    }

    private static lowerWordTooShort(grid: Case[][], line: number, column: number): boolean {
        // Tells if the word formed under the black case will be too short
        const lowerWordLength: number = grid[line][column].VerticalWordLength - grid[line][column].VerticalPositionInWord - 1;
        if (lowerWordLength === 1 || lowerWordLength === MINIMUMWORDLENGTH) {
            for (let i: number = 1; i <= lowerWordLength; i++) {
                if (grid[line + i][column].HorizontalWordLength < MINIMUMWORDLENGTH + 1) {
                    return true;
                }
            }
        }

        return false;
    }

    private static tableHas1Word(table: Case[], position: number): boolean {
        // Tells if the table will still have at least one word after you set the case at pos black
        let nbWhiteCase: number = 0;

        // Looping on the table to make sure there's at least one word of more than 2 char
        for (let i: number = 0; i < table.length; i++) {
            if (!table[i].IsBlack && i !== position) {
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
