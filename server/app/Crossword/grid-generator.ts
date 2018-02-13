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
        let grid: Case[][];

        const PERCENTAGE: number = 40;

        let cpt = 26;
        while (cpt > 25) {
            cpt = 0;
            const blankGridCreator: BlankGridCreator = new BlankGridCreator();
            const blackCaseGenerator: BlackCaseGenerator = new BlackCaseGenerator(height, width);
            grid = blankGridCreator.createGrid(height, width)
            blackCaseGenerator.generateBlackCases(grid, PERCENTAGE);
            const gridScanner: GridScanner = new GridScanner();
            this.words = gridScanner.findWords(grid);
            gridScanner.identifyConstraint(grid, this.words);
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    if (grid[i][j].getIsAConstraint()) {
                        ++cpt;
                    }
                }
            }
            console.log(cpt);
        }



        const wordPlacer: WordPlacer = new WordPlacer();
        this.words.sort((a: Word, b: Word) => b.NbConstraints - a.NbConstraints);
        const constraintsQueue: Word[] = [];
        constraintsQueue.push(this.words[0]);
<<<<<<< HEAD
        while (!wordPlacer.fitWord(grid, constraintsQueue, this.words, 0)) { }

=======
        const pattern: string = " ".repeat(constraintsQueue[0].Length);
        wordPlacer.fitWord(grid, constraintsQueue, this.words, 0, pattern);
>>>>>>> master
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
        //#endregion

        return grid;
    }
}
