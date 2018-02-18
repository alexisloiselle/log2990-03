import { Case } from "./case";
import { BlackCasePlacer } from "./black-case-placer";
import { RandomCaseFinder } from "./random-case-finder";

export class BlackCaseGenerator {

    private randomCaseGenerator: RandomCaseFinder;

    constructor(numberOfLine: number, numberOfColumns: number) {
        this.randomCaseGenerator = new RandomCaseFinder(numberOfLine, numberOfColumns);
    }

    public generateBlackCases(grid: Case[][], percentage: number): void {
        const PERCENT: number = 100;
        const maxNumberOfCases: number = percentage / PERCENT * grid.length * grid[0].length;
        const blackCasePlacer: BlackCasePlacer = new BlackCasePlacer();

        for (let i: number = 0; i < maxNumberOfCases && !this.randomCaseGenerator.isUnusedCasesEmpty(); i++) {
            let caseIsFound: boolean = false;
            while (!caseIsFound && !this.randomCaseGenerator.isUnusedCasesEmpty()) {
                let position: [number, number];
                try {
                    position = this.randomCaseGenerator.findRandomCase();
                } catch (e) {
                    console.error("Error :", e);
                }
                caseIsFound = blackCasePlacer.placeBlackCase(grid, position[0], position[1]);
            }
        }
    }
}
