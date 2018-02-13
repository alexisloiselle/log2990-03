import { Case } from "./case";

export class BlankGridCreator {
    public createGrid(height: number, width: number): Case[][] {
        const grid: Case[][] = [];
        for (let i: number = 0; i < height; i++) {
            grid[i] = [];
            for (let j: number = 0; j < width; j++) {
                grid[i][j] = new Case();
                grid[i][j].HorizontalPositionInWord = j;
                grid[i][j].HorizontalWordLength = width;
                grid[i][j].VerticalPositionInWord = i;
                grid[i][j].VerticalWordLength = height;
            }
        }

        return grid;
    }
}
