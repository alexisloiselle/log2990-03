import { Case } from "./case";
import { BlankGridCreator } from "./blank-grid-creator";
import { BlackCaseGenerator } from "./black-case-generator";
import { Word } from "./word";
import { GridScanner } from "./grid-scanner";
import { WordPlacer } from "./word-placer";

export class GridGenerator {

    public static async generateGrid(height: number, width: number, isUncommon: boolean): Promise<Case[][]> {
        let words: Word[] = [];

        return new Promise<Case[][]>((resolve: Function) => {
            let grid: Case[][];

            const PERCENTAGE: number = 38;

            const blankGridCreator: BlankGridCreator = new BlankGridCreator();
            grid = blankGridCreator.createGrid(height, width);

            const blackCaseGenerator: BlackCaseGenerator = new BlackCaseGenerator(height, width);
            blackCaseGenerator.generateBlackCases(grid, PERCENTAGE);

            words = GridScanner.findWords(grid);
            GridScanner.identifyConstraint(grid, words);

            const wordPlacer: WordPlacer = new WordPlacer();
            words.sort((a: Word, b: Word) => b.NbConstraints - a.NbConstraints);
            const constraintsQueue: Word[] = [];
            constraintsQueue.push(words[0]);
            wordPlacer.fitWord(grid, constraintsQueue, words, 0, isUncommon);

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
