import { Case } from "./case";
import { PossibleCasesArrayManager } from "./possible-cases-array-manager";
import { BlackCasePlacer } from "./black-case-placer";

export class BlackCaseGenerator {

    private possibleCasesArrayManager: PossibleCasesArrayManager;

    constructor(numberOfLine: number, numberOfColumns: number) {
        this.possibleCasesArrayManager = new PossibleCasesArrayManager(numberOfLine, numberOfColumns);
    }

    public generateBlackCases(grid: Case[][], percent: number) {
        const maxNumberOfCases = percent / 100 * grid.length * grid[0].length;

        for (let i: number = 0; i < maxNumberOfCases; i++) {
            let caseIsFound: boolean = false;
            while (!caseIsFound && !this.possibleCasesArrayManager.isArrayEmpty()) {
                const position: [number, number] = this.possibleCasesArrayManager.findRandomCase();
                let blackCasePlacer: BlackCasePlacer = new BlackCasePlacer();
                caseIsFound = blackCasePlacer.placeBlackCase(grid, position[0], position[1]);
            }
            if (this.possibleCasesArrayManager.isArrayEmpty()) {
                break;
            }
        }
    }
}