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
        const blackCasePlacer: BlackCasePlacer = new BlackCasePlacer();

        for (let i: number = 0; i < maxNumberOfCases && !this.randomCaseGenerator.isUnusedCasesEmpty(); i++) {
            let caseIsFound: boolean = false;
            while (!caseIsFound && !this.randomCaseGenerator.isUnusedCasesEmpty()) {
                const position: [number, number] = this.randomCaseGenerator.findRandomCase();
                caseIsFound = blackCasePlacer.placeBlackCase(grid, position[0], position[1]);
            }
        }
    }
}
