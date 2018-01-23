import { Case } from './case';

export class GridManager {

    private grid : Case[][];

    constructor() { 

    }

    public getCases() {
        return this.grid;
    }

    public getColum(matrix : Case[][], pos : number) {
        let column = [];
        for (let i = 0; i < matrix.length; i++){
            column.push(matrix[i][pos]);
        }
        return column;
    }

    public generateGrid(length : number, width : number) {
        //TODO : create negative exception for generate grid
        this.grid = [];
        for (let i = 0; i < length; i++){
            this.grid[i] = [];
            for (let j : number = 0; j < width; j++){
                this.grid[i][j] = new Case();
                this.grid[i][j].setIsBlack(false);
                this.grid[i][j].setHorizontalPositionInWord(i);
                this.grid[i][j].setHorizontalWordLength(width);
                this.grid[i][j].setVerticalPositionInWord(j);
                this.grid[i][j].setVerticalWordLength(length);
            }
        }
        return this.grid
    }

    public randomGreyCaseGenerator(percentage : number){
        //let maxNumberOfCase : number = Math.floor();
    }
    
    public placeBlackCase(grid : Case[][], x : number, y : number) : boolean {
        // We place a black case if rows still have at least a word and
        //  if we don't create 1 or 2 char words
        if (this.rowHas1Word(this.getColum(grid, y), x) && 
        this.rowHas1Word(grid[x], y) && this.doesntCreateShortWords(grid, x, y)) {
            this.updateCases(grid, x, y);
            return true;
        }
        return false;
    }

    public updateCases(grid : Case[][], x : number, y : number) {
        // Update newly created word cases info
        let newWordLength = grid[x][y].getHorizontalWordLength() - grid[x][y].getHorizontalPositionInWord() - 1;
        for (let i = 0; i < newWordLength; i++) {
            grid[x + i + 1][y].setHorizontalPositionInWord(i);
            grid[x + i + 1][y].setHorizontalWordLength(newWordLength);
        }

        newWordLength = grid[x][y].getVerticalWordLength() - grid[x][y].getVerticalPositionInWord() - 1;
        for (let i = 0; i < newWordLength; i++) {
            grid[x][y + i + 1].setVerticalPositionInWord(i);
            grid[x][y + i + 1].setVerticalWordLength(newWordLength);            
        }

        // Update the new black case info
        grid[x][y].setIsBlack(true);
        grid[x][y].setHorizontalPositionInWord(0);
        grid[x][y].setHorizontalWordLength(0);
        grid[x][y].setVerticalPositionInWord(0);
        grid[x][y].setVerticalWordLength(0);
    }

    public doesntCreateShortWords(grid : Case[][], x : number, y : number) : boolean {
        // Newly created horizontal word length if we place a black case
        let leftWordLength = grid[x][y].getHorizontalPositionInWord();
        let rightWordLength = grid[x][y].getHorizontalWordLength() - grid[x][y].getHorizontalPositionInWord() - 1;
        
        // Making sure that if we create 1 or 2 char horizontal words, they can still form 3+ char word vertically
        if (leftWordLength > 0 && leftWordLength < 3) {
            for (let i = 1; i <= leftWordLength; i++) {
                if (grid[x - i][y].getVerticalWordLength() < 3) {
                    return false;
                }
            }
        }
        if (rightWordLength > 0 && rightWordLength < 3) {
            for (let i = 1; i <= rightWordLength; i++) {
                if (grid[x + i][y].getVerticalWordLength() < 3) {
                    return false;
                }
            }
        }
        
        // Newly created vertical word length if we place a black case
        let upperWordLength = grid[x][y].getVerticalPositionInWord();
        let lowerWordLength = grid[x][y].getVerticalWordLength() - grid[x][y].getVerticalPositionInWord() - 1;

        // Making sure that if we create 1 or 2 char vertical words, they can still form 3+ char word horizontally
        if (upperWordLength > 0 && upperWordLength < 3) {
            for (let i = 1; i <= upperWordLength; i++) {
                if (grid[x][y - i].getHorizontalWordLength() < 3) {
                    return false;
                }
            }
        }
        if (lowerWordLength > 0 && lowerWordLength < 3) {
            for (let i = 1; i <= lowerWordLength; i++) {
                if (grid[x][y + i].getHorizontalWordLength() < 3) {
                    return false;
                }
            }
        }

        return true;
    }

    public rowHas1Word(row : Case[], pos : number) : boolean {
        let nbWhiteCase = 0;

        // Looping on the row to make sure there's at least one word of more than 2 char
        for (let i = 0; i < row.length; i++) {
            if (!row[i].getIsBlack() && i != pos) {
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