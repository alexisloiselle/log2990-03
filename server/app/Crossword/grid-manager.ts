import { Case } from "./case";
import { BlackCaseManager } from "./black-case-manager"

export class GridManager {

    private grid: Case[][];
    private blackCaseManager;

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
            }
        }
        this.blackCaseManager = new BlackCaseManager(height, width, this.grid);
        const percentage: number = 30;
        this.blackCaseManager.generateBlackCases(percentage);
    }
}
