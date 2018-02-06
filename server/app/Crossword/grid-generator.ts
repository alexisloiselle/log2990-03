import { Case } from "./case";
import { BlankGridCreator } from "./blank-grid-creator";
import { BlackCaseGenerator } from "./black-case-generator";
import { Word } from "./word";
import { GridScanner } from "./grid-scanner";
import { WordPlacer } from "./word-placer";

export class GridGenerator {

    private words: Word[];

    constructor() {
        this.words = [];
    }

    public generateGrid(height: number, width: number): Case[][] {
        const blankGridCreator: BlankGridCreator = new BlankGridCreator();
        const grid: Case[][] = blankGridCreator.createGrid(height, width);

        const blackCaseGenerator: BlackCaseGenerator = new BlackCaseGenerator(height, width);
        const PERCENTAGE: number = 50;
        blackCaseGenerator.generateBlackCases(grid, PERCENTAGE);

        const gridScanner: GridScanner = new GridScanner();
        this.words = gridScanner.findWords(grid);

        this.words.sort((a: Word, b: Word) => b.getLength() - a.getLength());
        const wordPlacer: WordPlacer = new WordPlacer();
        wordPlacer.identifyConstraint(grid);
        wordPlacer.fitWord(grid, this.words, 0);

        return grid;
    }
}
