import { Word, Direction } from "./word";
import { Case } from "./case";

export class GridScanner {

    public static findWords(grid: Case[][]): Word[] {
        const words: Word[] = [];
        const minimumWordLength: number = 2;
        for (let line: number = 0; line < grid.length; line++) {
            for (let column: number = 0; column < grid[0].length; column++) {
                if (grid[line][column].HorizontalPositionInWord === 0
                    && grid[line][column].HorizontalWordLength > minimumWordLength
                    && !grid[line][column].IsBlack) {
                    words.push(new Word(line, column, grid[line][column].HorizontalWordLength, Direction.Horizontal, ""));
                }
                if (grid[line][column].VerticalPositionInWord === 0
                    && grid[line][column].VerticalWordLength > minimumWordLength
                    && !grid[line][column].IsBlack) {
                    words.push(new Word(line, column, grid[line][column].VerticalWordLength, Direction.Vertical, ""));
                }
            }
        }

        return words;
    }

    public static identifyConstraint(grid: Case[][], wordsInGrid: Word[]): void {
        // Set isAConstraint attribute to true for all the cases that are part of 2 words
        const minimumWordLength: number = 2;
        for (let i: number = 0; i < grid.length; i++) {
            for (let j: number = 0; j < grid[i].length; j++) {
                if (grid[i][j].HorizontalWordLength > minimumWordLength && grid[i][j].VerticalWordLength > minimumWordLength) {
                    grid[i][j].IsAConstraint = true;

                    const wordsWithPos: Word[] = this.getWordsWithPos(wordsInGrid, i, j);
                    for (const word of wordsWithPos) {
                        word.NbConstraints = word.NbConstraints + 1;
                    }
                }
            }
        }
    }

    private static getWordsWithPos(wordsInGrid: Word[], line: number, column: number): Word[] {
        return wordsInGrid.filter((word: Word) => {
            if (word.Orientation === Direction.Horizontal) {
                return word.Line === line
                    && word.Column <= column
                    && word.Column + word.Length - 1 >= column;
            } else {
                return word.Column === column
                    && word.Line <= line
                    && word.Line + word.Length - 1 >= line;
            }
        });
    }
}
