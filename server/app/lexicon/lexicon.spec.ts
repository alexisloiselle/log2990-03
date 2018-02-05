import { } from "jasmine";
import { expect } from "chai";

import { Lexicon } from "./lexicon";
import { MAX_DEFS } from "../config";

describe("Lexicon", () => {

    let lexicon: Lexicon;

    beforeEach(() => {
        const testFile: string = "app/englishWords.txt";
        lexicon = new Lexicon(testFile);
    });

    describe("Constructor", () => {
        it("should exist and have words", () => {
            expect(lexicon.allWords);
        });
        it("should contain 46764 words", () => {
            const NUMBER_OF_WORDS: number = 46764;
            expect(lexicon.allWords.length).to.be.equal(NUMBER_OF_WORDS);
        });
    });

    describe("getWordsByLength, length = 5", () => {
        const WORD_LENGTH: number = 5;
        const NUMBER_OF_OCC: number = 4060;
        it("should find 4060 words of length = 5", () => {
            const wordsFiveLong: string[] = lexicon.getWordsByLength(WORD_LENGTH);
            expect(wordsFiveLong.length).to.be.equal(NUMBER_OF_OCC);
        });
        it("should only find words of length = 5", () => {
            const wordsFiveLong: string[] = lexicon.getWordsByLength(WORD_LENGTH);
            wordsFiveLong.forEach((word: string) => {
                expect(word.length).to.be.equal(WORD_LENGTH);
            });
        });
    });

    describe("getWordsByLength, length = 2", () => {
        it("should not find words", () => {
            const LENGTH: number = 2;
            const wordsTwoLong: string[] = lexicon.getWordsByLength(LENGTH);
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

    describe("getFrequency", () => {
        it("table should have 443.861427 frequencies", async () => {
            const FREQ: number = 443.861427;
            const freq: number = await Lexicon.getFrequency("table");
            expect(freq).to.be.equal(FREQ);
        });
    });

    describe("isUncommun", () => {
        it("table should be common", async () => {
            const uncommon: boolean = await Lexicon.isUncommon("table");
            expect(uncommon).to.be.equal(false);
        });
    });

    describe("isUncommun", () => {
        it("alcazar should be uncommon", async () => {
            const uncommon: boolean = await Lexicon.isUncommon("alcazar");
            expect(uncommon).to.be.equal(true);
        });
    });

    describe("get words from pattern", () => {
        it("should contain 133 words (house and hello) with pattern: 'h    '", () => {
            const PATTERN_LENGTH: number = 133;
            const wordsWithPattern: string[] = lexicon.getWordsFromPattern("h    ");
            expect(wordsWithPattern.length).to.be.equal(PATTERN_LENGTH);
            expect(wordsWithPattern).to.contain("hello");
            expect(wordsWithPattern).to.contain("house");
        });
        it("should contain 8 words (lavage and garage) with pattern: ' a age'", () => {
            const PATTERN_LENGTH: number = 8;
            const wordsWithPattern: string[] = lexicon.getWordsFromPattern(" a age");
            expect(wordsWithPattern.length).to.be.equal(PATTERN_LENGTH);
            expect(wordsWithPattern).to.contain("garage");
            expect(wordsWithPattern).to.contain("lavage");
        });
    });

});
