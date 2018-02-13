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
                    words.push(new Word(line, column, grid[line][column].getHorizontalWordLength(), Direction.Horizontal,""));
                }
                if (grid[line][column].getVerticalPositionInWord() === 0
                    && grid[line][column].getVerticalWordLength() > minimumWordLength
                    && !grid[line][column].getIsBlack()) {
                    words.push(new Word(line, column, grid[line][column].getVerticalWordLength(), Direction.Vertical,""));
                }
            }
        }

        return words;
    }

    public identifyConstraint(grid: Case[][], wordsInGrid: Word[]): void {
        // Set isAConstraint attribute to true for all the cases that are part of 2 words
        const minimumWordLength: number = 2;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j].getHorizontalWordLength() > minimumWordLength && grid[i][j].getVerticalWordLength() > minimumWordLength) {
                    grid[i][j].setIsAConstraint(true);

                    const wordsWithPos = this.getWordsWithPos(wordsInGrid, i, j);
                    for (const word of wordsWithPos)
                        word.setNbConstraints(word.getNbConstraints() + 1);
                }
            }
        }
    }

    private getWordsWithPos(wordsInGrid: Word[], line: number, column: number): Word[] {
        return wordsInGrid.filter((word) => {
            if (word.getOrientation() === Direction.Horizontal) {
                return word.getLine() === line
                    && word.getColumn() <= column
                    && word.getColumn() + word.getLength() - 1 >= column;
            } else {
                return word.getColumn() === column
                    && word.getLine() <= line
                    && word.getLine() + word.getLength() - 1 >= line;
            }
        });
    }
}
