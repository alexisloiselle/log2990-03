import { Case } from "./case";
import { Word, Direction } from "./word";
import { Lexicon } from "../lexicon/lexicon";

export class WordPlacer {

    private lexicon: Lexicon;

    constructor() {
        this.lexicon = new Lexicon();
    }

    // backtracking function
    public fitWord(grid: Case[][], constraintsQueue: Word[], wordInGrid: Word[], pos: number): boolean {
        if (pos + 1 > constraintsQueue.length) {
            if (pos + 1 > wordInGrid.length) {
                return true;
            } else {
                constraintsQueue.push(wordInGrid.filter((word) => {
                    return constraintsQueue.indexOf(word) === -1;
                })
                .sort((a, b) => {
                    return b.NbConstraints - a.NbConstraints;
                })[0]);
            }
        }
        let pattern = this.findPattern(grid, constraintsQueue[pos]);


        const wordsPattern: string[] = this.lexicon.getWordsFromPattern(pattern, false);
        let word: string = "";
        let randNum: number = Math.floor(Math.random() * wordsPattern.length);

        if (wordsPattern.length === 0) {
            return false;
        } else {
            word = wordsPattern[randNum];
        }

        while (wordsPattern.length !== 0) {
            this.placeWord(grid, constraintsQueue[pos], word);
            constraintsQueue = this.addEngenderedWords(grid, constraintsQueue, wordInGrid, pos);

            if (this.fitWord(grid, constraintsQueue, wordInGrid, pos + 1)) {
                return true;
            }
            wordsPattern.splice(randNum, 1);

            this.removeWord(grid, constraintsQueue[pos], pattern);
            randNum = Math.floor(Math.random() * wordsPattern.length);
            word = wordsPattern[randNum];
        }
        return false;
    }

    // clairement besoin de refactoring (30 lignes)
    private addEngenderedWords(grid: Case[][], constraintsQueue: Word[], wordInGrid: Word[], pos: number): Word[] {
        let line: number = constraintsQueue[pos].Line;
        let column: number = constraintsQueue[pos].Column;
        const orientation: Direction = constraintsQueue[pos].Orientation;

        for (let i: number = 0; i < constraintsQueue[pos].Length; i++) {
            if (orientation === Direction.Horizontal
                && grid[line][column].IsAConstraint) {
                    const wordEngendered: Word = wordInGrid.find((word: Word) => {
                        return word.Column === column
                            && word.Line <= line
                            && word.Line + word.Length - 1 >= line
                            && word.Orientation !== orientation;
                    });
                    if (constraintsQueue.indexOf(wordEngendered) === -1) {
                        constraintsQueue.push(wordEngendered);
                    }
            } else if (orientation === Direction.Vertical
                && grid[line][column].IsAConstraint) {
                    const wordEngendered: Word = wordInGrid.find((word: Word) => {
                        return word.Line === line
                            && word.Column <= column
                            && word.Column + word.Length - 1 >= column
                            && word.Orientation !== orientation;
                    });
                    if (constraintsQueue.indexOf(wordEngendered) === -1) {
                        constraintsQueue.push(wordEngendered);
                    }
            }
            line = orientation === Direction.Horizontal ? line : line + 1;
            column = orientation === Direction.Horizontal ? column + 1 : column;
        }
        this.partialSortConstraints(constraintsQueue, pos + 1, constraintsQueue.length);

        return constraintsQueue;
    }

    private partialSortConstraints(array: Word[], start: number, end: number): Word[] {
        const preSorted: Word[] = array.slice(0, start), postSorted: Word[] = array.slice(end);
        const sorted: Word[] = array.slice(start, end).sort(((a: Word, b: Word) => {
            return b.NbConstraints - a.NbConstraints;
        }));
        array.length = 0;
        array.push.apply(array, preSorted.concat(sorted).concat(postSorted));

        return array;
    }

    private findPattern(grid: Case[][], wordInGrid: Word): string {
        let line: number = wordInGrid.Line;
        let column: number = wordInGrid.Column;
        const orientation: Direction = wordInGrid.Orientation;
        let pattern: string = "";

        for (let i: number = 0; i < wordInGrid.Length; i++) {
            pattern = grid[line][column].RightLetter === ""
                ? pattern.concat(" ")
                : pattern.concat(grid[line][column].RightLetter);

            line = orientation === Direction.Horizontal ? line : line + 1;
            column = orientation === Direction.Horizontal ? column + 1 : column;
        }
        return pattern;
    }

    public placeWord(grid: Case[][], gridWord: Word, wordToAdd: string): boolean {
        // Places the word in the grid if all constraints are compliant
        let line: number = gridWord.Line;
        let column: number = gridWord.Column;
        const orientation: Direction = gridWord.Orientation;

        // Make sure the word respects the constraints
        for (const char of wordToAdd) {
            if (grid[line][column].IsAConstraint && grid[line][column].RightLetter !== ""
                && grid[line][column].RightLetter !== char) {

                return false;
            }
            line = orientation === Direction.Horizontal ? line : line + 1;
            column = orientation === Direction.Horizontal ? column + 1 : column;
        }
        line = gridWord.Line;
        column = gridWord.Column;
        // If so, we place it
        for (const char of wordToAdd) {
            grid[line][column].RightLetter = char;
            line = orientation === Direction.Horizontal ? line : line + 1;
            column = orientation === Direction.Horizontal ? column + 1 : column;
        }

        return true;
    }

    public removeWord(grid: Case[][], word: Word, pattern: string): void {
        // Removes all the chars of the word that arent part of a word in the other orientation from the grid
        const line: number = word.Line;
        const column: number = word.Column;
        if (word.Orientation === Direction.Horizontal) {
            for (let i: number = 0; i < word.Length; i++) {
                if (pattern[i] === " ") {
                    grid[line][column + i].RightLetter = "";
                }
            }
        } else if (word.Orientation === Direction.Vertical) {
            for (let i: number = 0; i < word.Length; i++) {
                if (pattern[i] === " ") {
                    grid[line + i][column].RightLetter = "";
                }
            }
        }
    }
}
