import { Case } from "./case";
import { BlackCasePlacer } from "./black-case-placer"

export class GridManager {

    private grid: Case[][];
    private blackCasePlacer : BlackCasePlacer;

    constructor() {}

    public getCases(): Case[][] {
        return this.grid;
    }

    public generateGrid(height: number, width: number): void {
        // TODO : create negative exception for generate grid
        this.grid = [];
        for (let i: number = 0; i < height; i++) {
            this.grid[i] = [];
            for (let j: number = 0; j < width; j++) {
                this.grid[i][j] = new Case();
                this.grid[i][j].setHorizontalPositionInWord(j);
                this.grid[i][j].setHorizontalWordLength(width);
                this.grid[i][j].setVerticalPositionInWord(i);
                this.grid[i][j].setVerticalWordLength(height);
            }
        }
        this.blackCasePlacer = new BlackCasePlacer(height, width, this.grid);
        const percentage: number = 30;
        this.blackCasePlacer.generateBlackCases(percentage);
    }
}
