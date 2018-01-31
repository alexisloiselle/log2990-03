import { Case } from "./case";
import { PossibleCasesArrayManager } from "./possible-cases-array-manager";

export class BlackCasePlacer {
    private possibleCasesArrayManager: PossibleCasesArrayManager;

    constructor(numberOfLine: number, numberOfColumns: number) {
        this.possibleCasesArrayManager = new PossibleCasesArrayManager(numberOfLine, numberOfColumns);
    }

    public getColum(grid: Case[][], pos: number) {
        const column = [];
        for (let i = 0; i < grid.length; i++) {
            column.push(grid[i][pos]);
        }
        return column;
    }

    public generateBlackCases(grid: Case[][], percent: number) {
        const maxNumberOfCases = percent / 100 * grid.length * grid[0].length;

        for (let i: number = 0; i < maxNumberOfCases; i++) {
            let caseIsFound: boolean = false;
            while (!caseIsFound && !this.possibleCasesArrayManager.isArrayEmpty()) {
                const position: [number, number] = this.possibleCasesArrayManager.findRandomCase();
                caseIsFound = this.placeBlackCase(grid, position[0], position[1]);
            }
            if (this.possibleCasesArrayManager.isArrayEmpty()) {
                break;
            }
        }
    }

    public placeBlackCase(grid: Case[][], line: number, row: number): boolean {
        // We place a black case if the row and line still have at least a word and
        //  if we don't create 1 or 2 char words
        if (this.tableHas1Word(this.getColum(grid, row), line) && this.tableHas1Word(grid[line], row)
        && this.doesntCreateShortWords(grid, line, row)) {
            this.updateCases(grid, line, row);
            return true;
        }
        return false;
    }

    public updateCases(grid: Case[][], line: number, row: number) {
        // Update newly created word cases info
        let newWordLength = grid[line][row].getHorizontalWordLength() - grid[line][row].getHorizontalPositionInWord() - 1;
        for (let i = 1; i <= grid[line][row].getHorizontalPositionInWord(); i++) {
            grid[line][row - i].setHorizontalWordLength(grid[line][row].getHorizontalPositionInWord());
        }
        for (let i = 0; i < newWordLength; i++) {
            grid[line][row + i + 1].setHorizontalPositionInWord(i);
            grid[line][row + i + 1].setHorizontalWordLength(newWordLength);
        }

        newWordLength = grid[line][row].getVerticalWordLength() - grid[line][row].getVerticalPositionInWord() - 1;
        for (let j = 1; j <= grid[line][row].getVerticalPositionInWord(); j++) {
            grid[line - j][row].setVerticalWordLength(grid[line][row].getVerticalPositionInWord());
        }
        for (let j = 0; j < newWordLength; j++) {
            grid[line + j + 1][row].setVerticalPositionInWord(j);
            grid[line + j + 1][row].setVerticalWordLength(newWordLength);
        }

        // Update the new black case info
        grid[line][row].setIsBlack(true);
        grid[line][row].setHorizontalPositionInWord(0);
        grid[line][row].setHorizontalWordLength(0);
        grid[line][row].setVerticalPositionInWord(0);
        grid[line][row].setVerticalWordLength(0);
    }

    // **Currently doesnt allow 2 letters word but could be changed !
    public doesntCreateShortWords(grid: Case[][], line: number, row: number): boolean {
        // Newly created horizontal word length if we place a black case
        const leftWordLength = grid[line][row].getHorizontalPositionInWord();
        const rightWordLength = grid[line][row].getHorizontalWordLength() - grid[line][row].getHorizontalPositionInWord() - 1;

        // Making sure that if we create 1 or 2 char horizontal words, they can still form 3+ char word vertically
        if (leftWordLength == 1 || leftWordLength == 2) {
            for (let i = 1; i <= leftWordLength; i++) {
                if (grid[line][row - i].getVerticalWordLength() < 3) {
                    return false;
                }
            }
        }
        if (rightWordLength == 1 || rightWordLength == 2) {
            for (let i = 1; i <= rightWordLength; i++) {
                if (grid[line][row + i].getVerticalWordLength() < 3) {
                    return false;
                }
            }
        }

        // Newly created vertical word length if we place a black case
        const upperWordLength = grid[line][row].getVerticalPositionInWord();
        const lowerWordLength = grid[line][row].getVerticalWordLength() - grid[line][row].getVerticalPositionInWord() - 1;

        // Making sure that if we create 1 or 2 char vertical words, they can still form 3+ char word horizontally
        if (upperWordLength == 1 || upperWordLength == 2) {
            for (let i = 1; i <= upperWordLength; i++) {
                if (grid[line - i][row].getHorizontalWordLength() < 3) {
                    return false;
                }
            }
        }
        if (lowerWordLength == 1 || lowerWordLength == 2) {
            for (let i = 1; i <= lowerWordLength; i++) {
                if (grid[line + i][row].getHorizontalWordLength() < 3) {
                    return false;
                }
            }
        }

        return true;
    }

    public tableHas1Word(table: Case[], pos: number): boolean {
        let nbWhiteCase = 0;

        // Looping on the table to make sure there's at least one word of more than 2 char
        for (let i = 0; i < table.length; i++) {
            if (!table[i].getIsBlack() && i != pos) {
                if (++nbWhiteCase > 2) {
                    return true;
                }
            } else {
                nbWhiteCase = 0;
            }
        }

        return false;
    }
}
