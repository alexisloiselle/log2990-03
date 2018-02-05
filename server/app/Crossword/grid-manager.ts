import { Case } from "./case";
import { BlankGridCreator } from "./blank-grid-creator";
import { BlackCaseGenerator } from "./black-case-generator";
import { Word } from "./word";
import { GridScanner } from "./grid-scanner";
import { WordPlacer } from "./word-placer";

export class GridManager {

    private grid: Case[][];
    private difficulty: string;
    private words: Word[];

    constructor() {
        this.words = [];
    }

    public getGrid(): Case[][] {
        return this.grid;
    }

    public generateGrid(height: number, width: number, difficulty: string): void {
        const blankGridCreator: BlankGridCreator = new BlankGridCreator();
        this.grid = blankGridCreator.createGrid(height, width);

        this.difficulty = difficulty;

        const blackCaseGenerator: BlackCaseGenerator = new BlackCaseGenerator(height, width);
        const percentage: number = 50;
        blackCaseGenerator.generateBlackCases(this.grid, percentage);

        const gridScanner: GridScanner = new GridScanner();
        this.words = gridScanner.findWords(this.grid);

        this.words.sort((a: Word, b: Word) => b.getLength() - a.getLength());
        const wordPlacer: WordPlacer = new WordPlacer();
        wordPlacer.identifyConstraint(this.grid);
        wordPlacer.fitWord(this.grid, this.words, 0);

    }
}
