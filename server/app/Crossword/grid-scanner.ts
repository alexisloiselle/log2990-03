import { Word, Direction } from "./word";
import { Case } from "./case";

export class GridScanner {

    public findWords(grid: Case[][]): Word[] {
        const words: Word[] = [];
        const minimumWordLength: number = 2;
        for (let line: number = 0; line < grid.length; line++) {
            for (let column: number = 0; column < grid[0].length; column++) {
                if (grid[line][column].getHorizontalPositionInWord() === 0
                && grid[line][column].getHorizontalWordLength() > minimumWordLength
                && !grid[line][column].getIsBlack()) {
                    words.push(new Word(line, column, grid[line][column].getHorizontalWordLength(), Direction.Horizontal));
                }
                if (grid[line][column].getVerticalPositionInWord() === 0
                && grid[line][column].getVerticalWordLength() > minimumWordLength
                && !grid[line][column].getIsBlack()) {
                    words.push(new Word(line, column, grid[line][column].getVerticalWordLength(), Direction.Vertical));
                }
            }
        }

        return words;
    }
}
