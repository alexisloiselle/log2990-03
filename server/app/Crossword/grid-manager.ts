import { Case } from "./case";
import { GridGenerator } from "./grid-generator";

export class GridManager {

    // This class has the ownership of the grid and will have the responsability to manage it
    public static async generateGrid(difficulty: string): Promise<Case[][]> {
        const gridGenerator: GridGenerator = new GridGenerator();
        const DIMENSION: number = 10;
        return await Promise.race([
            gridGenerator.generateGrid(DIMENSION, DIMENSION), 
            gridGenerator.generateGrid(DIMENSION, DIMENSION), 
            gridGenerator.generateGrid(DIMENSION, DIMENSION)
        ]);
    }
}
