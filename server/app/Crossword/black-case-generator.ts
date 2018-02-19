import { Case } from "./case";
import { BlackCasePlacer } from "./black-case-placer";
import { RandomCaseFinder } from "./random-case-finder";

export class BlackCaseGenerator {
    public static generateBlackCases(grid: Case[][], percentage: number): void {
        const PERCENT: number = 100;
        const maxNumberOfCases: number = percentage / PERCENT * grid.length * grid[0].length;
        const randomCaseGenerator: RandomCaseFinder = new RandomCaseFinder(grid.length, grid.length);

        for (let i: number = 0; i < maxNumberOfCases && !randomCaseGenerator.isUnusedCasesEmpty(); i++) {
            let caseIsFound: boolean = false;
            while (!caseIsFound && !randomCaseGenerator.isUnusedCasesEmpty()) {
                let position: [number, number];
                try {
                    position = randomCaseGenerator.findRandomCase();
                } catch (e) {
                    console.error("Error :", e);
                }
                caseIsFound = BlackCasePlacer.placeBlackCase(grid, position[0], position[1]);
            }
        }
    }
}
