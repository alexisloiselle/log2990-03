import { Case } from "./case";
import { GridGenerator } from "./grid-generator";

export class GridManager {

    private grid: Case[][];

    // This class has the ownership of the grid and will have the responsability to manage it
    constructor(difficulty: string) {
        const gridManager: GridGenerator = new GridGenerator();
        const DIMENSION: number = 10;
        this.grid = gridManager.generateGrid(DIMENSION, DIMENSION);
    }

    public getGrid(): Case[][] {
        return this.grid;
    }
}
