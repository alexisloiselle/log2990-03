import { Case } from "./case";
import { Lexicon } from "../lexicon/lexicon";
import { Word, Direction } from "./word";

export class WordPlacer {

    private lexicon: Lexicon;
    private placedWord: string[];

    constructor() {
        this.lexicon = new Lexicon();
        this.placedWord = new Array();
    }

    public fitWord(grid: Case[][], constraintsQueue: Word[], wordInGrid: Word[], pos: number, isUncommon: boolean): boolean {
        // Iterative algo to place all words in the grid (using backtracking when blocked)
        if (pos >= constraintsQueue.length) {
            if (pos >= wordInGrid.length) {
                return true;
            }
            constraintsQueue.push(wordInGrid.filter((word: Word) => {
                return constraintsQueue.indexOf(word) === -1;
            }).sort((a: Word, b: Word) => {
                return b.NbConstraints - a.NbConstraints;
            })[0]);
        }

        const pattern: string = this.findPattern(grid, constraintsQueue[pos]);
        const wordsPattern: string[] = this.lexicon.getWordsFromPattern(pattern, isUncommon);

        for (let randNum: number = 0; wordsPattern.length !== 0; randNum = Math.floor(Math.random() * wordsPattern.length)) {
            if (this.placeWord(grid, constraintsQueue[pos], wordsPattern[randNum])) {
                constraintsQueue = this.addEngenderedWords(grid, constraintsQueue, wordInGrid, pos);
                if (this.fitWord(grid, constraintsQueue, wordInGrid, pos + 1, isUncommon)) {
                    return true;
                }
                this.removeWord(grid, constraintsQueue[pos], pattern);
            }
            wordsPattern.splice(randNum, 1);
        }

        return false;
    }

    private addEngenderedWords(grid: Case[][], constraintsQueue: Word[], wordInGrid: Word[], pos: number): Word[] {
        // Adds words that intersects the wordInGrid in the contraintsQueue
        let line: number = constraintsQueue[pos].Line;
        let column: number = constraintsQueue[pos].Column;
        const orientation: Direction = constraintsQueue[pos].Orientation;

        for (let i: number = 0; i < constraintsQueue[pos].Length; i++) {
            if (grid[line][column].IsAConstraint) {
                const wordEngendered: Word = wordInGrid.find((word: Word) => {
                    return this.isIntersectingWord(word, line, column, orientation);
                });
                if (constraintsQueue.indexOf(wordEngendered) === -1) {
                    constraintsQueue.push(wordEngendered);
                }
            }
            orientation === Direction.Horizontal ? column++ : line++;
        }
        this.partialSortConstraints(constraintsQueue, pos + 1, constraintsQueue.length);

        return constraintsQueue;
    }

    private isIntersectingWord(word: Word, line: number, column: number, orientation: Direction): boolean {
        // Determine if the word intersects another word with a char at line, column in a certain orientation
        if (orientation === Direction.Horizontal) {
            return word.Column === column
                && word.Line <= line
                && word.Line + word.Length - 1 >= line
                && word.Orientation !== orientation;
        } else {
            return word.Line === line
                && word.Column <= column
                && word.Column + word.Length - 1 >= column
                && word.Orientation !== orientation;
        }
    }

    private partialSortConstraints(array: Word[], start: number, end: number): Word[] {
        // Sorts a part the array to have words with more contraints first
        const preSorted: Word[] = array.slice(0, start), postSorted: Word[] = array.slice(end);
        const sorted: Word[] = array.slice(start, end).sort(((a: Word, b: Word) => {
            return b.NbConstraints - a.NbConstraints;
        }));
        array.length = 0;
        array.push.apply(array, preSorted.concat(sorted).concat(postSorted));

        return array;
    }

    private findPattern(grid: Case[][], wordInGrid: Word): string {
        // Find the pattern imposed by the contraints (ex.: " ba  e")
        let line: number = wordInGrid.Line;
        let column: number = wordInGrid.Column;
        const orientation: Direction = wordInGrid.Orientation;
        let pattern: string = "";

        for (let i: number = 0; i < wordInGrid.Length; i++) {
            pattern = grid[line][column].RightLetter === ""
                ? pattern.concat(" ") : pattern.concat(grid[line][column].RightLetter);
            orientation === Direction.Horizontal ? column++ : line++;
        }

        return pattern;
    }

    public placeWord(grid: Case[][], gridWord: Word, wordToAdd: string): boolean {
        // Places the word in the grid if it respects the constraints
        let line: number = gridWord.Line;
        let column: number = gridWord.Column;
        const orientation: Direction = gridWord.Orientation;

        if (this.placedWord.indexOf(wordToAdd) > -1) {
            return false;
        }

        for (const char of wordToAdd) {
            if (grid[line][column].IsAConstraint && grid[line][column].RightLetter !== ""
                && grid[line][column].RightLetter !== char) {
                return false;
            }
            orientation === Direction.Horizontal ? column++ : line++;
        }

        line = gridWord.Line;
        column = gridWord.Column;
        for (const char of wordToAdd) {
            grid[line][column].RightLetter = char;
            orientation === Direction.Horizontal ? column++ : line++;
        }
        this.placedWord.push(wordToAdd);

        return true;
    }

    public removeWord(grid: Case[][], gridWord: Word, pattern: string): void {
        // Removes all the chars of the word from the grid that arent part of a word in the other orientation
        let line: number = gridWord.Line;
        let column: number = gridWord.Column;

        for (const char of pattern) {
            if (char === " ") {
                grid[line][column].RightLetter = "";
            }
            gridWord.Orientation === Direction.Horizontal ? column++ : line++;
        }
        this.placedWord.pop();
    }
}
