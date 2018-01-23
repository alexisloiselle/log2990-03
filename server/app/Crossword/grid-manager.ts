import { Case } from "./case";

export class GridManager {

    private grid: Case[][];

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
    }

    public populateArray(): [number, number][] {
        const array: [number, number][] = [];
        for (let i: number = 0; i < this.grid.length; i++) {
            for (let j: number = 0; j < this.grid[0].length; j++) {
                array.push([i, j]);
            }
        }

        return array;
    }

    public randomBlackCaseGenerator(percentage: number): void {
        /* tslint:disable: no-magic-numbers */
        const maxNumberOfCase: number = Math.floor(percentage / 100 * this.grid.length * this.grid[0].length);
        let possibleCase: [number, number][] = this.populateArray();

        for (let i: number = 0; i < maxNumberOfCase; i++) {
            // TODO
        }
    }
}
