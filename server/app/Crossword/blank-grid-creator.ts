import { Case } from "./case";

export class BlankGridCreator {
    public createGrid(height: number, width: number): Case[][] {
        const grid: Case[][] = [];
        for (let i: number = 0; i < height; i++) {
            grid[i] = [];
            for (let j: number = 0; j < width; j++) {
                grid[i][j] = new Case();
                grid[i][j].setHorizontalPositionInWord(j);
                grid[i][j].setHorizontalWordLength(width);
                grid[i][j].setVerticalPositionInWord(i);
                grid[i][j].setVerticalWordLength(height);
            }
        }

        return grid;
    }
}
