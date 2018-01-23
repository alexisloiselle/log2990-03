import {} from "jasmine";
import { expect } from "chai";

import { Lexicon } from "./lexicon";

describe("Lexicon", () => {

    let lexicon: Lexicon;

    beforeEach(() => {
        const testFile = "app/englishWordsTest.txt";
        lexicon = new Lexicon(testFile);
    });

    describe("Constructor", () => {
        it("should exist and have words", () => {
            expect(lexicon.allWords);
        });
        it("should contain 6 words", () => {
            expect(lexicon.allWords.length).to.be.equal(6);
        });
    });

    describe("getWordsByLength, length = 5", () => {
        it("should find 4 words of length = 5", () => {
            const wordsFiveLong: string[] = lexicon.getWordsByLength(5);
            expect(wordsFiveLong.length).to.be.equal(4);
        });
        it("should only find words of length = 5", () => {
            const wordsFiveLong: string[] = lexicon.getWordsByLength(5);
            wordsFiveLong.forEach((word: string) => {
                expect(word.length).to.be.equal(5);
            });
        });
    });

    describe("getWordsByLength, length = 2", () => {
        it("should not find words", () => {
            const wordsTwoLong: string[] = lexicon.getWordsByLength(2);
            expect(wordsTwoLong.length).to.be.equal(0);
        });
    });
});