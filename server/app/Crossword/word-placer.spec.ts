import {} from "jasmine";
import { expect } from "chai";

import { Case } from "./case";
import { BlankGridCreator } from "./blank-grid-creator";
import { Word, Direction } from "./word";
import { WordPlacer } from "./word-placer";

describe("Grid-manager", () => {
    const height: number = 5;
    const width: number = 5;
    const blankGridCreator: BlankGridCreator = new BlankGridCreator();
    const grid: Case[][] = blankGridCreator.createGrid(height, width);
    const wordPlacer: WordPlacer = new WordPlacer;
    const position: number = 2;

    describe("Word placement", () => {
        it("Should be able to place words", () => {
            const word1: Word = new Word(position, 0, height, Direction.Horizontal);
            expect(wordPlacer.placeWord(grid, word1, "salut")).to.equal(true);
            const word2: Word = new Word(0, position, width, Direction.Vertical);
            expect(wordPlacer.placeWord(grid, word2, "alloo")).to.equal(true);

        });
    });
});
