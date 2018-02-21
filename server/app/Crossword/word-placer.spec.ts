import { } from "jasmine";
import { expect } from "chai";

import { Case } from "./case";
import { BlankGridCreator } from "./blank-grid-creator";
import { Word, Direction } from "./word";
import { WordPlacer } from "./word-placer";

describe("Word-placer", () => {
    const length: number = 5;
    const grid: Case[][] = BlankGridCreator.createGrid(length, length);
    const position: number = 2;
    const wordPlacer: WordPlacer = new WordPlacer;
    const word1: Word = new Word(position, 0, length, Direction.Horizontal, "");

    describe("Word placement", () => {
        it("Should be able to place words", () => {
            expect(wordPlacer.placeWord(grid, word1, "salut")).to.equal(true);
            const word2: Word = new Word(0, position, length, Direction.Vertical, "");
            expect(wordPlacer.placeWord(grid, word2, "alloo")).to.equal(true);

        });
        it("Should be able to remove words", () => {
            wordPlacer.removeWord(grid, word1, "  l  ");
            expect(grid[position][position].RightLetter).to.equal("l");
            expect(grid[position][0].RightLetter).to.equal("");
            expect(grid[position][length - 1].RightLetter).to.equal("");
        });
    });
});
