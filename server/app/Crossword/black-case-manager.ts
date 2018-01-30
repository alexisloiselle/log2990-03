import { Case } from "./case";
import { PossibleCasesArrayManager } from "./possible-cases-array-manager";

export class BlackCaseManager {
    private height: number;
    private width: number;
    private possibleCasesArrayManager: PossibleCasesArrayManager;

    private grid: Case[][];

    constructor(height: number, width: number, grid: Case[][]) {
        this.grid = grid;

        this.possibleCasesArrayManager = new PossibleCasesArrayManager(grid.length, grid[0].length);
    }

    public generateBlackCases(percent: number) {
        const maxNumberOfCases = percent / 100 * this.height * this.width;

        for (let i: number = 0; i < maxNumberOfCases; i++) {
            const caseIsFound: boolean = false;
            while (!caseIsFound && !this.possibleCasesArrayManager.isArrayEmpty()) {
                const position: [number, number] = this.possibleCasesArrayManager.findRandomCase();
                let caseIsFound: boolean; // = Katherine's function
                // TODO : Add Katherine's functions
                this.possibleCasesArrayManager.removeFromArray(this.possibleCasesArrayManager.findCaseByPosition(position)); //try catch si position = -1
            }
            if (this.possibleCasesArrayManager.isArrayEmpty()) {
                break;
            }
        }
    }
}
