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

        this.words.sort((a: Word, b: Word) => b.getLength() - a.getLength());
        const wordPlacer: WordPlacer = new WordPlacer();
        const pattern = " ".repeat(this.words[0].getLength());
        wordPlacer.identifyConstraint(grid);
        while(!wordPlacer.fitWord(grid, this.words, 0, pattern)){}

        //#region alexis
        for(let i =0 ; i < grid.length; i++){
            for(let j = 0; j < grid[i].length; j++){
                if(grid[i][j].getIsBlack()){
                    process.stdout.write('#');
                }else{
                    process.stdout.write(grid[i][j].getRightLetter());
                } 
            }
            console.log('');
        }
        //#endregion

        return grid;
    }
}
