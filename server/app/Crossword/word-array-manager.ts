
import { Word } from "./word";
import { Case } from "./case";

export class WordArrayManager {

    private findWords(grid: Case[][]): Word[] {
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

    private partition(array: Word[], left: number, right: number): number {
        const pivot: number = array[right].getLength();
        let index: number = left - 1;

        for (let i: number = left; i < right - 1; i++) {
            if (array[i].getLength() <= pivot) {
                index++;
                const firstTemp: Word = array[index];
                array[index] = array[i];
                array[i] = firstTemp;
            }
        }

        const secondTemp: Word = array[index + 1];
        array[index + 1] = array[right];
        array[right] = secondTemp;

        return index;
    }

    private sortArray(array: Word[], left: number, right: number): void {
        if ( left < right) {
            const partitionIndex: number = this.partition(array, left, right);

            this.sortArray(array, left, partitionIndex - 1);
            this.sortArray(array, partitionIndex + 1, right);
        }
    }

    public generateWordArray(grid: Case[][]): Word[] {
        const words: Word[] = this.findWords(grid);
        this.sortArray(words, 0, words.length - 1);

        return words;
    }
}
