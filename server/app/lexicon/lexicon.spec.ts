import { } from "jasmine";
import { expect } from "chai";

import { MAX_DEFS, API_URL } from "../config";

describe("Lexicon", () => {
    // tslint:disable-next-line:typedef
    const chai = require("chai");
    // tslint:disable-next-line:typedef
    const chaiHttp = require("chai-http");
    chai.use(chaiHttp);

    describe("Constructor", () => {
        it("should contain be defined and contains 36985 words", () => {
            const NUMBER_OF_WORDS: number = 36985;
            expect(lexicon.getAllWords()).to.be.an("array")
                .that.satisfies((allWords: string[]) => {
                    return allWords.length === NUMBER_OF_WORDS;
                });
        });
    });

    describe("getWordsByLength, length = 5", () => {
        const WORD_LENGTH: number = 5;
        const NUMBER_OF_OCC: number = 2104;
        it("should find 2104 uncommon words of length = 5", () => {
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
            // tslint:disable-next-line:no-any
            const req: any = await chai.request(API_URL)
                .get("/lexicon/definition/cat");
            const definitions: string[] = req.body;
            expect(definitions.length).to.satisfy((l: number) => {
                return l >= 0 && l <= MAX_DEFS;
            });
        });
    });

    describe("get words from pattern", () => {
        it("should contain 37 common words with pattern: 'h    '", () => {
            const PATTERN_LENGTH: number = 37;
            const wordsWithPattern: string[] = lexicon.getWordsFromPattern("h    ", false);
            expect(wordsWithPattern.length).to.be.equal(PATTERN_LENGTH);
            expect(wordsWithPattern).to.contain("hello");
            expect(wordsWithPattern).to.contain("house");
            expect(wordsWithPattern).to.contain("hairy");
        });
        it("should contain 1 uncommon words with pattern: ' ert  '", () => {
            const PATTERN_LENGTH: number = 1;
            const wordsWithPattern: string[] = lexicon.getWordsFromPattern(" ert  ", true);
            expect(wordsWithPattern.length).to.be.equal(PATTERN_LENGTH);
            expect(wordsWithPattern).to.contain("certes");
        });
        it("should contain 0 common words with pattern: 'ajsjddh'", () => {
            const wordsWithPattern: string[] = lexicon.getWordsFromPattern("ajsjddh", false);
            expect(wordsWithPattern).to.be.an("array");
            expect(wordsWithPattern).to.have.lengthOf(0);
        });
    });
});
