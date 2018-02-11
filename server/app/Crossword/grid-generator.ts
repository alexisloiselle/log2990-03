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
        const PERCENTAGE: number = 40;
        blackCaseGenerator.generateBlackCases(grid, PERCENTAGE);

        const gridScanner: GridScanner = new GridScanner();
        this.words = gridScanner.findWords(grid);
        gridScanner.identifyConstraint(grid, this.words);

        const wordPlacer: WordPlacer = new WordPlacer();
        this.words.sort((a: Word, b: Word) => b.getNbConstraints() - a.getNbConstraints());
        const constraintsQueue: Word[] = [];
        constraintsQueue.push(this.words[0]);
        const pattern: string = " ".repeat(constraintsQueue[0].getLength());
        while (!wordPlacer.fitWord(grid, constraintsQueue, this.words, 0, pattern)) { }
        //#region alexis
        for (const row of grid) {
            for (const position of row) {
                if (position.getIsBlack()) {
                    process.stdout.write("#");
                } else {
                    process.stdout.write(position.getRightLetter());
                }
            }
            console.log("");
        }
        //#endregion

        return grid;
    }
}
