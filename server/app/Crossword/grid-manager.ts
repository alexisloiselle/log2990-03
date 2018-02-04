import { Case } from "./case";
import { BlankGridCreator } from "./blank-grid-creator";
import { BlackCaseGenerator } from "./black-case-generator";
import { Word } from "./word";
import { GridScanner } from "./grid-scanner";

export class GridManager {

    private grid: Case[][];
    // private difficulty: string;
    private words: Word[];

    constructor() {
        this.words = [];
    }

    public generateGrid(height: number, width: number, difficulty: string): void {
        const blankGridCreator: BlankGridCreator = new BlankGridCreator();
        this.grid = blankGridCreator.createGrid(height, width);

        // this.difficulty = difficulty;

        const blackCaseGenerator: BlackCaseGenerator = new BlackCaseGenerator(height, width);
        const percentage: number = 30;
        blackCaseGenerator.generateBlackCases(this.grid, percentage);

        const gridScanner: GridScanner = new GridScanner();
        this.words = gridScanner.findWords(this.grid);

        this.words.sort((a: Word, b: Word) => b.getLength() - a.getLength());
    }
}
