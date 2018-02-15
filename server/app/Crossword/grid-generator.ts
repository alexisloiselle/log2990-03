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

    public generateGrid(height: number, width: number): Promise<Case[][]> {
        // tslint:disable-next-line:max-func-body-length
        return new Promise<Case[][]>((resolve) => {
            let grid: Case[][];

            const PERCENTAGE: number = 38;

            const blankGridCreator: BlankGridCreator = new BlankGridCreator();
            const blackCaseGenerator: BlackCaseGenerator = new BlackCaseGenerator(height, width);
            grid = blankGridCreator.createGrid(height, width);
            blackCaseGenerator.generateBlackCases(grid, PERCENTAGE);
            const gridScanner: GridScanner = new GridScanner();
            this.words = gridScanner.findWords(grid);
            gridScanner.identifyConstraint(grid, this.words);

            const wordPlacer: WordPlacer = new WordPlacer();
            this.words.sort((a: Word, b: Word) => b.NbConstraints - a.NbConstraints);
            const constraintsQueue: Word[] = [];
            constraintsQueue.push(this.words[0]);
            wordPlacer.fitWord(grid, constraintsQueue, this.words, 0);

            //#region alexis
            for (const row of grid) {
                for (const position of row) {
                    if (position.IsBlack) {
                        process.stdout.write("#");
                    } else {
                        process.stdout.write(position.RightLetter);
                    }
                }
                console.log("");
            }
            console.log("resolved");
            //#endregion
            resolve(grid);
        });
    }
}
