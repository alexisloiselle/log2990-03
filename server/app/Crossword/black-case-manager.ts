import { Case } from "./case";

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

    public findRandomCase(): [number, number] {
        return this.possibleCase[Math.floor(Math.random() * (this.possibleCase.length - 1))];
    }

    public findCaseByPosition(position: [number, number]): number {
        for (let i: number = 0; i < this.possibleCase.length; i++) {
            if (this.possibleCase[i] == position) {
                return i;
            }
        }
        return -1;
    }

    public removeFromArray(index: number): void {
        this.possibleCase[index] = this.possibleCase[this.possibleCase.length - 1];
        this.possibleCase.pop();
    }

    public generateBlackCases(percent: number) {
        const maxNumberOfCases = percent / 100 * this.height * this.width;
        this.populateArray();

        for (let i: number = 0; i < maxNumberOfCases; i++) {
            const caseIsFound: boolean = false;
            while (!caseIsFound && this.possibleCase.length > 0) {
                const position: [number, number] = this.findRandomCase();
                let caseIsFound: boolean; // = Katherine's function
                // TODO : Add Katherine's functions
                this.removeFromArray(this.findCaseByPosition(position)); //try catch si position = -1
            }
            if (this.possibleCase.length == 0) {
                break;
            }
        }
    }
}
