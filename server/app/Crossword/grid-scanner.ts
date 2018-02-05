
import { Word } from "./word";
import { Case } from "./case";

export class GridScanner {

    public findWords(grid: Case[][]): Word[] {
        const words: Word[] = [];
        for (let line: number = 0; line < grid.length; line++) {
            for (let column: number = 0; column < grid[0].length; column++) {
                if (grid[line][column].getHorizontalPositionInWord() == 0 &&
                grid[line][column].getHorizontalWordLength() > 2 
                && !grid[line][column].getIsBlack()) {
                    words.push(new Word(line, column, grid[line][column].getHorizontalWordLength(), true));
                }
                if (grid[line][column].getVerticalPositionInWord() == 0 &&
                grid[line][column].getVerticalWordLength() > 2 && !grid[line][column].getIsBlack()) {
                    words.push(new Word(line, column, grid[line][column].getVerticalWordLength(), false));
                }
            }
        }
        return words;
    }
}
