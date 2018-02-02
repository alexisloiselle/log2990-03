
import { Word } from "./word";
import { Case } from "./case";

export class GridScanner {

    public findWords(grid: Case[][]): Word[] {
        const words: Word[] = [];
        for (let line: number = 0; line < grid.length; line++) {
            for (let column: number = 0; column < grid[0].length; column++) {
                if (!grid[line][column].getIsBlack()) {
                    words.push(new Word(line, column, grid[line][column].getHorizontalWordLength(), "horizontal"));
                    column += grid[line][column].getHorizontalWordLength();
                }
            }
        }
        for (let column: number = 0; column < grid[0].length; column++) {
            for (let line: number = 0; line < grid.length; line++) {
                if (!grid[line][column].getIsBlack()) {
                    words.push(new Word(line, column, grid[line][column].getVerticalWordLength(), "vertical"));
                    line += grid[line][column].getVerticalWordLength();
                }
            }
        }

        return words;
    }
}