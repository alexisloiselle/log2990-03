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
        it("should contain be defined and contains 46740 words", () => {
            const NUMBER_OF_WORDS: number = 46740;
            expect(lexicon.getAllWords()).to.be.an("array")
                .that.satisfies((allWords: string[]) => {
                    return allWords.length === NUMBER_OF_WORDS;
                });
        });
    });

    describe("getWordsByLength, length = 5", () => {
        const WORD_LENGTH: number = 5;
        const NUMBER_OF_OCC: number = 2677;
        it("should find 2677 uncommon words of length = 5", () => {
            const wordsFiveLong: string[] = lexicon.getWordsByLength(WORD_LENGTH, true);
            expect(wordsFiveLong.length).to.be.equal(NUMBER_OF_OCC);
        });
        it("should only find words of length = 5", () => {
            const wordsFiveLong: string[] = lexicon.getWordsByLength(WORD_LENGTH, false);
            wordsFiveLong.forEach((word: string) => {
                expect(word.length).to.be.equal(WORD_LENGTH);
            });
        });
    });

    describe("getWordsByLength, length = 2", () => {
        it("should not find words", () => {
            const LENGTH: number = 2;
            const wordsTwoLong: string[] = lexicon.getWordsByLength(LENGTH, true);
            expect(wordsTwoLong.length).to.be.equal(0);
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
        it("should contain 38 common words with pattern: 'h    '", () => {
            const PATTERN_LENGTH: number = 38;
            const wordsWithPattern: string[] = lexicon.getWordsFromPattern("h    ", false);
            expect(wordsWithPattern.length).to.be.equal(PATTERN_LENGTH);
            expect(wordsWithPattern).to.contain("hello");
            expect(wordsWithPattern).to.contain("house");
        });
        it("should contain 2 uncommon words with pattern: ' ert  '", () => {
            const PATTERN_LENGTH: number = 2;
            const wordsWithPattern: string[] = lexicon.getWordsFromPattern(" ert  ", true);
            expect(wordsWithPattern.length).to.be.equal(PATTERN_LENGTH);
            expect(wordsWithPattern).to.contain("bertha");
            expect(wordsWithPattern).to.contain("certes");
        });
    });
});
