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

        console.log(constraintsQueue);
        constraintsQueue = this.addEngenderedWords(grid, constraintsQueue, wordInGrid, pos);

        let wordsPattern: string[] = this.lexicon.getWordsFromPattern(pattern, false);
        let word: string = "";
        let randNum: number = Math.floor(Math.random() * wordsPattern.length);

        if (wordsPattern.length === 0) {
            console.log(`wordsPattern.length === 0, avant loop`);
            return false;
        } else {
            word = wordsPattern[randNum];
        }

        while (wordsPattern.length !== 0) {
            console.log(`entré dans la loop : ${word} = ${wordsPattern.length}`);
            this.placeWord(grid, constraintsQueue[pos], word);
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
            if (this.fitWord(grid, constraintsQueue, wordInGrid, pos + 1, this.findPattern(grid, constraintsQueue[pos + 1]))) {
                console.log(`fini dans la loop : ${word}`);
                return true;
            }
            console.log("wordspattern length before removing " + wordsPattern.length);
            console.log(wordsPattern.length === 1);
            wordsPattern.splice(randNum, 1);
            console.log("wordspattern length after removing " + wordsPattern.length);

            this.removeWord(grid, constraintsQueue[pos]);
            console.log(wordsPattern[0] + " random number = " + randNum);
            randNum = Math.floor(Math.random() * wordsPattern.length);
            word = wordsPattern[randNum];
        }

        console.log(`wordsPattern.length === 0, après loop`);
        return false;
    }

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
                    if(constraintsQueue.indexOf(wordEngendered) === -1)
                        constraintsQueue.push(wordEngendered);
            } else if(orientation === Direction.Vertical
                && grid[line][column].getIsAConstraint()) {
                    console.log(`is horizontal word constraint`);
                    let wordEngendered = wordInGrid.find((word) => {
                        return word.getLine() === line
                            && word.getColumn() <= column
                            && word.getColumn() + word.getLength() - 1 >= column
                            && word.getOrientation() !== orientation;
                    });
                    if(constraintsQueue.indexOf(wordEngendered) === -1)
                        constraintsQueue.push(wordEngendered);
            }
            line = orientation === Direction.Horizontal ? line : line + 1;
            column = orientation === Direction.Horizontal ? column + 1 : column;
        }
        constraintsQueue.sort((a: Word, b: Word) => b.getNbConstraints() - a.getNbConstraints());
        return constraintsQueue;
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
        return pattern;
    }

    // public fitWord(grid: Case[][], wordsInGrid: Word[], pos: number): boolean {
    //     // Recursive algo to place words in all the slot in the grid
    //     const sameLengthWords: string[] = this.lexicon.getWordsByLength(wordsInGrid[pos].getLength(), false);
    //     for (const word of sameLengthWords) {
    //         if (this.placeWord(grid, wordsInGrid[pos], word)) {
    //             if (pos + 1 === wordsInGrid.length || this.fitWord(grid, wordsInGrid, pos + 1)) {
    //                 return true;
    //             } else {
    //                 this.removeWord(grid, wordsInGrid[pos]);
    //             }
    //         }
    //     }

    //     return false;
    // }

    public placeWord(grid: Case[][], gridWord: Word, wordToAdd: string): boolean {
        // Places the word in the grid if all constraints are compliant
        if (gridWord.getLength() === wordToAdd.length) {
            let line: number = gridWord.getLine();
            let column: number = gridWord.getColumn();
            let orientation: Direction = gridWord.getOrientation();

            // Make sure the word respects the constraints
            for (const char of wordToAdd) {
                if (grid[line][column].getIsAConstraint() && grid[line][column].getRightLetter() !== ""
                    && grid[line][column].getRightLetter() !== char) {
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

        return false;
    }

    public removeWord(grid: Case[][], word: Word): void {
        // Removes all the chars of the word that arent part of a word in the other orientation from the grid
        const line: number = word.getLine();
        const column: number = word.getColumn();
        if (word.getOrientation() === Direction.Horizontal) {
            for (let i: number = 0; i < word.getLength(); i++) {
                if (!this.charPartOfVerticalWord(grid, line, column + i)) {
                    grid[line][column + i].setRightLetter("");
                }
            }
        } else if (word.getOrientation() === Direction.Vertical) {
            for (let i: number = 0; i < word.getLength(); i++) {
                if (!this.charPartOfHorizontalWord(grid, line + i, column)) {
                    grid[line + i][column].setRightLetter("");
                }
            }
        }
    }

    private charPartOfVerticalWord(grid: Case[][], line: number, column: number): boolean {
        // Tells if the char at this position is part of a vertical word
        
        const partVert: boolean = (grid[line][column].getIsAConstraint()
        && ((grid[line][column].getVerticalPositionInWord() !== 0
            && grid[line - 1][column].getRightLetter() !== "")
        || (grid[line][column].getVerticalPositionInWord() !== grid[line][column].getVerticalWordLength() - 1
            && grid[line + 1][column].getRightLetter() !== "")));
        console.log(`is part of vertical word: ${partVert}`);

        return partVert;
    }

    private charPartOfHorizontalWord(grid: Case[][], line: number, column: number): boolean {
        // Tells if the char at this position is part of a horizontal word
        const partHor: boolean = (grid[line][column].getIsAConstraint()
        && ((grid[line][column].getHorizontalPositionInWord() !== 0
            && grid[line][column - 1].getRightLetter() !== "")
        || (grid[line][column].getHorizontalPositionInWord() !== grid[line][column].getHorizontalWordLength() - 1
            && grid[line][column + 1].getRightLetter() !== "")));
        console.log(`is part of horizontal word: ${partHor}`);
        return partHor;
    }

}
