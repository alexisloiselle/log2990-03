import { Case } from "./case";
import { RandomCaseFinder } from "./random-case-finder";
import { BlackCasePlacer } from "./black-case-placer";

export class BlackCaseGenerator {

    private randomCaseGenerator: RandomCaseFinder;

    constructor(numberOfLine: number, numberOfColumns: number) {
        this.randomCaseGenerator = new RandomCaseFinder(numberOfLine, numberOfColumns);
    }

    public generateBlackCases(grid: Case[][], percentage: number): void {
        const percent: number = 100;
        const maxNumberOfCases: number = percentage / percent * grid.length * grid[0].length;

        for (let i: number = 0; i < maxNumberOfCases; i++) {
            let caseIsFound: boolean = false;
            while (!caseIsFound && !this.randomCaseGenerator.isUnusedCasesEmpty()) {
                const position: [number, number] = this.randomCaseGenerator.findRandomCase();
                const blackCasePlacer: BlackCasePlacer = new BlackCasePlacer();
                caseIsFound = blackCasePlacer.placeBlackCase(grid, position[0], position[1]);
            }
            if (this.randomCaseGenerator.isUnusedCasesEmpty()) {
                break;
            }
        }
    }
}
