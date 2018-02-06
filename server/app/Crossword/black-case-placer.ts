import { Case } from "./case";

export class BlackCasePlacer {
    public getColum(grid: Case[][], pos: number): Case[] {
        const column: Case[] = [];
        for (let i: number = 0; i < grid.length; i++) {
            column.push(grid[i][pos]);
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

    // **Currently doesnt allow 2 letters word but could be changed !
    private doesntCreateShortWords(grid: Case[][], line: number, column: number): boolean {
        // Newly created horizontal word length if we place a black case
        const leftWordLength: number = grid[line][column].getHorizontalPositionInWord();
        const rightWordLength: number = grid[line][column].getHorizontalWordLength() - grid[line][column].getHorizontalPositionInWord() - 1;
        const minimumWordLength: number = 2;
        // Making sure that if we create 1 or 2 char horizontal words, they can still form 3+ char word vertically
        if (leftWordLength === 1 || leftWordLength === minimumWordLength) {
            for (let i: number = 1; i <= leftWordLength; i++) {
                if (grid[line][column - i].getVerticalWordLength() < minimumWordLength + 1) {
                    return false;
                }}}
        if (rightWordLength === 1 || rightWordLength === minimumWordLength) {
            for (let i: number = 1; i <= rightWordLength; i++) {
                if (grid[line][column + i].getVerticalWordLength() < minimumWordLength + 1) {
                    return false;
                }}}
        // Newly created vertical word length if we place a black case
        const upperWordLength: number = grid[line][column].getVerticalPositionInWord();
        const lowerWordLength: number = grid[line][column].getVerticalWordLength() - grid[line][column].getVerticalPositionInWord() - 1;
        // Making sure that if we create 1 or 2 char vertical words, they can still form 3+ char word horizontally
        if (upperWordLength === 1 || upperWordLength === minimumWordLength) {
            for (let i: number = 1; i <= upperWordLength; i++) {
                if (grid[line - i][column].getHorizontalWordLength() < minimumWordLength + 1) {
                    return false;
                }}
        }
        if (lowerWordLength === 1 || lowerWordLength === minimumWordLength) {
            for (let i: number = 1; i <= lowerWordLength; i++) {
                if (grid[line + i][column].getHorizontalWordLength() < minimumWordLength + 1) {
                    return false;
                }
            }
        }

        return true;
    }

    private tableHas1Word(table: Case[], pos: number): boolean {
        let nbWhiteCase: number = 0;
        const minimumWordLength: number = 2;

        // Looping on the table to make sure there's at least one word of more than 2 char
        for (let i: number = 0; i < table.length; i++) {
            if (!table[i].getIsBlack() && i !== pos) {
                if (++nbWhiteCase > minimumWordLength) {
                    return true;
                }
            } else {
                nbWhiteCase = 0;
            }
        }

        return false;
    }
}
