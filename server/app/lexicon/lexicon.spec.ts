import { } from "jasmine";
import { expect } from "chai";

import { Lexicon } from "./lexicon";
import { MAX_DEFS } from "../config";

describe("Lexicon", () => {

    let lexicon: Lexicon;

    beforeEach(() => {
        lexicon = new Lexicon();
    });

    describe("Constructor", () => {
        it("should be defined and contains words", () => {
            const words: string[] = lexicon.getAllWords();
            expect(words).to.be.an("array");
            expect(words.length).not.to.be.equal(0);
        });
    });

    describe("getDefs", () => {
        it("should contain 2 or less defs, ('cat')", async () => {
            const defs: string[] = await Lexicon.getDefinitions("cat");
            expect(defs.length).to.satisfy((l: number) => {
                return l >= 0 && l <= MAX_DEFS;
            });
        });
    });

    describe("get words from pattern", () => {
        it("should contain words with pattern: 'h    '", () => {
            const wordsWithPattern: string[] = lexicon.getWordsFromPattern("h    ", false);
            expect(wordsWithPattern).to.contain("hello");
            expect(wordsWithPattern).to.contain("house");
        });
        it("should contain words with pattern: ' ert  '", () => {
            const wordsWithPattern: string[] = lexicon.getWordsFromPattern(" ert  ", true);
            expect(wordsWithPattern).to.contain("certes");
        });
        it("should not contain words with pattern: 'ajksh'", () => {
            const wordsWithPattern: string[] = lexicon.getWordsFromPattern("ajksh", true);
            expect(wordsWithPattern.length).to.be.equal(0);
        });
    });
});
