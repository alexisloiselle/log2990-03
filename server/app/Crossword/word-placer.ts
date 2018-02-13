import { Case } from "./case";
import { Word, Direction } from "./word";
import { Lexicon } from "../lexicon/lexicon";

export class WordPlacer {

    private lexicon: Lexicon;

    constructor() {
        this.lexicon = new Lexicon();
    }

    // backtracking function
    public fitWord(grid: Case[][], constraintsQueue: Word[], wordInGrid: Word[], pos: number, pattern: string): boolean {
        if (pos + 1 > constraintsQueue.length) {
            console.log(`fini`);
            return true;
        }

        console.log("current word ===============");
        console.log(constraintsQueue[pos]);

        let wordsPattern: string[] = this.lexicon.getWordsFromPattern(pattern, false);
        let word: string = "";
        let randNum: number = Math.floor(Math.random() * wordsPattern.length);

        if (wordsPattern.length === 0) {
            console.log("backtracked - no words of that pattern: '" + pattern + "'");
            return false;
        } else {
            word = wordsPattern[randNum];
        }

        while (wordsPattern.length !== 0) {
            console.log(`entré dans la loop : ${word} = ${wordsPattern.length}, constraints number: ${pos}`);
            this.placeWord(grid, constraintsQueue[pos], word);
            constraintsQueue = this.addEngenderedWords(grid, constraintsQueue, wordInGrid, pos);

            //#region log grid
            for(let i = 0; i < constraintsQueue.length; i++){
                console.log(`constraintsQueue pos ${i}, x: ${constraintsQueue[i].getLine()}, y: ${constraintsQueue[i].getColumn()}, horizontal? ${constraintsQueue[i].getOrientation() === Direction.Horizontal?"yes":"no"}`);
            }
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    if (grid[i][j].getIsBlack()) {
                        process.stdout.write('#');
                    } else if (grid[i][j].getRightLetter() === "") {
                        process.stdout.write(" ");
                    } else {
                        process.stdout.write(grid[i][j].getRightLetter());
                    }
                }
                console.log('');
            }
            //#endregion

            console.log("next word ===============");
            console.log(constraintsQueue[pos+1]);
            if (this.fitWord(grid, constraintsQueue, wordInGrid, pos + 1, this.findPattern(grid, constraintsQueue[pos + 1]))) {
                console.log(`fini dans la loop : ${word}`);
                return true;
            }
            wordsPattern.splice(randNum, 1);

            this.removeWord(grid, constraintsQueue[pos], pattern);
            console.log(wordsPattern[0] + " random number = " + randNum);
            randNum = Math.floor(Math.random() * wordsPattern.length);
            word = wordsPattern[randNum];
        }
        console.log("backtracked - no more words to try with pattern: '" + pattern + "'");
        return false;
    }

    //clairement besoin de refactoring (30 lignes)
    private addEngenderedWords(grid: Case[][], constraintsQueue: Word[], wordInGrid: Word[], pos: number): Word[] {
        let line: number = constraintsQueue[pos].getLine();
        let column: number = constraintsQueue[pos].getColumn();
        let orientation: Direction = constraintsQueue[pos].getOrientation();

        for (let i = 0; i < constraintsQueue[pos].getLength(); i++) {
            if (orientation === Direction.Horizontal
                && grid[line][column].getIsAConstraint()) {
                    console.log(`is vertical word constraint`);
                    let wordEngendered = wordInGrid.find((word) => {
                        return word.getColumn() === column
                            && word.getLine() <= line
                            && word.getLine() + word.getLength() - 1 >= line
                            && word.getOrientation() !== orientation;
                    });
                    if(constraintsQueue.indexOf(wordEngendered) === -1){
                        constraintsQueue.push(wordEngendered);
                        console.log("pushed");
                    }
            } else if(orientation === Direction.Vertical
                && grid[line][column].getIsAConstraint()) {
                    console.log(`is horizontal word constraint`);
                    let wordEngendered = wordInGrid.find((word) => {
                        return word.getLine() === line
                            && word.getColumn() <= column
                            && word.getColumn() + word.getLength() - 1 >= column
                            && word.getOrientation() !== orientation;
                    });
                    if(constraintsQueue.indexOf(wordEngendered) === -1){
                        constraintsQueue.push(wordEngendered);
                        console.log("pushed");
                    }
            }
            line = orientation === Direction.Horizontal ? line : line + 1;
            column = orientation === Direction.Horizontal ? column + 1 : column;
        }
        this.partialSortConstraints(constraintsQueue, pos + 1, constraintsQueue.length);
        return constraintsQueue;
    }

    private partialSortConstraints(array: Word[], start: number, end: number) {
        let preSorted: Word[] = array.slice(0, start), postSorted: Word[] = array.slice(end);
        let sorted = array.slice(start, end).sort(((a: Word, b: Word) => {
            return b.getNbConstraints() - a.getNbConstraints();
        }));
        array.length = 0;
        array.push.apply(array, preSorted.concat(sorted).concat(postSorted));
        return array;
    }

    private findPattern(grid: Case[][], wordInGrid: Word): string {
        let line: number = wordInGrid.getLine();
        let column: number = wordInGrid.getColumn();
        let orientation: Direction = wordInGrid.getOrientation();
        let pattern: string = "";

        for (let i = 0; i < wordInGrid.getLength(); i++) {
            pattern = grid[line][column].getRightLetter() === ""
                ? pattern.concat(" ")
                : pattern.concat(grid[line][column].getRightLetter());

                line = orientation === Direction.Horizontal ? line : line + 1;
                column = orientation === Direction.Horizontal ? column + 1 : column;
        }

        //#region log grid
        // for (let i = 0; i < grid.length; i++) {
        //     for (let j = 0; j < grid[i].length; j++) {
        //         if (grid[i][j].getIsBlack()) {
        //             process.stdout.write('#');
        //         } else if (grid[i][j].getRightLetter() === "") {
        //             process.stdout.write(" ");
        //         } else {
        //             process.stdout.write(grid[i][j].getRightLetter());
        //         }
        //     }
        //     console.log('');
        // }
        console.log(`-------------------------------------------`);
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j].getIsBlack()) {
                    process.stdout.write('#');
                } else if (!grid[i][j].getIsAConstraint()) {
                    process.stdout.write(" ");
                } else {
                    process.stdout.write("C");
                }
            }
            console.log('');
        }
        console.log(`pattern ------------${pattern}----------`);
        //#endregion
        return pattern;
    }

    public placeWord(grid: Case[][], gridWord: Word, wordToAdd: string): boolean {
        // Places the word in the grid if all constraints are compliant
        let line: number = gridWord.getLine();
        let column: number = gridWord.getColumn();
        let orientation: Direction = gridWord.getOrientation();

        // Make sure the word respects the constraints
        for (const char of wordToAdd) {
            if (grid[line][column].getIsAConstraint() && grid[line][column].getRightLetter() !== ""
                && grid[line][column].getRightLetter() !== char) {
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                return false;
            }
            line = orientation === Direction.Horizontal ? line : line + 1;
            column = orientation === Direction.Horizontal ? column + 1 : column;
        }
        line = gridWord.getLine();
        column = gridWord.getColumn();
        // If so, we place it
        for (const char of wordToAdd) {
            grid[line][column].setRightLetter(char);
            line = orientation === Direction.Horizontal ? line : line + 1;
            column = orientation === Direction.Horizontal ? column + 1 : column;
        }

        return true;
    }

    public removeWord(grid: Case[][], word: Word, pattern: string): void {
        // Removes all the chars of the word that arent part of a word in the other orientation from the grid
        const line: number = word.getLine();
        const column: number = word.getColumn();
        console.log("remove pattern : " + pattern);
        if (word.getOrientation() === Direction.Horizontal) {
            for (let i: number = 0; i < word.getLength(); i++) {
                if (pattern[i] === " ") {
                    grid[line][column + i].setRightLetter("");
                }
            }
        } else if (word.getOrientation() === Direction.Vertical) {
            for (let i: number = 0; i < word.getLength(); i++) {
                if (pattern[i] === " ") {
                    grid[line + i][column].setRightLetter("");
                }
            }
        }
    }
}
