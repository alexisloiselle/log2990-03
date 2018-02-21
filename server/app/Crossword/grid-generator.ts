import { BlackCaseGenerator } from "./black-case-generator";
import { BlankGridCreator } from "./blank-grid-creator";
import { Case } from "./case";
import { DefinitionAdder } from "./definition-adder";
import { Grid } from "./grid";
import { GridScanner } from "./grid-scanner";
import { Word } from "./word";
import { WordPlacer } from "./word-placer";

export class GridGenerator {

    public static generateGrid(height: number, width: number, difficulty: string): Promise<Grid> {
        let words: Word[] = [];
        let grid: Case[][];
        const BLACK_CASE_PERCENTAGE: number = 38;

        return new Promise<Grid>(async (resolve: Function) => {
            grid = BlankGridCreator.createGrid(height, width);
            BlackCaseGenerator.generateBlackCases(grid, BLACK_CASE_PERCENTAGE);

            words = GridScanner.findWords(grid);
            GridScanner.identifyConstraint(grid, words);
            words.sort((a: Word, b: Word) => b.NbConstraints - a.NbConstraints);

            const constraintsQueue: Word[] = [];
            constraintsQueue.push(words[0]);

            const wordPlacer: WordPlacer = new WordPlacer();
            const isUncommon: boolean = difficulty === "hard" ? true : false;
            wordPlacer.fitWord(grid, constraintsQueue, words, 0, isUncommon);

            words = GridScanner.findWords(grid);
            DefinitionAdder.addWords(grid, words);
            await DefinitionAdder.addDefinitions(words, difficulty);

            resolve(new Grid(grid, words));
        });
    }
}
