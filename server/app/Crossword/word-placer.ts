import { Case } from "./case";

export class WordPlacer {    

    public identifyConstraint(grid : Case[][]) : void {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j].getHorizontalWordLength() > 2 && grid[i][j].getVerticalWordLength() > 2) {
                    grid[i][j].setConstraint(true);
                }
            }
        }
    }

    public placeWord(table : Case[], pos : number, wordLength : number, word : string) : boolean {
        if (word.length == wordLength) {
            // Make sure the word respects the constraints 
            for (let i = 0; i < wordLength; i++) {
                if (table[pos + i].getIsAConstraint() && table[pos + i].getRightLetter() != ""
                && table[pos + i].getRightLetter() != word[i]) {
                    return false;
                }
            }
            // If so, we place it
            for (let i = 0; i < wordLength; i++) {
                table[pos + i].setRightLetter(word[i]);
            }
            return true;
        }
        return false;
    }

}