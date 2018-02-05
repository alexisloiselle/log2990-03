import { Case } from "./case";
import { Word } from "./word";
import { Lexicon } from "../lexicon/lexicon";

export class WordPlacer {

    public lexicon : Lexicon;

    constructor() {
        this.lexicon = new Lexicon("app/englishWords.txt");
    }

    public identifyConstraint(grid: Case[][]): void {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j].getHorizontalWordLength() > 2 && grid[i][j].getVerticalWordLength() > 2) {
                    grid[i][j].setConstraint(true);
                }
            }
        }
    }

    public fitWord(grid : Case[][], wordsInGrid: Word[], pos : number): boolean {
        let sameLengthWords = this.lexicon.getWordsByLength(wordsInGrid[pos].getLength());
        console.log(pos);
        console.log(wordsInGrid.length);
        for (let i = 0; i < sameLengthWords.length; i++) {
            if (this.placeWord(grid, wordsInGrid[pos], sameLengthWords[i])) {
                if (pos + 1 == wordsInGrid.length || this.fitWord(grid, wordsInGrid, pos + 1)) {
                    return true;
                }
                else {
                    this.removeWord(grid, wordsInGrid[pos]);
                }
            }
            //console.log(i);
        }
        return false;        
    }

    private placeWord(grid: Case[][], gridWord : Word, wordToAdd: string): boolean {
        if (gridWord.getLength() == wordToAdd.length) {
            let line = gridWord.getLine();
            let column = gridWord.getColumn();

            if (gridWord.getIsHorizontal()) {
                // Make sure the horizontal word respects the constraints
                for (let i = 0; i < wordToAdd.length; i++) {
                    if (grid[line][column + i].getIsAConstraint() && grid[line][column + i].getRightLetter() != ""
                    && grid[line][column + i].getRightLetter() != wordToAdd[i]) {
                        return false;
                    }
                }
                // If so, we place it
                for (let i = 0; i < wordToAdd.length; i++) {
                    grid[line][column + i].setRightLetter(wordToAdd[i]);
                }
                return true;
            }
            else {
                // Make sure the vertical word respects the constraints
                for (let i = 0; i < wordToAdd.length; i++) {
                    if (grid[line + i][column].getIsAConstraint() && grid[line + i][column].getRightLetter() != ""
                    && grid[line + i][column].getRightLetter() != wordToAdd[i]) {
                        return false;
                    }
                }
                // If so, we place it
                for (let i = 0; i < wordToAdd.length; i++) {
                    grid[line + i][column].setRightLetter(wordToAdd[i]);
                }
                return true;
            }            
        }
        return false;
    }

    private removeWord(grid: Case[][], word : Word): void {
        let line = word.getLine();
        let column = word.getColumn();
        if (word.getIsHorizontal()) {
            for (let i = 0; i < word.getLength(); i++) {
                if (grid[line][column + i].getIsAConstraint()) {
                    if ((grid[line][column + i].getVerticalPositionInWord() != 0 &&
                        grid[line - 1][column + i].getRightLetter() != "") ||
                        (grid[line][column + i].getVerticalPositionInWord() != grid[line][column + i].getVerticalWordLength() - 1 &&
                        grid[line + 1][column + i].getRightLetter() != "")) {
                        continue;
                    }
                }
                grid[line][column + i].setRightLetter("");
            }
        }
        else {
            for (let i = 0; i < word.getLength(); i++) {    
                if (grid[line + i][column].getIsAConstraint()) {
                    if ((grid[line + i][column].getHorizontalPositionInWord() != 0 &&
                    grid[line + i][column - 1].getRightLetter() != "") ||
                    (grid[line + i][column].getHorizontalPositionInWord() != grid[line + i][column].getHorizontalWordLength() - 1 &&
                    grid[line + i][column + 1].getRightLetter() != "")) {
                        continue;
                    }
                }
                grid[line + i][column].setRightLetter("");
            }
        }
    }

}
