import { Case } from "./case"

export class BlackCaseManager {
    private height: number;
    private width: number;
    private possibleCase: [number, number][];
    private grid: Case[][];

    constructor(height: number, width: number, grid: Case[][]) {
        this.height = height;
        this.width = width;
        this.grid = grid;
    }

    public populateArray(): void {
        this.possibleCase = [];
        for (let i: number = 0; i < this.height; i++) {
            for (let j: number = 0; j < this.width; j++) {
                this.possibleCase.push([i, j]);
            }
        }
    }

    public generateBlackCases(percent: number){
        let maxNumberOfCases = percent/100 * this.height * this.width;
        this.populateArray();

        // for (let i: number = 0; i < maxNumberOfCase; i++) {
        //     // TODO
        // }
    }
}
