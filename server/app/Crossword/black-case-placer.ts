import { Case } from "./case";

export class BlackCasePlacer {
    private height: number;
    private width: number;
    private possibleCase: [number, number][];
    private grid: Case[][];

    constructor(height: number, width: number, grid: Case[][]) {
        this.height = height;
        this.width = width;
        this.grid = grid;
    }

    public getColum(grid : Case[][], pos : number) {
        let column = [];
        for (let i = 0; i < grid.length; i++){
            column.push(grid[i][pos]);
        }
        return column;
    }

    public populateArray(): void {
        this.possibleCase = [];
        for (let i: number = 0; i < this.height; i++) {
            for (let j: number = 0; j < this.width; j++) {
                this.possibleCase.push([i, j]);
            }
        }
    }

    public findRandomCase(): [number, number] {
        return this.possibleCase[Math.floor(Math.random() * (this.possibleCase.length - 1))];
    }

    public findCaseByPosition(position: [number, number]): number {
        for (let i: number = 0; i < this.possibleCase.length; i++) {
            if (this.possibleCase[i] == position) {
                return i;
            }
        }
        return -1;
    }

    public removeFromArray(index: number): void {
        this.possibleCase[index] = this.possibleCase[this.possibleCase.length - 1];
        this.possibleCase.pop();
    }

    public generateBlackCases(percent: number) {
        const maxNumberOfCases = percent / 100 * this.height * this.width;
        this.populateArray();

        for (let i: number = 0; i < maxNumberOfCases; i++) {
            const caseIsFound: boolean = false;
            while (!caseIsFound && this.possibleCase.length > 0) {
                const position: [number, number] = this.findRandomCase();
                let caseIsFound: boolean; // = Katherine's function
                // TODO : Add Katherine's functions
                this.removeFromArray(this.findCaseByPosition(position)); //try catch si position = -1
            }
            if (this.possibleCase.length == 0) {
                break;
            }
        }
    }

    public placeBlackCase(grid : Case[][], line : number, row : number) : boolean {
        // We place a black case if the row and line still have at least a word and
        //  if we don't create 1 or 2 char words
        if (this.tableHas1Word(this.getColum(grid, row), line) && this.tableHas1Word(grid[line], row) 
        && this.doesntCreateShortWords(grid, line, row)) {
            this.updateCases(grid, line, row);
            return true;
        }
        return false;
    }

    public updateCases(grid : Case[][], line : number, row : number) {
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
    public doesntCreateShortWords(grid : Case[][], line : number, row : number) : boolean {
        // Newly created horizontal word length if we place a black case
        let leftWordLength = grid[line][row].getHorizontalPositionInWord();
        let rightWordLength = grid[line][row].getHorizontalWordLength() - grid[line][row].getHorizontalPositionInWord() - 1;
        
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
        let upperWordLength = grid[line][row].getVerticalPositionInWord();
        let lowerWordLength = grid[line][row].getVerticalWordLength() - grid[line][row].getVerticalPositionInWord() - 1;

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

    public tableHas1Word(table : Case[], pos : number) : boolean {
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
