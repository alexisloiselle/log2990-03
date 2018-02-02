import { Case } from "./case";
import { BlackCasePlacer } from "./black-case-placer";

export class GridManager {

    private grid: Case[][];
    private blackCasePlacer: BlackCasePlacer;
    private difficulty: string;

    constructor() {}

    public getGrid(): Case[][] {
        return this.grid;
    }

    private createGrid(height: number, width: number) {
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
    }

    public generateGrid(height: number, width: number, difficulty: string): void {
        // TODO : create negative exception for generate grid
        this.createGrid(height, width);
        this.difficulty = difficulty;
        this.blackCasePlacer = new BlackCasePlacer(height, width);
        const percentage: number = 30;
        this.blackCasePlacer.generateBlackCases(this.grid, percentage);
    }
}
