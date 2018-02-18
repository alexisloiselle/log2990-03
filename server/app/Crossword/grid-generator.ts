import { BlackCaseGenerator } from "./black-case-generator";
import { BlankGridCreator } from "./blank-grid-creator";
import { Case } from "./case";
import { DefinitionAdder } from "./definition-adder";
import { Grid } from "./grid";
import { GridScanner } from "./grid-scanner";
import { Word } from "./word";
import { WordPlacer } from "./word-placer";

export class GridGenerator {

    public static async generateGrid(height: number, width: number, difficulty: string): Promise<Grid> {
        let words: Word[] = [];

        return new Promise<Grid>(async (resolve: Function) => {
            let grid: Case[][];
            const PERCENTAGE: number = 38;

            const blankGridCreator: BlankGridCreator = new BlankGridCreator();
            grid = blankGridCreator.createGrid(height, width);
            const blackCaseGenerator: BlackCaseGenerator = new BlackCaseGenerator(height, width);
            blackCaseGenerator.generateBlackCases(grid, PERCENTAGE);

            words = GridScanner.findWords(grid);
            GridScanner.identifyConstraint(grid, words);
            words.sort((a: Word, b: Word) => b.NbConstraints - a.NbConstraints);
            const constraintsQueue: Word[] = [];
            constraintsQueue.push(words[0]);

            const wordPlacer: WordPlacer = new WordPlacer();
            const isUncommon: boolean = difficulty === "hard" ? true : false;
            wordPlacer.fitWord(grid, constraintsQueue, words, 0, isUncommon);

            const definitionAdder: DefinitionAdder = new DefinitionAdder();
            words = GridScanner.findWords(grid);
            definitionAdder.addWords(grid, words);
            await definitionAdder.addDefinitions(words, difficulty);

            const finalGrid: Grid = new Grid(grid, words);
            resolve(finalGrid);
        });
    }
}
